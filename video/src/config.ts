import { StaticFile } from "remotion";

/* ═══════════════════════════════════════════════════════════════════════════
 *  《三国演义》人物出场频率动态排序赛跑 —— 全局配置区
 *  所有可修改内容集中在本文件，改这里即可一键调整视频内容与视觉。
 * ═══════════════════════════════════════════════════════════════════════════ */

/* ---------------- 基础视频参数 ---------------- */
export const VIDEO_WIDTH = 1920;
export const VIDEO_HEIGHT = 1080;
export const FPS = 30;

/* ---------------- 文案 ---------------- */
export const VIDEO_TITLE = "《三国演义》";
export const VIDEO_TITLE_SUB = "人物出场频率排行榜";
export const SUBTITLE = "从桃园结义到三国归晋 · 120回人物命运动态赛跑";
export const FOOT_NOTE = "基于《三国演义》全文人物提及频率统计";
export const OUTRO_TITLE = "《三国演义》人物出场频率最终排行榜";
export const OUTRO_QUOTE = "从桃园结义，到三国归晋，谁才是真正贯穿全书的人物？";
export const HEADER_TITLE = "《三国演义》人物出场频率排行榜";
export const HEADER_SUB = "第 1 回 → 第 120 回";

/* ---------------- 章节与榜单 ---------------- */
export const CHAPTER_COUNT = 120;      // 全书回数
export const TOP_N = 10;               // 榜单显示人数

/* ---------------- 时间节奏（单位：帧，30fps） ---------------- */
export const ANIMATION_DURATION = 48;  // 普通章节时长 ≈1.6s
export const INTRO_DURATION = 135;     // 片头 ≈4.5s
export const OUTRO_DURATION = 240;     // 片尾定格 ≈8s

/**
 * 重要剧情章节（放慢播放，单位：帧）
 * key = 回目号，value = 该回停留帧数
 */
export const IMPORTANT_CHAPTERS: Record<number, number> = {
  1: 110,   // 桃园结义
  5: 105,   // 三英战吕布
  19: 95,   // 白门楼吕布殒命
  27: 95,   // 千里走单骑
  30: 105,  // 官渡之战
  37: 110,  // 三顾茅庐
  41: 100,  // 长坂坡·单骑救主
  42: 95,   // 大闹长坂桥
  46: 95,   // 草船借箭
  49: 105,  // 赤壁·七星坛祭风
  50: 110,  // 华容道
  60: 90,   // 议取西蜀
  65: 90,   // 刘备自领益州牧
  74: 90,   // 水淹七军
  76: 110,  // 关羽败走麦城
  81: 95,   // 张飞遇害
  84: 105,  // 夷陵之战
  85: 110,  // 白帝城托孤
  90: 100,  // 七擒孟获
  91: 95,   // 六出祁山·武侯上表
  95: 100,  // 失街亭
  103: 100, // 上方谷
  104: 120, // 五丈原
  117: 100, // 偷度阴平
  120: 130, // 三国归晋
};

/* ---------------- 条形尺寸 ---------------- */
export const BAR_HEIGHT = 62;
export const BAR_GAP = 14;
export const BAR_RADIUS = 12;
export const BAR_AREA_X = 96;         // 条形区左边界
export const BAR_AREA_WIDTH = 1210;   // 条形最大长度
export const ROW_HEIGHT = BAR_HEIGHT + BAR_GAP;

/* ---------------- 配色 ---------------- */
export const BACKGROUND_COLOR = "#0A0806";
export const BACKGROUND_COLOR_2 = "#151013";
export const FONT_COLOR = "#F3EDE4";
export const FONT_COLOR_DIM = "rgba(243,237,228,0.55)";
export const ACCENT_COLOR = "#C8A45C";       // 帝王金
export const PANEL_COLOR = "rgba(255,255,255,0.045)";
export const GRID_COLOR = "rgba(200,164,92,0.10)";

/**
 * 人物配色：同一人物全程保持一致
 * main = 条形主色，glow = 辉光/渐变高光色
 */
export const CHARACTER_COLORS: Record<string, { main: string; glow: string }> = {
  // —— 用户指定 ——
  刘备:   { main: "#E8B53A", glow: "#FFE08A" },  // 帝王金
  曹操:   { main: "#C0392B", glow: "#F0765F" },  // 深红
  孙权:   { main: "#2E86C1", glow: "#7FCCF5" },  // 青蓝
  诸葛亮: { main: "#17A589", glow: "#6EE7C8" },  // 青绿
  关羽:   { main: "#1E8449", glow: "#74D69A" },  // 墨绿
  张飞:   { main: "#7D3C98", glow: "#C79BE0" },  // 紫色
  赵云:   { main: "#5DADE2", glow: "#BFE3FA" },  // 银蓝
  吕布:   { main: "#D35400", glow: "#FFA15C" },  // 暗金红
  司马懿: { main: "#4A235A", glow: "#A56FC4" },  // 深紫
  周瑜:   { main: "#E2574C", glow: "#FFB08A" },  // 橙红
  // —— 其余主要人物 ——
  魏延:   { main: "#9C640C", glow: "#E5B45F" },
  姜维:   { main: "#1F618D", glow: "#79B4DD" },
  袁绍:   { main: "#8D6E63", glow: "#D8B49F" },
  马超:   { main: "#CD6155", glow: "#FFAFA4" },
  鲁肃:   { main: "#5499C7", glow: "#A8D3F0" },
  张辽:   { main: "#2874A6", glow: "#88C0E0" },
  刘表:   { main: "#B9770E", glow: "#F0BE5E" },
  孙策:   { main: "#D68910", glow: "#FFCE7A" },
  董卓:   { main: "#5D4037", glow: "#B08A72" },
  袁术:   { main: "#9B59B6", glow: "#DDB2EA" },
  李傕:   { main: "#7F8C8D", glow: "#CFD8D8" },
  郭汜:   { main: "#95A5A6", glow: "#D8E0E0" },
  献帝:   { main: "#F1C40F", glow: "#FFF0A0" },
  孙坚:   { main: "#DC7633", glow: "#FFC08A" },
  貂蝉:   { main: "#EC7063", glow: "#FFC0B5" },
  陶谦:   { main: "#AAB7B8", glow: "#E2E9E9" },
  公孙瓒: { main: "#AF7AC5", glow: "#E4C2F0" },
  何进:   { main: "#808B96", glow: "#CBD3D9" },
  王允:   { main: "#BDC3C7", glow: "#EDF1F2" },
  朱儁:   { main: "#707B7C", glow: "#C4CBCB" },
  张角:   { main: "#48C9B0", glow: "#A6F0E0" },
  张宝:   { main: "#839192", glow: "#D0D8D8" },
  张梁:   { main: "#76D7C4", glow: "#C8F4E8" },
  卢植:   { main: "#85929E", glow: "#D2DAE1" },
  皇甫嵩: { main: "#5D6D7E", glow: "#B4C0CC" },
  刘焉:   { main: "#D98880", glow: "#FFC6BC" },
  // —— 备选（若调整 TOP_N 或统计口径后有人进榜） ——
  刘禅:   { main: "#C39BD3", glow: "#EBD3F2" },
  孟获:   { main: "#826F3A", glow: "#D9C88A" },
  黄忠:   { main: "#F5B041", glow: "#FFDB9E" },
  张郃:   { main: "#45B39D", glow: "#A3E6D8" },
  邓艾:   { main: "#5D6D7E", glow: "#B4C0CC" },
  曹仁:   { main: "#A04000", glow: "#F0A76A" },
  徐晃:   { main: "#3498DB", glow: "#AFD5F5" },
  许褚:   { main: "#922B21", glow: "#F5A38F" },
  太史慈: { main: "#1ABC9C", glow: "#8FE8D8" },
  程普:   { main: "#935116", glow: "#E5B067" },
  黄盖:   { main: "#BA4A00", glow: "#FFA766" },
  甘宁:   { main: "#117864", glow: "#7FD9C4" },
  庞统:   { main: "#6E2C00", glow: "#C98A52" },
  徐庶:   { main: "#1F618D", glow: "#79B4DD" },
  马谡:   { main: "#7B7D7D", glow: "#C9CBCB" },
  曹丕:   { main: "#641E16", glow: "#D98875" },
  曹真:   { main: "#78281F", glow: "#E08A7C" },
  钟会:   { main: "#4D5656", glow: "#A8B0B0" },
  陆逊:   { main: "#0E6655", glow: "#73D3BE" },
  孙皓:   { main: "#616A6B", glow: "#BAC1C1" },
};

/** 未配置颜色时的兜底调色板 */
export const FALLBACK_COLORS = [
  "#B7950B", "#A04000", "#1F618D", "#117A65", "#6C3483",
  "#922B21", "#2E86C1", "#7D6608", "#4A235A", "#196F3D",
];

/* ---------------- 人物别名 / 字号（展示用，统计口径见 scripts/analyze.py） ---------------- */
export const CHARACTER_ALIASES: Record<string, string[]> = {
  刘备: ["刘备", "刘玄德", "玄德", "刘皇叔", "先主", "刘豫州"],
  关羽: ["关羽", "关云长", "云长", "关公", "美髯公", "汉寿亭侯"],
  张飞: ["张飞", "张翼德", "翼德"],
  曹操: ["曹操", "曹孟德", "孟德", "曹丞相", "曹公", "魏王"],
  诸葛亮: ["诸葛亮", "诸葛孔明", "孔明", "卧龙", "武侯", "武乡侯"],
  赵云: ["赵云", "赵子龙", "子龙"],
  孙权: ["孙权", "孙仲谋", "仲谋", "吴侯"],
  周瑜: ["周瑜", "周公瑾", "公瑾", "周郎"],
  司马懿: ["司马懿", "司马仲达", "仲达"],
  吕布: ["吕布", "吕奉先", "奉先", "吕温侯"],
  魏延: ["魏延", "魏文长", "文长"],
  姜维: ["姜维", "姜伯约", "伯约"],
  袁绍: ["袁绍", "袁本初", "本初"],
  马超: ["马超", "马孟起", "孟起"],
  鲁肃: ["鲁肃", "鲁子敬", "子敬"],
  张辽: ["张辽", "张文远", "文远"],
  刘表: ["刘表", "刘景升", "景升"],
  孙策: ["孙策", "孙伯符", "伯符", "小霸王"],
  董卓: ["董卓", "董仲颖", "董太师"],
  袁术: ["袁术", "袁公路", "公路"],
  孙坚: ["孙坚", "孙文台", "文台"],
  貂蝉: ["貂蝉"],
  王允: ["王允", "王子师"],
  公孙瓒: ["公孙瓒"],
  陶谦: ["陶谦", "陶恭祖"],
  何进: ["何进", "何国舅"],
  献帝: ["献帝", "汉献帝", "刘协"],
  张角: ["张角"], 张宝: ["张宝"], 张梁: ["张梁"],
  卢植: ["卢植"], 皇甫嵩: ["皇甫嵩"], 朱儁: ["朱儁"], 刘焉: ["刘焉"],
  李傕: ["李傕"], 郭汜: ["郭汜"],
};

/* ---------------- 人物图标 ----------------
 * icon: 兵器 / 器物剪影（sword 剑 · blade 偃月刀 · spear 矛枪 · halberd 方天画戟
 *       fan 羽扇 · bow 弓 · banner 帅旗 · zither 古琴 · seal 印玺 · talisman 道符
 *       eagle 鹰 · flower 花 · armor 甲胄 · banner2 王旗）
 * glyph: 圆形徽章内的汉字（取姓氏或简称）
 */
export const CHARACTER_IMAGES: Record<string, { icon: string; glyph: string }> = {
  刘备:   { icon: "sword",     glyph: "刘" },
  关羽:   { icon: "blade",     glyph: "关" },
  张飞:   { icon: "spear",     glyph: "张" },
  曹操:   { icon: "banner",    glyph: "曹" },
  诸葛亮: { icon: "fan",       glyph: "亮" },
  赵云:   { icon: "spear",     glyph: "赵" },
  孙权:   { icon: "sword",     glyph: "权" },
  周瑜:   { icon: "zither",    glyph: "瑜" },
  司马懿: { icon: "eagle",     glyph: "懿" },
  吕布:   { icon: "halberd",   glyph: "布" },
  魏延:   { icon: "blade",     glyph: "延" },
  姜维:   { icon: "spear",     glyph: "维" },
  袁绍:   { icon: "banner2",   glyph: "绍" },
  马超:   { icon: "spear",     glyph: "超" },
  鲁肃:   { icon: "seal",      glyph: "肃" },
  张辽:   { icon: "blade",     glyph: "辽" },
  刘表:   { icon: "seal",      glyph: "表" },
  孙策:   { icon: "spear",     glyph: "策" },
  董卓:   { icon: "armor",     glyph: "卓" },
  袁术:   { icon: "seal",      glyph: "术" },
  孙坚:   { icon: "sword",     glyph: "坚" },
  貂蝉:   { icon: "flower",    glyph: "蝉" },
  王允:   { icon: "seal",      glyph: "允" },
  公孙瓒: { icon: "spear",     glyph: "瓒" },
  陶谦:   { icon: "seal",      glyph: "谦" },
  何进:   { icon: "armor",     glyph: "进" },
  献帝:   { icon: "seal",      glyph: "献" },
  张角:   { icon: "talisman",  glyph: "角" },
  张宝:   { icon: "talisman",  glyph: "宝" },
  张梁:   { icon: "talisman",  glyph: "梁" },
  卢植:   { icon: "banner2",   glyph: "植" },
  皇甫嵩: { icon: "banner2",   glyph: "嵩" },
  朱儁:   { icon: "banner2",   glyph: "儁" },
  刘焉:   { icon: "seal",      glyph: "焉" },
  李傕:   { icon: "blade",     glyph: "傕" },
  郭汜:   { icon: "blade",     glyph: "汜" },
  黄忠:   { icon: "bow",       glyph: "忠" },
  孟获:   { icon: "armor",     glyph: "获" },
  刘禅:   { icon: "seal",      glyph: "禅" },
  曹丕:   { icon: "banner",    glyph: "丕" },
  陆逊:   { icon: "zither",    glyph: "逊" },
  邓艾:   { icon: "blade",     glyph: "艾" },
  钟会:   { icon: "sword",     glyph: "会" },
  太史慈: { icon: "bow",       glyph: "慈" },
  庞统:   { icon: "fan",       glyph: "统" },
  徐庶:   { icon: "fan",       glyph: "庶" },
  马谡:   { icon: "fan",       glyph: "谡" },
  甘宁:   { icon: "blade",     glyph: "宁" },
  黄盖:   { icon: "blade",     glyph: "盖" },
  程普:   { icon: "spear",     glyph: "普" },
  张郃:   { icon: "spear",     glyph: "郃" },
  徐晃:   { icon: "blade",     glyph: "晃" },
  许褚:   { icon: "armor",     glyph: "褚" },
  曹仁:   { icon: "armor",     glyph: "仁" },
  曹真:   { icon: "armor",     glyph: "真" },
  孙皓:   { icon: "seal",      glyph: "皓" },
};

/* ---------------- 音频 / 输出 ---------------- */
export const MUSIC_PATH = "bgm.wav";
export const OUTPUT_PATH = "out/sanguo_race.mp4";

/* ---------------- 字体 ---------------- */
export const FONT_SANS =
  '"Microsoft YaHei","微软雅黑","PingFang SC","Noto Sans SC",sans-serif';
export const FONT_KAI =
  '"KaiTi","楷体","STKaiti","Kaiti SC","Microsoft YaHei",serif';
export const FONT_NUM =
  '"DIN Alternate","Bahnschrift","Microsoft YaHei",sans-serif';
