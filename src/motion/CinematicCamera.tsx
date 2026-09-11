import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import type {CameraRecipe} from '../commercials/aurora/timeline';

export const CinematicCamera: React.FC<
  React.PropsWithChildren<{durationFrames: number; recipe: CameraRecipe}>
> = ({durationFrames, recipe, children}) => {
  const frame = useCurrentFrame();
  const endFrame = Math.max(
    1,
    Math.round((durationFrames - 1) * (recipe.settleAt ?? 1)),
  );
  const easing = Easing.bezier(0.22, 0.72, 0.18, 1);

  return (
    <AbsoluteFill
      style={{
        overflow: 'hidden',
        scale: interpolate(frame, [0, endFrame], recipe.scale, {
          easing,
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
          output: 'perceptual-scale',
        }),
        translate: `${interpolate(frame, [0, endFrame], recipe.x, {
          easing,
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        })}px ${interpolate(frame, [0, endFrame], recipe.y, {
          easing,
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        })}px`,
        rotate: `${interpolate(frame, [0, endFrame], recipe.rotate ?? [0, 0], {
          easing,
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        })}deg`,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};
