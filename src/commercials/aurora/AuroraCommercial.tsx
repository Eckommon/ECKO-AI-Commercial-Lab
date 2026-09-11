import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile} from 'remotion';
import {brief, frames, story} from './direction';
import {OpticalStage} from '../../components/OpticalStage';
import {ProductScene} from './scenes/ProductScenes';
import {DetailScene} from './scenes/DetailScenes';
import {ImpactScene} from './scenes/ImpactScenes';
export const AuroraCommercial: React.FC = () => <AbsoluteFill style={{background: '#020908'}}>
  <Audio src={staticFile('commercials/aurora-cold-brew/audio/astra-score.wav')}/>
  {story.shots.map(beat => <Sequence key={beat.id} name={`${beat.id} / ${beat.purpose}`} from={Math.round(beat.startSec * brief.fps)} durationInFrames={frames(beat)}>
    <OpticalStage beat={beat}>
      {['detail', 'orbit'].includes(beat.scene) ? <DetailScene beat={beat}/> : ['impact', 'character'].includes(beat.scene) ? <ImpactScene beat={beat}/> : <ProductScene beat={beat}/>}
    </OpticalStage>
  </Sequence>)}
</AbsoluteFill>;
