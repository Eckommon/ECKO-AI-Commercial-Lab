import React from 'react';
import {AbsoluteFill, Img, staticFile, useCurrentFrame} from 'remotion';
import {Beat, easeOut, smooth, frames} from '../direction';
import {SourceSurface} from '../../../components/SourceSurface';
import {Camera} from '../../../components/OpticalStage';
import {EditorialType} from '../../../components/EditorialType';
export const ImpactScene: React.FC<{beat: Beat}> = ({beat}) => {
  const f = useCurrentFrame();
  const character = beat.scene === 'character';
  const burst = easeOut(f / (beat.burstFrames ?? 36));
  const release = character ? 0 : smooth((f - beat.impactSwitchFrames![0]) / (beat.impactSwitchFrames![1] - beat.impactSwitchFrames![0]));
  const drift = character ? 0 : smooth((f - beat.impactSwitchFrames![1]) / (frames(beat) - beat.impactSwitchFrames![1]));
  return <>
    <Camera beat={beat}><SourceSurface asset={beat.asset} crop="320 735 530 520"/></Camera>
    {!character && <AbsoluteFill style={{opacity: release}}>
      <AbsoluteFill style={{background: '#031510'}}/>
      <AbsoluteFill style={{scale: 1 + .06 * release + .035 * drift, opacity: .9}}>
        <SourceSurface asset={beat.secondaryAsset!} environment/>
      </AbsoluteFill>
      <AbsoluteFill style={{scale: 1.13 - .015 * release + .02 * drift, rotate: `${(1-release)*-1}deg`}}>
        <SourceSurface asset={beat.secondaryAsset!} isolate/>
      </AbsoluteFill>
      <AbsoluteFill style={{background: 'linear-gradient(0deg,#020908 0%,transparent 36%)'}}/>
      <svg width="1080" height="1920" style={{position: 'absolute', opacity: .7 * release}}>
        {Array.from({length: 22},(_,i)=><ellipse key={i} cx={(i%2 ? 805 : 145)+Math.sin(i*5.2+f/60)*90} cy={(i*151+f*(1+i%3*.5))%1600} rx={2+i%3} ry={4+i%4} fill="#b4e6cf" opacity={.15+i%3*.1}/>)}
      </svg>
    </AbsoluteFill>}
    <AbsoluteFill style={{background: character ? 'linear-gradient(90deg,rgba(1,9,7,.86),rgba(1,9,7,.65))' : 'linear-gradient(0deg,rgba(1,9,7,.65),transparent 70%)'}}/>
    {!character && Array.from({length: 4}, (_, i) => <div key={i} style={{position: 'absolute', left: i % 2 ? 770 : 20, top: 160 + i * 350, width: 230, height: 420, overflow: 'hidden', clipPath: 'polygon(42% 0,92% 19%,75% 83%,22% 100%,0 32%)', translate: `${(i % 2 ? 1 : -1) * burst * 160}px ${burst * (i - 1.5) * 160}px`, rotate: `${i * 29 + burst * 25}deg`, opacity: (1 - burst) * .85}}>
      <Img src={staticFile(`commercials/aurora-cold-brew/assets/${beat.secondaryAsset}`)} style={{width: 1000, height: 1778, position: 'absolute', left: -760, top: -260}}/>
    </div>)}
    {!character && <AbsoluteFill style={{background: '#b9edd6', mixBlendMode: 'screen', opacity: .12 * Math.exp(-f / 5)}}/>}
    {character && <EditorialType lines={beat.copy.split(' ')} cues={beat.typeFrames!} top={570} size={142} align="left" tracking={2}/>}
    {character && <div style={{position: 'absolute', left: 95, top: 1150, width: 180 * easeOut((f - 48) / 20), height: 3, background: '#d2bb89'}}/>}
  </>;
};
