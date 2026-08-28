/**
 * Download manager — saves resolved 320 kbps streams into the app's
 * private document directory so they play back offline, forever.
 */

import * as FileSystem from 'expo-file-system';
import { resolveStreamUrl } from '../api/saavn';
import type { Track } from '../types';
import { getDownloadIndex, removeFromDownloadIndex, setDownloadIndex } from './store';

const DIR = `${FileSystem.documentDirectory}tsf-downloads/`;

async function ensureDir(): Promise<void> {
  const info = await FileSystem.getInfoAsync(DIR);
  if (!info.exists) await FileSystem.makeDirectoryAsync(DIR, { intermediates: true });
}

function safeName(id: string): string {
  return id.replace(/[^a-zA-Z0-9_-]/g, '_');
}

export function localPathFor(trackId: string): string {
  return `${DIR}${safeName(trackId)}.m4a`;
}

export async function isDownloaded(trackId: string): Promise<boolean> {
  try {
    const info = await FileSystem.getInfoAsync(localPathFor(trackId));
    return info.exists;
  } catch {
    return false;
  }
}

export async function downloadTrack(
  track: Track,
  onProgress?: (pct: number) => void,
): Promise<boolean> {
  await ensureDir();
  const remote = resolveStreamUrl(track);
  if (!remote) return false;
  const target = localPathFor(track.id);
  try {
    const resumable = FileSystem.createDownloadResumable(
      remote,
      target,
      {},
      (d: { totalBytesWritten: number; totalBytesExpectedToWrite: number }) => {
        if (onProgress && d.totalBytesExpectedToWrite > 0) {
          onProgress(d.totalBytesWritten / d.totalBytesExpectedToWrite);
        }
      },
    );
    const result = await resumable.downloadAsync();
    if (!result || result.status !== 200) {
      await FileSystem.deleteAsync(target, { idempotent: true }).catch(() => undefined);
      return false;
    }
    const index = await getDownloadIndex();
    const next = [{ ...track, localUri: target }, ...index.filter((t) => t.id !== track.id)];
    await setDownloadIndex(next);
    return true;
  } catch {
    await FileSystem.deleteAsync(target, { idempotent: true }).catch(() => undefined);
    return false;
  }
}

export async function deleteDownload(track: Track): Promise<void> {
  try {
    await FileSystem.deleteAsync(localPathFor(track.id), { idempotent: true });
  } catch {
    /* file already gone */
  }
  await removeFromDownloadIndex(track.id);
}

export async function verifyDownloads(): Promise<Track[]> {
  const index = await getDownloadIndex();
  const valid: Track[] = [];
  for (const t of index) {
    if (t.localUri && (await isDownloaded(t.id))) valid.push(t);
    else await removeFromDownloadIndex(t.id);
  }
  if (valid.length !== index.length) await setDownloadIndex(valid);
  return valid;
}
