import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {AURORA_BEATS, AURORA_TRANSITIONS} from '../commercials/aurora/timeline';

export const CinematicTransition: React.FC = () => {
  const frame = useCurrentFrame();
  const active = AURORA_TRANSITIONS.map((transition) => {
    const center = AURORA_BEATS.find((beat) => beat.id === transition.into)?.startFrame ?? -1000;
    const start = center - Math.floor(transition.durationFrames / 2);
    return {...transition, localFrame: frame - start};
  }).find(({localFrame, durationFrames}) => localFrame >= 0 && localFrame < durationFrames);

  if (!active) return null;
  const progress = active.localFrame / Math.max(1, active.durationFrames - 1);
  const peak = interpolate(progress, [0, 0.5, 1], [0, 1, 0]);

  if (active.kind === 'flash') {
    return (
      <AbsoluteFill
        style={{
          opacity: peak * 0.28,
          mixBlendMode: 'screen',
          background: 'radial-gradient(circle at 52% 45%, #effff7, rgba(115,255,197,.62) 34%, transparent 76%)',
        }}
      />
    );
  }

  if (active.kind === 'mist') {
    return (
      <AbsoluteFill
        style={{
          opacity: peak * 0.58,
          background: 'radial-gradient(ellipse at 50% 70%, rgba(205,255,232,.56), rgba(31,109,82,.2) 42%, transparent 72%)',
          filter: 'blur(26px)',
          scale: 1 + progress * 0.12,
        }}
      />
    );
  }

  return (
    <AbsoluteFill
      style={{
        opacity: peak * 0.44,
        mixBlendMode: 'screen',
        background: `linear-gradient(108deg, transparent ${progress * 120 - 28}%, rgba(78,255,178,.78) ${progress * 120}%, transparent ${progress * 120 + 24}%)`,
        filter: 'blur(18px)',
      }}
    />
  );
};
