import { NotFound } from '../pages/NotFound';
import { SolutionPage } from '../pages/SolutionPage';
import { getSolutionPage } from '../content/site';
import { notFoundMeta, pageMeta } from '../content/seo';

interface SolutionMetaArgs {
  params: {
    slug?: string;
  };
}

export const meta = ({ params }: SolutionMetaArgs) => {
  const page = getSolutionPage(params.slug);
  return page ? pageMeta(page) : notFoundMeta;
};

export default function SolutionRoute({ params }: SolutionMetaArgs) {
  const page = getSolutionPage(params.slug);

  return page ? <SolutionPage page={page} /> : <NotFound />;
}
