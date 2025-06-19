import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="bg-primary text-white">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">McAdams Development</Link>
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-gray-200">Home</Link>
            <Link to="/about" className="hover:text-gray-200">About</Link>
            <Link to="/services" className="hover:text-gray-200">Services</Link>
            <Link to="/contact" className="hover:text-gray-200">Contact</Link>
          </div>
        </div>
      </nav>
    </header>
  );
}