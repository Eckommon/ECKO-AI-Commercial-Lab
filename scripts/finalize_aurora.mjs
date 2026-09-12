import {execFileSync, spawnSync} from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';

const round6 = (value) => Number(value.toFixed(6));

export const validateMediaProbe = (probe) => {
  const video = probe.streams.find((stream) => stream.codec_type === 'video');
  const audio = probe.streams.find((stream) => stream.codec_type === 'audio');
  if (!video || video.codec_name !== 'h264') throw new Error('Video codec contract requires H.264');
  if (video.width !== 1080 || video.height !== 1920) throw new Error('Resolution contract requires 1080x1920');
  if (video.r_frame_rate !== '30/1' || video.avg_frame_rate !== '30/1') throw new Error('FPS contract requires constant 30/1');
  if (video.nb_frames !== '1200') throw new Error('Frames contract requires exactly 1200');
  if (Number(video.duration) !== 40) throw new Error('Video duration contract requires 40.000000 seconds');
  if (video.pix_fmt !== 'yuv420p') throw new Error('Pixel format contract requires yuv420p');
  if (video.color_range !== 'tv' || video.color_space !== 'bt709' || video.color_transfer !== 'bt709' || video.color_primaries !== 'bt709') {
    throw new Error('Color contract requires limited-range BT.709 matrix/transfer/primaries');
  }
  if (!audio || audio.codec_name !== 'aac' || audio.sample_rate !== '48000' || audio.channels !== 2 || audio.channel_layout !== 'stereo') {
    throw new Error('Stereo audio sample rate contract requires 48 kHz two-channel AAC');
  }
  const videoDuration = Number(video.duration);
  const audioDuration = Number(audio.duration);
  const containerDuration = Number(probe.format.duration);
  return {videoDuration, audioDuration, containerDuration, audioPadding: round6(audioDuration-videoDuration), containerPadding: round6(containerDuration-videoDuration)};
};

const probeArgs = ['-v','error','-show_entries','stream=index,codec_type,codec_name,width,height,r_frame_rate,avg_frame_rate,duration,nb_frames,pix_fmt,color_range,color_space,color_transfer,color_primaries,sample_rate,channels,channel_layout:format=duration,size,bit_rate,format_name,tags','-of','json'];

export const buildFinalizeArgs = (input, output) => ['-y','-v','error','-i',input,'-map','0:v:0','-map','0:a:0','-vf','scale=in_range=pc:out_range=tv:out_color_matrix=bt709,format=yuv420p,setparams=range=limited:color_primaries=bt709:color_trc=bt709:colorspace=bt709','-c:v','libx264','-preset','medium','-crf','18','-r','30','-frames:v','1200','-color_range','tv','-colorspace','bt709','-color_trc','bt709','-color_primaries','bt709','-c:a','aac','-b:a','192k','-ar','48000','-af','loudnorm=I=-16:LRA=11:TP=-1.2','-t','40','-movflags','+faststart',output];

export const finalizeAurora = ({root=process.cwd(), execute=execFileSync}={}) => {
  const outputDir = path.join(root, 'commercials/aurora-cold-brew/output');
  const input = path.join(outputDir, 'aurora-cold-brew-v1-2-render.mp4');
  const output = path.join(outputDir, 'aurora-cold-brew-v1-2.mp4');
  const evidence = path.join(outputDir, 'qa', 'v1-2');
  if (!fs.existsSync(input)) throw new Error(`Missing render input ${input}`);
  fs.mkdirSync(evidence, {recursive:true});
  execute('ffmpeg', buildFinalizeArgs(input, output));
  const probe = JSON.parse(execute('ffprobe',[...probeArgs,output],{encoding:'utf8'}));
  const durations = validateMediaProbe(probe);
  const bytes = fs.readFileSync(output);
  const moov = bytes.indexOf(Buffer.from('moov'));
  const mdat = bytes.indexOf(Buffer.from('mdat'));
  if (moov < 0 || mdat < 0 || moov > mdat) throw new Error('Faststart contract failed: moov atom does not precede mdat');
  execute('ffmpeg',['-v','error','-i',output,'-map','0:v:0','-map','0:a:0','-f','null','-']);
  const loudnessResult = spawnSync('ffmpeg',['-hide_banner','-nostats','-i',output,'-filter_complex','ebur128=peak=true','-f','null','-'],{encoding:'utf8'});
  if (loudnessResult.status !== 0) throw new Error(`Loudness measurement failed: ${loudnessResult.stderr}`);
  const loudness = loudnessResult.stderr;
  fs.writeFileSync(path.join(evidence,'ffprobe.json'), `${JSON.stringify(probe,null,2)}\n`);
  fs.writeFileSync(path.join(evidence,'durations.json'), `${JSON.stringify(durations,null,2)}\n`);
  fs.writeFileSync(path.join(evidence,'loudness.txt'), loudness);
  fs.writeFileSync(path.join(evidence,'decode.txt'), 'PASS: full video and audio stream decode\n');
  return {output,evidence,probe,durations,loudness};
};

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const result = finalizeAurora();
  console.log(`PASS: mastered ${result.output}`);
  console.log(`PASS: video=${result.durations.videoDuration.toFixed(6)}s audio-padding=${result.durations.audioPadding.toFixed(6)}s container-padding=${result.durations.containerPadding.toFixed(6)}s`);
}
