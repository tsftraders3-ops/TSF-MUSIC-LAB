/**
 * TSF Music — LAUNCHER SHELL E2E (the fix for the black-screen crash)
 * ---------------------------------------------------------------------------
 * Verifies the new local-first launcher that ships INSIDE the APK:
 *
 *   A. auto-connect   : launcher finds the server via server-default.js
 *                       and navigates the WebView to it.
 *   B. server offline : launcher shows the friendly failure screen (never a
 *                       black void); manual entry connects + saves the URL.
 *   C. saved override : a user-saved URL (localStorage) wins over the baked
 *                       default.
 *
 * Setup: a static server serves a TEMP COPY of mobile-shell/ (with the
 * default URL pointed at the port under test) so the repo files are never
 * mutated. A mock TSF server answers /api/health with CORS headers, mimicking
 * the real server.
 *
 * Usage: bun scripts/verify-launcher.ts
 */
import { chromium, devices } from 'playwright'
import http from 'http'
import fs from 'fs'
import path from 'path'

const LAUNCHER_PORT = 4591
const MOCK_PORT = 4592
const DEAD_PORT = 4593 // nothing listens here — "server is down"

let pass = 0
let fail = 0
const results: string[] = []
function ok(name: string, cond: boolean, extra = '') {
  if (cond) { pass++; results.push(`  PASS  ${name}${extra ? ' — ' + extra : ''}`) }
  else { fail++; results.push(`  FAIL  ${name}${extra ? ' — ' + extra : ''}`) }
}

// ── static file server for the launcher copy ───────────────────────────────
function serveStatic(dir: string, port: number): Promise<void> {
  return new Promise((resolve) => {
    const srv = http.createServer((req, res) => {
      const file = req.url === '/' || req.url!.startsWith('/?') ? 'index.html' : req.url!.split('?')[0]
      const p = path.join(dir, file)
      if (fs.existsSync(p) && fs.statSync(p).isFile()) {
        res.writeHead(200, { 'Content-Type': file.endsWith('.js') ? 'application/javascript' : 'text/html' })
        res.end(fs.readFileSync(p))
      } else {
        res.writeHead(404).end('not found')
      }
    })
    srv.listen(port, '127.0.0.1', () => resolve())
    ;(globalThis as any).__srv = srv
  })
}

// ── mock TSF server (CORS-enabled /api/health) ────────────────────────────
function serveMock(port: number): Promise<void> {
  return new Promise((resolve) => {
    const srv = http.createServer((req, res) => {
      const url = req.url!.split('?')[0]
      if (url === '/api/health') {
        res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
        res.end(JSON.stringify({ ok: true, ytdlp: { available: true }, time: new Date().toISOString() }))
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end('<html><body><h1 id="mockapp">TSF APP MOCK</h1></body></html>')
      }
    })
    srv.listen(port, '127.0.0.1', () => resolve())
    ;(globalThis as any).__mock = srv
  })
}

// ── make a temp copy of mobile-shell with a custom default URL ────────────
function launcherCopy(defaultUrl: string): string {
  const dir = fs.mkdtempSync('/tmp/tsf-launcher-')
  for (const f of fs.readdirSync('/home/z/my-project/mobile-shell')) {
    fs.copyFileSync(path.join('/home/z/my-project/mobile-shell', f), path.join(dir, f))
  }
  fs.writeFileSync(path.join(dir, 'server-default.js'), `window.__TSF_DEFAULT_SERVER__ = "${defaultUrl}";\n`)
  return dir
}

async function main() {
  await serveMock(MOCK_PORT)
  const browser = await chromium.launch()
  const ctxBase = await browser.newContext({ ...devices['Pixel 7'] })

  // ══ TEST A: auto-connect via baked default ═════════════════════════════
  {
    const dir = launcherCopy(`http://127.0.0.1:${MOCK_PORT}`)
    await serveStatic(dir, LAUNCHER_PORT)
    const ctx = await ctxBase.browser()!.newContext({ ...devices['Pixel 7'] })
    const page = await ctx.newPage()
    const errors: string[] = []
    page.on('pageerror', (e) => errors.push(String(e)))
    await page.goto(`http://127.0.0.1:${LAUNCHER_PORT}/`, { waitUntil: 'domcontentloaded' })
    // First paint must be instant + branded (never black)
    ok('A1 launcher renders instantly', await page.locator('h1:has-text("TSF Music")').isVisible({ timeout: 3000 }))
    // It should navigate to the mock server
    await page.waitForURL(`**127.0.0.1:${MOCK_PORT}**`, { timeout: 10000 })
    ok('A2 navigated to server', page.url().startsWith(`http://127.0.0.1:${MOCK_PORT}`), page.url())
    await page.waitForSelector('#mockapp', { timeout: 5000 })
    ok('A3 server app rendered in-webview', true)
    ok('A4 zero page errors', errors.length === 0, errors.join(' | '))
    await page.screenshot({ path: '/home/z/my-project/upload/launcher-a-connected.png' })
    await ctx.close()
  }

  // ══ TEST B: server down → friendly failure + manual connect ════════════
  {
    const dir = launcherCopy(`http://127.0.0.1:${DEAD_PORT}`)
    await serveStatic(dir, LAUNCHER_PORT + 10)
    const ctx = await ctxBase.browser()!.newContext({ ...devices['Pixel 7'] })
    const page = await ctx.newPage()
    const errors: string[] = []
    page.on('pageerror', (e) => errors.push(String(e)))
    await page.goto(`http://127.0.0.1:${LAUNCHER_PORT + 10}/`, { waitUntil: 'domcontentloaded' })
    await page.locator('h1:has-text("TSF Music")').waitFor({ timeout: 3000 })
    // Failure card should appear (probe fails fast on refused connections)
    await page.locator('#failCard').waitFor({ state: 'visible', timeout: 12000 })
    ok('B1 failure screen shown (no black void)', true)
    ok('B2 checklist visible', await page.locator('.checklist').isVisible())
    ok('B3 dead server row marked unreachable', (await page.locator('#failRows').innerText()).includes('unreachable'))
    ok('B4 auto-retry countdown present', (await page.locator('#countdown').innerText()).includes('Auto-retry'))
    await page.screenshot({ path: '/home/z/my-project/upload/launcher-b-failed.png' })
    // Manual entry → connect to the LIVE mock
    await page.fill('#manualInput', `127.0.0.1:${MOCK_PORT}`)
    await page.click('#connectBtn')
    await page.waitForURL(`**127.0.0.1:${MOCK_PORT}**`, { timeout: 10000 })
    ok('B5 manual entry connected', page.url().startsWith(`http://127.0.0.1:${MOCK_PORT}`), page.url())
    // Relaunch the launcher in the SAME context (same storage): the baked
    // default points at a dead port, so reaching the mock is only possible
    // via the saved URL — proves persistence + auto-reuse.
    const p2 = await ctx.newPage()
    await p2.goto(`http://127.0.0.1:${LAUNCHER_PORT + 10}/`, { waitUntil: 'commit' })
    // Read storage on the LAUNCHER origin before the script navigates away.
    const saved = await p2.evaluate(() => localStorage.getItem('tsf-server-url'))
    ok('B6 manual URL persisted', saved === `http://127.0.0.1:${MOCK_PORT}`, String(saved))
    await p2.waitForURL(`**127.0.0.1:${MOCK_PORT}**`, { timeout: 10000 })
    ok('B7 saved URL auto-reused on relaunch', p2.url().startsWith(`http://127.0.0.1:${MOCK_PORT}`), p2.url())
    ok('B8 zero page errors', errors.length === 0, errors.join(' | '))
    await ctx.close()
  }

  // ══ TEST C: saved URL (localStorage) beats baked default ═══════════════
  {
    const dir = launcherCopy(`http://127.0.0.1:${DEAD_PORT}`) // default = dead
    await serveStatic(dir, LAUNCHER_PORT + 20)
    const ctx = await ctxBase.browser()!.newContext({ ...devices['Pixel 7'] })
    await ctx.addInitScript(`localStorage.setItem('tsf-server-url', 'http://127.0.0.1:${MOCK_PORT}')`)
    const page = await ctx.newPage()
    const errors: string[] = []
    page.on('pageerror', (e) => errors.push(String(e)))
    await page.goto(`http://127.0.0.1:${LAUNCHER_PORT + 20}/`, { waitUntil: 'domcontentloaded' })
    await page.waitForURL(`**127.0.0.1:${MOCK_PORT}**`, { timeout: 10000 })
    ok('C1 saved-override navigated to live server', page.url().startsWith(`http://127.0.0.1:${MOCK_PORT}`), page.url())
    ok('C2 zero page errors', errors.length === 0, errors.join(' | '))
    await ctx.close()
  }

  await browser.close()
  ;((globalThis as any).__srv as http.Server)?.close()
  ;((globalThis as any).__mock as http.Server)?.close()

  console.log('\n══ LAUNCHER E2E RESULTS ══')
  results.forEach((r) => console.log(r))
  console.log(`\n${pass} passed, ${fail} failed`)
  process.exit(fail > 0 ? 1 : 0)
}

main().catch((e) => { console.error(e); process.exit(1) })
