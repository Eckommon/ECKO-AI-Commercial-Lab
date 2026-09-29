import {validateAuroraCampaign, validateNovaelCampaign} from '../factory/validate-campaigns.mjs';

const root = process.cwd();
const requested = process.argv[2] ?? 'all';
const validators = requested === 'aurora'
  ? [validateAuroraCampaign]
  : requested === 'novael'
    ? [validateNovaelCampaign]
    : [validateAuroraCampaign, validateNovaelCampaign];

for (const validate of validators) {
  const validated = validate({root});
  console.log(
    `PASS: ${validated.runtime.campaignId} schema/semantics / ${validated.runtime.beats.length} treatments / scene families / source hashes / design binding`,
  );
}
