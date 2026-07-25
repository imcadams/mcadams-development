import { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { TurnstileWidget } from '../components/TurnstileWidget';

const supportedSolutions = ['hvac-ai-receptionist'] as const;

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Enter a valid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  serviceInterest: z.enum(['website', 'webapp', 'mobile', 'cloud', 'devops', 'design', 'ai-receptionist']),
  budget: z.enum(['under5k', '5k-15k', '15k-25k', '25k-50k', '50kplus']),
  description: z.string().min(10, 'Project description must be at least 10 characters').max(10000, 'Project description must be 10,000 characters or less'),
  website: z.string().max(200).optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

type SubmissionStatus =
  | { type: 'idle' }
  | { type: 'success'; message: string }
  | { type: 'error'; message: string };

function isSupportedSolution(value: string | null): value is (typeof supportedSolutions)[number] {
  return supportedSolutions.some((solution) => solution === value);
}

function contactEndpoint() {
  const baseUrl = import.meta.env.VITE_CONTACT_API_URL;

  if (!baseUrl) {
    throw new Error('The contact form is not configured. Please call or email us instead.');
  }

  return `${baseUrl.replace(/\/$/, '')}/contact`;
}

export function Contact() {
  const [searchParams] = useSearchParams();
  const requestedSolution = searchParams.get('solution');
  const sourceSolution = isSupportedSolution(requestedSolution)
    ? requestedSolution
    : undefined;
  const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY;
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileInstanceKey, setTurnstileInstanceKey] = useState(0);
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>({ type: 'idle' });
  const startedAtRef = useRef(Date.now());
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
    setValue,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: 'onChange',
    defaultValues: {
      website: '',
    },
  });

  useEffect(() => {
    if (sourceSolution === 'hvac-ai-receptionist') {
      setValue('serviceInterest', 'ai-receptionist', { shouldValidate: true });
    }
  }, [setValue, sourceSolution]);

  const onTokenChange = useCallback((token: string | null) => {
    setTurnstileToken(token);
  }, []);

  const onSubmit = async (data: ContactFormData) => {
    if (!turnstileToken) {
      setSubmissionStatus({ type: 'error', message: 'Please complete the verification before sending your message.' });
      return;
    }

    try {
      setSubmissionStatus({ type: 'idle' });
      const response = await fetch(contactEndpoint(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          serviceInterest: data.serviceInterest,
          budget: data.budget,
          description: data.description,
          sourceSolution,
          turnstileToken,
          website: data.website ?? '',
          formStartedAt: startedAtRef.current,
        }),
      });

      if (!response.ok) {
        throw new Error('We could not send your message. Please try again or contact us by phone or email.');
      }

      reset({ website: '' });
      setTurnstileToken(null);
      setTurnstileInstanceKey((key) => key + 1);
      startedAtRef.current = Date.now();
      setSubmissionStatus({ type: 'success', message: 'Thank you. We will contact you within 24 hours.' });
    } catch (error) {
      setTurnstileToken(null);
      setTurnstileInstanceKey((key) => key + 1);
      setSubmissionStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'We could not send your message. Please try again.',
      });
    }
  };

  const submitDisabled = isSubmitting || !isValid || !turnstileToken || !turnstileSiteKey;

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-r from-primary to-blue-900 py-16 text-white">
        <div className="container mx-auto px-4">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">Contact Us</h1>
          <p className="text-xl text-gray-100">Let's discuss your next project</p>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div className="rounded-lg bg-white p-8 shadow-lg">
              <h2 className="mb-6 text-2xl font-semibold">Send Us a Message</h2>
              {sourceSolution && (
                <p className="mb-6 rounded-md bg-blue-50 p-3 text-sm text-blue-900">
                  You are contacting us about the HVAC AI receptionist solution.
                </p>
              )}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
                <div className="absolute left-[-10000px] h-px w-px overflow-hidden" aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input id="website" tabIndex={-1} autoComplete="off" {...register('website')} />
                </div>

                <div>
                  <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700">Name *</label>
                  <input type="text" id="name" autoComplete="name" {...register('name')} className="input" aria-invalid={errors.name ? 'true' : 'false'} aria-describedby={errors.name ? 'name-error' : undefined} />
                  {errors.name && <p id="name-error" className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">Email *</label>
                  <input type="email" id="email" autoComplete="email" {...register('email')} className="input" aria-invalid={errors.email ? 'true' : 'false'} aria-describedby={errors.email ? 'email-error' : undefined} />
                  {errors.email && <p id="email-error" className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                </div>

                <div>
                  <label htmlFor="phone" className="mb-1 block text-sm font-medium text-gray-700">Phone *</label>
                  <input type="tel" id="phone" autoComplete="tel" {...register('phone')} className="input" aria-invalid={errors.phone ? 'true' : 'false'} aria-describedby={errors.phone ? 'phone-error' : undefined} />
                  {errors.phone && <p id="phone-error" className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
                </div>

                <div>
                  <label htmlFor="serviceInterest" className="mb-1 block text-sm font-medium text-gray-700">Service Interest *</label>
                  <select id="serviceInterest" {...register('serviceInterest')} className="input" aria-invalid={errors.serviceInterest ? 'true' : 'false'} aria-describedby={errors.serviceInterest ? 'service-interest-error' : undefined}>
                    <option value="">Select a service</option>
                    <option value="ai-receptionist">AI Receptionist</option>
                    <option value="website">Website Development</option>
                    <option value="webapp">Web Application Development</option>
                    <option value="mobile">Mobile App Development</option>
                    <option value="cloud">Cloud Migration Services</option>
                    <option value="devops">DevOps Consulting</option>
                    <option value="design">UI/UX Design</option>
                  </select>
                  {errors.serviceInterest && <p id="service-interest-error" className="mt-1 text-sm text-red-600">{errors.serviceInterest.message}</p>}
                </div>

                <div>
                  <label htmlFor="budget" className="mb-1 block text-sm font-medium text-gray-700">Budget Range *</label>
                  <select id="budget" {...register('budget')} className="input" aria-invalid={errors.budget ? 'true' : 'false'} aria-describedby={errors.budget ? 'budget-error' : undefined}>
                    <option value="">Select budget range</option>
                    <option value="under5k">Under $5,000</option>
                    <option value="5k-15k">$5,000 - $15,000</option>
                    <option value="15k-25k">$15,000 - $25,000</option>
                    <option value="25k-50k">$25,000 - $50,000</option>
                    <option value="50kplus">$50,000+</option>
                  </select>
                  {errors.budget && <p id="budget-error" className="mt-1 text-sm text-red-600">{errors.budget.message}</p>}
                </div>

                <div>
                  <label htmlFor="description" className="mb-1 block text-sm font-medium text-gray-700">Project Description *</label>
                  <textarea id="description" rows={4} {...register('description')} className="input" aria-invalid={errors.description ? 'true' : 'false'} aria-describedby={errors.description ? 'description-error' : undefined} />
                  {errors.description && <p id="description-error" className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
                </div>

                {turnstileSiteKey ? (
                  <TurnstileWidget key={turnstileInstanceKey} siteKey={turnstileSiteKey} onTokenChange={onTokenChange} />
                ) : (
                  <p className="rounded-md bg-amber-50 p-3 text-sm text-amber-900" role="alert">
                    The secure contact form is not configured yet. Please call or email us instead.
                  </p>
                )}

                <div aria-live="polite">
                  {submissionStatus.type === 'success' && <p className="rounded-md bg-green-50 p-3 text-sm text-green-800">{submissionStatus.message}</p>}
                  {submissionStatus.type === 'error' && <p className="rounded-md bg-red-50 p-3 text-sm text-red-800" role="alert">{submissionStatus.message}</p>}
                </div>

                <button type="submit" disabled={submitDisabled} className="btn btn-primary w-full py-3 text-lg disabled:cursor-not-allowed disabled:opacity-50">
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>

            <div className="lg:pl-8">
              <div className="mb-8 rounded-lg bg-white p-8 shadow-lg">
                <h2 className="mb-6 text-2xl font-semibold">Contact Information</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="mb-2 text-lg font-medium">McAdams Development</h3>
                    <p className="text-gray-600">Holly Springs, GA</p>
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-medium">Phone</h3>
                    <a href="tel:+14703445563" className="text-primary hover:text-primary/80">(470) 344-5563</a>
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-medium">Email</h3>
                    <a href="mailto:info@mcadamsdevelopment.com" className="text-primary hover:text-primary/80">info@mcadamsdevelopment.com</a>
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-medium">Response Time</h3>
                    <p className="text-gray-600">We respond within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
