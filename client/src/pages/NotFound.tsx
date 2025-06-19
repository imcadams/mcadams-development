import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

export function NotFound() {
  return (
    <>
      <SEO 
        title="Page Not Found"
        description="The page you are looking for does not exist. Navigate back to the McAdams Development homepage."
        canonicalUrl="https://www.mcadamsdevelopment.com/404"
      />
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-3xl font-semibold mb-6">Page Not Found</h2>
        <p className="text-xl text-gray-600 mb-10 max-w-lg">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            to="/" 
            className="btn bg-primary hover:bg-primary/90 text-white font-semibold px-6 py-3 rounded-lg text-center"
          >
            Back to Home
          </Link>
          <Link 
            to="/contact" 
            className="btn border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold px-6 py-3 rounded-lg text-center"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </>
  );
}