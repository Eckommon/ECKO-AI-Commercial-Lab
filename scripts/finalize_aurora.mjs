import {pathToFileURL} from 'node:url';
import {buildFinalizeArgs as build,finalizeCampaign,validateIntermediateProbe as validateIntermediate,validateMediaProbe as validateFinal} from './mastering.mjs';
export const AURORA_MASTERING={width:1080,height:1920,fps:30,frames:1200,duration:40,finalDurationPadding:{audioMin:-0.001,audioMax:0.05,containerMin:-0.001,containerMax:0.05},input:'commercials/aurora-cold-brew/output/aurora-cold-brew-v1-2-render.mp4',output:'commercials/aurora-cold-brew/output/aurora-cold-brew-v1-2.mp4',evidence:'commercials/aurora-cold-brew/output/qa/v1-2'};
export const validateIntermediateProbe=(probe)=>validateIntermediate(probe,AURORA_MASTERING);
export const validateMediaProbe=(probe)=>validateFinal(probe,AURORA_MASTERING);
export const buildFinalizeArgs=(input,output,probe)=>build(input,output,probe,AURORA_MASTERING);
export const finalizeAurora=(options={})=>finalizeCampaign({...options,config:AURORA_MASTERING});
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const result=finalizeAurora();console.log(`PASS: mastered ${result.output}`);console.log(`PASS: video=${result.durations.videoDuration.toFixed(6)}s audio-padding=${result.durations.audioPadding.toFixed(6)}s container-padding=${result.durations.containerPadding.toFixed(6)}s`);}
