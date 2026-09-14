import assert from 'node:assert/strict';
import {buildFinalizeArgs, validateIntermediateProbe, validateMediaProbe} from './finalize_aurora.mjs';

const intermediate = (range) => ({
  streams: [
    {codec_type:'video', codec_name:'h264', width:1080, height:1920, r_frame_rate:'30/1', avg_frame_rate:'30/1', duration:'40.000000', nb_frames:'1200', pix_fmt:'yuv420p', color_range:range, color_space:'bt709', color_transfer:'bt709', color_primaries:'bt709'},
    {codec_type:'audio', codec_name:'aac', sample_rate:'48000', channels:2, channel_layout:'stereo', duration:'40.000000'},
  ],
  format: {duration:'40.000000'},
});

assert.deepEqual(validateIntermediateProbe(intermediate('pc')), {
  pixFmt:'yuv420p', colorRange:'pc', colorSpace:'bt709', colorTransfer:'bt709', colorPrimaries:'bt709',
  signalingProfile:'explicit-bt709', frameRate:'30/1', averageFrameRate:'30/1', width:1080, height:1920, frames:'1200', duration:40,
});
const fullArgs = buildFinalizeArgs('in.mp4','out.mp4',intermediate('pc')).join(' ');
assert.match(fullArgs, /scale=in_range=pc:out_range=tv:in_color_matrix=bt709:out_color_matrix=bt709/);
const limitedArgs = buildFinalizeArgs('in.mp4','out.mp4',intermediate('tv')).join(' ');
assert.match(limitedArgs, /scale=in_range=tv:out_range=tv:in_color_matrix=bt709:out_color_matrix=bt709/);
assert.doesNotMatch(limitedArgs, /in_range=pc/);
assert.match(limitedArgs, /setparams=.*color_primaries=bt709.*color_trc=bt709.*colorspace=bt709/);
assert.match(limitedArgs, /loudnorm=I=-16:LRA=11:TP=-1\.2/);
assert.match(limitedArgs, /-ar 48000/);

const controlledRemotion = intermediate('tv');
controlledRemotion.streams[0].color_transfer = undefined;
controlledRemotion.streams[0].color_primaries = undefined;
assert.deepEqual(validateIntermediateProbe(controlledRemotion), {
  pixFmt:'yuv420p', colorRange:'tv', colorSpace:'bt709', colorTransfer:null, colorPrimaries:null,
  signalingProfile:'controlled-remotion-bt709-limited', frameRate:'30/1', averageFrameRate:'30/1', width:1080, height:1920, frames:'1200', duration:40,
});
assert.match(buildFinalizeArgs('in.mp4','out.mp4',controlledRemotion).join(' '), /in_range=tv:out_range=tv/);

for (const [field, mutate] of [
  ['range', x => x.streams[0].color_range='unknown'],
  ['matrix', x => x.streams[0].color_space='bt470bg'],
  ['transfer', x => x.streams[0].color_transfer='smpte170m'],
  ['primaries', x => x.streams[0].color_primaries='smpte170m'],
  ['primaries', x => x.streams[0].color_primaries=undefined],
  ['transfer', x => {x.streams[0].color_range='pc'; x.streams[0].color_transfer=undefined; x.streams[0].color_primaries=undefined;}],
]) {
  const bad = intermediate('tv'); mutate(bad);
  assert.throws(() => buildFinalizeArgs('in.mp4','out.mp4',bad), new RegExp(field, 'i'));
}

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
