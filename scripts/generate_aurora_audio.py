from pathlib import Path
import json
import math
import random
import struct
import wave

SR = 48000
OUT = Path(__file__).resolve().parents[1] / "commercials/aurora-cold-brew/audio/aurora-bed.wav"
STORYBOARD = OUT.parents[1] / "storyboard/storyboard.json"
OUT.parent.mkdir(parents=True, exist_ok=True)
random.seed(7)

with STORYBOARD.open(encoding="utf-8") as storyboard_file:
    storyboard = json.load(storyboard_file)

DUR = float(storyboard["durationSec"])
CUE_TIMES = [float(shot["startSec"]) for shot in storyboard["shots"] if shot.get("sfx")]

def env(t, a, b, attack=0.04, release=0.25):
    if t < a or t >= b:
        return 0.0
    if t < a + attack:
        return (t - a) / attack
    if t > b - release:
        return max(0.0, (b - t) / release)
    return 1.0

def hit(t, at, freq=70, decay=0.45):
    d = t - at
    return 0.0 if d < 0 or d > 1.2 else math.sin(2 * math.pi * freq * d) * math.exp(-d / decay)

frames = []
for i in range(int(SR * DUR)):
    t = i / SR
    pad = (
        0.18 * math.sin(2 * math.pi * 55 * t)
        + 0.09 * math.sin(2 * math.pi * 82.5 * t)
        + 0.05 * math.sin(2 * math.pi * 110 * t)
    )
    pulse = 0.0
    for at in CUE_TIMES:
        pulse += 0.34 * hit(t, at, 58 if at != 16 else 44, 0.38)
    shimmer = 0.035 * math.sin(2 * math.pi * (420 + 20 * math.sin(t * 0.7)) * t)
    rise = env(t, 14.5, 16.2, 0.2, 0.05) * (
        0.09 * math.sin(2 * math.pi * (120 + 120 * (t - 14.5)) * t)
    )
    noise = (random.random() * 2 - 1) * 0.012
    master = 0.66 if t < 36 else max(0.0, 0.66 * (40 - t) / 4)
    x = max(-1, min(1, (pad + pulse + shimmer + rise + noise) * master))
    frames.append(struct.pack("<h", int(x * 32767)))

with wave.open(str(OUT), "wb") as w:
    w.setnchannels(1)
    w.setsampwidth(2)
    w.setframerate(SR)
    w.writeframes(b"".join(frames))

print(OUT)
