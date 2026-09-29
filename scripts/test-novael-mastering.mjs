import assert from 'node:assert/strict';
import {buildFinalizeArgs,validateIntermediateProbe,validateMediaProbe} from './mastering.mjs';
import {NOVAEL_MASTERING} from './finalize_novael.mjs';

const probe=(range='tv',frames='900',duration='30.000000')=>({streams:[
  {codec_type:'video',codec_name:'h264',width:1080,height:1920,r_frame_rate:'30/1',avg_frame_rate:'30/1',duration,nb_frames:frames,pix_fmt:'yuv420p',color_range:range,color_space:'bt709',color_transfer:undefined,color_primaries:undefined},
  {codec_type:'audio',codec_name:'aac',sample_rate:'48000',channels:2,channel_layout:'stereo',duration},
],format:{duration}});

assert.deepEqual(validateIntermediateProbe(probe(),NOVAEL_MASTERING).frames,'900');
const args=buildFinalizeArgs('in.mp4','out.mp4',probe(),NOVAEL_MASTERING).join(' ');
assert.match(args,/-frames:v 900/);
assert.match(args,/-t 30/);
assert.match(args,/in_range=tv:out_range=tv/);
assert.throws(()=>validateIntermediateProbe(probe('unknown'),NOVAEL_MASTERING),/range/i);
assert.throws(()=>validateIntermediateProbe(probe('tv','899'),NOVAEL_MASTERING),/frames/i);
assert.throws(()=>validateIntermediateProbe(probe('tv','900','30.1'),NOVAEL_MASTERING),/duration/i);

const final=probe();
final.streams[0].color_transfer='bt709';final.streams[0].color_primaries='bt709';
assert.equal(validateMediaProbe(final,NOVAEL_MASTERING).videoDuration,30);
final.streams[0].nb_frames='901';
assert.throws(()=>validateMediaProbe(final,NOVAEL_MASTERING),/frames/i);
final.streams[0].nb_frames='900';
final.streams[1].duration='29.000000';
assert.throws(()=>validateMediaProbe(final,NOVAEL_MASTERING),/audio duration|padding/i);
final.streams[1].duration='30.000000';
final.format.duration='31.000000';
assert.throws(()=>validateMediaProbe(final,NOVAEL_MASTERING),/container duration|padding/i);
final.format.duration='not-a-number';
assert.throws(()=>validateMediaProbe(final,NOVAEL_MASTERING),/container duration|finite/i);
console.log('PASS: NOVAEL campaign-driven 900-frame / 30-second mastering contract');
