import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {impactEnvelope} from './math';

export const getImpactTransform = (frame: number) => {
  const envelope = impactEnvelope(frame);
  return {
    x: Math.sin(frame * 2.31) * envelope * 12,
    y: Math.cos(frame * 2.77) * envelope * 8,
    scale: 1 + envelope * 0.035,
  };
};

export const ImpactMotion: React.FC<React.PropsWithChildren<{enabled?: boolean}>> = ({
  enabled = false,
  children,
}) => {
  const frame = useCurrentFrame();
  const motion = enabled ? getImpactTransform(frame) : {x: 0, y: 0, scale: 1};

  return (
    <AbsoluteFill
      style={{
        translate: `${motion.x}px ${motion.y}px`,
        scale: motion.scale,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};
