import { index, route, type RouteConfig } from '@react-router/dev/routes';

export default [
  index('pages/MarketplacePage.tsx'),
  route('passport', 'pages/PassportPage.tsx'),
  route('operations', 'pages/OperationsPage.tsx'),
  route('admin/login', 'pages/AdminLoginPage.tsx'),
] satisfies RouteConfig;
