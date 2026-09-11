import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Beat, smooth} from '../direction';
import {AuroraField} from '../../../components/AuroraField';
import {SourceSurface} from '../../../components/SourceSurface';
import {Camera} from '../../../components/OpticalStage';
export const DetailScene: React.FC<{beat: Beat}> = ({beat}) => {
  const f = useCurrentFrame();
  const orbit = beat.scene === 'orbit';
  const reveal = .35 + .65 * smooth(f / beat.revealFrames);
  const cx = 50 + Math.sin(f / 95) * 7;
  return <>
    <AuroraField energy={.45} phase={beat.startSec * 30}/>
    <Camera beat={beat}>
      <AbsoluteFill style={{opacity: .3 * reveal}}><SourceSurface asset={beat.asset} crop="720 240 260 990"/></AbsoluteFill>
      <AbsoluteFill style={{opacity: reveal, clipPath: orbit ? `ellipse(43% 35% at ${cx}% 49%)` : `inset(${17 - reveal * 6}% 10% ${17 - reveal * 6}% 10% round 280px)`}}>
        <SourceSurface asset={beat.asset} crop={orbit ? '715 470 270 850' : '720 210 270 920'}/>
      </AbsoluteFill>
    </Camera>
    <AbsoluteFill style={{background: 'linear-gradient(0deg,#020908 2%,transparent 24%,transparent 76%,#020908 98%)'}}/>
    <svg width="1080" height="1920" style={{position: 'absolute', opacity: .5 * reveal}}><ellipse cx={cx * 10.8} cy="950" rx={orbit ? 438 : 430} ry={orbit ? 664 : 740} fill="none" stroke="#9cbf9c" strokeWidth="1" strokeDasharray="180 2500" strokeDashoffset={-f * 6}/></svg>
  </>;
};
