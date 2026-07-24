import { index, route, type RouteConfig } from '@react-router/dev/routes';

export default [
  index('./route-modules/home.tsx'),
  route('about', './route-modules/about.tsx'),
  route('services', './route-modules/services.tsx'),
  route('solutions/:slug', './route-modules/solution.tsx'),
  route('contact', './route-modules/contact.tsx'),
  route('privacy-policy', './route-modules/privacy-policy.tsx'),
  route('*', './route-modules/not-found.tsx'),
] satisfies RouteConfig;
