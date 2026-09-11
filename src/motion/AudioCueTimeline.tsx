import React from 'react';
import {Audio, staticFile, useCurrentFrame} from 'remotion';
import {AURORA_CUES} from '../commercials/aurora/timeline';
import {cuePulse} from './math';

export const useAudioCueAccent = () => {
  const frame = useCurrentFrame();
  return Math.max(0, ...AURORA_CUES.map((cue) => cuePulse(frame, cue.frame)));
};

export const AudioCueTimeline: React.FC<{src: string; volume?: number}> = ({
  src,
  volume = 0.72,
}) => <Audio src={staticFile(src)} volume={volume} />;
