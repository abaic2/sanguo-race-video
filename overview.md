# 《三国演义》人物出场频率动态排序赛跑视频

## 交付物

- `video/out/sanguo_race.mp4`：1920×1080 / 16:9 / H.264 + AAC，约 4 分 8 秒，30fps。
- `video/src/`：可编辑的 Remotion + React + TypeScript 源码，所有配置集中在 `src/config.ts`。
- `scripts/`：全文统计、数据构建、BGM 合成脚本。
- `data/sanguoyanyi.txt`：《三国演义》全文 120 回原始语料（约 60 万字）。

## 数据基础

- 语料来源：python123 公开全文，UTF-8，含完整 120 回目标题。
- 统计口径：scripts/analyze.py 按回拆分，建立人物别名映射表，逐章累计。
- 消歧处理：
  - 上下文判定泛称：`丞相` 按 `诸葛亮` / `曹操` 分、`魏王` 分 `曹操` / `曹丕`、`吴主` 分 `孙权` / `孙皓`。
  - 后随字阻断：`卧龙` 后接 `冈/岗` 不计入诸葛亮；全局限定 `天子建都/主公明日/天子明诏` 等交叉词。
  - 时间限定别名：`陈留王` 前 5 回归 `献帝`，之后归 `曹奂`。
- 全书共跟踪 173 位人物，总提及 19,683 次；全书 Top5 为曹操(2195)、刘备(1680)、诸葛亮(1621)、关羽(1178)、张飞(1045)。

## 视频构成

| 段落 | 时长 | 内容 |
|------|------|------|
| 片头 | 4.5s | 标题《三国演义》人物出场频率排行榜 + 副标题 + 数据来源说明 |
| 主体 | ~235.7s | 第 1–120 回 Top10 横向条形赛跑，章节间平滑插值 |
| 片尾 | 8s | 第 120 回三国归晋 + 最终 Top10 定格 + 金句 |

## 视觉与节奏

- 深色历史大屏风格：深黑/暗红/暗金底色 + 水墨山河轮廓。
- 人物颜色稳定：刘备帝王金、曹操深红、孙权青蓝、诸葛亮青绿、关羽墨绿、张飞紫、赵云银蓝、吕布暗金红、司马懿深紫、周瑜橙红。
- 章节水印：超大半透明「第 XXX 回 + 回目简称」。
- 实时 HUD：当前章节、Top10 累计、当前第一、本回新增。
- 节奏：普通回 1.6s，桃园结义/三英战吕布/官渡/三顾茅庐/赤壁/华容道/败走麦城/夷陵/白帝城/七擒孟获/五丈原/三国归晋 等 25 处关键回放慢，保证叙事重点。

## 背景音乐

- 程序化合成 `video/public/bgm.wav`，22050Hz 单声道，约 250 秒。
- 零版权风险，无人声。
- 五段情绪：序幕(缓) → 群雄逐鹿(起) → 赤壁鼎立(强) → 北伐(紧) → 归晋(收束)。
- 鼓点对齐每回切换，重要章节加花。

## 可修改配置

`video/src/config.ts` 集中管理：

- `VIDEO_TITLE` / `SUBTITLE` / `FOOT_NOTE`
- `CHAPTER_COUNT` / `TOP_N` / `FPS`
- `ANIMATION_DURATION` / `IMPORTANT_CHAPTERS`
- `CHARACTER_COLORS` / `CHARACTER_ALIASES` / `CHARACTER_IMAGES`
- `MUSIC_PATH` / `OUTPUT_PATH`

修改后执行 `npx remotion render SanguoRace out/sanguo_race.mp4 --codec h264 --audio-codec aac` 即可重新渲染。

## 技术栈

- 数据：Python 标准库
- 视频：Remotion 4 + React + TypeScript
- BGM：Python `wave` + `math` 合成
- 输出：MP4 H.264 / AAC
