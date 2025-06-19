import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // When route changes, scroll to top of page
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}