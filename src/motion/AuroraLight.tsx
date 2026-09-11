import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import type {LightRecipe} from '../commercials/aurora/timeline';

export const AuroraLight: React.FC<{
  durationFrames: number;
  recipe: LightRecipe;
  cueAccent: number;
}> = ({durationFrames, recipe, cueAccent}) => {
  const frame = useCurrentFrame();
  const sweep = interpolate(frame, [0, durationFrames - 1], [-48, 148], {
    easing: Easing.bezier(0.2, 0.72, 0.2, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const breath = 0.82 + Math.sin(frame / 21) * 0.18;

  return (
    <AbsoluteFill style={{overflow: 'hidden', mixBlendMode: 'screen', pointerEvents: 'none'}}>
      <div
        style={{
          position: 'absolute',
          width: 760,
          height: 2260,
          left: 160,
          top: -170,
          rotate: `${recipe.beamAngle ?? 0}deg`,
          opacity: recipe.intensity * 0.2 * breath + cueAccent * 0.08,
          filter: 'blur(46px)',
          background: 'linear-gradient(90deg, transparent, rgba(37,255,156,.58) 48%, transparent)',
        }}
      />
      {recipe.sweep ? (
        <div
          style={{
            position: 'absolute',
            inset: '-20%',
            opacity: recipe.intensity * 0.42,
            background: `linear-gradient(104deg, transparent ${sweep - 9}%, rgba(170,255,215,.68) ${sweep}%, transparent ${sweep + 10}%)`,
            filter: 'blur(20px)',
          }}
        />
      ) : null}
      <AbsoluteFill
        style={{
          opacity: cueAccent * 0.18,
          background: 'radial-gradient(circle at 50% 48%, rgba(115,255,198,.5), transparent 58%)',
        }}
      />
    </AbsoluteFill>
  );
};
