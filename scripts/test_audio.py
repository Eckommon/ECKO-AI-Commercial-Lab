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
    env['AURORA_AUDIO_OUT'] = str(target)
    subprocess.run(['python', str(ROOT / 'scripts/generate_aurora_audio.py')], cwd=ROOT, env=env, check=True, capture_output=True)

def rms(samples):
    return (sum(x*x for x in samples) / max(1, len(samples))) ** .5

with tempfile.TemporaryDirectory(prefix='aurora-audio-') as tmp:
    first, second = Path(tmp) / 'a.wav', Path(tmp) / 'b.wav'
    render(first); render(second)
    assert hashlib.sha256(first.read_bytes()).digest() == hashlib.sha256(second.read_bytes()).digest()
    with wave.open(str(first), 'rb') as wav:
        assert wav.getnchannels() == 2, 'delivery source must be deterministic stereo'
        assert wav.getframerate() == 48000
        assert wav.getnframes() == 40 * 48000
        values = array('h', wav.readframes(wav.getnframes()))
    left, right = values[0::2], values[1::2]
    mono = [(l + r) / 2 for l, r in zip(left, right)]
    assert rms(mono) > 100, 'mono fold-down must retain program energy'
    def window(at, length=.18):
        start, end = int(at * 48000), int((at + length) * 48000)
        return mono[start:end]
    cue_levels = {at: rms(window(at)) for at in [0, 7, 11, 16, 21, 27, 32, 36]}
    assert cue_levels[16] == max(cue_levels.values()), 'S05 must be the strongest transient'
    assert rms(window(3)) < cue_levels[16] * .55, 'S02 must not receive an entry impact'
    impact_start, impact_end = 16 * 48000, int(16.12 * 48000)
    impact_difference = rms([l-r for l, r in zip(left[impact_start:impact_end], right[impact_start:impact_end])])
    impact_mid = rms(mono[impact_start:impact_end])
    assert impact_difference < impact_mid * .35, 'S05 low impact must remain centered'
    assert rms([l-r for l, r in zip(left, right)]) > 10, 'upper texture must have stereo width'

print('PASS: deterministic stereo cue mix / S05 hierarchy / mono compatibility')
