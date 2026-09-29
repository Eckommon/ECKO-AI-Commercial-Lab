import {execFileSync,spawnSync} from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const round6=(value)=>Number(value.toFixed(6));
const rationale='The governed render command requests Remotion --color-space=bt709. This toolchain emits yuv420p with explicit limited range and BT.709 matrix but omits transfer and primaries; accept that omission only for this exact limited-range profile, then re-encode through the explicit BT.709 limited mastering filter.';
const videoStream=(probe,label)=>{const video=probe.streams?.find((stream)=>stream.codec_type==='video');if(!video)throw new Error(`${label} requires a video stream`);return video;};
const rate=(fps)=>`${fps}/1`;

export const validateIntermediateProbe=(probe,config)=>{
  const video=videoStream(probe,'Intermediate probe');
  if(video.codec_name!=='h264')throw new Error('Intermediate video codec requires H.264');
  if(video.width!==config.width||video.height!==config.height)throw new Error(`Intermediate resolution requires ${config.width}x${config.height}`);
  if(video.r_frame_rate!==rate(config.fps)||video.avg_frame_rate!==rate(config.fps))throw new Error(`Intermediate frame rate requires constant ${rate(config.fps)}`);
  if(video.nb_frames!==String(config.frames))throw new Error(`Intermediate frames require exactly ${config.frames}`);
  if(Number(video.duration)!==config.duration)throw new Error(`Intermediate duration requires ${config.duration.toFixed(6)} seconds`);
  if(video.pix_fmt!=='yuv420p')throw new Error('Intermediate pixel format requires yuv420p');
  if(video.color_range!=='pc'&&video.color_range!=='tv')throw new Error(`Intermediate color range is ambiguous or unsupported: ${video.color_range??'missing'}`);
  if(video.color_space!=='bt709')throw new Error(`Intermediate color matrix requires bt709: ${video.color_space??'missing'}`);
  const colorTransfer=video.color_transfer??null,colorPrimaries=video.color_primaries??null;
  const explicit=colorTransfer==='bt709'&&colorPrimaries==='bt709';
  const controlled=video.color_range==='tv'&&colorTransfer===null&&colorPrimaries===null;
  if(!explicit&&!controlled){if(colorTransfer!=='bt709')throw new Error(`Intermediate color transfer is unsupported: ${colorTransfer??'missing'}`);throw new Error(`Intermediate color primaries is unsupported: ${colorPrimaries??'missing'}`);}
  return {pixFmt:video.pix_fmt,colorRange:video.color_range,colorSpace:video.color_space,colorTransfer,colorPrimaries,signalingProfile:controlled?'controlled-remotion-bt709-limited':'explicit-bt709',frameRate:video.r_frame_rate,averageFrameRate:video.avg_frame_rate,width:video.width,height:video.height,frames:video.nb_frames,duration:Number(video.duration)};
};

export const validateMediaProbe=(probe,config)=>{
  const video=videoStream(probe,'Final probe');const audio=probe.streams.find((stream)=>stream.codec_type==='audio');
  if(video.codec_name!=='h264')throw new Error('Video codec contract requires H.264');
  if(video.width!==config.width||video.height!==config.height)throw new Error(`Resolution contract requires ${config.width}x${config.height}`);
  if(video.r_frame_rate!==rate(config.fps)||video.avg_frame_rate!==rate(config.fps))throw new Error(`FPS contract requires constant ${rate(config.fps)}`);
  if(video.nb_frames!==String(config.frames))throw new Error(`Frames contract requires exactly ${config.frames}`);
  if(Number(video.duration)!==config.duration)throw new Error(`Video duration contract requires ${config.duration.toFixed(6)} seconds`);
  if(video.pix_fmt!=='yuv420p')throw new Error('Pixel format contract requires yuv420p');
  if(video.color_range!=='tv'||video.color_space!=='bt709'||video.color_transfer!=='bt709'||video.color_primaries!=='bt709')throw new Error('Color contract requires limited-range BT.709 matrix/transfer/primaries');
  if(!audio||audio.codec_name!=='aac'||audio.sample_rate!=='48000'||audio.channels!==2||audio.channel_layout!=='stereo')throw new Error('Stereo audio sample rate contract requires 48 kHz two-channel AAC');
  const videoDuration=Number(video.duration),audioDuration=Number(audio.duration),containerDuration=Number(probe.format?.duration);
  if(!Number.isFinite(videoDuration))throw new Error('Video duration must be finite');
  if(!Number.isFinite(audioDuration))throw new Error('Audio duration must be finite');
  if(!Number.isFinite(containerDuration))throw new Error('Container duration must be finite');
  const audioPadding=round6(audioDuration-videoDuration),containerPadding=round6(containerDuration-videoDuration);
  const limits=config.finalDurationPadding;
  if(!limits)throw new Error('Campaign mastering config requires final duration padding limits');
  if(audioPadding<limits.audioMin||audioPadding>limits.audioMax)throw new Error(`Audio duration padding ${audioPadding} is outside ${limits.audioMin}..${limits.audioMax} seconds`);
  if(containerPadding<limits.containerMin||containerPadding>limits.containerMax)throw new Error(`Container duration padding ${containerPadding} is outside ${limits.containerMin}..${limits.containerMax} seconds`);
  return {videoDuration,audioDuration,containerDuration,audioPadding,containerPadding};
};

export const buildFinalizeArgs=(input,output,probe,config)=>{
  const inputColor=validateIntermediateProbe(probe,config);
  const filter=`scale=in_range=${inputColor.colorRange}:out_range=tv:in_color_matrix=bt709:out_color_matrix=bt709,format=yuv420p,setparams=range=limited:color_primaries=bt709:color_trc=bt709:colorspace=bt709`;
  return ['-y','-v','error','-i',input,'-map','0:v:0','-map','0:a:0','-vf',filter,'-c:v','libx264','-preset','medium','-crf','18','-r',String(config.fps),'-frames:v',String(config.frames),'-color_range','tv','-colorspace','bt709','-color_trc','bt709','-color_primaries','bt709','-c:a','aac','-b:a','192k','-ar','48000','-af','loudnorm=I=-16:LRA=11:TP=-1.2','-t',String(config.duration),'-movflags','+faststart',output];
};

const probeArgs=['-v','error','-show_entries','stream=index,codec_type,codec_name,width,height,r_frame_rate,avg_frame_rate,duration,nb_frames,pix_fmt,color_range,color_space,color_transfer,color_primaries,sample_rate,channels,channel_layout:format=duration,size,bit_rate,format_name,tags','-of','json'];
export const finalizeCampaign=({root=process.cwd(),execute=execFileSync,config})=>{
  const input=path.join(root,config.input),output=path.join(root,config.output),evidence=path.join(root,config.evidence);
  if(!fs.existsSync(input))throw new Error(`Missing render input ${input}`);fs.mkdirSync(evidence,{recursive:true});
  const intermediateProbe=JSON.parse(execute('ffprobe',[...probeArgs,input],{encoding:'utf8'}));fs.writeFileSync(path.join(evidence,'ffprobe-intermediate.json'),`${JSON.stringify(intermediateProbe,null,2)}\n`);
  const inputColor=validateIntermediateProbe(intermediateProbe,config);const args=buildFinalizeArgs(input,output,intermediateProbe,config);
  fs.writeFileSync(path.join(evidence,'color-conversion.json'),`${JSON.stringify({input:inputColor,signalingBasis:inputColor.signalingProfile==='controlled-remotion-bt709-limited'?rationale:'The intermediate explicitly signals BT.709 matrix, transfer, primaries, and pc/full or tv/limited range.',decision:`${inputColor.colorRange} range BT.709 to limited range BT.709`,videoFilter:args[args.indexOf('-vf')+1]},null,2)}\n`);
  execute('ffmpeg',args);
  const probe=JSON.parse(execute('ffprobe',[...probeArgs,output],{encoding:'utf8'}));fs.writeFileSync(path.join(evidence,'ffprobe-final.json'),`${JSON.stringify(probe,null,2)}\n`);
  const durations=validateMediaProbe(probe,config);const bytes=fs.readFileSync(output);const moov=bytes.indexOf(Buffer.from('moov')),mdat=bytes.indexOf(Buffer.from('mdat'));if(moov<0||mdat<0||moov>mdat)throw new Error('Faststart contract failed: moov atom does not precede mdat');
  execute('ffmpeg',['-v','error','-i',output,'-map','0:v:0','-map','0:a:0','-f','null','-']);
  const loudnessResult=spawnSync('ffmpeg',['-hide_banner','-nostats','-i',output,'-filter_complex','ebur128=peak=true','-f','null','-'],{encoding:'utf8'});if(loudnessResult.status!==0)throw new Error(`Loudness measurement failed: ${loudnessResult.stderr}`);
  fs.writeFileSync(path.join(evidence,'durations.json'),`${JSON.stringify(durations,null,2)}\n`);fs.writeFileSync(path.join(evidence,'loudness.txt'),loudnessResult.stderr);fs.writeFileSync(path.join(evidence,'decode.txt'),'PASS: full video and audio stream decode\n');
  return {output,evidence,intermediateProbe,inputColor,probe,durations,loudness:loudnessResult.stderr};
};
