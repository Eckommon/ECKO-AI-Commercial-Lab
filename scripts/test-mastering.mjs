import assert from 'node:assert/strict';
import {buildFinalizeArgs, validateMediaProbe} from './finalize_aurora.mjs';

assert.match(buildFinalizeArgs('in.mp4','out.mp4').join(' '), /setparams=.*color_primaries=bt709.*color_trc=bt709.*colorspace=bt709/);
assert.match(buildFinalizeArgs('in.mp4','out.mp4').join(' '), /loudnorm=I=-16:LRA=11:TP=-1\.2/);
assert.match(buildFinalizeArgs('in.mp4','out.mp4').join(' '), /-ar 48000/);

const good = {
  streams: [
    {codec_type:'video', codec_name:'h264', width:1080, height:1920, r_frame_rate:'30/1', avg_frame_rate:'30/1', duration:'40.000000', nb_frames:'1200', pix_fmt:'yuv420p', color_range:'tv', color_space:'bt709', color_transfer:'bt709', color_primaries:'bt709'},
    {codec_type:'audio', codec_name:'aac', sample_rate:'48000', channels:2, channel_layout:'stereo', duration:'40.021333'},
  ],
  format: {duration:'40.022000', tags:{major_brand:'isom'}},
};
assert.deepEqual(validateMediaProbe(good), {videoDuration:40, audioDuration:40.021333, containerDuration:40.022, audioPadding:.021333, containerPadding:.022});
for (const [field, mutate] of [
  ['frames', x => x.streams[0].nb_frames='1199'], ['fps', x => x.streams[0].r_frame_rate='24/1'],
  ['resolution', x => x.streams[0].width=720], ['pixel format', x => x.streams[0].pix_fmt='yuv444p'],
  ['color', x => x.streams[0].color_space='unknown'], ['stereo', x => x.streams[1].channels=1],
  ['sample rate', x => x.streams[1].sample_rate='96000'],
]) {
  const bad = structuredClone(good); mutate(bad);
  assert.throws(() => validateMediaProbe(bad), new RegExp(field, 'i'));
}
console.log('PASS: mastering metadata contract rejects delivery drift');
