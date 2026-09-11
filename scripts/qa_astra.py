"""Independent media inspection and labeled temporal evidence from decoded MP4."""
import argparse
import hashlib
import json
from pathlib import Path
import subprocess
import numpy as np
from PIL import Image, ImageDraw, ImageFont

parser=argparse.ArgumentParser()
parser.add_argument('video',type=Path)
parser.add_argument('--label',required=True)
args=parser.parse_args()
root=Path(__file__).resolve().parents[1]
out=root/'artifacts/astra-001'/args.label
out.mkdir(parents=True,exist_ok=True)
commands=[]

def run(argv):
    commands.append(subprocess.list2cmdline([str(a) for a in argv]))
    result=subprocess.run(argv,stdout=subprocess.PIPE,stderr=subprocess.PIPE)
    if result.returncode:
        raise RuntimeError(result.stderr.decode(errors='replace'))
    return result

probe=json.loads(run(['ffprobe','-v','error','-count_frames','-show_streams','-show_format','-of','json',str(args.video)]).stdout)
(out/'ffprobe.json').write_text(json.dumps(probe,indent=2)+'\n')
v=next(s for s in probe['streams'] if s['codec_type']=='video')
a=next(s for s in probe['streams'] if s['codec_type']=='audio')
assert v['r_frame_rate']=='30/1'
assert v['nb_read_frames']=='1200'
assert v['duration']=='40.000000'
assert v['codec_name']=='h264'
if args.label in ('final','baseline'):
    assert (v['width'],v['height'])==(1080,1920)
if args.label=='final':
    assert v['pix_fmt']=='yuv420p'
    assert v['color_range']=='tv'
    assert all(v.get(k)=='bt709' for k in ['color_space','color_transfer','color_primaries'])
decoded=run(['ffmpeg','-hide_banner','-v','error','-xerror','-i',str(args.video),'-map','0:v:0','-map','0:a:0','-f','null','-'])
(out/'decode.txt').write_text('PASS: full video and audio decode, exit 0\n'+decoded.stderr.decode(errors='replace'))
raw=run(['ffmpeg','-hide_banner','-v','error','-i',str(args.video),'-map','0:v:0','-vf','scale=216:384','-pix_fmt','rgb24','-f','rawvideo','-']).stdout
frames=np.frombuffer(raw,dtype=np.uint8).reshape(-1,384,216,3)
assert len(frames)==1200
gray=frames.astype(np.float32).mean(axis=3)
luma=gray.mean(axis=(1,2))
diff=np.abs(frames[1:].astype(np.float32)-frames[:-1].astype(np.float32)).mean(axis=(1,2,3))
black=np.where(np.mean(gray<12,axis=(1,2))>.995)[0].tolist()
if args.label=='final':
    assert set(black).issubset({1199}), 'Unexpected black gap in delivery'
    assert not np.any(diff==0), 'Unexpected identical adjacent frames'
font=ImageFont.truetype('C:/Windows/Fonts/arial.ttf',16)

def sheet(indices,path,cols=8):
    w,h=216,410
    page=Image.new('RGB',(cols*w,((len(indices)+cols-1)//cols)*h),'#101512')
    draw=ImageDraw.Draw(page)
    for i,n in enumerate(indices):
        x,y=(i%cols)*w,(i//cols)*h
        page.paste(Image.fromarray(frames[n]),(x,y))
        draw.text((x+7,y+388),f'f{n:04d} | {n/30:06.3f}s',font=font,fill='#e8d4aa')
    page.save(path)

sheet(list(range(0,1200,30)),out/'overview-1fps.jpg')
cuts=[90,210,330,480,630,810,960,1080]
transition_frames=[n+d for n in cuts for d in [-6,-3,-1,0,1,3,6,12,20]]
sheet(transition_frames,out/'transitions.jpg',9)
starts=[0]+cuts
ends=cuts+[1200]
for i,(start,end) in enumerate(zip(starts,ends)):
    sheet(list(range(start,end,5)),out/f'beat-{i+1:02d}-6fps.jpg',6)

# Full-resolution product/copy QA from the encoded delivery file.
hero_frames=[60,150,255,400,490,525,720,870,1035,1140,1199]
expr='+'.join(f'eq(n\\,{n})' for n in hero_frames)
run(['ffmpeg','-hide_banner','-v','error','-y','-i',str(args.video),'-vf',f'select={expr}', '-fps_mode','vfr',str(out/'detail-%02d.png')])

audio=run(['ffmpeg','-hide_banner','-v','info','-i',str(args.video),'-map','0:a:0','-af','ebur128=peak=true','-f','null','-']).stderr.decode(errors='replace')
(out/'audio-loudness.txt').write_text(audio)
report={'file':str(args.video.resolve()),'video':{k:v.get(k) for k in ['codec_name','profile','width','height','pix_fmt','r_frame_rate','avg_frame_rate','nb_frames','nb_read_frames','duration','color_range','color_space','color_transfer','color_primaries']},'audio':{k:a.get(k) for k in ['codec_name','sample_rate','channels','duration']},'containerDuration':probe['format']['duration'],'bytes':args.video.stat().st_size,'sha256':hashlib.sha256(args.video.read_bytes()).hexdigest(),'fullDecode':'PASS','sampledFramesForMetrics':1200,'blackFrameCandidates':black,'meanPixelDifference':float(diff.mean()),'maxPixelDifference':float(diff.max()),'identicalAdjacentFrames':np.where(diff==0)[0].tolist(),'perBeatMeanPixelDifference':[float(diff[s:max(s+1,e-1)].mean()) for s,e in zip(starts,ends)],'detailFrameIndices':hero_frames,'commands':commands}
(out/'media-report.json').write_text(json.dumps(report,indent=2)+'\n')
np.savetxt(out/'frame-metrics.csv',np.column_stack([np.arange(1200),luma,np.r_[0,diff]]),delimiter=',',header='frame,mean_rgb,mean_absolute_frame_difference',comments='')
(out/'commands.txt').write_text('\n'.join(commands)+'\n')
print(json.dumps({k:value for k,value in report.items() if k!='commands'},indent=2))
