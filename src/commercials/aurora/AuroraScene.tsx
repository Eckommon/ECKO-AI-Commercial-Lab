import React from 'react';
import {AbsoluteFill} from 'remotion';
import {AtmosphericParticles} from '../../motion/AtmosphericParticles';
import {AuroraLight} from '../../motion/AuroraLight';
import {CinematicCamera} from '../../motion/CinematicCamera';
import {ImpactMotion} from '../../motion/ImpactMotion';
import {KineticTypography} from '../../motion/KineticTypography';
import {LayeredScene} from '../../motion/LayeredScene';
import {cuePulse} from '../../motion/math';
import type {BeatRecipe} from './timeline';

const ASSET_ROOT = 'commercials/aurora-cold-brew/assets/';

export const AuroraScene: React.FC<{beat: BeatRecipe; globalFrame: number}> = ({
  beat,
  globalFrame,
}) => {
  const seed = Number(beat.id.slice(1)) * 101;
  const cueAccent = beat.sfx ? cuePulse(globalFrame, beat.startFrame) : 0;

  return (
    <AbsoluteFill style={{backgroundColor: '#020706', overflow: 'hidden'}}>
      <ImpactMotion enabled={beat.impact}>
        <CinematicCamera durationFrames={beat.durationFrames} recipe={beat.camera}>
          <LayeredScene
            src={`${ASSET_ROOT}${beat.asset}`}
            durationFrames={beat.durationFrames}
            depth={beat.depth}
          />
        </CinematicCamera>
      </ImpactMotion>

      <AtmosphericParticles
        durationFrames={beat.durationFrames}
        recipe={beat.atmosphere}
        seed={seed}
      />
      <AuroraLight
        durationFrames={beat.durationFrames}
        recipe={beat.light}
        cueAccent={cueAccent}
      />

      {beat.copy && beat.typography ? (
        <KineticTypography
          text={beat.copy}
          durationFrames={beat.durationFrames}
          recipe={beat.typography}
        />
      ) : null}

      <AbsoluteFill
        style={{
          pointerEvents: 'none',
          boxShadow: 'inset 0 0 170px 48px rgba(0,4,3,.45)',
          opacity: 0.76,
        }}
      />
    </AbsoluteFill>
  );
};
