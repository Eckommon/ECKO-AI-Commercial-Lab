"""Collect small reviewable evidence; videos and exhaustive QA stay local."""
from pathlib import Path
import shutil
root=Path(__file__).resolve().parents[1]
dst=root/'docs/astra-evidence'
dst.mkdir(parents=True,exist_ok=True)
for label in ['baseline','final']:
    for name in ['media-report.json','ffprobe.json','overview-1fps.jpg','transitions.jpg','decode.txt','commands.txt']:
        shutil.copyfile(root/'artifacts/astra-001'/label/name,dst/f'{label}-{name}')
shutil.copyfile(root/'artifacts/astra-001/audio-source.json',dst/'audio-source.json')
shutil.copyfile(root/'artifacts/astra-001/validation.log',dst/'validation.txt')
print('Packaged baseline/final metadata, overview, transitions, decode logs and commands')
