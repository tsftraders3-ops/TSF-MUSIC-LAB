// Default TSF server the native shell launcher tries to reach.
// CI (android.yml) overwrites this file with the TSF_SERVER_URL secret
// (or the workflow_dispatch input) at build time. Local dev default = Mac LAN.
window.__TSF_DEFAULT_SERVER__ = "http://10.125.110.1:3000";
