import {execFileSync, spawnSync} from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';

const samples = {
  'full-1fps': Array.from({length: 40}, (_, index) => 15 + index * 30),
  'depth-s02': [96, 126, 156, 186],
  'type-s03': [210, 222, 255, 318],
  'type-completion-holds': [239, 240, 329, 683, 809, 1007, 1008, 1079, 1109, 1110, 1199],
  'light-s04': [336, 372, 414, 462],
  'impact-s05': [480, 483, 490, 504, 527, 528, 540, 629],
  'hero-s06': [630, 654, 683, 684, 705, 786, 809],
  'orbit-particles-s07': [816, 852, 900, 948],
  'type-s08': [960, 975, 1020, 1074],
  'endcard-s09': [1080, 1095, 1109, 1110, 1140, 1170, 1199],
  'camera-extremes': [0, 59, 89, 90, 209, 329, 479, 527, 528, 629, 683, 684, 809, 959, 1079, 1109, 1110, 1199],
  transitions: [204, 210, 216, 324, 330, 336, 474, 480, 486, 1068, 1080, 1092],
};

export const runTemporalQa = ({
  root = process.cwd(),
  execute = execFileSync,
  capture = (command, args) => {
    const result = spawnSync(command, args, {encoding:'utf8'});
    if (result.status !== 0) throw new Error(`${command} metric failed: ${result.stderr}`);
    return `${result.stdout}${result.stderr}`;
  },
  log = console.log,
} = {}) => {
  const output = path.join(root, 'commercials/aurora-cold-brew/output');
  const before = path.join(output, 'aurora-cold-brew-v1.mp4');
  const after = path.join(output, 'aurora-cold-brew-v1-2.mp4');

  if (!fs.existsSync(after)) {
    throw new Error(`Missing required v1.2 QA input ${after}. Run npm run render:aurora first.`);
  }

  const hasBaseline = fs.existsSync(before);
  const mode = hasBaseline ? 'before-after' : 'after-only';
  const qa = path.join(output, 'qa', mode);
  const videos = hasBaseline ? {before, after} : {after};

  if (!hasBaseline) {
    log(`INFO: baseline comparison skipped because ignored v1.0 artifact is unavailable: ${before}`);
  }

  fs.mkdirSync(qa, {recursive: true});

  for (const [version, video] of Object.entries(videos)) {
    for (const [name, frames] of Object.entries(samples)) {
      const columns = frames.length > 12 ? 5 : frames.length <= 5 ? frames.length : 4;
      const sampleWidth = frames.length > 12 ? 216 : 270;
      const sampleHeight = frames.length > 12 ? 384 : 480;
      const filter = `select='${frames.map((frame) => `eq(n\\,${frame})`).join('+')}',scale=${sampleWidth}:${sampleHeight},tile=${columns}x${Math.ceil(frames.length / columns)}`;
      execute('ffmpeg', [
        '-y',
        '-v',
        'error',
        '-i',
        video,
        '-vf',
        filter,
        '-frames:v',
        '1',
        path.join(qa, `${version}-${name}.png`),
      ]);
    }

    const metadata = execute(
      'ffprobe',
      [
        '-v',
        'error',
        '-show_entries',
        'stream=index,codec_type,codec_name,width,height,r_frame_rate,avg_frame_rate,duration,nb_frames',
        '-show_entries',
        'format=duration,size,bit_rate',
        '-of',
        'json',
        video,
      ],
      {encoding: 'utf8'},
    );
    fs.writeFileSync(path.join(qa, `${version}-ffprobe.json`), metadata);
    const black = capture('ffmpeg', ['-hide_banner','-nostats','-i',video,'-vf','blackdetect=d=0.10:pic_th=0.98:pix_th=0.10','-an','-f','null','-']);
    const freeze = capture('ffmpeg', ['-hide_banner','-nostats','-i',video,'-vf','freezedetect=n=-50dB:d=0.5','-an','-f','null','-']);
    fs.writeFileSync(path.join(qa, `${version}-frame-metrics.txt`), `BLACK FRAME METRICS\n${black}\nFREEZE METRICS\n${freeze}\nCLASSIFICATION\nS05 after u=0.32, S06 after u=0.30, and S09 after u=0.25 are governed intentional stable holds; a detected stable interval is not by itself a render freeze.\n`);
  }

  log(`PASS: ${mode} temporal QA evidence generated at ${qa}`);
  return {mode, qa};
};

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  runTemporalQa();
}
