import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

interface ServiceFeature {
  title: string;
  features: string[];
}

interface DetailedServiceCardProps extends ServiceFeature {
  pricing: string;
  description: string;
  icon: string;
}

function DetailedServiceCard({ title, pricing, description, features, icon }: DetailedServiceCardProps) {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      <div className="text-4xl text-primary mb-4">{icon}</div>
      <h3 className="text-2xl font-semibold mb-2">{title}</h3>
      <div className="text-lg font-semibold text-primary mb-4">{pricing}</div>
      <p className="text-gray-600 mb-6">{description}</p>
      <ul className="space-y-2 mb-8 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <span className="text-primary mr-2">✓</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Link
        to="/contact"
        className="btn btn-primary w-full text-center mt-auto"
      >
        Get Quote
      </Link>
    </div>
  );
}

export function Services() {
  const services: DetailedServiceCardProps[] = [
    {
      title: "Website Development",
      pricing: "Starting at $2,500",
      description: "Create a powerful online presence with our custom website development services.",
      icon: "🌐",
      features: [
        "Professional responsive design",
        "SEO optimization built-in",
        "Fast loading performance",
        "Content management system",
      ]
    },
    {
      title: "Web Applications",
      pricing: "Starting at $8,000",
      description: "Custom web applications built with modern technologies to solve complex business needs.",
      icon: "⚡",
      features: [
        "React/TypeScript development",
        "Secure user authentication",
        "Database integration",
        "Real-time updates",
      ]
    },
    {
      title: "Mobile Apps",
      pricing: "Starting at $15,000",
      description: "Native and cross-platform mobile applications that deliver exceptional user experiences.",
      icon: "📱",
      features: [
        "iOS and Android development",
        "React Native expertise",
        "App store deployment",
        "Offline capabilities",
      ]
    },
    {
      title: "Cloud Migration",
      pricing: "Contact for quote",
      description: "Modernize your infrastructure with our cloud migration and optimization services.",
      icon: "☁️",
      features: [
        "AWS architecture expertise",
        "Serverless implementation",
        "Scalability planning",
        "Cost optimization",
      ]
    },
    {
      title: "DevOps Consulting",
      pricing: "Contact for quote",
      description: "Streamline your development and deployment processes with modern DevOps practices.",
      icon: "🔄",
      features: [
        "CI/CD pipeline setup",
        "Infrastructure as code",
        "Automated testing",
        "Performance monitoring",
      ]
    },
    {
      title: "UI/UX Design",
      pricing: "Starting at $3,000",
      description: "Create intuitive and engaging user experiences with our design expertise.",
      icon: "🎨",
      features: [
        "User research & testing",
        "Wireframing & prototyping",
        "Design system creation",
        "Responsive interfaces",
      ]
    }
  ];

  return (
    <>
      <SEO 
        title="Services"
        description="Expert web development services including custom websites, web applications, mobile apps, cloud migration, DevOps consulting, and UI/UX design."
        canonicalUrl="https://www.mcadamsdevelopment.com/services"
        schemaType="Service"
      />
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-blue-900 text-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Our Development Services
              </h1>
              <p className="text-xl md:text-2xl text-gray-100">
                Expert solutions tailored to your business needs
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <DetailedServiceCard key={index} {...service} />
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Let's discuss how our services can help you achieve your goals.
            </p>
            <Link
              to="/contact"
              className="btn btn-primary inline-block px-8 py-3 text-lg"
            >
              Schedule a Free Consultation
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}