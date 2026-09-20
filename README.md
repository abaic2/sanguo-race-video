# 三国演义 · 人物出场频率动态赛跑

基于《三国演义》全书 120 回原文做**真实文本统计**，用代码驱动（Remotion）生成一段「Bar Chart Race」风格的动态排行榜视频：从第 1 回到第 120 回，主要人物随剧情推进不断进入、退出、超越，最终定格全书累计出场频率 Top 10。

> 成片：`video/out/sanguo_race.mp4`（1920×1080 · 16:9 · 30fps · H.264，约 4 分 9 秒）

---

## 数据从哪来

- **语料**：《三国演义》全文（罗贯中，120 回），约 60 万字，含完整回目标记。
- **统计脚本**：`scripts/analyze.py`
  - 按回目正则切分 120 章；
  - 人物别名归并（刘备 = 玄德 / 刘玄德 / 先主 / 刘皇叔 …）；
  - 上下文消歧，避免误判：
    - `卧龙岗` → 不算诸葛亮；
    - `魏王` 在曹丕相关章节归曹丕，其余归曹操；
    - `陈留王` 在前中期指汉献帝刘协，不归曹奂；
    - 阻断跨词误合（`天子建都` ≠ 曹植字子建、`主公明日` ≠ 徐晃字公明 等）。
- **统计结果**：`data/chapter_stats.json`（120 章 × 173 人，全书提及 19,683 次）。

全书累计提及 Top 5：曹操(2195) · 刘备(1680) · 诸葛亮(1621) · 关羽(1178) · 张飞(1045)。

---

## 视频做了什么

- **片头**（4.5s）：标题、副标题、数据来源。
- **主体**（约 235s）：第 1 → 120 回 Top 10 横向条形赛跑，章节间平滑插值，人物进榜淡入、跌榜淡出，数字滚动增长。
- **25 处关键回目**放慢停留：桃园结义、三英战吕布、官渡之战、三顾茅庐、赤壁、华容道、败走麦城、夷陵、白帝城、七擒孟获、五丈原、三国归晋……
- **片尾**（8s）：第 120 回「三国归晋」定格 + 最终 Top 10 + 金句。
- **BGM**：纯代码合成（`scripts/make_bgm.py`），无版权风险，鼓点对齐每回切换，五段情绪推进（群雄逐鹿 → 赤壁鼎立 → 北伐紧张 → 五丈原苍凉 → 三国归晋收束），无人声。

---

## 本地复现 / 二次编辑

```bash
# 1. 进入视频工程
cd video

# 2. 安装依赖（需要 Node.js 18+）
npm install

# 3. 渲染成片（首次会下载 headless chromium，需联网）
npx remotion render SanguoRace out/sanguo_race.mp4 --codec h264 --audio-codec aac
```

所有可变配置集中在 **`video/src/config.ts`**：标题、人物颜色、别名、图标、章节播放速度、输出路径等，改完重新执行第 3 步即可。

### 重新统计（可选）

```bash
# 需要把《三国演义》全文放到 data/sanguoyanyi.txt
python scripts/analyze.py            # 生成 data/chapter_stats.json
python scripts/build_video_data.py   # 生成视频用数据 src/data/raceData.json
python scripts/make_bgm.py           # 重新合成 BGM 到 video/public/bgm.wav
```

---

## 文件结构

```
.
├── data/
│   ├── sanguoyanyi.txt          # 语料原文（UTF-8）
│   └── chapter_stats.json       # 120 章人物累计统计
├── scripts/
│   ├── analyze.py               # 人物提及统计（别名归并 + 消歧）
│   ├── build_video_data.py      # 导出视频用数据
│   ├── make_bgm.py              # 程序化合成史诗 BGM（纯标准库）
│   └── diagnose*.py             # 误判诊断脚本
├── video/
│   ├── package.json
│   ├── remotion.config.ts
│   ├── public/bgm.wav           # 背景音乐
│   └── src/
│       ├── config.ts            # ⭐ 所有可改配置都在这里
│       ├── data.ts / data/raceData.json
│       ├── Root.tsx / Race.tsx / Intro.tsx / Outro.tsx
│       └── components/          # Bar / Avatar / Background / Overlays / icons
└── video/out/sanguo_race.mp4    # 成片
```

---

## 技术栈

Remotion · React · TypeScript · 纯 Python 文本统计与配乐合成。

数据可视化风格为「现代深色数据大屏 + 三国历史氛围」，所有人物配色稳定一致（曹操=深红、刘备=帝王金、诸葛亮=青绿……）。

## 版权

- 文本统计与可视化代码：可自由使用。
- 《三国演义》原文属公有领域（罗贯中，元末明初）。
- BGM 由代码实时合成，无第三方素材，无版权风险。
