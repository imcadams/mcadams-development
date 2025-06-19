import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SEO } from '../components/SEO';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  serviceInterest: z.enum(['website', 'webapp', 'mobile', 'cloud', 'devops', 'design']),
  budget: z.enum(['under5k', '5k-15k', '15k-25k', '25k-50k', '50kplus']),
  description: z.string().min(10, 'Project description must be at least 10 characters').max(10000, 'Project description must be 10,000 characters or less'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const MAX_SUBJECT_LENGTH = 256;
      let subject = `Contact Form: ${data.name} - Service: ${data.serviceInterest}`;
      if (subject.length > MAX_SUBJECT_LENGTH) {
        subject = subject.substring(0, MAX_SUBJECT_LENGTH);
      }

      const emailRequestBody = {
        to: ["info@mcadamsdevelopment.com"],
        subject: subject,
        body: data.description, // Use description from form data as body
      };

      // Use VITE_API_URL for the fetch request
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiUrl}/email`, { // Corrected to use /email endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': import.meta.env.VITE_EMAIL_API_KEY,
        },
        body: JSON.stringify(emailRequestBody),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      reset();
      alert('Thank you! We will contact you within 24 hours.');
    } catch (error) {
      console.error('Submission error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <>
      <SEO 
        title="Contact Us"
        description="Get in touch with McAdams Development for custom software solutions. Contact us for a free consultation about your web development project."
        canonicalUrl="https://www.mcadamsdevelopment.com/contact"
        schemaType="ContactPage"
      />
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-blue-900 text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl text-gray-100">Let's discuss your next project</p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      {...register('name')}
                      className="input"
                      aria-invalid={errors.name ? 'true' : 'false'}
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      {...register('email')}
                      className="input"
                      aria-invalid={errors.email ? 'true' : 'false'}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      {...register('phone')}
                      className="input"
                      aria-invalid={errors.phone ? 'true' : 'false'}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="serviceInterest" className="block text-sm font-medium text-gray-700 mb-1">
                      Service Interest *
                    </label>
                    <select
                      id="serviceInterest"
                      {...register('serviceInterest')}
                      className="input"
                      aria-invalid={errors.serviceInterest ? 'true' : 'false'}
                    >
                      <option value="">Select a service</option>
                      <option value="website">Website Development</option>
                      <option value="webapp">Web Application Development</option>
                      <option value="mobile">Mobile App Development</option>
                      <option value="cloud">Cloud Migration Services</option>
                      <option value="devops">DevOps Consulting</option>
                      <option value="design">UI/UX Design</option>
                    </select>
                    {errors.serviceInterest && (
                      <p className="mt-1 text-sm text-red-600">{errors.serviceInterest.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
                      Budget Range *
                    </label>
                    <select
                      id="budget"
                      {...register('budget')}
                      className="input"
                      aria-invalid={errors.budget ? 'true' : 'false'}
                    >
                      <option value="">Select budget range</option>
                      <option value="under5k">Under $5,000</option>
                      <option value="5k-15k">$5,000 - $15,000</option>
                      <option value="15k-25k">$15,000 - $25,000</option>
                      <option value="25k-50k">$25,000 - $50,000</option>
                      <option value="50kplus">$50,000+</option>
                    </select>
                    {errors.budget && (
                      <p className="mt-1 text-sm text-red-600">{errors.budget.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                      Project Description *
                    </label>
                    <textarea
                      id="description"
                      {...register('description')}
                      rows={4}
                      className="input"
                      aria-invalid={errors.description ? 'true' : 'false'}
                    />
                    {errors.description && (
                      <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary w-full py-3 text-lg disabled:opacity-50"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>

              {/* Contact Information */}
              <div className="lg:pl-8">
                <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
                  <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium mb-2">McAdams Development</h3>
                      <p className="text-gray-600">Holly Springs, GA</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-2">Phone</h3>
                      <a href="tel:+14703445563" className="text-primary hover:text-primary/80">
                        (470) 344-5563
                      </a>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-2">Email</h3>
                      <a href="mailto:info@mcadamsdevelopment.com" className="text-primary hover:text-primary/80">
                        info@mcadamsdevelopment.com
                      </a>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-2">Response Time</h3>
                      <p className="text-gray-600">We respond within 24 hours</p>
                    </div>
                  </div>
                </div>

                {/* Map Placeholder */}
                {/* <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                  <p className="text-gray-600">Map integration coming soon</p>
                </div> */}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}