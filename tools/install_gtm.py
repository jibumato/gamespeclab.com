#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Google Tag Manager(GTM-TVV88Q6L)を全ページに設置する(冪等).

GTMは head 内のスクリプトと、body 直後の noscript の2点が必要。
既に設置済みのページはスキップする。
"""
import glob
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
GTM_ID = "GTM-TVV88Q6L"

HEAD = (
    "    <!-- Google Tag Manager -->\n"
    "    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':\n"
    "    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],\n"
    "    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=\n"
    "    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);\n"
    "    })(window,document,'script','dataLayer','" + GTM_ID + "');</script>\n"
    "    <!-- End Google Tag Manager -->\n"
)

NOSCRIPT = (
    "\n    <!-- Google Tag Manager (noscript) -->\n"
    '    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=' + GTM_ID + '"\n'
    '    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>\n'
    "    <!-- End Google Tag Manager (noscript) -->"
)


def run(path):
    s = open(path, encoding="utf-8").read()
    if GTM_ID in s:
        return False
    # head: 最初の <head> 直後に挿入
    s = s.replace("  <head>\n", "  <head>\n" + HEAD, 1)
    # body: <body...> 直後に noscript
    s = re.sub(r"<body[^>]*>", lambda m: m.group(0) + NOSCRIPT, s, count=1)
    open(path, "w", encoding="utf-8").write(s)
    return True


if __name__ == "__main__":
    n = sum(run(p) for p in glob.glob(os.path.join(ROOT, "*.html")))
    print("GTM installed on:", n, "files")
