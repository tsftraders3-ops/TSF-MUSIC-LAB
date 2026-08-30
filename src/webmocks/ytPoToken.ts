/**
 * WEB MOCK of src/api/ytPoToken.tsx — same export surface, plus ONE
 * harness side effect: the LIVE "tu chaiye" WEB_REMIX response fixture
 * is installed into the REAL youtube.ts client via setYtFetch, so the
 * web gauntlet exercises the true purge + title-truth pipeline (the
 * exact payload the lab.4 device run painted). Metro redirects this
 * module only for platform=web.
 */

import { setYtFetch } from '../api/youtube';
import { YT_SEARCH_FIXTURE } from './ytSearchFixture';

export function YtPoTokenBridge(): JSX.Element | null {
  return null;
}

export function resetYtPoTokenBridge(): void {
  /* no bridge on web */
}

/** Serve the fixture for WEB_REMIX search requests; everything else
 *  degrades exactly like an offline rung (empty result, honest trail). */
let installed = false;
export function installYouTubeFixtureFetch(): void {
  if (installed) return;
  installed = true;
  setYtFetch(((url: any, init?: any) => {
    const u = String(url);
    if (u.includes('youtubei/v1/search')) {
      return Promise.resolve(
        new Response(JSON.stringify(YT_SEARCH_FIXTURE), { status: 200 }),
      );
    }
    return Promise.resolve(new Response(JSON.stringify({}), { status: 200 }));
  }) as typeof fetch);
}

installYouTubeFixtureFetch();
