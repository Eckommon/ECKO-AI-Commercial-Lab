import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import type {AtmosphereRecipe} from '../commercials/aurora/timeline';
import {hashUnit} from './math';

type Props = {
  durationFrames: number;
  recipe: AtmosphereRecipe;
  seed: number;
};

export const AtmosphericParticles: React.FC<Props> = ({durationFrames, recipe, seed}) => {
  const frame = useCurrentFrame();
  const progress = frame / Math.max(1, durationFrames - 1);
  const direction = recipe.direction ?? 1;
  const dropletCount = Math.round(10 + recipe.droplets * 14);
  const sparkleCount = Math.round(5 + recipe.sparkle * 12);

  return (
    <AbsoluteFill style={{overflow: 'hidden', pointerEvents: 'none'}}>
      {[0, 1, 2].map((index) => {
        const x = 12 + hashUnit(seed, index) * 76;
        const y = 58 + index * 13;
        return (
          <div
            key={`mist-${index}`}
            style={{
              position: 'absolute',
              left: `${x}%`,
              top: `${y}%`,
              width: 520 + index * 90,
              height: 270 + index * 45,
              borderRadius: '50%',
              background: 'radial-gradient(ellipse, rgba(190,255,226,.18), rgba(70,150,120,.06) 48%, transparent 72%)',
              filter: `blur(${38 + index * 9}px)`,
              opacity: recipe.mist * (0.38 - index * 0.07),
              translate: `${direction * (progress * 90 - 45) * (index + 1) * 0.36}px ${-progress * (24 + index * 12)}px`,
              scale: 1 + Math.sin((frame + index * 19) / 34) * 0.06,
            }}
          />
        );
      })}

      {Array.from({length: dropletCount}, (_, index) => {
        const size = 3 + hashUnit(seed + 13, index) * 10;
        const baseY = hashUnit(seed + 29, index) * 112 - 6;
        const travel = progress * (28 + hashUnit(seed + 37, index) * 80);
        return (
          <div
            key={`drop-${index}`}
            style={{
              position: 'absolute',
              left: `${hashUnit(seed + 7, index) * 100}%`,
              top: `${(baseY + travel) % 112 - 6}%`,
              width: size,
              height: size * 1.55,
              borderRadius: '50%',
              opacity: recipe.droplets * (0.18 + hashUnit(seed + 41, index) * 0.42),
              background: 'linear-gradient(145deg, rgba(255,255,255,.8), rgba(83,255,183,.12) 50%, rgba(0,0,0,.22))',
              boxShadow: '0 0 9px rgba(112,255,199,.25)',
              rotate: `${direction * (8 + hashUnit(seed + 43, index) * 18)}deg`,
            }}
          />
        );
      })}

      {Array.from({length: sparkleCount}, (_, index) => {
        const pulse = Math.max(0, Math.sin(frame * (0.075 + hashUnit(seed + 61, index) * 0.04) + index));
        return (
          <div
            key={`spark-${index}`}
            style={{
              position: 'absolute',
              left: `${8 + hashUnit(seed + 67, index) * 84}%`,
              top: `${6 + hashUnit(seed + 71, index) * 78}%`,
              width: 2 + hashUnit(seed + 73, index) * 4,
              height: 2 + hashUnit(seed + 73, index) * 4,
              borderRadius: '50%',
              opacity: recipe.sparkle * pulse * 0.72,
              backgroundColor: '#d9ffed',
              boxShadow: '0 0 14px 4px rgba(90,255,183,.44)',
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
