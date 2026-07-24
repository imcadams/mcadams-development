import { About } from '../pages/About';
import { pageMeta } from '../content/seo';
import { getSitePage } from '../content/site';

export const meta = () => pageMeta(getSitePage('/about'));

export default function AboutRoute() {
  return <About />;
}
