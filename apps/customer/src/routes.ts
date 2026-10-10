import { index, route, type RouteConfig } from '@react-router/dev/routes';

export default [
  index('pages/MarketplacePage.tsx'),
  route('passport', 'pages/PassportPage.tsx'),
  route('operations', 'pages/OperationsPage.tsx'),
  route('admin/login', 'pages/AdminLoginPage.tsx'),
  route('how-it-works', 'pages/PublicInfoPage.tsx', { id: 'how-it-works' }),
  route('safety', 'pages/PublicInfoPage.tsx', { id: 'safety' }),
  route('support', 'pages/PublicInfoPage.tsx', { id: 'support' }),
  route('privacy', 'pages/PublicInfoPage.tsx', { id: 'privacy' }),
  route('terms', 'pages/PublicInfoPage.tsx', { id: 'terms' }),
] satisfies RouteConfig;
