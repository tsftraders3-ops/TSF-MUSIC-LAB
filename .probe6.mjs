// Refreshed-client probe: newer versions + visitorData + current UAs
const YTI = 'https://www.youtube.com/youtubei/v1';
const VID = 'vl8YTnx3gso';
const CLIENTS = [
  { name: 'IOS-20', body: { context: { client: { clientName: 'IOS', clientVersion: '20.10.4', deviceMake: 'Apple', deviceModel: 'iPhone16,2', osName: 'iPhone', osVersion: '18.3.2.22D82', hl: 'en', gl: 'IN', timeZone: 'UTC', utcOffsetMinutes: 0 } } },
    apiKey: 'AIzaSyB-63vPrdThhKuerbB2N_l7Kwwcxj6yUAc', cn: '5',
    ua: 'com.google.ios.youtube/20.10.4 (iPhone16,2; U; CPU iOS 18_3_2 like Mac OS X;)' },
  { name: 'ANDROID-20', body: { context: { client: { clientName: 'ANDROID', clientVersion: '20.10.38', androidSdkVersion: 35, osName: 'Android', osVersion: '15', hl: 'en', gl: 'IN' } } },
    apiKey: 'AIzaSyA8eiZmM1FaDVjRy-df2KTyQ_vz_yYM39w', cn: '3',
    ua: 'com.google.android.youtube/20.10.38 (Linux; U; Android 15) gzip' },
  { name: 'ANDROID_VR-1.64', body: { context: { client: { clientName: 'ANDROID_VR', clientVersion: '1.64.62', deviceMake: 'Oculus', deviceModel: 'Quest 3', osName: 'Android', osVersion: '12L', androidSdkVersion: 32, hl: 'en', gl: 'IN' } } },
    apiKey: 'AIzaSyA8eiZmM1FaDVjRy-df2KTyQ_vz_yYM39w', cn: '63',
    ua: 'com.google.android.apps.youtube.vr.oculus/1.64.62 (Linux; U; Android 12L; eureka-user Build/SQ3A.220605.009.A1) gzip' },
  { name: 'TVEMBED-2.0-new', body: { context: { client: { clientName: 'TVHTML5_SIMPLY_EMBEDDED_PLAYER', clientVersion: '7.20250312.16.00', hl: 'en', gl: 'IN' } } },
    apiKey: 'AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8', cn: '85',
    ua: 'Mozilla/5.0 (PlayStation; PlayStation 4/12.00) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Safari/605.1.15' },
  { name: 'ANDROID_MUSIC-7', body: { context: { client: { clientName: 'ANDROID_MUSIC', clientVersion: '7.27.50', androidSdkVersion: 35, osName: 'Android', osVersion: '15', hl: 'en', gl: 'IN' } } },
    apiKey: 'AIzaSyC9XL3ZjWddXya6X74dJoCTL-WEYFDNX30', cn: '21',
    ua: 'com.google.android.apps.youtube.music/7.27.50 (Linux; U; Android 15) gzip' },
  { name: 'ANDROID_TESTSUITE-new', body: { context: { client: { clientName: 'ANDROID_TESTSUITE', clientVersion: '1.10', androidSdkVersion: 35, osName: 'Android', osVersion: '15', hl: 'en', gl: 'IN' } } },
    apiKey: 'AIzaSyA8eiZmM1FaDVjRy-df2KTyQ_vz_yYM39w', cn: '30',
    ua: 'com.google.android.youtube/1.10 (Linux; U; Android 15) gzip' },
];
for (const c of CLIENTS) {
  try {
    const res = await fetch(`${YTI}/player?key=${c.apiKey}&prettyPrint=false`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'User-Agent': c.ua, 'X-YouTube-Client-Name': c.cn, 'X-YouTube-Client-Version': c.body.context.client.clientVersion },
      body: JSON.stringify({ videoId: VID, contentCheckOk: true, racyCheckOk: true, ...c.body }),
    });
    const j = await res.json().catch(() => null);
    const st = j?.playabilityStatus?.status;
    const reason = j?.playabilityStatus?.reason ?? '';
    const fmts = j?.streamingData?.adaptiveFormats ?? [];
    const withUrl = fmts.filter(f => typeof f.url === 'string').length;
    const audio = fmts.filter(f => (f.mimeType ?? '').startsWith('audio/'));
    const audioUrl = audio.filter(f => f.url);
    const visitor = j?.responseContext?.visitorData ?? '';
    console.log(`${c.name.padEnd(22)} http:${res.status} status:${String(st).padEnd(14)} fmts:${String(fmts.length).padStart(3)} url:${String(withUrl).padStart(3)} audioUrl:${String(audioUrl.length).padStart(2)} ${reason.slice(0, 50)}`);
    if (audioUrl.length > 0) {
      const best = audioUrl.sort((a, b) => (b.bitrate ?? 0) - (a.bitrate ?? 0))[0];
      console.log(`  └─ best audio: itag ${best.itag} ${(best.mimeType ?? '').split(';')[0]} ${best.bitrate}bps → ${String(best.url).slice(0, 90)}...`);
    }
  } catch (e) { console.log(`${c.name.padEnd(22)} THREW ${String(e).slice(0, 50)}`); }
}
