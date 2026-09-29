import {pathToFileURL} from 'node:url';
import {finalizeCampaign} from './mastering.mjs';
export const NOVAEL_MASTERING={width:1080,height:1920,fps:30,frames:900,duration:30,finalDurationPadding:{audioMin:-0.001,audioMax:0.05,containerMin:-0.001,containerMax:0.05},input:'commercials/novael-arc/output/novael-arc-v1-2-render.mp4',output:'commercials/novael-arc/output/novael-arc-v1-2.mp4',evidence:'commercials/novael-arc/output/qa/v1-2'};
export const finalizeNovael=(options={})=>finalizeCampaign({...options,config:NOVAEL_MASTERING});
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const result=finalizeNovael();console.log(`PASS: mastered ${result.output}`);console.log(`PASS: video=${result.durations.videoDuration.toFixed(6)}s audio-padding=${result.durations.audioPadding.toFixed(6)}s container-padding=${result.durations.containerPadding.toFixed(6)}s`);}
