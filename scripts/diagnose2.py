# -*- coding: utf-8 -*-
"""裸字号误合抽查：打印每个裸别名的匹配上下文，识别跨词误判"""
import re
import importlib.util

spec = importlib.util.spec_from_file_location("an", "scripts/analyze.py")
an = importlib.util.module_from_spec(spec)
spec.loader.exec_module(an)

text = open("data/sanguoyanyi.txt", encoding="utf-8").read()
for a, b in an.TEXT_FIX.items():
    text = text.replace(a, b)

WORDS = ["公路", "文举", "正平", "元龙", "子鱼", "景兴", "孔璋", "德操", "子师", "公台",
         "元直", "仲颖", "文远", "仲康", "子孝", "子廉", "子丹", "元让", "仲德", "奉孝",
         "公达", "文若", "子建", "公明", "文长", "本初", "奉先", "伯言", "子明", "兴霸",
         "魏延", "玄德", "孟起", "士元", "汉升", "子义", "公覆", "子敬", "仲谋", "伯符"]

for w in WORDS:
    hits = [m.start() for m in re.finditer(w, text)]
    print(f"\n### {w}  x{len(hits)}")
    for s in hits[:4]:
        print("   ..." + text[max(0, s - 14):s + len(w) + 8].replace("\n", "") + "...")
