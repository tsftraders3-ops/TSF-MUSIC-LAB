#!/usr/bin/env node
/**
 * Patch the Expo-generated android/app/build.gradle for CI release
 * signing (keystore from GitHub Secrets, never committed) and for a
 * deterministic build (proguard off — pure-JS app, no shrinking needed).
 *
 * Usage: node ci/patch-android-signing.mjs
 * Build passes gradle properties:
 *   -PTSF_RELEASE_STORE_FILE=tsf-release.keystore
 *   -PTSF_RELEASE_STORE_PASSWORD=...
 *   -PTSF_RELEASE_KEY_ALIAS=...
 *   -PTSF_RELEASE_KEY_PASSWORD=...
 */

import { readFileSync, writeFileSync } from 'node:fs';

const p = 'android/app/build.gradle';
let g = readFileSync(p, 'utf8');
let changed = false;

// 1. Inject a release signingConfig that reads gradle properties.
if (!g.includes('tsf-release.keystore')) {
  const signingBlock = `signingConfigs {
    release {
      if (project.hasProperty('TSF_RELEASE_STORE_FILE')) {
        storeFile file(project.property('TSF_RELEASE_STORE_FILE'))
        storePassword project.property('TSF_RELEASE_STORE_PASSWORD')
        keyAlias project.property('TSF_RELEASE_KEY_ALIAS')
        keyPassword project.property('TSF_RELEASE_KEY_PASSWORD')
      }
    }
  }
`;
  const idx = g.indexOf('buildTypes {');
  if (idx === -1) {
    console.error('PATCH FAILED: buildTypes block not found');
    process.exit(1);
  }
  g = g.slice(0, idx) + signingBlock + g.slice(idx);
  changed = true;
}

// 2. Point the RELEASE buildType (and only it) at the release signingConfig.
//    Careful: the Expo template also has `signingConfig signingConfigs.debug`
//    inside the debug buildType — a global replace would swap the wrong one
//    and silently sign releases with the debug key.
const releaseBlockRe = /(buildTypes\s*\{[\s\S]*?release\s*\{[\s\S]*?signingConfig\s+)signingConfigs\.debug/;
if (releaseBlockRe.test(g)) {
  g = g.replace(releaseBlockRe, '$1signingConfigs.release');
  changed = true;
} else if (!/buildTypes\s*\{[\s\S]*?release\s*\{[\s\S]*?signingConfig signingConfigs\.release/.test(g)) {
  // Template variant without any signingConfig in release — inject it.
  g = g.replace(/(buildTypes\s*\{[\s\S]*?release\s*\{)/, '$1\n        signingConfig signingConfigs.release');
  changed = true;
}

// 3. Disable code shrinking for deterministic builds (pure-JS app).
if (g.includes('minifyEnabled true')) {
  g = g.replace('minifyEnabled true', 'minifyEnabled false');
  changed = true;
}
if (g.includes('shrinkResources true')) {
  g = g.replace('shrinkResources true', 'shrinkResources false');
  changed = true;
}
if (g.includes('enableProguardInReleaseBuilds true')) {
  g = g.replace('enableProguardInReleaseBuilds true', 'enableProguardInReleaseBuilds false');
  changed = true;
}

if (changed) {
  writeFileSync(p, g);
  console.log('PATCHED android/app/build.gradle (signing + no-shrink)');
} else {
  console.log('NO CHANGES needed (already patched)');
}

// 4. Sanity check: release MUST reference signingConfigs.release,
//    debug MUST still reference signingConfigs.debug.
const buildTypes = g.slice(g.indexOf('buildTypes {'));
const dbg = /debug\s*\{[\s\S]*?signingConfig signingConfigs\.debug/.test(buildTypes);
const rel = /release\s*\{[\s\S]*?signingConfig signingConfigs\.release/.test(buildTypes);
if (!dbg || !rel) {
  console.error(`SANITY FAILED: debug→${dbg ? 'debug ✓' : 'WRONG'}, release→${rel ? 'release ✓' : 'WRONG'}`);
  process.exit(1);
}
console.log('SANITY OK: debug→debug, release→release');
