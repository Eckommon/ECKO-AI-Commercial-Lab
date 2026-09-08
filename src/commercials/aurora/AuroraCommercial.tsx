import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile} from 'remotion';
import {Shot} from '../../components/Shot';
import {TypeCard} from '../../components/TypeCard';
import {LightSweep} from '../../components/LightSweep';

const A = 'commercials/aurora-cold-brew/assets/';
const fps = 30;
const sec = (n: number) => n * fps;

export const AuroraCommercial: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: '#020706'}}>
    <Audio
      src={staticFile('commercials/aurora-cold-brew/audio/aurora-bed.wav')}
      volume={0.72}
    />

    <Sequence from={sec(0)} durationInFrames={sec(3)}>
      <Shot src={`${A}shot-01-hero.png`} durationFrames={sec(3)} zoomFrom={1.16} zoomTo={1.05} />
    </Sequence>

    <Sequence from={sec(3)} durationInFrames={sec(4)}>
      <Shot
        src={`${A}shot-02-macro.png`}
        durationFrames={sec(4)}
        zoomFrom={1.08}
        zoomTo={1.22}
        xFrom={35}
        xTo={-40}
        yFrom={20}
        yTo={-25}
      />
    </Sequence>

    <Sequence from={sec(7)} durationInFrames={sec(4)}>
      <Shot
        src={`${A}shot-03-portrait.png`}
        durationFrames={sec(4)}
        zoomFrom={1.12}
        zoomTo={1.05}
        yFrom={45}
        yTo={-25}
      />
      <TypeCard text="COLD." />
    </Sequence>

    <Sequence from={sec(11)} durationInFrames={sec(5)}>
      <Shot
        src={`${A}shot-01-hero.png`}
        durationFrames={sec(5)}
        zoomFrom={1.13}
        zoomTo={1.02}
      />
      <LightSweep durationFrames={sec(5)} />
    </Sequence>

    <Sequence from={sec(16)} durationInFrames={sec(5)}>
      <Shot
        src={`${A}shot-04-impact.png`}
        durationFrames={sec(5)}
        zoomFrom={1.30}
        zoomTo={1.06}
        impact
      />
    </Sequence>

    <Sequence from={sec(21)} durationInFrames={sec(6)}>
      <Shot
        src={`${A}shot-05-endcard.png`}
        durationFrames={sec(6)}
        zoomFrom={1.08}
        zoomTo={1.16}
      />
      <TypeCard text="AURORA" align="bottom" />
    </Sequence>

    <Sequence from={sec(27)} durationInFrames={sec(5)}>
      <Shot
        src={`${A}shot-02-macro.png`}
        durationFrames={sec(5)}
        zoomFrom={1.14}
        zoomTo={1.22}
        xFrom={-55}
        xTo={42}
      />
    </Sequence>

    <Sequence from={sec(32)} durationInFrames={sec(4)}>
      <Shot
        src={`${A}shot-04-impact.png`}
        durationFrames={sec(4)}
        zoomFrom={1.10}
        zoomTo={1.03}
      />
      <TypeCard text="BOLD. SMOOTH. READY." align="bottom" />
    </Sequence>

    <Sequence from={sec(36)} durationInFrames={sec(4)}>
      <Shot
        src={`${A}shot-05-endcard.png`}
        durationFrames={sec(4)}
        zoomFrom={1.04}
        zoomTo={1.09}
      />
      <TypeCard text="AWAKEN THE COLD." align="bottom" />
    </Sequence>
  </AbsoluteFill>
);
