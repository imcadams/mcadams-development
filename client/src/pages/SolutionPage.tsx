import { Link } from 'react-router-dom';
import type { SolutionPage as SolutionPageContent } from '../content/site';

interface SolutionPageProps {
  page: SolutionPageContent;
}

function contactHref(slug: string) {
  return `/contact?solution=${encodeURIComponent(slug)}`;
}

export function SolutionPage({ page }: SolutionPageProps) {
  const { solution } = page;
  const contactLink = contactHref(solution.slug);

  return (
    <div>
      <section className="bg-gradient-to-br from-primary via-blue-800 to-slate-900 py-20 text-white md:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">
              {solution.eyebrow}
            </p>
            <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              {solution.heroTitle}
            </h1>
            <p className="mx-auto mb-8 max-w-3xl text-lg leading-8 text-blue-50 md:text-xl">
              {solution.heroDescription}
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                to={contactLink}
                className="btn bg-accent px-7 py-3 text-center font-semibold text-white hover:bg-accent/90"
              >
                Discuss your HVAC workflow
              </Link>
              <a
                href="tel:+14703445563"
                className="btn border-2 border-white px-7 py-3 text-center font-semibold text-white hover:bg-white hover:text-primary"
              >
                Call (470) 344-5563
              </a>
            </div>
          </div>
        </div>
      </section>

      <nav aria-label="Breadcrumb" className="border-b border-gray-200 bg-white">
        <ol className="container mx-auto flex flex-wrap gap-2 px-4 py-4 text-sm text-gray-600">
          <li><Link to="/" className="text-primary hover:underline">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link to="/services" className="text-primary hover:underline">Services</Link></li>
          <li aria-hidden="true">/</li>
          <li aria-current="page">{page.title}</li>
        </ol>
      </nav>

      <section className="bg-white py-16 md:py-20">
        <div className="container mx-auto grid items-start gap-12 px-4 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="mb-3 font-semibold text-primary">A clearer customer handoff</p>
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">
              Designed around the way your HVAC business works
            </h2>
            <p className="max-w-3xl text-lg leading-8 text-gray-700">{solution.audience}</p>
          </div>
          <aside className="rounded-xl border border-blue-100 bg-blue-50 p-7">
            <h2 className="mb-3 text-xl font-semibold text-gray-900">Start with a conversation</h2>
            <p className="mb-5 leading-7 text-gray-700">
              We can review your current inquiry flow and identify where a tailored AI receptionist could support your team.
            </p>
            <Link to={contactLink} className="font-semibold text-primary hover:underline">
              Request a consultation <span aria-hidden="true">→</span>
            </Link>
          </aside>
        </div>
      </section>

      <section className="bg-gray-50 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">What a better first response can support</h2>
            <p className="text-lg text-gray-600">A focused experience for new inquiries, not a one-size-fits-all phone tree.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {solution.benefits.map((benefit) => (
              <article key={benefit.title} className="rounded-xl bg-white p-7 shadow-sm ring-1 ring-gray-200">
                <h3 className="mb-3 text-xl font-semibold">{benefit.title}</h3>
                <p className="leading-7 text-gray-600">{benefit.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-2">
          <div>
            <p className="mb-3 font-semibold text-primary">Capabilities</p>
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">Build a more consistent intake process</h2>
            <ul className="space-y-4">
              {solution.capabilities.map((capability) => (
                <li key={capability} className="flex gap-3 text-gray-700">
                  <span aria-hidden="true" className="mt-0.5 font-bold text-primary">✓</span>
                  <span className="leading-7">{capability}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl bg-slate-900 p-8 text-white">
            <p className="mb-3 font-semibold text-blue-200">How it works</p>
            <h2 className="mb-8 text-3xl font-bold">A collaborative implementation</h2>
            <ol className="space-y-7">
              {solution.steps.map((step, index) => (
                <li key={step.title} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500 font-bold">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="mb-1 text-lg font-semibold">{step.title}</h3>
                    <p className="leading-7 text-slate-200">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 md:py-20">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="mb-10 text-center">
            <p className="mb-3 font-semibold text-primary">Frequently asked questions</p>
            <h2 className="text-3xl font-bold md:text-4xl">Planning an HVAC AI receptionist</h2>
          </div>
          <div className="space-y-4">
            {solution.faqs.map((faq) => (
              <details key={faq.question} className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
                <summary className="cursor-pointer text-lg font-semibold text-gray-900">{faq.question}</summary>
                <p className="pt-4 leading-7 text-gray-700">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary py-16 text-white md:py-20">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Ready to discuss your customer inquiry workflow?</h2>
          <p className="mb-8 text-lg leading-8 text-blue-100">
            Tell us how your team handles new inquiries today, and we will help you evaluate the right next step.
          </p>
          <Link to={contactLink} className="btn bg-accent px-8 py-3 text-lg font-semibold text-white hover:bg-accent/90">
            Request a consultation
          </Link>
        </div>
      </section>
    </div>
  );
}
