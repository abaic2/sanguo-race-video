# -*- coding: utf-8 -*-
"""统计诊断：别名冲突、各别名贡献、可疑别名的上下文抽样"""
import importlib.util
from collections import defaultdict

spec = importlib.util.spec_from_file_location("an", "scripts/analyze.py")
an = importlib.util.module_from_spec(spec)
spec.loader.exec_module(an)

CA = an.CHARACTER_ALIASES
text = open("data/sanguoyanyi.txt", encoding="utf-8").read()
for a, b in an.TEXT_FIX.items():
    text = text.replace(a, b)

d = defaultdict(list)
for p, (st, al) in CA.items():
    for a in al:
        d[a].append(p)
print("== 别名冲突（同一别名映射到多人，后者覆盖前者）==")
for a, ps in d.items():
    if len(ps) > 1:
        print("  ", a, "->", ps)

print("\n== 主要人物别名贡献明细（裸计数，含重叠）==")
for name in ["刘备", "诸葛亮", "曹操", "关羽", "孙权", "赵云", "张飞", "吕布",
             "周瑜", "魏延", "司马懿", "姜维", "袁绍", "刘禅", "徐晃"]:
    st, als = CA[name]
    parts = []
    tot = 0
    for a in sorted(als, key=lambda x: -len(x)):
        n = text.count(a)
        tot += n
        if n:
            parts.append(f"{a}:{n}")
    print(f"{name}({st or '-'}) 合计{tot} | " + " ".join(parts))

print("\n== 可疑裸字号上下文抽样（每词 8 条）==")
for w in ["文长", "公明", "文远", "文和", "子建", "仲康", "伯约", "兴霸", "公覆",
          "德谋", "子布", "德润", "元直", "子敬", "仲颖", "公路", "本初", "奉先"]:
    hits = [m.start() for m in __import__("re").finditer(w, text)]
    print(f"\n--- {w}  共 {len(hits)} 次 ---")
    for s in hits[:8]:
        print("   ", text[max(0, s - 16):s + len(w) + 10].replace("\n", ""))
