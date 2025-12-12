import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useApp, AppProvider } from './store';
import { Navbar, Footer, NotFound } from './components/Layout';
import { Home, AllContests, Leaderboard } from './pages/PublicPages';
import { Login, Register } from './pages/AuthPages';
import { ContestDetails } from './pages/ContestDetails';
import { UserDashboard, CreatorDashboard, AdminDashboard } from './pages/Dashboards';
import { UserRole } from './types';

// Protected Route Component
interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
}

const ProtectedRoute = ({ children, allowedRoles }: React.PropsWithChildren<ProtectedRouteProps>) => {
  const { currentUser } = useApp();
  const location = useLocation();

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/all-contests" element={<AllContests />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route path="/contest/:id" element={
            <ProtectedRoute>
              <ContestDetails />
            </ProtectedRoute>
          } />

          {/* Dashboards */}
          <Route path="/dashboard/user" element={
            <ProtectedRoute allowedRoles={[UserRole.USER, UserRole.CREATOR, UserRole.ADMIN]}>
              <UserDashboard />
            </ProtectedRoute>
          } />
          
          <Route path="/dashboard/creator" element={
            <ProtectedRoute allowedRoles={[UserRole.CREATOR, UserRole.ADMIN]}>
              <CreatorDashboard />
            </ProtectedRoute>
          } />
          
          <Route path="/dashboard/admin" element={
            <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
              <AdminDashboard />
            </ProtectedRoute>
          } />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <AppProvider>
        <AppRoutes />
    </AppProvider>
  );
};

export default App;