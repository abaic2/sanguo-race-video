import React from "react";

/**
 * 三国人物风格小图标（简笔剪影，线性描边）
 * 统一 48×48 视口，颜色继承 currentColor
 */
export const WeaponIcon: React.FC<{ name: string; size?: number; opacity?: number }> = ({
  name,
  size = 40,
  opacity = 1,
}) => {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 48 48",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2.1,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    opacity,
  };

  switch (name) {
    // 双股剑 / 剑
    case "sword":
      return (
        <svg {...common}>
          <path d="M24 6 l3.2 6.5 v5.5 h-6.4 v-5.5 z" />
          <path d="M14 20 h20" />
          <path d="M24 20 v20" />
          <path d="M21 40 h6" />
          <path d="M20 44 h8" />
        </svg>
      );
    // 青龙偃月刀
    case "blade":
      return (
        <svg {...common}>
          <path d="M8 42 l26 -26" />
          <path d="M31 12 c8 -4 13 2 10 8 c-2 5 -8 8 -13 7" />
          <path d="M33 14 c3 0 5 2 6 4" />
          <path d="M6 44 l4 -4" />
        </svg>
      );
    // 丈八蛇矛 / 长枪
    case "spear":
      return (
        <svg {...common}>
          <path d="M24 4 l4 9 h-8 z" />
          <path d="M24 13 v27" />
          <path d="M18 15 h12" />
          <path d="M20 19 c-2 2 -2 4 0 6 M28 19 c2 2 2 4 0 6" />
          <path d="M21 40 h6" />
        </svg>
      );
    // 方天画戟
    case "halberd":
      return (
        <svg {...common}>
          <path d="M24 4 v40" />
          <path d="M24 8 l3 7 h-6 z" />
          <path d="M14 16 c-3 -3 -8 -2 -8 3 c0 4 5 6 8 4" />
          <path d="M34 16 c3 -3 8 -2 8 3 c0 4 -5 6 -8 4" />
          <path d="M20 32 h8" />
        </svg>
      );
    // 羽扇
    case "fan":
      return (
        <svg {...common}>
          <path d="M24 40 v-10" />
          <path d="M9 28 c0 -11 7 -18 15 -18 c8 0 15 7 15 18 z" />
          <path d="M24 12 v18" />
          <path d="M16 15 l3 16 M32 15 l-3 16" />
        </svg>
      );
    // 弓
    case "bow":
      return (
        <svg {...common}>
          <path d="M32 6 c-12 8 -12 28 0 36" />
          <path d="M32 6 v36" />
          <path d="M32 6 l-6 18 l6 18" />
          <path d="M14 24 h6" />
        </svg>
      );
    // 帅旗（曹）
    case "banner":
      return (
        <svg {...common}>
          <path d="M10 42 v-34" />
          <path d="M10 8 h22 l-5 6 l5 6 h-22" />
          <path d="M10 22 h14" />
          <path d="M7 42 h6" />
        </svg>
      );
    // 王旗 / 诸侯旗
    case "banner2":
      return (
        <svg {...common}>
          <path d="M12 42 v-32" />
          <path d="M12 10 l20 5 l-20 6" />
          <path d="M12 24 h12" />
          <path d="M9 42 h7" />
        </svg>
      );
    // 古琴
    case "zither":
      return (
        <svg {...common}>
          <path d="M6 18 h36 v12 h-36 z" />
          <path d="M6 22 h36 M6 26 h36" />
          <path d="M12 18 v12 M20 18 v12 M28 18 v12 M36 18 v12" />
        </svg>
      );
    // 印玺
    case "seal":
      return (
        <svg {...common}>
          <path d="M14 18 h20 v18 h-20 z" />
          <path d="M20 18 v-6 h8 v6" />
          <path d="M17 26 h6 M25 26 h6" />
          <path d="M17 31 h14" />
        </svg>
      );
    // 太平道符
    case "talisman":
      return (
        <svg {...common}>
          <path d="M17 6 h14 v36 h-14 z" />
          <path d="M24 10 v28" />
          <path d="M19 16 h10 M19 22 h10 M19 28 h10" />
        </svg>
      );
    // 鹰（司马懿）
    case "eagle":
      return (
        <svg {...common}>
          <path d="M24 14 c-10 0 -16 6 -20 14 c8 -2 14 -1 20 2 c6 -3 12 -4 20 -2 c-4 -8 -10 -14 -20 -14 z" />
          <path d="M24 20 c-2 0 -4 2 -4 4 c0 2 2 4 4 4 c2 0 4 -2 4 -4 c0 -2 -2 -4 -4 -4 z" />
          <path d="M24 30 v10" />
          <path d="M18 34 l6 6 l6 -6" />
        </svg>
      );
    // 花（貂蝉）
    case "flower":
      return (
        <svg {...common}>
          <circle cx="24" cy="15" r="5" />
          <circle cx="34" cy="23" r="5" />
          <circle cx="29" cy="34" r="5" />
          <circle cx="19" cy="34" r="5" />
          <circle cx="14" cy="23" r="5" />
          <circle cx="24" cy="24" r="3.5" />
          <path d="M24 39 v6" />
        </svg>
      );
    // 甲胄 / 将军盔
    case "armor":
      return (
        <svg {...common}>
          <path d="M12 20 c0 -7 5 -12 12 -12 c7 0 12 5 12 12 v4 h-24 z" />
          <path d="M12 24 l-3 10 M36 24 l3 10" />
          <path d="M18 34 h12 v6 h-12 z" />
          <path d="M24 8 v-4" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="24" cy="24" r="16" />
          <circle cx="24" cy="24" r="7" />
        </svg>
      );
  }
};
