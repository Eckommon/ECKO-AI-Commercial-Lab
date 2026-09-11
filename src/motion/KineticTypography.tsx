import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import type {TypographyRecipe} from '../commercials/aurora/timeline';

export const KineticTypography: React.FC<{
  text: string;
  durationFrames: number;
  recipe: TypographyRecipe;
}> = ({text, durationFrames, recipe}) => {
  const frame = useCurrentFrame();
  const units = recipe.mode === 'word' ? text.split(' ') : Array.from(text);
  const exitStart = Math.max(42, durationFrames - 20);

  return (
    <AbsoluteFill
      style={{
        alignItems: 'center',
        justifyContent: recipe.align === 'center' ? 'center' : 'flex-end',
        padding: recipe.align === 'bottom' ? `0 82px ${recipe.bottomOffset ?? 214}px` : '0 82px',
      }}
    >
      {recipe.align === 'bottom' ? (
        <AbsoluteFill
          style={{
            background: 'linear-gradient(to bottom, transparent 58%, rgba(1,8,6,.18) 68%, rgba(1,8,6,.82) 100%)',
          }}
        />
      ) : null}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: recipe.mode === 'word' ? '0.28em' : 0,
          maxWidth: 930,
          fontFamily: 'Arial, Helvetica, sans-serif',
          fontSize: recipe.size,
          lineHeight: 1.06,
          fontWeight: 600,
          letterSpacing: recipe.mode === 'characters' ? 11 : 6,
          color: '#f4e4c8',
          textAlign: 'center',
          textShadow: '0 5px 28px rgba(0,0,0,.85), 0 0 34px rgba(60,235,164,.16)',
        }}
      >
        {units.map((unit, index) => {
          const delay = index * (recipe.mode === 'word' ? 6 : 3);
          const opacity = interpolate(frame, [delay, delay + 15, exitStart, durationFrames - 1], [0, 1, 1, recipe.holdToEnd ? 1 : 0], {
            easing: [Easing.bezier(0.16, 1, 0.3, 1), Easing.linear, Easing.bezier(0.7, 0, 0.84, 0)],
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          const y = interpolate(frame, [delay, delay + 18], [46, 0], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          const blur = interpolate(frame, [delay, delay + 13], [12, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          return (
            <span key={`${unit}-${index}`} style={{display: 'inline-block', opacity, translate: `0 ${y}px`, filter: `blur(${blur}px)`}}>
              {unit === ' ' ? '\u00a0' : unit}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
