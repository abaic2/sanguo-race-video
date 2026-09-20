import React from "react";
import { interpolate } from "remotion";
import {
  BAR_AREA_X, BAR_HEIGHT, BAR_RADIUS, ROW_HEIGHT, TOP_N,
  FONT_SANS, FONT_KAI, FONT_NUM, FONT_COLOR,
} from "../config";
import { Avatar, colorOf } from "./Avatar";
import { STYLE_OF } from "../data";

const RANK_W = 54;        // 名次列宽
const AVATAR_X = 64;      // 头像相对偏移
const NAME_X = 140;       // 姓名列
const BAR_X = 372;        // 条形起点
const BAR_MAX_W = 1120;   // 条形最大长度

export interface BarProps {
  name: string;
  value: number;
  maxValue: number;
  /** 软排名（连续值，1 = 第一名） */
  rank: number;
  /** 该条形整体的额外透明度（用于进入 / 退出榜单） */
  extraOpacity?: number;
  highlight?: boolean;
}

export const Bar: React.FC<BarProps> = ({
  name, value, maxValue, rank, extraOpacity = 1, highlight = false,
}) => {
  const { main, glow } = colorOf(name);
  const style = STYLE_OF[name] ?? "";
  const ratio = maxValue > 0 ? Math.max(0, value) / maxValue : 0;
  const w = Math.max(64, ratio * BAR_MAX_W);

  // 进入 / 退出榜单：淡出 + 左滑
  const fade = interpolate(rank, [TOP_N - 0.25, TOP_N + 0.75], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const slide = interpolate(rank, [TOP_N - 0.25, TOP_N + 0.75], [0, -70], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = fade * extraOpacity;

  return (
    <div
      style={{
        position: "absolute",
        left: BAR_AREA_X,
        top: 0,
        height: ROW_HEIGHT,
        width: 1800,
        transform: `translateY(${(rank - 1) * ROW_HEIGHT}px) translateX(${slide}px)`,
        opacity,
        display: "flex",
        alignItems: "center",
        willChange: "transform, opacity",
      }}
    >
      {/* 名次 */}
      <div
        style={{
          width: RANK_W,
          textAlign: "center",
          fontFamily: FONT_NUM,
          fontSize: 27,
          fontWeight: 700,
          color: rank <= 3 ? "#F6E3B4" : "rgba(243,237,228,0.42)",
          textShadow: rank <= 3 ? "0 0 14px rgba(246,227,180,0.45)" : "none",
        }}
      >
        {String(Math.round(rank)).padStart(2, "0")}
      </div>

      {/* 人物徽章 */}
      <div style={{ position: "absolute", left: AVATAR_X }}>
        <Avatar name={name} size={60} />
      </div>

      {/* 姓名 · 字号 */}
      <div
        style={{
          position: "absolute",
          left: NAME_X,
          width: 220,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <span
          style={{
            fontFamily: FONT_KAI,
            fontSize: 31,
            fontWeight: 700,
            color: FONT_COLOR,
            letterSpacing: 1,
            textShadow: `0 2px 10px rgba(0,0,0,0.85), 0 0 18px ${main}55`,
            lineHeight: 1.12,
            whiteSpace: "nowrap",
          }}
        >
          {name}
          {style ? (
            <span
              style={{
                fontFamily: FONT_SANS,
                fontSize: 18,
                fontWeight: 500,
                color: "rgba(243,237,228,0.5)",
                marginLeft: 7,
                letterSpacing: 0,
              }}
            >
              ·{style}
            </span>
          ) : null}
        </span>
      </div>

      {/* 条形 */}
      <div
        style={{
          position: "absolute",
          left: BAR_X,
          height: BAR_HEIGHT,
          width: w,
          borderRadius: BAR_RADIUS,
          background: `linear-gradient(90deg, ${main} 0%, ${glow}D8 46%, ${main} 100%)`,
          boxShadow: `0 0 22px ${glow}44, 0 6px 18px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.34)`,
          overflow: "hidden",
        }}
      >
        {/* 条形内部纹理 */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "repeating-linear-gradient(115deg, rgba(255,255,255,0.10) 0px, rgba(255,255,255,0.10) 1px, rgba(255,255,255,0) 1px, rgba(255,255,255,0) 13px)",
            opacity: 0.5,
          }}
        />
        {/* 顶部高光 */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            height: "42%",
            background: "linear-gradient(180deg, rgba(255,255,255,0.22), rgba(255,255,255,0))",
          }}
        />
        {highlight ? (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(90deg, rgba(255,255,255,0.32), rgba(255,255,255,0))",
            }}
          />
        ) : null}
      </div>

      {/* 累计次数（滚动增长） */}
      <div
        style={{
          position: "absolute",
          left: BAR_X + w + 18,
          fontFamily: FONT_NUM,
          fontSize: 34,
          fontWeight: 700,
          color: "#FFFFFF",
          textShadow: `0 0 18px ${glow}88, 0 2px 8px rgba(0,0,0,0.9)`,
          fontVariantNumeric: "tabular-nums",
          lineHeight: 1,
          whiteSpace: "nowrap",
        }}
      >
        {Math.round(value)}
      </div>
    </div>
  );
};
