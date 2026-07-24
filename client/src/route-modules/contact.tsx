import { Contact } from '../pages/Contact';
import { pageMeta } from '../content/seo';
import { getSitePage } from '../content/site';

export const meta = () => pageMeta(getSitePage('/contact'));

export default function ContactRoute() {
  return <Contact />;
}
