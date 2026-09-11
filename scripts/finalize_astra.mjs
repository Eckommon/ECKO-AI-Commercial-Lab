import {spawnSync} from 'node:child_process';
import assert from 'node:assert/strict';
const input='artifacts/astra-001/aurora-astra-master.mp4';
const output='artifacts/astra-001/aurora-astra.mp4';
const probe=spawnSync('ffprobe',['-v','error','-show_streams','-of','json',input],{encoding:'utf8'});
if(probe.status!==0) throw new Error(probe.stderr || 'ffprobe unavailable');
const video=JSON.parse(probe.stdout).streams.find(s=>s.codec_type==='video');
assert.equal(video.width,1080);
assert.equal(video.height,1920);
assert.equal(video.nb_frames,'1200');
assert.equal(video.duration,'40.000000');
assert.equal(video.color_space,'bt709');
// The installed renderer converts to limited-range BT.709 but omits transfer
// and primaries in the final H.264 SPS. Fill the matching metadata, stream-copy
// both streams, and put the MP4 index first. No new lossy encode or timing edit.
const args=['-hide_banner','-v','error','-y','-i',input,'-map','0:v:0','-map','0:a:0','-c','copy','-bsf:v','h264_metadata=colour_primaries=1:transfer_characteristics=1:matrix_coefficients=1:video_full_range_flag=0','-movflags','+faststart',output];
const result=spawnSync('ffmpeg',args,{stdio:'inherit'});
if(result.status!==0) throw new Error('MP4 finalization failed');
console.log('PASS: stream-copy delivery with complete BT.709 tags and faststart');
