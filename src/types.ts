export type TrackSource = 'saavn' | 'itunes';

export interface Track {
  /** Stable provider id */
  id: string;
  title: string;
  artist: string;
  album?: string;
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
}

export interface Collection {
  id: string;
  title: string;
  subtitle?: string;
  artwork: string;
  trackCount?: number;
}

export interface SearchResult {
  tracks: Track[];
  degraded: boolean;
}
