import { index, route, type RouteConfig } from '@react-router/dev/routes';

export default [
  index('pages/MarketplacePage.tsx'),
  route('properties/:propertyId', 'pages/PropertyDetailPage.tsx'),
  route('account', 'pages/AccountPage.tsx'),
  route('passport', 'pages/PassportPage.tsx'),
  route('support', 'pages/SupportPage.tsx'),
  route('operations', 'pages/OperationsPage.tsx'),
] satisfies RouteConfig;
