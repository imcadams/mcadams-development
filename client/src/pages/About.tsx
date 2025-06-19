import { SEO } from '../components/SEO';

export function About() {
  return (
    <>
      <SEO
        title="About McAdams Development | Our Story, Mission, and Values"
        description="Learn about McAdams Development, a passionate team of web developers dedicated to creating high-quality, innovative, and effective web solutions for businesses of all sizes."
        canonicalUrl='https://www.mcadamsdevelopment.com/about'
        schemaType="AboutPage"
      />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-4">About Us</h1>
        <p className="text-lg text-center text-gray-600 mb-8">Our Story, Mission, and Values</p>

        <div className="space-y-12">
          <div>
            <h2 className="text-3xl font-semibold mb-4">Our Story</h2>
            <p className="text-gray-700 leading-relaxed">
              Founded in 2025, McAdams Development started with a simple mission: to help businesses thrive in the digital world. We saw a need for web development services that were not only technically excellent but also deeply collaborative and client-focused. From our humble beginnings, we have grown into a trusted partner for companies looking to make a significant impact online.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed">
              Our mission is to design, build, and deploy innovative web solutions that drive growth, enhance user engagement, and deliver measurable results. We are committed to leveraging the latest technologies and best practices to create websites and applications that are fast, secure, and scalable.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-semibold mb-4">Our Values</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li><strong>Client-Centric:</strong> Your success is our success. We work closely with you to understand your goals and deliver solutions that exceed your expectations.</li>
              <li><strong>Innovation:</strong> We are passionate about technology and continuously explore new ways to solve problems and create value.</li>
              <li><strong>Integrity:</strong> We believe in transparency, honesty, and building long-term relationships based on trust.</li>
              <li><strong>Quality:</strong> We are committed to the highest standards of quality in everything we do, from code to customer service.</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}