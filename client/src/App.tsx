import { Routes, Route } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { Home } from './pages/Home';
import { Services } from './pages/Services';
import { Contact } from './pages/Contact';
import { NotFound } from './pages/NotFound';
import { ScrollToTop } from './components/ScrollToTop';
import './App.css'

function App() {
  return (
    <>
      <ScrollToTop />
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          {/* 404 route - must be last */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MainLayout>
    </>
  )
}

// Temporary page components - will move to separate files
function About() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">About Us</h1>
      <p className="text-xl text-gray-600">Learn about our company and mission</p>
    </div>
  );
}

export default App
