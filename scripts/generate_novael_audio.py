from pathlib import Path
import json, math, os, random, struct, wave

SR=48000
ROOT=Path(__file__).resolve().parents[1]
OUT=Path(os.environ.get('NOVAEL_AUDIO_OUT',ROOT/'commercials/novael-arc/audio/novael-bed.wav'))
with (ROOT/'commercials/novael-arc/storyboard/storyboard.json').open(encoding='utf-8') as source: story=json.load(source)
DUR=float(story['durationSec'])
CUES=[(float(shot['startSec']),shot['sfx']) for shot in story['shots'] if shot.get('sfx')]

def sub_hit(t,at):
    d=t-at
    if d<0 or d>.75:return 0.
    attack=min(1.,d/.025)
    return math.sin(2*math.pi*58*d)*math.exp(-d/.18)*attack

def smoothstep(value):
    value=max(0.,min(1.,value));return value*value*(3-2*value)

OUT.parent.mkdir(parents=True,exist_ok=True)
rng_l,rng_r=random.Random(23),random.Random(47)
frames=bytearray()
for i in range(int(SR*DUR)):
    t=i/SR
    bed_amp=.035 if t<12 else (.055 if t<17 else .018 if t<22 else .032)
    bed=bed_amp*(math.sin(2*math.pi*110*t)+.42*math.sin(2*math.pi*165*t))
    centered=sum(.14*sub_hit(t,at) for at,name in CUES if name=='sub-hit')
    rise_at=next((at for at,name in CUES if name=='light-rise'),None)
    rise=0.;width_gain=0.
    if rise_at is not None and rise_at<=t<17:
        progress=smoothstep((t-rise_at)/2)
        rise=.038*progress*math.sin(2*math.pi*(220+28*progress)*t)
        width_gain=.026*progress
    air=.006
    stereo=width_gain*math.sin(2*math.pi*337*t)+air*((rng_l.random()*2-1)-(rng_r.random()*2-1))
    fade=1. if t<28.2 else max(0.,(30-t)/1.8)
    common=bed+centered+rise
    left=max(-1.,min(1.,(common+stereo)*fade*.82));right=max(-1.,min(1.,(common-stereo*.78)*fade*.82))
    frames.extend(struct.pack('<hh',int(left*32767),int(right*32767)))
with wave.open(str(OUT),'wb') as wav:
    wav.setnchannels(2);wav.setsampwidth(2);wav.setframerate(SR);wav.writeframes(frames)
print(OUT)
