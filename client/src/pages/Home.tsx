import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

interface ServiceCardProps {
  title: string;
  pricing: string;
  description: string;
  icon: string;
}

function ServiceCard({ title, pricing, description, icon }: ServiceCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="text-primary mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <p className="text-primary font-semibold">{pricing}</p>
    </div>
  );
}

export function Home() {
  const services = [
    {
      title: "Website Development",
      pricing: "Starting at $2,500",
      description: "Custom websites that convert visitors into customers",
      icon: "🌐"
    },
    {
      title: "Web Application Development",
      pricing: "Starting at $8,000",
      description: "Scalable web applications for complex business needs",
      icon: "⚡"
    },
    {
      title: "Mobile App Development",
      pricing: "Starting at $15,000",
      description: "Native and cross-platform mobile applications",
      icon: "📱"
    },
    {
      title: "Cloud Migration Services",
      pricing: "Contact for quote",
      description: "Seamless transition to cloud infrastructure",
      icon: "☁️"
    },
    {
      title: "DevOps Consulting",
      pricing: "Contact for quote",
      description: "Optimize your development and deployment pipeline",
      icon: "🔄"
    },
    {
      title: "UI/UX Design",
      pricing: "Starting at $3,000",
      description: "User-centered design that delivers results",
      icon: "🎨"
    }
  ];

  return (
    <>
      <SEO 
        title="Home"
        description="McAdams Development creates custom web solutions that help businesses thrive in the digital landscape. From simple websites to complex applications."
        canonicalUrl="https://www.mcadamsdevelopment.com/"
        schemaType="WebPage"
      />
      <div className="flex flex-col min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-blue-900 text-white py-20 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Transform Your Business with Custom Web Solutions
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-100">
                From simple websites to complex web applications, we deliver scalable solutions that drive growth
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/contact"
                  className="btn bg-accent hover:bg-accent/90 text-white font-semibold px-8 py-3 rounded-lg text-center"
                >
                  Get Free Consultation
                </Link>
                <Link 
                  to="/services"
                  className="btn border-2 border-white text-white hover:bg-white hover:text-primary font-semibold px-8 py-3 rounded-lg text-center"
                >
                  View Services
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Expert Web Development Solutions</h2>
                <p className="text-gray-600 mb-6">
                  At McAdams Development, we specialize in creating custom web solutions 
                  that help businesses thrive in the digital landscape. With expertise in React, 
                  TypeScript, Node.js, and AWS, we deliver reliable and scalable solutions for 
                  businesses of all sizes.
                </p>
                <p className="text-gray-600 mb-6">
                  Our development team combines technical excellence with strategic thinking to 
                  create applications that not only look great but also drive real business results. 
                  Whether you need a simple website, a complex web application, or cloud migration services,
                  we have the skills and experience to exceed your expectations.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="border border-gray-200 p-4 rounded-lg text-center">
                    <div className="text-primary text-2xl font-bold">50+</div>
                    <div className="text-gray-600">Projects Completed</div>
                  </div>
                  <div className="border border-gray-200 p-4 rounded-lg text-center">
                    <div className="text-primary text-2xl font-bold">97%</div>
                    <div className="text-gray-600">Client Satisfaction</div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-100 p-8 rounded-lg">
                <h3 className="text-2xl font-semibold mb-4">Why Choose Us</h3>
                <ul className="space-y-3">
                  <li className="flex">
                    <span className="text-primary mr-2">✓</span>
                    <span>Custom solutions tailored to your specific needs</span>
                  </li>
                  <li className="flex">
                    <span className="text-primary mr-2">✓</span>
                    <span>Experienced developers with modern tech stack expertise</span>
                  </li>
                  <li className="flex">
                    <span className="text-primary mr-2">✓</span>
                    <span>SEO-optimized websites that rank well on Google</span>
                  </li>
                  <li className="flex">
                    <span className="text-primary mr-2">✓</span>
                    <span>Responsive design that works on all devices</span>
                  </li>
                  <li className="flex">
                    <span className="text-primary mr-2">✓</span>
                    <span>Ongoing support and maintenance options</span>
                  </li>
                  <li className="flex">
                    <span className="text-primary mr-2">✓</span>
                    <span>Transparent pricing with no hidden costs</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <ServiceCard key={index} {...service} />
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Ready to Start Your Project?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Let's discuss how we can help transform your business
            </p>
            <div className="flex flex-col items-center gap-4 mb-8">
              <p className="text-lg">
                <span className="font-semibold">Call us:</span>{" "}
                <a href="tel:+14703445563" className="text-primary hover:text-primary/80">
                  (470) 344-5563
                </a>
              </p>
              <p className="text-lg">
                <span className="font-semibold">Email:</span>{" "}
                <a href="mailto:info@mcadamsdevelopment.com" className="text-primary hover:text-primary/80">
                  info@mcadamsdevelopment.com
                </a>
              </p>
            </div>
            <Link
              to="/contact"
              className="btn btn-primary inline-block px-8 py-3 text-lg"
            >
              Contact Us Now
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}