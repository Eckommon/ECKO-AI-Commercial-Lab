import React from 'react';
import {Audio, staticFile} from 'remotion';

export const AudioCueTimeline: React.FC<{src: string; volume?: number}> = ({
  src,
  volume = 0.72,
}) => <Audio src={staticFile(src)} volume={volume} />;
