import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Beat, cameraAt, frames, smooth} from '../commercials/aurora/direction';
export const Camera: React.FC<React.PropsWithChildren<{beat: Beat}>> = ({beat, children}) => {
  const [scale, x, y, rotate] = cameraAt(beat, useCurrentFrame());
  return <AbsoluteFill style={{scale, translate: `${x}px ${y}px`, rotate: `${rotate}deg`}}>{children}</AbsoluteFill>;
};
export const OpticalStage: React.FC<React.PropsWithChildren<{beat: Beat}>> = ({beat, children}) => {
  const f = useCurrentFrame();
  const exit = smooth((frames(beat) - 1 - f) / beat.exitFrames);
  return <AbsoluteFill style={{background: '#020908', overflow: 'hidden'}}>
    {children}
    <AbsoluteFill style={{pointerEvents: 'none', background: 'radial-gradient(ellipse at 50% 46%, transparent 40%, rgba(0,4,3,.46) 100%)'}} />
    <AbsoluteFill style={{background: '#020908', opacity: (1 - exit) * (beat.scene === 'close' ? 1 : beat.transition === 'cut' ? 0 : .32)}} />
  </AbsoluteFill>;
};
