import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';

export const TypeCard: React.FC<{text: string; align?: 'center' | 'bottom'}> = ({
  text,
  align = 'center',
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 12, 80, 100], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const y = interpolate(frame, [0, 18], [32, 0], {extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill
      style={{
        justifyContent: align === 'center' ? 'center' : 'flex-end',
        alignItems: 'center',
        paddingBottom: align === 'bottom' ? 230 : 0,
      }}
    >
      <div
        style={{
          fontFamily: 'Arial, Helvetica, sans-serif',
          fontSize: 78,
          fontWeight: 600,
          letterSpacing: 12,
          color: '#f4e4c8',
          opacity,
          transform: `translateY(${y}px)`,
          textAlign: 'center',
          textShadow: '0 4px 26px rgba(0,0,0,.7)',
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};
