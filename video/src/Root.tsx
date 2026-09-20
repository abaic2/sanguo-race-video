import React from "react";
import {
  AbsoluteFill, Audio, Composition, Sequence, staticFile, interpolate,
} from "remotion";
import {
  VIDEO_WIDTH, VIDEO_HEIGHT, FPS, BACKGROUND_COLOR, MUSIC_PATH,
  INTRO_DURATION, OUTRO_DURATION,
} from "./config";
import { RACE_DURATION, TOTAL_DURATION } from "./data";
import { IntroScene } from "./Intro";
import { RaceScene } from "./Race";
import { OutroScene } from "./Outro";

const Main: React.FC = () => {
  const outroStart = INTRO_DURATION + RACE_DURATION;

  return (
    <AbsoluteFill style={{ backgroundColor: BACKGROUND_COLOR }}>
      {/* 背景音乐（程序化合成的史诗纯音乐，无版权风险） */}
      <Audio
        src={staticFile(MUSIC_PATH)}
        volume={(f: number) =>
          Math.min(
            0.62,
            interpolate(f, [0, 45], [0, 0.62], { extrapolateRight: "clamp" }) *
              interpolate(f, [TOTAL_DURATION - 90, TOTAL_DURATION - 10], [1, 0.25], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              })
          )
        }
      />

      {/* 片头 */}
      <Sequence from={0} durationInFrames={INTRO_DURATION} name="片头">
        <IntroScene />
      </Sequence>

      {/* 主体：第 1 回 → 第 120 回 */}
      <Sequence from={INTRO_DURATION} durationInFrames={RACE_DURATION} name="120回赛跑">
        <RaceScene />
      </Sequence>

      {/* 片尾定格 */}
      <Sequence from={outroStart} durationInFrames={OUTRO_DURATION} name="最终排行榜">
        <OutroScene />
      </Sequence>
    </AbsoluteFill>
  );
};

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="SanguoRace"
      component={Main}
      durationInFrames={TOTAL_DURATION}
      fps={FPS}
      width={VIDEO_WIDTH}
      height={VIDEO_HEIGHT}
    />
  </>
);
