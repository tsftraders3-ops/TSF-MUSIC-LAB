/**
 * WEB MOCK of react-native-webview — the PO-token minter bridge is a
 * native-only surface; on web it renders nothing. Metro redirects only
 * for platform=web (screenshot harness).
 */

import type { ComponentType } from 'react';

const WebView: ComponentType<any> = () => null;
export default WebView;
