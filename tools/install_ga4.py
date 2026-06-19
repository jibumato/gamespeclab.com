#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""GA4 gtag.js(G-FZRP7SHMG7)を全ページに設置する(冪等).

GTM(End Google Tag Manager)の直後、無ければ<head>直後に挿入する。
"""
import glob
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
GA4_ID = "G-FZRP7SHMG7"

GA4 = (
    "    <!-- Google tag (gtag.js) -->\n"
    '    <script async src="https://www.googletagmanager.com/gtag/js?id=' + GA4_ID + '"></script>\n'
    "    <script>\n"
    "      window.dataLayer = window.dataLayer || [];\n"
    "      function gtag(){dataLayer.push(arguments);}\n"
    "      gtag('js', new Date());\n"
    "      gtag('config', '" + GA4_ID + "');\n"
    "    </script>\n"
)

END_GTM = "    <!-- End Google Tag Manager -->\n"


def run(path):
    s = open(path, encoding="utf-8").read()
    if GA4_ID in s:
        return False
    if END_GTM in s:
        s = s.replace(END_GTM, END_GTM + GA4, 1)
    else:
        s = s.replace("  <head>\n", "  <head>\n" + GA4, 1)
    open(path, "w", encoding="utf-8").write(s)
    return True


if __name__ == "__main__":
    n = sum(run(p) for p in glob.glob(os.path.join(ROOT, "*.html")))
    print("GA4 installed on:", n, "files")
