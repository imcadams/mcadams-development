import { NotFound } from '../pages/NotFound';
import { notFoundMeta } from '../content/seo';

export const meta = () => notFoundMeta;

export default function NotFoundRoute() {
  return <NotFound />;
}
