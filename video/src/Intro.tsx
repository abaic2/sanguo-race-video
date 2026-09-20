import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { Background } from "./components/Background";
import {
  VIDEO_TITLE, VIDEO_TITLE_SUB, SUBTITLE, FOOT_NOTE, CHAPTER_COUNT,
  ACCENT_COLOR, FONT_KAI, FONT_SANS, FONT_COLOR, FONT_COLOR_DIM,
} from "./config";

export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const s = (delay: number) => spring({ frame, fps, delay, config: { damping: 200, mass: 0.7 } });

  const titleS = s(6);
  const subS = s(24);
  const lineS = s(20);
  const noteS = s(46);
  const footS = s(66);

  // 金色微尘
  const dust = Array.from({ length: 26 }, (_, i) => {
    const seed = (i * 97) % 100 / 100;
    const x = 120 + seed * 1680;
    const y = 120 + ((i * 137) % 100 / 100) * 840;
    const drift = Math.sin(frame / 60 + i) * 12;
    const rise = ((frame * 0.28 + i * 40) % 900) - 60;
    return { x: x + drift, y: y - rise * 0.06, o: 0.18 + 0.22 * seed, r: 1.2 + seed * 2.2 };
  });

  return (
    <AbsoluteFill>
      <Background dim={0.85} />

      {/* 金色微尘 */}
      {dust.map((d, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: d.x,
            top: d.y,
            width: d.r * 2,
            height: d.r * 2,
            borderRadius: "50%",
            background: ACCENT_COLOR,
            opacity: d.o,
            filter: "blur(1px)",
          }}
        />
      ))}

      {/* 中央主体 */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* 回纹装饰框 */}
        <div
          style={{
            position: "absolute",
            width: 1180,
            height: 520,
            border: `1px solid ${ACCENT_COLOR}44`,
            borderRadius: 6,
            opacity: lineS * 0.9,
            boxShadow: `inset 0 0 90px rgba(200,164,92,0.07)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 1210,
            height: 552,
            border: `1px solid ${ACCENT_COLOR}22`,
            borderRadius: 6,
            opacity: lineS * 0.7,
          }}
        />

        {/* 主标题 */}
        <div
          style={{
            fontFamily: FONT_KAI,
            fontSize: 152,
            fontWeight: 700,
            letterSpacing: 16,
            color: "#F8EFC9",
            textShadow: `0 0 60px rgba(200,164,92,0.55), 0 6px 30px rgba(0,0,0,0.9)`,
            opacity: titleS,
            transform: `translateY(${(1 - titleS) * 46}px) scale(${0.94 + titleS * 0.06})`,
            marginLeft: 16,
          }}
        >
          {VIDEO_TITLE}
        </div>

        {/* 副标题 */}
        <div
          style={{
            fontFamily: FONT_KAI,
            fontSize: 62,
            fontWeight: 700,
            letterSpacing: 14,
            color: FONT_COLOR,
            opacity: subS,
            transform: `translateY(${(1 - subS) * 26}px)`,
            marginTop: 18,
            textShadow: "0 2px 20px rgba(0,0,0,0.85)",
          }}
        >
          {VIDEO_TITLE_SUB}
        </div>

        {/* 金色分隔线 */}
        <div
          style={{
            width: 620 * lineS,
            height: 2,
            marginTop: 30,
            background: `linear-gradient(90deg, rgba(200,164,92,0) 0%, ${ACCENT_COLOR} 50%, rgba(200,164,92,0) 100%)`,
            boxShadow: `0 0 20px ${ACCENT_COLOR}88`,
          }}
        />

        {/* 副标题说明 */}
        <div
          style={{
            fontFamily: FONT_SANS,
            fontSize: 28,
            letterSpacing: 5,
            color: FONT_COLOR_DIM,
            opacity: noteS,
            marginTop: 26,
          }}
        >
          {SUBTITLE}
        </div>

        {/* 回数标识 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginTop: 22,
            opacity: noteS,
          }}
        >
          <span style={{ fontFamily: FONT_SANS, fontSize: 22, color: FONT_COLOR_DIM }}>
            第 1 回
          </span>
          <span style={{ color: ACCENT_COLOR, fontSize: 18 }}>————</span>
          <span style={{ fontFamily: FONT_SANS, fontSize: 22, color: "#F6E3B4" }}>
            第 {CHAPTER_COUNT} 回
          </span>
        </div>
      </AbsoluteFill>

      {/* 底部小字 */}
      <div
        style={{
          position: "absolute",
          bottom: 74,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: FONT_SANS,
          fontSize: 21,
          letterSpacing: 3,
          color: FONT_COLOR_DIM,
          opacity: footS,
        }}
      >
        {FOOT_NOTE}
      </div>

      {/* 整体淡出（衔接到第 1 回） */}
      <AbsoluteFill
        style={{
          background: "#0A0806",
          opacity: interpolate(frame, [120, 134], [0, 1], { extrapolateLeft: "clamp" }),
        }}
      />
    </AbsoluteFill>
  );
};
