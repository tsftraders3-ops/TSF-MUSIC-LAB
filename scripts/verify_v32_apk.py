#!/usr/bin/env python3
"""Deep-verify the shipped v3.2.0 APK: versionName, bundle markers,
webmocks-leak check."""
import re
import subprocess
import sys
import urllib.request

URL = "https://github.com/mua47105-hue/TSF-MUSIC/releases/download/v3.2.0/app-release.apk"
OUT = "/home/z/my-project/scripts/app-release-v32.apk"

urllib.request.urlretrieve(URL, OUT)
print("downloaded")

# follow the CI rename convention (assets/index.android.bundle inside APK)
subprocess.run(["unzip", "-o", "-q", OUT, "assets/index.android.bundle", "-d", "scripts/apk32"], check=True)
bundle = open("scripts/apk32/assets/index.android.bundle", "rb").read()
text = bundle.decode("utf-8", "replace")

# manifest versionName via UTF-16 probe
subprocess.run(["unzip", "-o", "-q", OUT, "AndroidManifest.xml", "-d", "scripts/apk32"], check=True)
man = open("scripts/apk32/AndroidManifest.xml", "rb").read()
utf16 = man.decode("utf-16-le", "replace")
m = re.search(r"3\.2\.0", utf16)
print("manifest versionName 3.2.0:", "PASS" if m else "FAIL")

markers = [
    "What's your name?",
    "Choose 3 or more artists you like.",
    "Arijit_Singh_004_20241118063717",
    "getArtistPageDetails",
    "content.getHomepageData",
    "Popular artists",
    "New releases",
    "Featured playlists",
    "tsf.onboardingDone",
    "tsf.onboardingProgress",
    "Top result",
    "Made for ",
]
fails = 0
for mk in markers:
    ok = mk in text
    fails += 0 if ok else 1
    print(("PASS" if ok else "FAIL"), repr(mk))
print("webmocks leak:", "LEAKED" if "webmocks" in text.lower() else "CLEAN")
print("bundle MB:", round(len(bundle) / 1e6, 2))
sys.exit(1 if fails or "webmocks" in text.lower() or not m else 0)
