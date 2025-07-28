
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Login } from '@/pages/Login';
import { Dashboard } from '@/pages/Dashboard';
import { Users } from '@/pages/Users';
import { Drivers } from '@/pages/Drivers';
import { Bookings } from '@/pages/Bookings';
import { Payments } from '@/pages/Payments';
import { Promotions } from '@/pages/Promotions';
import { Support } from '@/pages/Support';
import { Notifications } from '@/pages/Notifications';
import { Settings } from '@/pages/Settings';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import './App.css';


function AppRoutes() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/drivers" element={<Drivers />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/promotions" element={<Promotions />} />
        <Route path="/support" element={<Support />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </AdminLayout>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="admin-ui-theme">
      <AuthProvider>
        <Router>
          <AppRoutes />
          <Toaster />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;