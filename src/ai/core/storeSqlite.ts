/**
 * SQLite LedgerStore — the canonical on-device store (expo-sqlite).
 *
 * Design notes (§5.4 write protocol):
 *  - WAL journal + synchronous=NORMAL: appends return immediately, the OS
 *    checkpoints — a killed app loses zero committed evidence.
 *  - Single serialized write chain lives in ledger.ts, NOT here; this file
 *    is a dumb, fast adapter.
 *  - Indices: events(ts), listens(started_ts) — every read path is a range
 *    scan; no table ever gets scanned whole outside compaction.
 *  - The kv table holds the compacted profile snapshot (aggregates are
 *    kept forever; raw rows age out per RETENTION).
 */

import * as SQLite from 'expo-sqlite';
import type { LedgerStore } from './store';
import type { LedgerEvent, ListenRecord, SessionRecord } from './types';

const SCHEMA = `
CREATE TABLE IF NOT EXISTS events (
  id TEXT PRIMARY KEY,
  ts INTEGER NOT NULL,
  type TEXT NOT NULL,
  sessionId TEXT NOT NULL,
  trackId TEXT,
  artistId TEXT,
  surface TEXT,
  payload TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_events_ts ON events(ts);

CREATE TABLE IF NOT EXISTS listens (
  trackId TEXT NOT NULL,
  artistId TEXT,
  artist TEXT NOT NULL,
  title TEXT,
  language TEXT,
  genre TEXT,
  energy REAL NOT NULL,
  valence REAL NOT NULL,
  sessionId TEXT NOT NULL,
  surface TEXT NOT NULL,
  startedTs INTEGER NOT NULL,
  listenedMs INTEGER NOT NULL,
  durationMs INTEGER NOT NULL,
  completionRatio REAL NOT NULL,
  grade TEXT NOT NULL,
  skipBucket INTEGER,
  wasRecommended INTEGER NOT NULL,
  reasonCode TEXT,
  explorationSlot INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_listens_ts ON listens(startedTs);

CREATE TABLE IF NOT EXISTS sessions (
  id TEXT PRIMARY KEY,
  startTs INTEGER NOT NULL,
  endTs INTEGER,
  daypart TEXT NOT NULL,
  dayKind TEXT NOT NULL,
  trackCount INTEGER NOT NULL,
  totalListenMs INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS kv (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);
`;

interface EventRow {
  id: string;
  ts: number;
  type: string;
  sessionId: string;
  trackId: string | null;
  artistId: string | null;
  surface: string | null;
  payload: string;
}

interface ListenRow {
  trackId: string;
  artistId: string | null;
  artist: string;
  title: string | null;
  language: string | null;
  genre: string | null;
  energy: number;
  valence: number;
  sessionId: string;
  surface: string;
  startedTs: number;
  listenedMs: number;
  durationMs: number;
  completionRatio: number;
  grade: string;
  skipBucket: number | null;
  wasRecommended: number;
  reasonCode: string | null;
  explorationSlot: number;
}

interface SessionRow {
  id: string;
  startTs: number;
  endTs: number | null;
  daypart: string;
  dayKind: string;
  trackCount: number;
  totalListenMs: number;
}

export async function createLedgerStore(): Promise<LedgerStore> {
  const db = await SQLite.openDatabaseAsync('mindbeat.db');

  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    PRAGMA synchronous = NORMAL;
  `);
  await db.execAsync(SCHEMA);

  const impl: LedgerStore = {
    async appendEvents(events: LedgerEvent[]): Promise<void> {
      if (!events.length) return;
      await db.withTransactionAsync(async () => {
        for (const e of events) {
          await db.runAsync(
            `INSERT OR IGNORE INTO events (id, ts, type, sessionId, trackId, artistId, surface, payload)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              e.id,
              e.ts,
              e.type,
              e.sessionId,
              e.trackId ?? null,
              e.artistId ?? null,
              e.surface ?? null,
              JSON.stringify(e.payload ?? {}),
            ],
          );
        }
      });
    },

    async getEvents(sinceTs?: number): Promise<LedgerEvent[]> {
      const rows: EventRow[] = sinceTs == null
        ? await db.getAllAsync(`SELECT * FROM events ORDER BY ts ASC`)
        : await db.getAllAsync(`SELECT * FROM events WHERE ts >= ? ORDER BY ts ASC`, [sinceTs]);
      return rows.map((r) => ({
        id: r.id,
        ts: r.ts,
        type: r.type as LedgerEvent['type'],
        sessionId: r.sessionId,
        trackId: r.trackId ?? undefined,
        artistId: r.artistId ?? undefined,
        surface: (r.surface ?? undefined) as LedgerEvent['surface'],
        payload: JSON.parse(r.payload) as Record<string, unknown>,
      }));
    },

    async countEvents(): Promise<number> {
      const row = await db.getFirstAsync<{ n: number }>(`SELECT COUNT(*) AS n FROM events`);
      return row?.n ?? 0;
    },

    async deleteEventsBefore(cutoffTs: number): Promise<number> {
      const res = await db.runAsync(`DELETE FROM events WHERE ts < ?`, [cutoffTs]);
      return res.changes;
    },

    async appendListen(record: ListenRecord): Promise<void> {
      await db.runAsync(
        `INSERT INTO listens (
           trackId, artistId, artist, title, language, genre, energy, valence,
           sessionId, surface, startedTs, listenedMs, durationMs, completionRatio,
           grade, skipBucket, wasRecommended, reasonCode, explorationSlot
         ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        [
          record.trackId,
          record.artistId ?? null,
          record.artist,
          record.title ?? null,
          record.language ?? null,
          record.genre ?? null,
          record.energy,
          record.valence,
          record.sessionId,
          record.surface,
          record.startedTs,
          record.listenedMs,
          record.durationMs,
          record.completionRatio,
          record.grade,
          record.skipBucket ?? null,
          record.wasRecommended ? 1 : 0,
          record.reasonCode ?? null,
          record.explorationSlot ? 1 : 0,
        ],
      );
    },

    async getlistens(sinceTs?: number): Promise<ListenRecord[]> {
      const rows: ListenRow[] = sinceTs == null
        ? await db.getAllAsync(`SELECT * FROM listens ORDER BY startedTs ASC`)
        : await db.getAllAsync(`SELECT * FROM listens WHERE startedTs >= ? ORDER BY startedTs ASC`, [sinceTs]);
      return rows.map((r) => ({
        trackId: r.trackId,
        artistId: r.artistId ?? undefined,
        artist: r.artist,
        title: r.title ?? undefined,
        language: r.language ?? undefined,
        genre: r.genre ?? undefined,
        energy: r.energy,
        valence: r.valence,
        sessionId: r.sessionId,
        surface: r.surface as ListenRecord['surface'],
        startedTs: r.startedTs,
        listenedMs: r.listenedMs,
        durationMs: r.durationMs,
        completionRatio: r.completionRatio,
        grade: r.grade as ListenRecord['grade'],
        skipBucket: r.skipBucket ?? undefined,
        wasRecommended: !!r.wasRecommended,
        reasonCode: (r.reasonCode ?? undefined) as ListenRecord['reasonCode'],
        explorationSlot: !!r.explorationSlot,
      }));
    },

    async deleteListensBefore(cutoffTs: number): Promise<number> {
      const res = await db.runAsync(`DELETE FROM listens WHERE startedTs < ?`, [cutoffTs]);
      return res.changes;
    },

    async upsertSession(session: SessionRecord): Promise<void> {
      await db.runAsync(
        `INSERT OR REPLACE INTO sessions (id, startTs, endTs, daypart, dayKind, trackCount, totalListenMs)
         VALUES (?,?,?,?,?,?,?)`,
        [
          session.id,
          session.startTs,
          session.endTs ?? null,
          session.daypart,
          session.dayKind,
          session.trackCount,
          session.totalListenMs,
        ],
      );
    },

    async getSessions(sinceTs?: number): Promise<SessionRecord[]> {
      const rows: SessionRow[] = sinceTs == null
        ? await db.getAllAsync(`SELECT * FROM sessions ORDER BY startTs ASC`)
        : await db.getAllAsync(`SELECT * FROM sessions WHERE startTs >= ? ORDER BY startTs ASC`, [sinceTs]);
      return rows.map((r) => ({
        id: r.id,
        startTs: r.startTs,
        endTs: r.endTs ?? undefined,
        daypart: r.daypart as SessionRecord['daypart'],
        dayKind: r.dayKind as SessionRecord['dayKind'],
        trackCount: r.trackCount,
        totalListenMs: r.totalListenMs,
      }));
    },

    async getKV<T>(key: string): Promise<T | null> {
      const row = await db.getFirstAsync<{ value: string }>(`SELECT value FROM kv WHERE key = ?`, [key]);
      if (!row) return null;
      try {
        return JSON.parse(row.value) as T;
      } catch {
        return null;
      }
    },

    async setKV<T>(key: string, value: T): Promise<void> {
      await db.runAsync(
        `INSERT OR REPLACE INTO kv (key, value) VALUES (?, ?)`,
        [key, JSON.stringify(value)],
      );
    },

    async close(): Promise<void> {
      try {
        await db.closeAsync();
      } catch {
        /* already closed */
      }
    },
  };

  return impl;
}
