import { index, route, type RouteConfig } from '@react-router/dev/routes';

export default [
  index('pages/OperationsPage.tsx'),
  route('admin/login', 'pages/OperationsPage.tsx', { id: 'admin-login' }),
  route('review', 'pages/OperationsPage.tsx', { id: 'review' }),
  route('catalogue', 'pages/OperationsPage.tsx', { id: 'catalogue' }),
  route('access', 'pages/OperationsPage.tsx', { id: 'access' }),
  route('audit', 'pages/OperationsPage.tsx', { id: 'audit' }),
  route('settings', 'pages/OperationsPage.tsx', { id: 'settings' }),
] satisfies RouteConfig;
