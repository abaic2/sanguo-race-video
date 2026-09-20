import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { BACKGROUND_COLOR, BACKGROUND_COLOR_2, ACCENT_COLOR } from "../config";

/**
 * 深色数据大屏 + 三国历史氛围背景
 * 层次：底色渐变 → 竹简竖纹 → 水墨山河轮廓 → 暗红微光 → 暗角
 * 整体保持低对比，绝不干扰数据阅读
 */
export const Background: React.FC<{ dim?: number }> = ({ dim = 1 }) => {
  const frame = useCurrentFrame();
  const drift = Math.sin(frame / 260) * 14;      // 极缓慢的光晕漂移
  const drift2 = Math.cos(frame / 340) * 10;

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(120% 90% at 22% 12%, #1C1116 0%, ${BACKGROUND_COLOR_2} 42%, ${BACKGROUND_COLOR} 100%)`,
      }}
    >
      {/* 竹简竖纹 */}
      <AbsoluteFill
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(255,255,255,0.014) 0px, rgba(255,255,255,0.014) 1px, rgba(0,0,0,0) 1px, rgba(0,0,0,0) 42px)",
          opacity: 0.9,
        }}
      />
      {/* 宣纸颗粒 */}
      <AbsoluteFill
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.035) 0.5px, transparent 0.5px)",
          backgroundSize: "3px 3px",
          opacity: 0.35,
        }}
      />
      {/* 水墨山河轮廓（远山 / 近山） */}
      <svg
        width={1920}
        height={1080}
        viewBox="0 0 1920 1080"
        style={{ position: "absolute", opacity: 0.5 * dim }}
      >
        <defs>
          <linearGradient id="mtnFar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3A2A22" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#0A0806" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="mtnNear" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#74402A" stopOpacity="0.30" />
            <stop offset="100%" stopColor="#0A0806" stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id="river" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#4A6B7C" stopOpacity="0" />
            <stop offset="45%" stopColor="#5B7F92" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#4A6B7C" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* 远山 */}
        <path
          d="M0 742 L120 690 L236 726 L360 648 L468 706 L592 636 L700 700 L812 660 L940 712 L1064 654 L1180 706 L1300 664 L1420 718 L1540 668 L1660 714 L1780 676 L1920 720 L1920 1080 L0 1080 Z"
          fill="url(#mtnFar)"
        />
        {/* 近山 */}
        <path
          d="M0 848 L160 806 L300 852 L450 800 L600 856 L760 812 L920 862 L1080 818 L1240 866 L1400 820 L1560 864 L1720 826 L1920 858 L1920 1080 L0 1080 Z"
          fill="url(#mtnNear)"
        />
        {/* 江河水带 */}
        <path
          d="M-40 910 C 320 880, 520 940, 820 908 C 1120 876, 1380 936, 1960 902 L1960 946 C 1380 980, 1120 920, 820 952 C 520 984, 320 924, -40 954 Z"
          fill="url(#river)"
        />
        {/* 山脊细线 */}
        <path
          d="M0 742 L120 690 L236 726 L360 648 L468 706 L592 636 L700 700 L812 660 L940 712 L1064 654 L1180 706 L1300 664 L1420 718 L1540 668 L1660 714 L1780 676 L1920 720"
          fill="none"
          stroke={ACCENT_COLOR}
          strokeOpacity="0.13"
          strokeWidth="1.4"
        />
      </svg>

      {/* 暗红 / 金色微光 */}
      <div
        style={{
          position: "absolute",
          left: 180 + drift,
          top: 60 + drift2,
          width: 900,
          height: 700,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(160,40,30,0.16) 0%, rgba(160,40,30,0) 68%)",
          filter: "blur(10px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: -80 - drift,
          bottom: -120 + drift2,
          width: 860,
          height: 640,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(200,164,92,0.10) 0%, rgba(200,164,92,0) 70%)",
          filter: "blur(8px)",
        }}
      />

      {/* 暗角 */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(115% 95% at 50% 45%, rgba(0,0,0,0) 42%, rgba(0,0,0,0.62) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};
