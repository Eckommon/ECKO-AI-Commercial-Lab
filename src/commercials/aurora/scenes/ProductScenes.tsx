import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Beat, smooth} from '../direction';
import {AuroraField} from '../../../components/AuroraField';
import {SourceSurface} from '../../../components/SourceSurface';
import {Camera} from '../../../components/OpticalStage';
import {EditorialType} from '../../../components/EditorialType';
export const ProductScene: React.FC<{beat: Beat}> = ({beat}) => {
  const f = useCurrentFrame();
  const reveal = smooth(f / Math.max(1, beat.revealFrames));
  const open = beat.scene === 'reveal';
  const scan = beat.scene === 'scan';
  const scanP = scan ? smooth((f - beat.scanFrames![0]) / (beat.scanFrames![1] - beat.scanFrames![0])) : 0;
  return <>
    <AuroraField energy={open ? .35 + reveal * .3 : scan ? 1.25 : .6} phase={beat.startSec * 30}/>
    <Camera beat={beat}>
      <AbsoluteFill style={{opacity: open ? .18 + reveal * .82 : .4 + .6 * reveal, clipPath: open ? `inset(0 ${49 * (1 - reveal)}% 0 ${49 * (1 - reveal)}%)` : undefined}}>
        <SourceSurface asset={beat.asset} isolate/>
      </AbsoluteFill>
    </Camera>
    {scan && <AbsoluteFill style={{mixBlendMode: 'screen', opacity: Math.sin(scanP * Math.PI) * .5, background: `linear-gradient(110deg, transparent ${scanP * 1800 - 520}px, #72b58f ${scanP * 1800 - 440}px, transparent ${scanP * 1800 - 340}px)`}}/>}
    {beat.scene === 'cold' && <EditorialType lines={[beat.copy]} cues={beat.typeFrames!} top={215} size={238} tracking={7}/>}
    {beat.scene === 'hero' && <EditorialType lines={[beat.copy]} cues={beat.typeFrames!} top={210} size={136} tracking={14}/>}
    {beat.scene === 'close' && <EditorialType lines={['AWAKEN', 'THE COLD.']} cues={beat.typeFrames!} top={210} size={118} tracking={8}/>}
    {(beat.scene === 'hero' || beat.scene === 'close') && <div style={{position: 'absolute', top: 1610, width: '100%', textAlign: 'center', color: '#d7caad', fontFamily: 'Arial, sans-serif', fontSize: 32, letterSpacing: 10, opacity: reveal}}>AURORA COLD BREW</div>}
    <div style={{position: 'absolute', bottom: 206, left: 490, width: 100, height: 2, background: '#a58e60', opacity: .65 * reveal, scale: `${reveal} 1`}}/>
  </>;
};
