// Per-client player-endpoint diagnosis for videoId vl8YTnx3gso
const YTI = 'https://www.youtube.com/youtubei/v1';
const CLIENTS = [
  { name: 'IOS', clientName: 'IOS', clientVersion: '19.09.3', apiKey: 'AIzaSyB-63vPrdThhKuerbB2N_l7Kwwcxj6yUAc',
    ua: 'com.google.ios.youtube/19.09.3 (iPhone14,3; U; CPU iOS 15_6 like Mac OS X)', extra: { deviceMake: 'Apple', deviceModel: 'iPhone14,3', osName: 'iPhone', osVersion: '15.6.0.19G71' } },
  { name: 'ANDROID', clientName: 'ANDROID', clientVersion: '19.09.37', apiKey: 'AIzaSyA8eiZmM1FaDVjRy-df2KTyQ_vz_yYM39w',
    ua: 'com.google.android.youtube/19.09.37 (Linux; U; Android 11) gzip', extra: { androidSdkVersion: 30, osName: 'Android', osVersion: '11' } },
  { name: 'ANDROID_VR', clientName: 'ANDROID_VR', clientVersion: '1.60.19', apiKey: 'AIzaSyA8eiZmM1FaDVjRy-df2KTyQ_vz_yYM39w',
    ua: 'com.google.android.apps.youtube.vr.oculus/1.60.19 (Linux; U; Android 12; eureka-user Build/SQ3A.220605.009.A1) gzip', extra: { deviceMake: 'Oculus', deviceModel: 'Quest 3', osName: 'Android', osVersion: '12', androidSdkVersion: 32 } },
  { name: 'ANDROID_MUSIC', clientName: 'ANDROID_MUSIC', clientVersion: '6.42.52', apiKey: 'AIzaSyC9XL3ZjWddXya6X74dJoCTL-WEYFDNX30',
    ua: 'com.google.android.apps.youtube.music/6.42.52 (Linux; U; Android 11) gzip', extra: { androidSdkVersion: 30, osName: 'Android', osVersion: '11' } },
  { name: 'ANDROID_TESTSUITE', clientName: 'ANDROID_TESTSUITE', clientVersion: '1.9', apiKey: 'AIzaSyA8eiZmM1FaDVjRy-df2KTyQ_vz_yYM39w',
    ua: 'com.google.android.youtube/1.9 (Linux; U; Android 11) gzip', extra: { androidSdkVersion: 30, osName: 'Android', osVersion: '11' } },
  { name: 'TVHTML5_SIMPLY_EMBEDDED', clientName: 'TVHTML5_SIMPLY_EMBEDDED_PLAYER', clientVersion: '2.0', apiKey: 'AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8',
    ua: 'Mozilla/5.0 (PlayStation; PlayStation 4/12.00) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Safari/605.1.15', extra: {} },
  { name: 'MWEB', clientName: 'MWEB', clientVersion: '2.20240726.01.00', apiKey: 'AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8',
    ua: 'Mozilla/5.0 (iPad; CPU OS 16_7_10 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1', extra: {} },
  { name: 'WEB_REMIX', clientName: 'WEB_REMIX', clientVersion: '1.20240403.01.00', apiKey: 'AIzaSyC9XL3ZjWddXya6X74dJoCTL-WEYFDNX30',
    ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124.0 Safari/537.36', extra: {} },
];
const cname = { WEB: '1', MWEB: '2', ANDROID: '3', IOS: '5', TVHTML5: '7', TVHTML5_SIMPLY_EMBEDDED_PLAYER: '85', WEB_REMIX: '67', ANDROID_VR: '63', ANDROID_TESTSUITE: '30', ANDROID_MUSIC: '21' };
const VID = 'vl8YTnx3gso';
for (const c of CLIENTS) {
  try {
    const res = await fetch(`${YTI}/player?key=${c.apiKey}&prettyPrint=false`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'User-Agent': c.ua, 'X-YouTube-Client-Name': cname[c.clientName] ?? '1', 'X-YouTube-Client-Version': c.clientVersion },
      body: JSON.stringify({ videoId: VID, contentCheckOk: true, racyCheckOk: true, context: { client: { clientName: c.clientName, clientVersion: c.clientVersion, hl: 'en', gl: 'IN', ...c.extra } } }),
    });
    const j = await res.json().catch(() => null);
    const st = j?.playabilityStatus?.status;
    const reason = j?.playabilityStatus?.reason ?? '';
    const fmts = j?.streamingData?.adaptiveFormats ?? [];
    const withUrl = fmts.filter(f => typeof f.url === 'string').length;
    const withSig = fmts.filter(f => f.signatureCipher || f.cipher).length;
    const audio = fmts.filter(f => (f.mimeType ?? '').startsWith('audio/'));
    const audioUrl = audio.filter(f => f.url);
    console.log(`${c.name.padEnd(24)} http:${res.status} status:${String(st).padEnd(14)} fmts:${String(fmts.length).padStart(3)} url:${String(withUrl).padStart(3)} sig:${String(withSig).padStart(3)} audio:${String(audio.length).padStart(3)} audioUrl:${String(audioUrl.length).padStart(3)} ${reason.slice(0, 60)}`);
  } catch (e) {
    console.log(`${c.name.padEnd(24)} THREW ${String(e).slice(0, 60)}`);
  }
}
