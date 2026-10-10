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
  route('sign-up', 'pages/AuthPage.tsx', { id: 'sign-up' }),
  route('sign-in', 'pages/AuthPage.tsx', { id: 'sign-in' }),
  route('verify-email', 'pages/AuthPage.tsx', { id: 'verify-email' }),
  route('reset-password', 'pages/AuthPage.tsx', { id: 'reset-password' }),
] satisfies RouteConfig;
