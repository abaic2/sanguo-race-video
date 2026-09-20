import React, { useMemo } from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { Background } from "./components/Background";
import { ChapterWatermark, HeaderBar, HudPanel } from "./components/Overlays";
import { Bar } from "./components/Bar";
import { TOP_N, ROW_HEIGHT, IMPORTANT_CHAPTERS, ACCENT_COLOR, FONT_KAI, CHAPTER_COUNT } from "./config";
import {
  NAMES, ADD, CHAPTER_SHORT, getProgress, valuesAt, softRanks, orderBy,
} from "./data";

const TOP_Y = 168;
const EXTRA_ROWS = 3;   // 榜单外多渲染几行，实现自然进出

export const RaceScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { pos, chapter, t } = getProgress(frame);

  const values = useMemo(() => valuesAt(pos), [pos]);
  const ranks = useMemo(() => softRanks(values), [values]);
  const order = useMemo(() => orderBy(ranks), [ranks]);

  const shown = order.slice(0, TOP_N + EXTRA_ROWS);
  const maxValue = Math.max(1, values[order[0]] ?? 1);

  // Top10 累计次数
  const topTotal = shown
    .slice(0, TOP_N)
    .reduce((s, i) => s + Math.round(values[i]), 0);

  // 本回新增（按当前 Top10 人物统计）
  const addArr = ADD[Math.min(CHAPTER_COUNT - 1, chapter - 1)];
  const chapterAdd = shown
    .slice(0, TOP_N)
    .reduce((s, i) => s + (addArr ? addArr[i] : 0), 0);

  const leaderIdx = order[0];
  const isImportant = Boolean(IMPORTANT_CHAPTERS[chapter]);

  // 重要章节：屏幕氛围轻微强化（不影响连续推进）
  const emphasis = isImportant
    ? interpolate(t, [0, 0.12, 0.78, 1], [0, 1, 1, 0], { extrapolateRight: "clamp" })
    : 0;

  return (
    <AbsoluteFill>
      <Background dim={1} />

      {/* 章节水印（背景层，超大半透明） */}
      <ChapterWatermark chapter={chapter} short={CHAPTER_SHORT[chapter] ?? ""} t={t} />

      {/* 关键剧情氛围光 */}
      {emphasis > 0 ? (
        <AbsoluteFill
          style={{
            boxShadow: `inset 0 0 180px rgba(200,164,92,${0.1 * emphasis})`,
            background: `radial-gradient(120% 60% at 50% 100%, rgba(200,60,40,${0.1 * emphasis}) 0%, rgba(0,0,0,0) 70%)`,
            pointerEvents: "none",
          }}
        />
      ) : null}

      {/* 榜单 */}
      <div
        style={{
          position: "absolute",
          top: TOP_Y,
          left: 0,
          right: 0,
          height: ROW_HEIGHT * TOP_N,
        }}
      >
        {shown.map((idx) => (
          <Bar
            key={NAMES[idx]}
            name={NAMES[idx]}
            value={values[idx]}
            maxValue={maxValue}
            rank={ranks[idx]}
          />
        ))}
      </div>

      {/* 顶部标题栏 */}
      <HeaderBar chapter={chapter} progress={pos / CHAPTER_COUNT} />

      {/* 关键剧情提示 */}
      {isImportant ? (
        <div
          style={{
            position: "absolute",
            left: 96,
            top: 110,
            opacity: emphasis,
            transform: `translateX(${(1 - emphasis) * -14}px)`,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span style={{ color: ACCENT_COLOR, fontSize: 16 }}>◆</span>
          <span
            style={{
              fontFamily: FONT_KAI,
              fontSize: 24,
              letterSpacing: 3,
              color: "#F6E3B4",
              textShadow: "0 0 22px rgba(246,227,180,0.45)",
            }}
          >
            关键剧情 · {CHAPTER_SHORT[chapter]}
          </span>
        </div>
      ) : null}

      {/* 左下角实时数据 */}
      <HudPanel
        chapter={chapter}
        short={CHAPTER_SHORT[chapter] ?? ""}
        topTotal={topTotal}
        leader={NAMES[leaderIdx]}
        leaderValue={Math.round(values[leaderIdx])}
        chapterAdd={chapterAdd}
      />

      {/* 开场淡入（衔接片头黑场） */}
      {frame < 14 ? (
        <AbsoluteFill
          style={{
            background: "#0A0806",
            opacity: interpolate(frame, [0, 14], [1, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        />
      ) : null}
    </AbsoluteFill>
  );
};
