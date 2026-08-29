#!/usr/bin/env python3
"""Deep-verify the shipped v3.3.0 APK: versionName, bundle markers,
webmocks-leak check."""
import re
import subprocess
import sys
import urllib.request

URL = "https://github.com/mua47105-hue/TSF-MUSIC/releases/download/v3.3.0/app-release.apk"
OUT = "/tmp/app-release-v33.apk"

print("downloading APK...")
urllib.request.urlretrieve(URL, OUT)
import os
print(f"size: {os.path.getsize(OUT)/1024/1024:.1f} MB")

subprocess.run(["rm", "-rf", "/tmp/apk33"], check=True)
subprocess.run(["unzip", "-o", "-q", OUT, "assets/index.android.bundle", "AndroidManifest.xml", "-d", "/tmp/apk33"], check=True)

bundle = open("/tmp/apk33/assets/index.android.bundle", "rb").read()
text = bundle.decode("utf-8", "replace")

# manifest versionName via UTF-16 probe
subprocess.run(["unzip", "-o", "-q", OUT, "AndroidManifest.xml", "-d", "/tmp/apk33"], check=True)
man = open("/tmp/apk33/AndroidManifest.xml", "rb").read()
utf16 = man.decode("utf-16-le", "replace")
m = re.search(r"3\.3\.0", utf16)
print("manifest versionName 3.3.0:", "PASS" if m else "FAIL")

markers = [
    "searchLexicon", "getAutocomplete", "searchLyricByFragment",
    "lyricMatch", "Best guess", "LYRIC_MATCH", "YOUR_PAST_CLICK",
    "planSearch", "correctToken", "clusterKey", "Did you mean",
    "autocomplete.get",
    "lrclib", "versionCount",
]
ok = True
for mk in markers:
    present = mk in text
    ok = ok and present
    print(f"  marker {mk}: {'PASS' if present else 'FAIL'}")

leaks = ["webmocks", "searchFixtures", "__TsfMock", "SEARCH_EXTRA"]
clean = True
for l in leaks:
    leaked = l in text
    clean = clean and not leaked
    print(f"  leak {l}: {'!!! LEAKED !!!' if leaked else 'clean'}")

print("hbc size:", f"{len(bundle)/1024/1024:.2f} MB")
print("VERDICT:", "PASS" if (ok and clean and m) else "FAIL")
sys.exit(0 if (ok and clean and m) else 1)
