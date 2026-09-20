import React from "react";
import { interpolate } from "remotion";
import {
  ACCENT_COLOR, FONT_KAI, FONT_SANS, FONT_NUM, FONT_COLOR, FONT_COLOR_DIM,
  PANEL_COLOR, CHAPTER_COUNT,
} from "../config";

/* ==================== 章节水印（超大半透明） ==================== */
export const ChapterWatermark: React.FC<{
  chapter: number;
  short: string;
  t: number;
}> = ({ chapter, short, t }) => {
  // 章节切换瞬间的轻微脉冲
  const pulse = interpolate(t, [0, 0.06, 0.18], [1, 1.035, 1], {
    extrapolateRight: "clamp",
  });
  const glowBoost = interpolate(t, [0, 0.1, 0.3], [0.16, 0.26, 0.16], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        right: 52,
        top: 210,
        width: 900,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        transform: `scale(${pulse})`,
        transformOrigin: "right center",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          fontFamily: FONT_KAI,
          fontSize: 200,
          fontWeight: 700,
          lineHeight: 0.94,
          letterSpacing: 4,
          color: "#F3EDE4",
          opacity: glowBoost,
          textShadow: `0 0 60px ${ACCENT_COLOR}44`,
          whiteSpace: "nowrap",
        }}
      >
        第 {String(chapter).padStart(3, "0")} 回
      </div>
      <div
        style={{
          fontFamily: FONT_KAI,
          fontSize: 74,
          fontWeight: 700,
          letterSpacing: 12,
          color: ACCENT_COLOR,
          opacity: 0.42,
          marginTop: 10,
          textShadow: "0 0 40px rgba(200,164,92,0.35)",
          whiteSpace: "nowrap",
        }}
      >
        {short}
      </div>
    </div>
  );
};

/* ==================== 顶部标题栏 ==================== */
export const HeaderBar: React.FC<{ chapter: number; progress: number }> = ({
  chapter, progress,
}) => (
  <div
    style={{
      position: "absolute",
      left: 96,
      right: 96,
      top: 44,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    }}
  >
    <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
      <span
        style={{
          fontFamily: FONT_KAI,
          fontSize: 40,
          fontWeight: 700,
          color: FONT_COLOR,
          letterSpacing: 3,
          textShadow: "0 2px 14px rgba(0,0,0,0.8)",
        }}
      >
        《三国演义》人物出场频率排行榜
      </span>
      <span
        style={{
          fontFamily: FONT_SANS,
          fontSize: 19,
          color: FONT_COLOR_DIM,
          letterSpacing: 1,
        }}
      >
        按全书 120 回逐章统计 · 累计提及次数
      </span>
    </div>

    <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
      <span
        style={{
          fontFamily: FONT_NUM,
          fontSize: 22,
          color: FONT_COLOR_DIM,
          letterSpacing: 1,
        }}
      >
        {chapter} / {CHAPTER_COUNT}
      </span>
      <div
        style={{
          width: 260,
          height: 5,
          borderRadius: 3,
          background: "rgba(255,255,255,0.10)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${progress * 100}%`,
            height: "100%",
            borderRadius: 3,
            background: `linear-gradient(90deg, ${ACCENT_COLOR}88, ${ACCENT_COLOR})`,
            boxShadow: `0 0 12px ${ACCENT_COLOR}88`,
          }}
        />
      </div>
    </div>
  </div>
);

/* ==================== 左下角实时数据面板 ==================== */
export const HudPanel: React.FC<{
  chapter: number;
  short: string;
  topTotal: number;
  leader: string;
  leaderValue: number;
  chapterAdd: number;
}> = ({ chapter, short, topTotal, leader, leaderValue, chapterAdd }) => {
  const item: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: 5,
    padding: "12px 22px",
    background: PANEL_COLOR,
    border: "1px solid rgba(200,164,92,0.18)",
    borderRadius: 12,
    backdropFilter: "blur(2px)",
    minWidth: 168,
  };
  const label: React.CSSProperties = {
    fontFamily: FONT_SANS,
    fontSize: 15,
    color: FONT_COLOR_DIM,
    letterSpacing: 1,
  };
  const value: React.CSSProperties = {
    fontFamily: FONT_NUM,
    fontSize: 32,
    fontWeight: 700,
    color: "#FFFFFF",
    lineHeight: 1.05,
    fontVariantNumeric: "tabular-nums",
  };
  const valueGold: React.CSSProperties = {
    ...value,
    fontFamily: FONT_KAI,
    fontSize: 30,
    color: "#F6E3B4",
    textShadow: "0 0 20px rgba(246,227,180,0.4)",
  };

  return (
    <div
      style={{
        position: "absolute",
        left: 96,
        bottom: 42,
        display: "flex",
        gap: 14,
        alignItems: "stretch",
      }}
    >
      <div style={item}>
        <span style={label}>当前章节</span>
        <span style={valueGold}>第 {String(chapter).padStart(3, "0")} 回</span>
      </div>
      <div style={{ ...item, minWidth: 120 }}>
        <span style={label}>本回回目</span>
        <span style={{ ...valueGold, fontSize: 24 }}>{short}</span>
      </div>
      <div style={item}>
        <span style={label}>Top10 累计出现</span>
        <span style={value}>{topTotal.toLocaleString("en-US")} 次</span>
      </div>
      <div style={item}>
        <span style={label}>当前排名第一</span>
        <span style={valueGold}>
          {leader}
          <span
            style={{
              fontFamily: FONT_NUM,
              fontSize: 19,
              color: FONT_COLOR_DIM,
              marginLeft: 8,
            }}
          >
            {leaderValue}
          </span>
        </span>
      </div>
      <div style={{ ...item, minWidth: 150 }}>
        <span style={label}>本回新增提及</span>
        <span style={value}>{chapterAdd} 次</span>
      </div>
    </div>
  );
};
