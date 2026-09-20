# -*- coding: utf-8 -*-
"""定位可疑章节的可疑人名"""
import re
import importlib.util

spec = importlib.util.spec_from_file_location("an", "scripts/analyze.py")
an = importlib.util.module_from_spec(spec)
spec.loader.exec_module(an)

text = open("data/sanguoyanyi.txt", encoding="utf-8").read()
for a, b in an.TEXT_FIX.items():
    text = text.replace(a, b)
chapters = an.split_chapters(text)

def show(word, chi):
    body = chapters[chi - 1][2]
    hits = [m.start() for m in re.finditer(word, body)]
    print(f"\n### '{word}' 第{chi}回 x{len(hits)}")
    for s in hits[:6]:
        print("   ..." + body[max(0, s - 18):s + len(word) + 10].replace("\n", "") + "...")

for w in ["曹奂", "陈留王", "孙策", "孙伯符", "伯符", "小霸王"]:
    for ch in (5, 15, 29, 30, 120):
        show(w, ch)
