import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from "remotion";
import { Background } from "./components/Background";
import { Bar } from "./components/Bar";
import {
  OUTRO_TITLE, OUTRO_QUOTE, CHAPTER_COUNT, TOP_N, ROW_HEIGHT,
  ACCENT_COLOR, FONT_KAI, FONT_SANS, FONT_COLOR, FONT_COLOR_DIM,
} from "./config";
import { NAMES, CUM, CHAPTER_SHORT } from "./data";

const TOP_Y = 190;

export const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 最终排行榜
  const final = CUM[CHAPTER_COUNT - 1];
  const order = Array.from({ length: NAMES.length }, (_, i) => i)
    .sort((a, b) => final[b] - final[a])
    .slice(0, TOP_N);
  const maxValue = final[order[0]] ?? 1;

  const titleS = spring({ frame, fps, delay: 4, config: { damping: 200, mass: 0.7 } });
  const quoteS = spring({ frame, fps, delay: 58, config: { damping: 200, mass: 0.8 } });
  const fadeIn = interpolate(frame, [0, 12], [1, 0], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill>
      <Background dim={0.95} />

      {/* 标题 */}
      <div
        style={{
          position: "absolute",
          top: 58,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: FONT_KAI,
          fontSize: 60,
          fontWeight: 700,
          letterSpacing: 8,
          color: "#F8EFC9",
          textShadow: "0 0 46px rgba(200,164,92,0.5), 0 4px 20px rgba(0,0,0,0.9)",
          opacity: titleS,
          transform: `translateY(${(1 - titleS) * 24}px)`,
        }}
      >
        {OUTRO_TITLE}
      </div>

      {/* 第120回 · 三国归晋 */}
      <div
        style={{
          position: "absolute",
          top: 140,
          left: 0,
          right: 0,
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
          opacity: titleS,
        }}
      >
        <span
          style={{
            fontFamily: FONT_KAI,
            fontSize: 30,
            letterSpacing: 6,
            color: "#F6E3B4",
          }}
        >
          第 {String(CHAPTER_COUNT).padStart(3, "0")} 回
        </span>
        <span style={{ color: ACCENT_COLOR, fontSize: 20 }}>◆</span>
        <span
          style={{
            fontFamily: FONT_KAI,
            fontSize: 30,
            letterSpacing: 6,
            color: ACCENT_COLOR,
          }}
        >
          {CHAPTER_SHORT[CHAPTER_COUNT]}
        </span>
      </div>

      {/* 最终榜单 */}
      <div style={{ position: "absolute", top: TOP_Y, left: 0, right: 0 }}>
        {order.map((idx, i) => {
          const p = interpolate(frame, [14 + i * 4, 62 + i * 4], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.cubic),
          });
          const value = final[idx] * p;
          return (
            <Bar
              key={NAMES[idx]}
              name={NAMES[idx]}
              value={value}
              maxValue={maxValue}
              rank={i + 1}
            />
          );
        })}
      </div>

      {/* 底部金句 */}
      <div
        style={{
          position: "absolute",
          bottom: 56,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: quoteS,
          transform: `translateY(${(1 - quoteS) * 18}px)`,
        }}
      >
        <div
          style={{
            width: 760 * quoteS,
            height: 1,
            margin: "0 auto 22px",
            background: `linear-gradient(90deg, rgba(200,164,92,0) 0%, ${ACCENT_COLOR} 50%, rgba(200,164,92,0) 100%)`,
          }}
        />
        <div
          style={{
            fontFamily: FONT_KAI,
            fontSize: 34,
            letterSpacing: 5,
            color: FONT_COLOR,
            textShadow: "0 0 30px rgba(200,164,92,0.35), 0 2px 12px rgba(0,0,0,0.9)",
          }}
        >
          {OUTRO_QUOTE}
        </div>
        <div
          style={{
            fontFamily: FONT_SANS,
            fontSize: 18,
            letterSpacing: 2,
            color: FONT_COLOR_DIM,
            marginTop: 14,
          }}
        >
          统计口径：全书 120 回逐章解析人物姓名 / 字号 / 称谓，别名归并后累计提及次数
        </div>
      </div>

      {/* 开场淡入 */}
      <AbsoluteFill style={{ background: "#0A0806", opacity: fadeIn }} />
    </AbsoluteFill>
  );
};
