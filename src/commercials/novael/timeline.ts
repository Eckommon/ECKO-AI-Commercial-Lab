import brief from '../../../commercials/novael-arc/brief/brief.json' with {type:'json'};
import storyboard from '../../../commercials/novael-arc/storyboard/storyboard.json' with {type:'json'};
import {deriveCampaignContract} from '../../factory/campaign-contract.ts';
import {NOVAEL_RECIPES,type NovaelBeatId} from './recipe.ts';

export const NOVAEL_CONTRACT=deriveCampaignContract(brief);
const sec=(seconds:number)=>Math.round(seconds*NOVAEL_CONTRACT.fps);
export type NovaelBeat=Readonly<(typeof storyboard.shots)[number]&{id:NovaelBeatId;startFrame:number;durationFrames:number;transition:'hard-cut';recipe:(typeof NOVAEL_RECIPES)[NovaelBeatId]}>;
export const NOVAEL_BEATS:readonly NovaelBeat[]=storyboard.shots.map((shot)=>{const id=shot.id as NovaelBeatId;return {...shot,id,startFrame:sec(shot.startSec),durationFrames:sec(shot.endSec-shot.startSec),transition:'hard-cut',recipe:NOVAEL_RECIPES[id]};});
export const NOVAEL_CUES=NOVAEL_BEATS.filter((beat)=>beat.sfx).map((beat)=>({id:beat.id,name:beat.sfx as string,frame:beat.startFrame}));
