export type TrackSource = 'saavn' | 'itunes';

export interface Track {
  /** Stable provider id */
  id: string;
  title: string;
  artist: string;
  album?: string;
  albumId?: string;
  artistId?: string;
  /** Remote artwork URL (already upgraded to 500px where possible) */
  artwork: string;
  /** Seconds — may be 0/unknown for streams until playback starts */
  duration: number;
  source: TrackSource;
  /** JioSaavn song id when source === 'saavn' (used to refresh stream URLs) */
  saavnId?: string;
  /** Provider-encrypted stream URL — decrypted lazily at play time */
  encryptedUrl?: string;
  /** iTunes 30s preview (fallback stream) */
  previewUrl?: string;
  /** True when only a preview-length stream is available */
  previewOnly: boolean;
  /** JioSaavn 320kbps availability flag — false keeps the 96k URL */
  has320?: boolean;
  /** Local downloaded file URI (documentDirectory path) */
  localUri?: string;
  /** Provider explicit flag (kept for search badges; filtered off home) */
  explicit?: boolean;
  /** Injected by Smart Shuffle — badges the row with a sparkle */
  isRecommended?: boolean;
}

export interface Collection {
  id: string;
  title: string;
  subtitle?: string;
  artwork: string;
  trackCount?: number;
  /** How to resolve tracks when none were passed in the route */
  kind?: 'chart' | 'search';
  /** Search query for kind === 'search' */
  query?: string;
}

export interface SearchResult {
  tracks: Track[];
  degraded: boolean;
}

export interface Playlist {
  id: string;
  name: string;
  createdAt: number;
  tracks: Track[];
  /** True when the playlist was produced by the AI generator */
  aiGenerated?: boolean;
  prompt?: string;
}

export interface DailyMix {
  id: string;
  title: string;
  subtitle: string;
  artwork: string;
  tracks: Track[];
}

export interface PlayCountEntry {
  track: Track;
  count: number;
  lastAt: number;
}

export interface ListeningStats {
  totalPlays: number;
  distinctTracks: number;
  topArtists: Array<{ artist: string; plays: number; artwork?: string }>;
  topTracks: PlayCountEntry[];
  minutesEstimate: number;
}
