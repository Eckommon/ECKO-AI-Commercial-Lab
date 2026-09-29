import React from 'react';
import {AbsoluteFill,Sequence} from 'remotion';
import {AudioCueTimeline} from '../../motion/AudioCueTimeline';
import {NOVAEL_BEATS} from './timeline';
import {NovaelScene} from './NovaelScene';

export const NovaelCommercial:React.FC=()=> <AbsoluteFill style={{backgroundColor:'#12110f'}}>
  <AudioCueTimeline src="commercials/novael-arc/audio/novael-bed.wav" volume={.78}/>
  {NOVAEL_BEATS.map((beat)=><Sequence key={beat.id} name={`${beat.id} — ${beat.purpose}`} from={beat.startFrame} durationInFrames={beat.durationFrames}><NovaelScene beat={beat}/></Sequence>)}
</AbsoluteFill>;
