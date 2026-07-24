import { PrivacyPolicy } from '../pages/PrivacyPolicy';
import { pageMeta } from '../content/seo';
import { getSitePage } from '../content/site';

export const meta = () => pageMeta(getSitePage('/privacy-policy'));

export default function PrivacyPolicyRoute() {
  return <PrivacyPolicy />;
}
