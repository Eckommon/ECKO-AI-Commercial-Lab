from array import array
from pathlib import Path
import hashlib
import os
import subprocess
import tempfile
import wave

ROOT = Path(__file__).resolve().parents[1]

def render(target: Path):
    env = dict(os.environ)
    env['NOVAEL_AUDIO_OUT'] = str(target)
    subprocess.run(['python', str(ROOT / 'scripts/generate_novael_audio.py')], cwd=ROOT, env=env, check=True, capture_output=True)

def rms(samples):
    return (sum(x*x for x in samples) / max(1, len(samples))) ** .5

with tempfile.TemporaryDirectory(prefix='novael-audio-') as tmp:
    first, second = Path(tmp) / 'a.wav', Path(tmp) / 'b.wav'
    render(first); render(second)
    assert hashlib.sha256(first.read_bytes()).digest() == hashlib.sha256(second.read_bytes()).digest(), 'audio must be deterministic'
    with wave.open(str(first), 'rb') as wav:
        assert wav.getnchannels() == 2
        assert wav.getframerate() == 48000
        assert wav.getnframes() == 30 * 48000
        values = array('h', wav.readframes(wav.getnframes()))
    left, right = values[0::2], values[1::2]
    mono = [(l + r) / 2 for l, r in zip(left, right)]
    difference = [l-r for l, r in zip(left, right)]
    assert rms(mono) > 100, 'mono fold-down must retain program energy'
    assert rms(difference) > 10, 'program must retain stereo width'
    def window(at, length):
        return mono[int(at*48000):int((at+length)*48000)]
    def width(at, length):
        return difference[int(at*48000):int((at+length)*48000)]
    assert rms(window(4, .18)) < rms(window(0, .18)) * .65, 'S02 must not receive a discrete cue'
    assert rms(window(17, .18)) < rms(window(12, .18)) * .75, 'S05 must not receive a discrete cue'
    assert rms(window(12.8, .5)) > rms(window(12, .12)) * .7, 'light-rise must sustain rather than behave as a hit'
    assert rms(width(12.8, .5)) > rms(width(8, .18)), 'light-rise must open stereo width beyond sub-hit'
    assert rms(window(18, 3.0)) < rms(window(13, 3.0)) * .75, 'S05 sustained density must be lower than S04'
    assert rms(window(21.5, .4)) <= rms(window(20.0, .4)) * 1.12, 'S05 must not build anticipation into S06'
    assert rms(window(29.9, .1)) < rms(window(28.2, .1)) * .12, 'the complete stereo mix must fade to silence'

print('PASS: NOVAEL deterministic stereo cues / sustained light-rise / S05 density / mono')
