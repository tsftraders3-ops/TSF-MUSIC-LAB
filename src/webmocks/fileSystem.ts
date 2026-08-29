/** WEB MOCK of expo-file-system — no-op in-memory filesystem. */

const files = new Map<string, { exists: boolean; uri: string; size?: number }>();

export const documentDirectory = '/mock/';

export async function makeDirectoryAsync(): Promise<void> {
  /* no-op */
}

export async function getInfoAsync(uri: string): Promise<{ exists: boolean; uri: string; size?: number }> {
  return files.get(uri) ?? { exists: false, uri };
}

export function createDownloadResumable(
  uri: string,
  fileUri: string,
  _options: any,
  progress?: (data: { totalBytesWritten: number; totalBytesExpectedToWrite: number }) => void,
) {
  return {
    async downloadAsync(): Promise<{ uri: string; status: number } | undefined> {
      for (let p = 0.25; p <= 1; p += 0.25) {
        await new Promise((r) => setTimeout(r, 80));
        progress?.({ totalBytesWritten: p * 1000, totalBytesExpectedToWrite: 1000 });
      }
      files.set(fileUri, { exists: true, uri: fileUri, size: 1000 });
      return { uri: fileUri, status: 200 };
    },
    saveAsync: async () => undefined,
  };
}

export async function deleteAsync(uri: string): Promise<void> {
  files.delete(uri);
}

export async function readDirectoryAsync(): Promise<string[]> {
  return [];
}
