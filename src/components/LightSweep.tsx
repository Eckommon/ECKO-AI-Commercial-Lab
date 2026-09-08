import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';

export const LightSweep: React.FC<{durationFrames: number}> = ({durationFrames}) => {
  const frame = useCurrentFrame();
  const x = interpolate(frame, [0, durationFrames], [-500, 1500], {extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill
      style={{
        mixBlendMode: 'screen',
        opacity: 0.42,
        background: `linear-gradient(100deg, transparent ${x - 160}px, rgba(79,255,182,.7) ${x}px, transparent ${x + 170}px)`,
      }}
    />
  );
};
