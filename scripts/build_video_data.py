# -*- coding: utf-8 -*-
"""
由 chapter_stats.json 生成视频端用的精简数据集 video/src/data/raceData.json
- 只保留"曾进入章节 Top12"的人物（保证任何时刻进榜者都有配色与数据）
- 附带 120 回的回目简称（供水印显示）
"""
import json
import os
from collections import defaultdict

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(BASE, "data", "chapter_stats.json")
OUT = os.path.join(BASE, "video", "src", "data", "raceData.json")

# ---------------------------------------------------------------- 回目简称表
SHORT_NAMES = {
    1: "桃园结义", 2: "怒鞭督邮", 3: "董卓叱丁原", 4: "孟德献刀", 5: "三英战吕布",
    6: "孙坚背约", 7: "磐河战公孙", 8: "连环计", 9: "吕布助司徒", 10: "曹操兴师",
    11: "北海救孔融", 12: "三让徐州", 13: "李郭大交兵", 14: "移驾幸许都", 15: "酣斗小霸王",
    16: "辕门射戟", 17: "袁术起七军", 18: "拔矢啖睛", 19: "白门楼殒命", 20: "许田打围",
    21: "煮酒论英雄", 22: "关张擒二将", 23: "祢衡骂贼", 24: "皇叔投袁绍", 25: "屯土山约三事",
    26: "挂印封金", 27: "千里走单骑", 28: "古城聚义", 29: "碧眼儿领江东", 30: "官渡之战",
    31: "仓亭破本初", 32: "夺冀州", 33: "辽东定计", 34: "跃马过檀溪", 35: "南漳逢隐沦",
    36: "走马荐诸葛", 37: "三顾茅庐", 38: "隆中决策", 39: "博望坡用兵", 40: "火烧新野",
    41: "单骑救主", 42: "大闹长坂桥", 43: "舌战群儒", 44: "智激周瑜", 45: "群英会",
    46: "草船借箭", 47: "巧授连环计", 48: "横槊赋诗", 49: "七星坛祭风", 50: "华容道",
    51: "一气周公瑾", 52: "智辞鲁肃", 53: "义释黄忠", 54: "甘露寺看新郎", 55: "二气周公瑾",
    56: "三气周公瑾", 57: "卧龙吊丧", 58: "割须弃袍", 59: "裸衣斗马超", 60: "议取西蜀",
    61: "截江夺阿斗", 62: "取涪关", 63: "义释严颜", 64: "定计捉张任", 65: "自领益州牧",
    66: "单刀赴会", 67: "威震逍遥津", 68: "百骑劫魏营", 69: "五臣死节", 70: "智取瓦口隘",
    71: "据汉水立功", 72: "智取汉中", 73: "进位汉中王", 74: "水淹七军", 75: "刮骨疗毒",
    76: "败走麦城", 77: "关公显圣", 78: "奸雄数终", 79: "曹植赋诗", 80: "曹丕称帝",
    81: "张飞遇害", 82: "先主兴兵", 83: "猇亭之战", 84: "夷陵之战", 85: "白帝城托孤",
    86: "秦宓逞天辩", 87: "丞相南征", 88: "再缚番王", 89: "四番用计", 90: "七擒孟获",
    91: "武侯上表", 92: "力斩五将", 93: "骂死王朗", 94: "克日擒孟达", 95: "失街亭",
    96: "挥泪斩马谡", 97: "再上出师表", 98: "袭取陈仓", 99: "大破魏兵", 100: "斗阵辱仲达",
    101: "陇上妆神", 102: "木牛流马", 103: "上方谷受困", 104: "星陨五丈原", 105: "预伏锦囊计",
    106: "诈病赚曹爽", 107: "政归司马氏", 108: "雪中奋短兵", 109: "废曹芳", 110: "文鸯退雄兵",
    111: "义讨司马昭", 112: "寿春之战", 113: "斗阵破邓艾", 114: "曹髦死南阙", 115: "姜维避祸",
    116: "武侯显圣", 117: "偷度阴平", 118: "二士争功", 119: "再受禅", 120: "三国归晋",
}

KEEP_TOP = 12  # 保留曾进入章节前 12 名的人物


def main():
    stats = json.load(open(SRC, encoding="utf-8"))
    chapters = stats["characters"] and stats["chapters"]
    style_of = {c["name"]: c["style"] for c in stats["characters"]}

    # 1) 找出曾进入章节 Top12 的人物
    keep = set()
    cum = defaultdict(int)
    for cd in chapters:
        for p, v in cd["counts"].items():
            cum[p] += v
        for p, _ in sorted(cum.items(), key=lambda kv: (-kv[1], kv[0]))[:KEEP_TOP]:
            keep.add(p)

    # 2) 逐章取这些人的累计值 + 当章新增
    cum2 = defaultdict(int)
    out_chapters = []
    for cd in chapters:
        for p, v in cd["counts"].items():
            cum2[p] += v
        out_chapters.append({
            "n": cd["chapter"],
            "short": SHORT_NAMES.get(cd["chapter"], ""),
            "title": cd["title"],
            "cum": {p: cum2[p] for p in keep if cum2.get(p, 0) > 0},
            "add": {p: v for p, v in cd["counts"].items() if p in keep},
        })

    data = {
        "meta": stats["meta"],
        "characters": [
            {"name": p, "style": style_of.get(p, ""),
             "total": next(c["total"] for c in stats["characters"] if c["name"] == p)}
            for p in sorted(keep, key=lambda x: -cum2[x])
        ],
        "chapters": out_chapters,
    }
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, separators=(",", ":"))

    print(f"保留人物 {len(keep)} 位，章节 {len(out_chapters)} 回")
    print("人物：", "、".join(c["name"] for c in data["characters"]))
    print(f"输出：{OUT}  ({os.path.getsize(OUT)/1024:.0f} KB)")


if __name__ == "__main__":
    main()
