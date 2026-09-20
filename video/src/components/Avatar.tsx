import React from "react";
import { CHARACTER_COLORS, CHARACTER_IMAGES, FALLBACK_COLORS, FONT_KAI } from "../config";
import { WeaponIcon } from "./icons";
import { NAMES } from "../data";

export function colorOf(name: string) {
  const c = CHARACTER_COLORS[name];
  if (c) return c;
  const i = Math.max(0, NAMES.indexOf(name)) % FALLBACK_COLORS.length;
  return { main: FALLBACK_COLORS[i], glow: FALLBACK_COLORS[(i + 3) % FALLBACK_COLORS.length] };
}

/** 三国人物风格徽章：人物色辉光圆环 + 兵器剪影 + 姓氏汉字 */
export const Avatar: React.FC<{ name: string; size?: number; glyphSize?: number }> = ({
  name,
  size = 60,
  glyphSize,
}) => {
  const { main, glow } = colorOf(name);
  const img = CHARACTER_IMAGES[name] ?? { icon: "seal", glyph: name.slice(0, 1) };
  const gs = glyphSize ?? Math.round(size * 0.46);

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        position: "relative",
        background: `radial-gradient(circle at 34% 28%, ${glow}38 0%, ${main}30 42%, rgba(8,6,6,0.92) 78%)`,
        border: `2px solid ${main}`,
        boxShadow: `0 0 14px ${main}66, inset 0 0 12px rgba(0,0,0,0.7)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      {/* 兵器剪影（背景层） */}
      <div style={{ position: "absolute", opacity: 0.34, color: glow }}>
        <WeaponIcon name={img.icon} size={Math.round(size * 0.72)} />
      </div>
      {/* 姓氏汉字 */}
      <span
        style={{
          position: "relative",
          fontFamily: FONT_KAI,
          fontSize: gs,
          fontWeight: 700,
          color: "#FFF8EC",
          textShadow: `0 2px 6px rgba(0,0,0,0.9), 0 0 12px ${main}88`,
          lineHeight: 1,
        }}
      >
        {img.glyph}
      </span>
      {/* 顶部高光 */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          background:
            "linear-gradient(160deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 38%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
};
