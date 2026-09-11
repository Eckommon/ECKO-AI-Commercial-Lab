import story from '../../../commercials/aurora-cold-brew/storyboard/storyboard.json';
import brief from '../../../commercials/aurora-cold-brew/brief/brief.json';
export {story, brief};
export type Beat = (typeof story.shots)[number];
export const clamp = (x: number) => Math.min(1, Math.max(0, x));
export const smooth = (x: number) => {const p = clamp(x); return p * p * (3 - 2 * p);};
export const easeOut = (x: number) => 1 - Math.pow(1 - clamp(x), 3);
export const frames = (beat: Beat) => Math.round((beat.endSec - beat.startSec) * brief.fps);
// Storyboard camera key: frame, scale, x, y, degrees.
export function cameraAt(beat: Beat, frame: number) {
  const keys = beat.camera;
  const next = keys.findIndex((key) => key[0] > frame);
  if (next === -1) return keys[keys.length - 1].slice(1);
  if (next === 0) return keys[0].slice(1);
  const a = keys[next - 1], b = keys[next];
  const t = smooth((frame - a[0]) / (b[0] - a[0]));
  return a.slice(1).map((value, i) => value + (b[i + 1] - value) * t);
}
