import { SEO } from '../components/SEO';

export function PrivacyPolicy() {
  return (
    <>
      <SEO
        title="Privacy Policy | McAdams Development"
        description="Understand how McAdams Development collects, uses, and protects your personal data. Your privacy is important to us."
        canonicalUrl="https://www.mcadamsdevelopment.com/privacy-policy"
        schemaType="WebPage"
      />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-4">Privacy Policy</h1>
        <p className="text-lg text-center text-gray-600 mb-8">Last Updated: June 19, 2025</p>

        <div className="space-y-8 text-gray-700">
          <p>
            McAdams Development ("us", "we", or "our") operates the https://www.mcadamsdevelopment.com website (the "Service").
          </p>
          <p>
            This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
          </p>
          <p>
            We use your data to provide and improve the Service. By using the Service, you agree to the collection and use of information in accordance with this policy.
          </p>

          <div>
            <h2 className="text-2xl font-semibold mb-2">Information Collection and Use</h2>
            <p>
              We collect several different types of information for various purposes to provide and improve our Service to you.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">Types of Data Collected</h2>
            <h3 className="text-xl font-semibold mt-4 mb-2">Personal Data</h3>
            <p>
              While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). Personally identifiable information may include, but is not limited to:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>Email address</li>
              <li>First name and last name</li>
              <li>Phone number</li>
              <li>Cookies and Usage Data</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">Use of Data</h2>
            <p>McAdams Development uses the collected data for various purposes:</p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>To provide and maintain the Service</li>
              <li>To notify you about changes to our Service</li>
              <li>To allow you to participate in interactive features of our Service when you choose to do so</li>
              <li>To provide customer care and support</li>
              <li>To provide analysis or valuable information so that we can improve the Service</li>
              <li>To monitor the usage of the Service</li>
              <li>To detect, prevent and address technical issues</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
