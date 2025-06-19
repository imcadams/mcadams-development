import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p>Email: info@mcadamsdevelopment.com</p>
            <p>Phone: (470) 344-5563</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><Link to="/services#web" className="hover:text-gray-300">Website Development</Link></li>
              <li><Link to="/services#app" className="hover:text-gray-300">Web Application Development</Link></li>
              <li><Link to="/services#mobile" className="hover:text-gray-300">Mobile App Development</Link></li>
            </ul>
          </div>
          {/* <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">LinkedIn</a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">GitHub</a>
            </div>
          </div> */}
        </div>
        <div className="mt-8 text-center border-t border-gray-700 pt-8">
          <p className="mb-2">&copy; {new Date().getFullYear()} McAdams Development. All rights reserved.</p>
          <Link to="/privacy-policy" className="text-sm text-gray-400 hover:text-white">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
}