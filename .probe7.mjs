const VID = 'vl8YTnx3gso';
const YTI_GOOGLE = 'https://youtubei.googleapis.com/youtubei/v1';
const YTI_WWW = 'https://www.youtube.com/youtubei/v1';

// Step 0: get visitorData (VISIONOS context)
async function getVisitor() {
  const res = await fetch(`${YTI_GOOGLE}/visitor_id?prettyPrint=false`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'User-Agent': 'com.google.visionos.youtube/1.04(RealityDevice17,1; U; CPU visionOS 26_6_0 like Mac OS X; IN)', 'X-Goog-Api-Format-Version': '2' },
    body: JSON.stringify({ context: { client: { clientName: 'VISIONOS', clientVersion: '1.04', deviceMake: 'Apple', deviceModel: 'RealityDevice17,1', osName: 'visionOS', osVersion: '26.6.0.23O770', hl: 'en', gl: 'IN' } } }),
  });
  const j = await res.json().catch(() => null);
  return { visitor: j?.responseContext?.visitorData ?? '', status: res.status };
}
const { visitor, status: vstat } = await getVisitor();
console.log('visitor_id:', vstat, '→', visitor ? visitor.slice(0, 24) + '…' : '(none)');

async function probe(label, url, headers, body) {
  try {
    const res = await fetch(url, { method: 'POST', headers, body: JSON.stringify(body) });
    const j = await res.json().catch(() => null);
    const st = j?.playabilityStatus?.status;
    const reason = j?.playabilityStatus?.reason ?? '';
    const fmts = j?.streamingData?.adaptiveFormats ?? [];
    const audioUrl = fmts.filter(f => (f.mimeType ?? '').startsWith('audio/') && typeof f.url === 'string');
    console.log(`${label.padEnd(26)} http:${res.status} status:${String(st).padEnd(14)} fmts:${String(fmts.length).padStart(3)} audioUrl:${String(audioUrl.length).padStart(2)} ${reason.slice(0, 45)}`);
    if (audioUrl.length > 0) {
      const best = audioUrl.sort((a, b) => (b.bitrate ?? 0) - (a.bitrate ?? 0))[0];
      console.log(`  └─ itag ${best.itag} ${(best.mimeType ?? '').split(';')[0]} ${(best.bitrate ?? 0)}bps`);
      // RANGE-VERIFY the URL actually serves audio bytes
      const head = await fetch(best.url, { headers: { Range: 'bytes=0-1023' } }).catch((e) => null);
      if (head) {
        const buf = await head.arrayBuffer().catch(() => null);
        console.log(`  └─ CDN range GET: ${head.status} ${head.headers.get('content-type') ?? ''} len=${buf ? buf.byteLength : 0} ${head.headers.get('content-range') ?? ''}`);
      }
    }
    return j;
  } catch (e) { console.log(`${label.padEnd(26)} THREW ${String(e).slice(0, 50)}`); }
}

const uaNative = 'com.google.visionos.youtube/1.04(RealityDevice17,1; U; CPU visionOS 26_6_0 like Mac OS X; IN)';
const uaSafari = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 15_7_3) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.0 Safari/605.1.15';

// VISIONOS 1.04 NewPipe-style (native UA, format-version 2, googleapis host)
await probe('VISIONOS-1.04-native', `${YTI_GOOGLE}/player?prettyPrint=false`, {
  'Content-Type': 'application/json', 'User-Agent': uaNative, 'X-Goog-Api-Format-Version': '2',
}, {
  videoId: VID, contentCheckOk: true, racyCheckOk: true,
  context: { client: { clientName: 'VISIONOS', clientVersion: '1.04', clientScreen: 'WATCH', visitorData: visitor, deviceMake: 'Apple', deviceModel: 'RealityDevice17,1', osName: 'visionOS', osVersion: '26.6.0.23O770', hl: 'en', gl: 'IN' } },
});

// VISIONOS 1.02 yt-dlp-style (Safari UA, www host)
await probe('VISIONOS-1.02-safari', `${YTI_WWW}/player?prettyPrint=false`, {
  'Content-Type': 'application/json', 'User-Agent': uaSafari, 'X-Goog-Api-Format-Version': '2',
}, {
  videoId: VID, contentCheckOk: true, racyCheckOk: true,
  context: { client: { clientName: 'VISIONOS', clientVersion: '1.02', osName: 'visionOS', osVersion: '26.5.23O471', hl: 'en', gl: 'IN' } },
});

// WEB_EMBEDDED_PLAYER (id 56, tokenless per PO guide, needs thirdParty embedUrl)
await probe('WEB_EMBEDDED-reddit', `${YTI_WWW}/player?prettyPrint=false`, {
  'Content-Type': 'application/json', 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124.0 Safari/537.36', 'X-Goog-Api-Format-Version': '2',
}, {
  videoId: VID, contentCheckOk: true, racyCheckOk: true,
  context: { client: { clientName: 'WEB_EMBEDDED_PLAYER', clientVersion: '2.20260708.00.00', hl: 'en', gl: 'IN' }, thirdParty: { embedUrl: 'https://www.reddit.com/' } },
});
