"""Deterministic original stereo score. No samples, network or external service."""
from pathlib import Path
import hashlib
import json
import wave
import numpy as np

ROOT = Path(__file__).resolve().parents[1]
STORY = json.loads((ROOT / 'commercials/aurora-cold-brew/storyboard/storyboard.json').read_text())
SR = 48000
N = SR * STORY['durationSec']
rng = np.random.default_rng(1001)
t = np.arange(N) / SR
mix = np.zeros((N, 2), dtype=np.float64)

def add(at, sound, gain=1.0, pan=0.0):
    start = round(at * SR)
    if start < 0 or start >= N:
        raise ValueError('Audio cue outside campaign')
    size = min(len(sound), N - start)
    gains = np.array([np.sqrt((1-pan)/2), np.sqrt((1+pan)/2)])
    mix[start:start+size] += sound[:size, None] * gains * gain

def tone(freq, duration, decay, metallic=False):
    x = np.arange(round(duration * SR)) / SR
    env = (1 - np.exp(-x / .008)) * np.exp(-x / decay)
    sound = np.sin(2*np.pi*freq*x) + .28*np.sin(2*np.pi*freq*2*x)
    if metallic:
        sound += .15*np.sin(2*np.pi*freq*2.756*x)
    return sound * env

# D minor / Bb / F / suspended A: slowly opening, then resolving to D.
sections = [(0,7,[55,82.4069,110]),(7,16,[58.2705,87.3071,116.541]),
            (16,21,[65.4064,98,130.813]),(21,32,[55,82.4069,110]),
            (32,36,[73.4162,110,146.832]),(36,40,[55,82.4069,110])]
for start, end, chord in sections:
    x = np.arange(round((end-start)*SR)) / SR
    env = np.minimum(x/.6,1)*np.minimum((end-start-x)/.5,1)
    for k,freq in enumerate(chord):
        pad = np.sin(2*np.pi*freq*x + .18*np.sin(2*np.pi*.13*x))
        pad += .25*np.sin(2*np.pi*(freq*2+.12)*x)
        add(start,pad*env,.035/(1+k*.35),(k-1)*.45)

# A restrained pulse enters after the sensation has been named.
for at in np.arange(7,36,.5):
    dense = 16 <= at < 21
    if 21 <= at < 32 and int(at*2)%2:
        continue
    x = np.arange(round(.32*SR))/SR
    phase = 2*np.pi*(48*x + 6*(1-np.exp(-x*32)))
    kick = np.sin(phase)*np.exp(-x*20)*(1-np.exp(-x*600))
    add(float(at),kick,.18 if dense else .09)
    add(float(at)+.25,tone(880 if dense else 440,.22,.055,True),.018,(-1 if int(at*2)%2 else 1)*.6)

notes = [220,261.6256,329.6276,440,329.6276,261.6256]
for i,at in enumerate(np.arange(11,36,.75)):
    strength = .045 if 16 <= at < 21 else .025
    add(float(at),tone(notes[i%len(notes)],1.1,.28,True),strength,np.sin(i*1.7)*.7)

# Every editorial accent is authored in the same frame clock as the visual cue.
cue_report = []
for shot in STORY['shots']:
    for j,frame in enumerate(shot['cues']):
        at = shot['startSec'] + frame / 30
        cue_report.append({'shot':shot['id'],'frame':round(at*30),'sample':round(at*SR)})
        x = np.arange(round(.85*SR))/SR
        noise = rng.standard_normal(len(x))
        bright = noise - np.concatenate(([noise[0]],noise[:-1]))
        ice = bright * np.exp(-x*24)*(1-np.exp(-x*1500))
        impact = shot['id']=='S05' and j==0
        add(at,ice,.06 if impact else .012,(-.3 if j%2 else .3))
        add(at,tone(46 if impact else 110,.85,.21),.33 if impact else .11)
        add(at,tone(1320 if impact else 660,.65,.13,True),.028, .35)

# Short pressure rise before 16s, releases on the editorial impact.
x = np.arange(round(1.6*SR))/SR
noise = rng.standard_normal(len(x))
air = np.convolve(noise,np.ones(13)/13,mode='same')
add(14.4,air*(x/1.6)**2,.15,-.1)
# Delayed stereo reflection, low enough to keep attacks legible.
delay = round(.19*SR)
mix[delay:,0] += mix[:-delay,1].copy()*.16
mix[delay:,1] += mix[:-delay,0].copy()*.12
mix *= np.minimum(t/.04,1)[:,None]
mix *= np.minimum((40-t)/.32,1)[:,None]
mix = np.tanh(mix*1.7)
mix *= 10**(-1.5/20)/np.max(np.abs(mix))
pcm = np.round(mix*32767).astype('<i2')
out = ROOT/'commercials/aurora-cold-brew/audio/astra-score.wav'
out.parent.mkdir(parents=True,exist_ok=True)
with wave.open(str(out),'wb') as w:
    w.setnchannels(2)
    w.setsampwidth(2)
    w.setframerate(SR)
    w.writeframes(pcm.tobytes())
evidence = ROOT/'artifacts/astra-001'
evidence.mkdir(parents=True,exist_ok=True)
report = {'sampleRate':SR,'samples':N,'channels':2,'duration':40,'peakDbFS':float(20*np.log10(np.max(np.abs(mix)))), 'rmsDbFS':float(20*np.log10(np.sqrt(np.mean(mix**2)))), 'sha256':hashlib.sha256(out.read_bytes()).hexdigest(),'cues':cue_report}
(evidence/'audio-source.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps(report,indent=2))
