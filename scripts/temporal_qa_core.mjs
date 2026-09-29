import {execFileSync,spawnSync} from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

export const runTemporalQa=({root=process.cwd(),config,execute=execFileSync,capture=(command,args)=>{const result=spawnSync(command,args,{encoding:'utf8'});if(result.status!==0)throw new Error(`${command} metric failed: ${result.stderr}`);return `${result.stdout}${result.stderr}`;},log=console.log}={})=>{
  const output=path.join(root,config.outputDirectory);const after=path.join(output,config.afterFile);if(!fs.existsSync(after))throw new Error(`Missing required ${config.missingLabel??''}QA input ${after}. Run ${config.renderCommand} first.`);
  const before=config.beforeFile?path.join(output,config.beforeFile):null;const hasBaseline=Boolean(before&&fs.existsSync(before));const mode=hasBaseline?'before-after':'after-only';const qa=path.join(output,'qa',mode);const videos=hasBaseline?{before,after}:{after};if(before&&!hasBaseline)log(`INFO: baseline comparison skipped because ignored artifact is unavailable: ${before}`);fs.mkdirSync(qa,{recursive:true});
  for(const [version,video] of Object.entries(videos)){
    for(const [name,frames] of Object.entries(config.samples)){
      const phone=(config.phoneSamples??[]).includes(name);const sampleWidth=phone?360:frames.length>12?216:270;const sampleHeight=phone?640:frames.length>12?384:480;const columns=phone?Math.min(4,frames.length):frames.length>12?5:frames.length<=5?frames.length:4;const filter=`select='${frames.map((frame)=>`eq(n\\,${frame})`).join('+')}',scale=${sampleWidth}:${sampleHeight},tile=${columns}x${Math.ceil(frames.length/columns)}`;
      execute('ffmpeg',['-y','-v','error','-i',video,'-vf',filter,'-frames:v','1',path.join(qa,`${version}-${name}.png`)]);
    }
    const metadata=execute('ffprobe',['-v','error','-show_entries','stream=index,codec_type,codec_name,width,height,r_frame_rate,avg_frame_rate,duration,nb_frames','-show_entries','format=duration,size,bit_rate','-of','json',video],{encoding:'utf8'});fs.writeFileSync(path.join(qa,`${version}-ffprobe.json`),metadata);
    const black=capture('ffmpeg',['-hide_banner','-nostats','-i',video,'-vf','blackdetect=d=0.10:pic_th=0.98:pix_th=0.10','-an','-f','null','-']);const freeze=capture('ffmpeg',['-hide_banner','-nostats','-i',video,'-vf','freezedetect=n=-50dB:d=0.5','-an','-f','null','-']);
    let verifiedStillness='';
    if(config.requiredFreeze){
      const starts=[...freeze.matchAll(/freeze_start:\s*([0-9.]+)/g)].map((match)=>Number(match[1]));
      const durations=[...freeze.matchAll(/freeze_duration:\s*([0-9.]+)/g)].map((match)=>Number(match[1]));
      const matched=starts.some((start,index)=>Math.abs(start-config.requiredFreeze.start)<=config.requiredFreeze.tolerance&&Math.abs(durations[index]-config.requiredFreeze.duration)<=config.requiredFreeze.tolerance);
      if(!matched)throw new Error(`${config.requiredFreeze.name} required freeze interval was not detected`);
      verifiedStillness=`VERIFIED STILLNESS\n${config.requiredFreeze.name}: ${config.requiredFreeze.start.toFixed(6)}s start / ${config.requiredFreeze.duration.toFixed(6)}s duration\n`;
    }
    fs.writeFileSync(path.join(qa,`${version}-frame-metrics.txt`),`BLACK FRAME METRICS\n${black}\nFREEZE METRICS\n${freeze}\n${verifiedStillness}CLASSIFICATION\n${config.classification}\n${config.phoneSamples?.length?'Phone readability evidence is rendered at 360x640 per sample.\n':''}`);
  }
  log(`PASS: ${mode} temporal QA evidence generated at ${qa}`);return {mode,qa};
};
