import React from 'react';
import {AbsoluteFill, interpolate, Sequence, useCurrentFrame} from 'remotion';
import {AudioCueTimeline} from '../../motion/AudioCueTimeline';
import {CinematicTransition} from '../../motion/CinematicTransition';
import {AuroraScene} from './AuroraScene';
import {AURORA_BEATS, AURORA_CONTRACT} from './timeline';

export const AuroraCommercial: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{backgroundColor: '#020706'}}>
      <AudioCueTimeline
        src="commercials/aurora-cold-brew/audio/aurora-bed.wav"
        volume={0.72}
      />

      {AURORA_BEATS.map((beat) => (
        <Sequence
          key={beat.id}
          name={`${beat.id} — ${beat.purpose}`}
          from={beat.startFrame}
          durationInFrames={beat.durationFrames}
        >
          <AuroraScene beat={beat} globalFrame={frame} />
        </Sequence>
      ))}

      <CinematicTransition />
      <AbsoluteFill
        style={{
          backgroundColor: '#000',
          opacity: interpolate(
            frame,
            [AURORA_CONTRACT.durationSec * AURORA_CONTRACT.fps - 10, AURORA_CONTRACT.durationSec * AURORA_CONTRACT.fps - 1],
            [0, 1],
            {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
          ),
        }}
      />
    </AbsoluteFill>
  );
};
