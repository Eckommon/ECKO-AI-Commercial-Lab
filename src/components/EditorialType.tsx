import React from 'react';
import {useCurrentFrame} from 'remotion';
import {easeOut} from '../commercials/aurora/direction';
export const EditorialType: React.FC<{lines: string[]; cues: number[]; top: number; size?: number; align?: 'left' | 'center'; tracking?: number}> = ({lines, cues, top, size = 140, align = 'center', tracking = 4}) => {
  const f = useCurrentFrame();
  return <div style={{position: 'absolute', top, left: 90, right: 90, color: '#e8d4aa', textAlign: align, fontFamily: 'Georgia, serif', fontSize: size, fontWeight: 400, letterSpacing: tracking, lineHeight: 1.04}}>
    {lines.map((line, i) => {const p = easeOut((f - (cues[i] ?? cues[0])) / 16); return <div key={line} style={{overflow: 'hidden', paddingBottom: 9}}><div style={{translate: `0 ${(1 - p) * 115}%`, opacity: p}}>{line}</div></div>;})}
  </div>;
};
