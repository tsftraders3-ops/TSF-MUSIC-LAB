/**
 * Metro config — web-only module redirects for the screenshot harness.
 *
 * On platform 'web' the data + player layers resolve to src/webmocks/*
 * (fixtures + an in-memory player). The Android build (expo export
 * --platform android / CI) is 100% unaffected: every branch below is
 * gated on platform === 'web'.
 */

const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;

const WEB_MODULE_ALIASES = {
  'react-native-track-player': path.join(projectRoot, 'src/webmocks/trackPlayer.ts'),
  'expo-file-system': path.join(projectRoot, 'src/webmocks/fileSystem.ts'),
};

const WEB_PATH_REDIRECTS = [
  { suffix: path.join('src', 'api', 'saavn.ts'), to: path.join(projectRoot, 'src/webmocks/saavn.ts') },
  { suffix: path.join('src', 'api', 'music.ts'), to: path.join(projectRoot, 'src/webmocks/music.ts') },
];

module.exports = (async () => {
  const config = await getDefaultConfig(projectRoot);

  config.resolver.resolveRequest = (context, moduleName, platform) => {
    if (platform === 'web' && WEB_MODULE_ALIASES[moduleName]) {
      return context.resolveRequest(
        context,
        WEB_MODULE_ALIASES[moduleName],
        platform,
      );
    }

    const defaultResult = context.resolveRequest(context, moduleName, platform);

    if (
      platform === 'web' &&
      defaultResult &&
      defaultResult.type === 'sourceFile' &&
      defaultResult.filePath
    ) {
      for (const redirect of WEB_PATH_REDIRECTS) {
        if (defaultResult.filePath.endsWith(redirect.suffix)) {
          return context.resolveRequest(context, redirect.to, platform);
        }
      }
    }

    return defaultResult;
  };

  return config;
})();
