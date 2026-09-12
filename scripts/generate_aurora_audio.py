from pathlib import Path
import json
import math
import os
import random
import struct
import wave

SR = 48000
ROOT = Path(__file__).resolve().parents[1]
OUT = Path(os.environ.get('AURORA_AUDIO_OUT', ROOT / 'commercials/aurora-cold-brew/audio/aurora-bed.wav'))
STORYBOARD = ROOT / 'commercials/aurora-cold-brew/storyboard/storyboard.json'
OUT.parent.mkdir(parents=True, exist_ok=True)

with STORYBOARD.open(encoding='utf-8') as storyboard_file:
    storyboard = json.load(storyboard_file)

DUR = float(storyboard['durationSec'])
CUES = [(float(shot['startSec']), shot['sfx']) for shot in storyboard['shots'] if shot.get('sfx')]

def env(t, a, b, attack=.04, release=.25):
    if t < a or t >= b: return 0.
    if t < a + attack: return (t-a) / attack
    if t > b-release: return max(0., (b-t) / release)
    return 1.

def hit(t, at, freq, decay):
    d = t-at
    return 0. if d < 0 or d > 1.2 else math.sin(2*math.pi*freq*d) * math.exp(-d/decay)

rng_l, rng_r = random.Random(7), random.Random(17)
frames = bytearray()
for i in range(int(SR * DUR)):
    t = i / SR
    bass = .11*math.sin(2*math.pi*55*t) + .045*math.sin(2*math.pi*82.5*t)
    centered = 0.
    for at, name in CUES:
        strength = .46 if name == 'impact-hit' else .13
        frequency = 44 if name == 'impact-hit' else 62
        centered += strength * hit(t, at, frequency, .28 if name == 'impact-hit' else .20)
    tension = env(t, 14.5, 16.0, .25, .06) * .045 * math.sin(2*math.pi*(135 + 70*(t-14.5))*t)
    width = .018 * math.sin(2*math.pi*(510 + 18*math.sin(t*.7))*t)
    air_l = width + (rng_l.random()*2-1)*.006
    air_r = -.72*width + (rng_r.random()*2-1)*.006
    fade = 1. if t < 38 else max(0., (40-t)/2)
    common = (bass + centered + tension) * fade
    left = max(-1., min(1., (common + air_l*fade) * .72))
    right = max(-1., min(1., (common + air_r*fade) * .72))
    frames.extend(struct.pack('<hh', int(left*32767), int(right*32767)))

with wave.open(str(OUT), 'wb') as wav:
    wav.setnchannels(2)
    wav.setsampwidth(2)
    wav.setframerate(SR)
    wav.writeframes(frames)

print(OUT)
