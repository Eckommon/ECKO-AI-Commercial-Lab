export type GovernedAuroraBrief = {
  campaignId: string;
  durationSec: number;
  fps: number;
  resolution: string;
};

export type AuroraRuntimeContract = Readonly<{
  campaignId: string;
  durationSec: number;
  fps: number;
  width: number;
  height: number;
}>;

export const deriveAuroraContract = (
  brief: GovernedAuroraBrief,
): AuroraRuntimeContract => {
  const match = /^(\d+)x(\d+)$/.exec(brief.resolution);
  if (!match) {
    throw new Error(`Invalid governed resolution: ${brief.resolution}`);
  }

  const width = Number.parseInt(match[1], 10);
  const height = Number.parseInt(match[2], 10);
  if (
    !Number.isSafeInteger(width) ||
    !Number.isSafeInteger(height) ||
    width <= 0 ||
    height <= 0
  ) {
    throw new Error(`Governed resolution must contain positive dimensions: ${brief.resolution}`);
  }

  return {
    campaignId: brief.campaignId,
    durationSec: brief.durationSec,
    fps: brief.fps,
    width,
    height,
  };
};
