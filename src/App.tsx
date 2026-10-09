import { Navigate, Route, Routes } from 'react-router-dom';
import { AppShell } from './layouts/AppShell';
import { MarketplacePage } from './pages/MarketplacePage';
import { OperationsPage } from './pages/OperationsPage';
import { PassportPage } from './pages/PassportPage';

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<MarketplacePage />} />
        <Route path="passport" element={<PassportPage />} />
        <Route path="operations" element={<OperationsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
