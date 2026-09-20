# -*- coding: utf-8 -*-
"""
纯标准库合成《三国演义》史诗感 BGM（零第三方依赖）。

输出 video/public/bgm.wav：单声道 22050Hz，约 250 秒，无人声。
设计要点：
  · 鼓点对齐每章切换时刻（与视频中人物排名变化同步）
  · 重要章节额外加花（军鼓 + 堂鼓滚奏）
  · 五段叙事情绪：序幕(缓) → 群雄逐鹿(起) → 赤壁鼎立(强) → 北伐(紧) → 归晋(收)
  · 低音弦乐持续音(drone) + 古筝/笛式五声音阶旋律 + 中国大鼓
"""
import math, os, random, wave

# ───────────── 时间线（与 src/config.ts 保持一致） ─────────────
FPS = 30
ANIMATION_DURATION = 48
INTRO = 135
OUTRO = 240
IMPORTANT = {
    1: 110, 5: 105, 19: 95, 27: 95, 30: 105, 37: 110, 41: 100, 42: 95, 46: 95,
    49: 105, 50: 110, 60: 90, 65: 90, 74: 90, 76: 110, 81: 95, 84: 105, 85: 110,
    90: 100, 91: 95, 95: 100, 103: 100, 104: 120, 117: 100, 120: 130,
}

SR = 22050
random.seed(20260920)

durs = [IMPORTANT.get(ch, ANIMATION_DURATION) for ch in range(1, 121)]
race_frames = sum(durs)
total_frames = INTRO + race_frames + OUTRO
total_sec = total_frames / FPS
N = int(total_sec * SR)
buf = [0.0] * N
print(f"章节帧={race_frames} 总帧={total_frames} 总秒={total_sec:.1f} 采样={N}")

# 每章切换时刻（秒），从片头结束后起算
chapter_times = []
t = INTRO / FPS
for d in durs:
    chapter_times.append(t)
    t += d / FPS

# ───────────── 基础合成原语 ─────────────
def midi_to_freq(m):
    return 440.0 * (2.0 ** ((m - 69) / 12.0))

def add_drone(start_s, end_s, root_freq, amp=0.10):
    s0, e1 = int(start_s * SR), int(end_s * SR)
    if s0 >= N:
        return
    for i in range(s0, min(e1, N)):
        tt = i / SR
        v = math.sin(2 * math.pi * root_freq * tt)
        v += 0.5 * math.sin(2 * math.pi * root_freq * 1.5 * tt)        # 纯五度
        v += 0.38 * math.sin(2 * math.pi * root_freq * 2.0 * tt)       # 八度
        v *= 0.82 + 0.18 * math.sin(2 * math.pi * 0.13 * tt)           # 缓慢起伏
        buf[i] += amp * v

def add_note(start_s, dur_s, freq, amp, wave="tri", decay=None):
    s0 = int(start_s * SR)
    n = int(dur_s * SR)
    if decay is None:
        decay = dur_s * 0.85
    for i in range(n):
        idx = s0 + i
        if idx >= N:
            break
        tt = i / SR
        env = min(tt / 0.012, 1.0) * math.exp(-tt / decay)
        ph = 2 * math.pi * freq * tt
        if wave == "tri":
            v = 2.0 / math.pi * math.asin(math.sin(ph))
        elif wave == "saw":
            v = 2.0 * (ph / (2 * math.pi) - math.floor(0.5 + ph / (2 * math.pi)))
        else:
            v = math.sin(ph)
        buf[idx] += amp * env * v

def kick(start_s, amp=0.95):
    s0 = int(start_s * SR)
    n = int(0.20 * SR)
    for i in range(n):
        idx = s0 + i
        if idx >= N:
            break
        tt = i / SR
        f = 125 * math.exp(-tt / 0.045) + 46
        buf[idx] += amp * math.exp(-tt / 0.105) * math.sin(2 * math.pi * f * tt)

def snare(start_s, amp=0.5):
    s0 = int(start_s * SR)
    n = int(0.17 * SR)
    for i in range(n):
        idx = s0 + i
        if idx >= N:
            break
        tt = i / SR
        buf[idx] += amp * math.exp(-tt / 0.055) * (random.random() * 2 - 1)
        buf[idx] += amp * 0.35 * math.exp(-tt / 0.04) * math.sin(2 * math.pi * 190 * tt)

def tom(start_s, amp=0.5, f0=95):
    s0 = int(start_s * SR)
    n = int(0.22 * SR)
    for i in range(n):
        idx = s0 + i
        if idx >= N:
            break
        tt = i / SR
        buf[idx] += amp * math.exp(-tt / 0.12) * math.sin(2 * math.pi * (f0 * math.exp(-tt / 0.05)) * tt)

def tick(start_s, amp=0.16, f0=320):
    s0 = int(start_s * SR)
    n = int(0.05 * SR)
    for i in range(n):
        idx = s0 + i
        if idx >= N:
            break
        tt = i / SR
        buf[idx] += amp * math.exp(-tt / 0.02) * math.sin(2 * math.pi * f0 * tt)

# ───────────── 低音持续音（五段配根音） ─────────────
# C2=65.4 / G2=98 / A2=110 / F2=87.3 / C2 收束
add_drone(0.0, 18.0, midi_to_freq(36), amp=0.085)      # C2 序幕
add_drone(18.0, 95.0, midi_to_freq(40), amp=0.10)      # E2 起势
add_drone(95.0, 150.0, midi_to_freq(45), amp=0.115)    # A2 鼎立(强)
add_drone(150.0, 215.0, midi_to_freq(41), amp=0.10)    # F2 北伐(紧)
add_drone(215.0, total_sec, midi_to_freq(36), amp=0.10)  # C2 归晋

# ───────────── 五声音阶旋律（对齐章节） ─────────────
# C 大调五声：半音 [0,2,4,7,9]
PENTA = [0, 2, 4, 7, 9]

def phase_of(time_s):
    if time_s < 18:   return 0   # 序幕
    if time_s < 95:   return 1   # 群雄逐鹿
    if time_s < 150:  return 2   # 赤壁鼎立
    if time_s < 215:  return 3   # 北伐
    return 4                    # 归晋

# 各段：旋律八度基准(midi) / 是否每章都发声 / 音符时值(s)
PHASE_CFG = {
    0: (72, False, 1.4),   # 笛式高音，稀疏
    1: (69, True, 0.9),    # 起势，每章
    2: (69, True, 0.7),    # 鼎立，快
    3: (64, True, 0.5),    # 北伐，低紧
    4: (67, True, 1.1),    # 归晋，下行收束
}
DEGREE_WALK = [0, 2, 1, 3, 2, 4, 3, 1, 2, 0, 4, 3, 1, 2, 0, 3, 4, 2, 1, 0]
di = 0
for ci, ct in enumerate(chapter_times):
    ph = phase_of(ct)
    base_midi, every, ndur = PHASE_CFG[ph]
    ch_no = ci + 1
    important = ch_no in IMPORTANT
    # 序幕段隔章发声
    if ph == 0 and (ci % 2 == 1):
        continue
    deg = DEGREE_WALK[di % len(DEGREE_WALK)]
    di += 1
    # 阶段内略微上下行
    oct_shift = 0
    if ph == 4:
        oct_shift = -((ci // 6) % 2) * 12   # 归晋段慢慢下行
    freq = midi_to_freq(base_midi + PENTA[deg] + oct_shift)
    # 重要章节用三角波(更亮)，普通用更柔
    wave_type = "tri" if important else "sine"
    amp = 0.30 if important else 0.22
    add_note(ct + 0.04, ndur, freq, amp, wave=wave_type)
    # 重要章节叠一个高八度点缀
    if important and ph in (1, 2):
        add_note(ct + 0.10, ndur * 0.6, freq * 2.0, 0.14, wave="tri")

# ───────────── 打击乐：与章节切换同步 ─────────────
for ci, ct in enumerate(chapter_times):
    ph = phase_of(ct)
    ch_no = ci + 1
    important = ch_no in IMPORTANT
    ch_dur_s = durs[ci] / FPS
    # 每章一记底鼓
    kick(ct, amp=1.0 if important else 0.78)
    # 重要章节：军鼓 + 堂鼓
    if important:
        snare(ct + 0.001, amp=0.55)
        tom(ct + 0.06, amp=0.5, f0=92)
        # 章内滚奏（堂鼓）
        if ch_dur_s > 2.6:
            for k in range(1, 5):
                tom(ct + ch_dur_s * (0.25 + 0.12 * k), amp=0.32, f0=110)
    # 强段(2/3)与紧段(4)：章内补拍
    if ph in (2, 3) and ch_dur_s > 2.2:
        kick(ct + ch_dur_s * 0.5, amp=0.6)
    # 北伐段(4)：八分脉冲推动
    if ph == 3:
        step = 0.27 if ch_dur_s > 2.0 else 0.34
        tt = ct + step
        while tt < ct + ch_dur_s - 0.05:
            tick(tt, amp=0.13)
            tt += step
    # 鼎立段(2)：稳定军鼓拍点
    if ph == 2 and ch_dur_s > 2.2:
        snare(ct + ch_dur_s * 0.5, amp=0.32)

# ───────────── 收束：归晋段一句长低音和弦 ─────────────
if chapter_times:
    last = chapter_times[-1]
    add_note(last + 0.05, 6.0, midi_to_freq(48), 0.20, wave="sine", decay=5.0)  # C3
    add_note(last + 0.05, 6.0, midi_to_freq(55), 0.16, wave="sine", decay=5.0)  # G3
    add_note(last + 0.05, 6.0, midi_to_freq(60), 0.12, wave="sine", decay=5.0)  # C4

# ───────────── 淡入/淡出 + 归一化 ─────────────
fade_in = int(2.0 * SR)
fade_out = int(3.0 * SR)
for i in range(fade_in):
    buf[i] *= i / fade_in
for i in range(fade_out):
    buf[N - 1 - i] *= i / fade_out

peak = max((abs(x) for x in buf), default=1.0) or 1.0
gain = 0.92 / peak
for i in range(N):
    buf[i] *= gain

# ───────────── 写 WAV ─────────────
out_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "video", "public")
os.makedirs(out_dir, exist_ok=True)
out_path = os.path.join(out_dir, "bgm.wav")
with wave.open(out_path, "w") as w:
    w.setnchannels(1)
    w.setsampwidth(2)
    w.setframerate(SR)
    frames = bytearray()
    for x in buf:
        v = int(max(-1.0, min(1.0, x)) * 32767)
        frames += v.to_bytes(2, "little", signed=True)
    w.writeframes(bytes(frames))

print(f"BGM 已生成：{out_path}  ({total_sec:.1f}s, peak={peak:.3f})")
