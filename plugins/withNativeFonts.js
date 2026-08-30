/**
 * withNativeFonts — bulletproof font delivery (v3.4.0-lab.5).
 *
 * WHY: the lab.4 field report showed search/player text falling back to
 * the device system font (handwritten Samsung theme font) — the JS-side
 * `Font.loadAsync` gate is a runtime dependency that can fail, and the
 * app renders EVERYTHING with `fontFamily: 'Figtree-*'` names that then
 * resolve to the system fallback.
 *
 * WHAT: copies the bundled TTFs into the generated native project during
 * prebuild — `android/app/src/main/assets/fonts/<name>.ttf`. React
 * Native's Android font resolver answers `fontFamily: 'Figtree-500'`
 * from that folder NATIVELY, from the very first frame, with zero JS
 * involvement — the same names keep working and the load can never
 * regress to a system font. (expo-font's loadAsync stays for web
 * surfaces; on Android it becomes a no-op.)
 *
 * Note: this MUST be a config plugin — CI regenerates android/ via
 * `expo prebuild` on every build, so hand-copies would be lost.
 */

const { withDangerousMod } = require('expo/config-plugins');
const fs = require('fs');
const path = require('path');

function withNativeFonts(config) {
  return withDangerousMod(config, [
    'android',
    async (config) => {
      const srcDir = path.join(config.modRequest.projectRoot, 'assets', 'fonts');
      const outDir = path.join(
        config.modRequest.platformProjectRoot,
        'app',
        'src',
        'main',
        'assets',
        'fonts',
      );
      if (!fs.existsSync(srcDir)) return config;
      fs.mkdirSync(outDir, { recursive: true });
      for (const f of fs.readdirSync(srcDir)) {
        if (!/\.(ttf|otf)$/i.test(f)) continue;
        fs.copyFileSync(path.join(srcDir, f), path.join(outDir, f));
      }
      return config;
    },
  ]);
}

module.exports = withNativeFonts;
