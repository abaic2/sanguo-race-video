import raw from "./data/raceData.json";
import { CHAPTER_COUNT, IMPORTANT_CHAPTERS, ANIMATION_DURATION,
         INTRO_DURATION, OUTRO_DURATION } from "./config";

export interface CharacterInfo {
  name: string;
  style: string;
  total: number;
}

export interface ChapterInfo {
  n: number;
  short: string;
  title: string;
  cum: Record<string, number>;
  add: Record<string, number>;
}

export const CHARACTERS: CharacterInfo[] = raw.characters;
export const CHAPTERS: ChapterInfo[] = raw.chapters as unknown as ChapterInfo[];
export const META = raw.meta;

/** 回目简称（第 N 回 -> 简称），供章节水印与 HUD 展示 */
export const CHAPTER_SHORT: Record<number, string> = {};
CHAPTERS.forEach((c) => (CHAPTER_SHORT[c.n] = c.short));

/* --------------------------- 人物索引 --------------------------- */
export const NAMES: string[] = CHARACTERS.map((c) => c.name);
export const NAME_INDEX: Record<string, number> = {};
NAMES.forEach((n, i) => (NAME_INDEX[n] = i));
export const STYLE_OF: Record<string, string> = {};
CHARACTERS.forEach((c) => (STYLE_OF[c.name] = c.style));

/* --------------------------- 累计次数矩阵 --------------------------- */
const NP = NAMES.length;

/** CUM[c] = 第 c+1 回结束时的累计次数（Float64Array，按 NAMES 顺序） */
export const CUM: Float64Array[] = [];
const zero = new Float64Array(NP);
for (let c = 0; c < CHAPTER_COUNT; c++) {
  const arr = new Float64Array(NP);
  const src = CHAPTERS[c]?.cum ?? {};
  for (let i = 0; i < NP; i++) arr[i] = src[NAMES[i]] ?? 0;
  CUM.push(arr);
}

/** 当章新增次数 */
export const ADD: Float64Array[] = [];
for (let c = 0; c < CHAPTER_COUNT; c++) {
  const arr = new Float64Array(NP);
  const src = CHAPTERS[c]?.add ?? {};
  for (let i = 0; i < NP; i++) arr[i] = src[NAMES[i]] ?? 0;
  ADD.push(arr);
}

/* --------------------------- 时间轴 --------------------------- */
/** 每一回占用的帧数 */
export const CHAPTER_FRAMES: number[] = [];
/** 每一回在"赛跑主体"时间轴上的起始帧（主体第 0 帧 = 第 1 回开始） */
export const CHAPTER_STARTS: number[] = [];
{
  let acc = 0;
  for (let c = 1; c <= CHAPTER_COUNT; c++) {
    CHAPTER_STARTS.push(acc);
    const f = IMPORTANT_CHAPTERS[c] ?? ANIMATION_DURATION;
    CHAPTER_FRAMES.push(f);
    acc += f;
  }
}

export const RACE_DURATION = CHAPTER_FRAMES.reduce((a, b) => a + b, 0);
export const TOTAL_DURATION = INTRO_DURATION + RACE_DURATION + OUTRO_DURATION;

export interface RaceProgress {
  /** 浮点章节进度：0 = 第1回开始，119.5 = 第120回过半，120 = 全书结束 */
  pos: number;
  /** 当前所处回目（1-based，整数） */
  chapter: number;
  /** 本章内部进度 0→1 */
  t: number;
}

export function getProgress(frameInRace: number): RaceProgress {
  const f = Math.max(0, Math.min(RACE_DURATION - 1, frameInRace));
  // 线性定位所在章节
  let idx = 0;
  while (idx < CHAPTER_COUNT - 1 && f >= CHAPTER_STARTS[idx] + CHAPTER_FRAMES[idx]) {
    idx++;
  }
  const start = CHAPTER_STARTS[idx];
  const dur = CHAPTER_FRAMES[idx];
  const t = Math.max(0, Math.min(1, (f - start) / dur));
  return { pos: idx + t, chapter: idx + 1, t };
}

/* --------------------------- 插值 / 排名 --------------------------- */
/** 取浮点章节进度下每个人的累计次数 */
export function valuesAt(pos: number): Float64Array {
  const clamped = Math.max(0, Math.min(CHAPTER_COUNT, pos));
  const i = Math.min(CHAPTER_COUNT - 1, Math.floor(clamped));
  const t = clamped - i;
  const prev = i === 0 ? zero : CUM[i - 1];
  const next = CUM[i];
  const out = new Float64Array(NP);
  for (let k = 0; k < NP; k++) out[k] = prev[k] + (next[k] - prev[k]) * t;
  return out;
}

/**
 * 软排名（soft rank）：用 sigmoid 对"落后于我的人数"求和，
 * 使名次随数值连续变化，交叉时平滑超越而非瞬间跳位。
 */
export function softRanks(values: Float64Array, tau = 6): Float64Array {
  const ranks = new Float64Array(NP);
  for (let i = 0; i < NP; i++) {
    let r = 1;
    const vi = values[i];
    for (let j = 0; j < NP; j++) {
      if (i === j) continue;
      const d = (values[j] - vi) / tau;
      r += 1 / (1 + Math.exp(-d));
    }
    ranks[i] = r;
  }
  return ranks;
}

/** 按软排名升序返回人物索引数组 */
export function orderBy(ranks: Float64Array): number[] {
  const idx = Array.from({ length: NP }, (_, i) => i);
  idx.sort((a, b) => ranks[a] - ranks[b] || (STYLE_OF[NAMES[a]] ? 0 : 0));
  return idx;
}
