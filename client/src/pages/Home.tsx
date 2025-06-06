import { Link } from 'react-router-dom';

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
              <a href="tel:+16789008523" className="text-primary hover:text-primary/80">
                (678) 900-8523
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
  );
}