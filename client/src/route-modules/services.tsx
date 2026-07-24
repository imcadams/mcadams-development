import { Services } from '../pages/Services';
import { pageMeta } from '../content/seo';
import { getSitePage } from '../content/site';

export const meta = () => pageMeta(getSitePage('/services'));

export default function ServicesRoute() {
  return <Services />;
}
