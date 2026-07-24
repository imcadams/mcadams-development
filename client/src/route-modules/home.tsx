import { Home } from '../pages/Home';
import { pageMeta } from '../content/seo';
import { getSitePage } from '../content/site';

export const meta = () => pageMeta(getSitePage('/'));

export default function HomeRoute() {
  return <Home />;
}
