import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider, useAuth } from '@/app/contexts/AuthContext';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { Home } from '@/app/pages/Home';
import { About } from '@/app/pages/About';
import { Goals } from '@/app/pages/Goals';
import { Social } from '@/app/pages/Social';
import { Psychology } from '@/app/pages/Psychology';
import { Login } from '@/app/pages/Login';
import { AuthPage } from '@/app/pages/AuthPage';
import { ForgotPasswordPage } from '@/app/pages/ForgotPasswordPage';
import { ResetPasswordPage } from '@/app/pages/ResetPasswordPage';
import { StudentDashboard } from '@/app/pages/StudentDashboard';
import { AdminDashboard } from '@/app/pages/AdminDashboard';
import { ChinaPage } from '@/app/pages/ChinaPage';
import { ItalyPage } from '@/app/pages/ItalyPage';
import { CzechiaPage } from '@/app/pages/CzechiaPage';
import { SlovakiaPage } from '@/app/pages/SlovakiaPage';

// Google OAuth Client ID - set in .env as VITE_GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode; role?: 'student' | 'admin' }> = ({ children, role }) => {
  const { user, loading } = useAuth();

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to={user.role === 'admin' ? '/admin' : '/dashboard'} replace />;
  }

  return <>{children}</>;
};

// Guest Route Component - redirects to dashboard if already logged in
const GuestRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (user) {
    return <Navigate to={user.role === 'admin' ? '/admin' : '/dashboard'} replace />;
  }

  return <>{children}</>;
};

const AppContent: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/social" element={<Social />} />
          <Route path="/psychology" element={<Psychology />} />

          {/* Auth routes - redirect to dashboard if logged in */}
          <Route
            path="/login"
            element={
              <GuestRoute>
                <Login />
              </GuestRoute>
            }
          />
          <Route
            path="/auth"
            element={
              <GuestRoute>
                <AuthPage />
              </GuestRoute>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <GuestRoute>
                <ForgotPasswordPage />
              </GuestRoute>
            }
          />
          <Route
            path="/reset-password/:token"
            element={
              <GuestRoute>
                <ResetPasswordPage />
              </GuestRoute>
            }
          />

          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute role="student">
                <StudentDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Country pages */}
          <Route path="/china" element={<ChinaPage />} />
          <Route path="/italy" element={<ItalyPage />} />
          <Route path="/czechia" element={<CzechiaPage />} />
          <Route path="/slovakia" element={<SlovakiaPage />} />

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  // Wrap with GoogleOAuthProvider only if client ID is available
  const content = (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );

  if (GOOGLE_CLIENT_ID) {
    return (
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        {content}
      </GoogleOAuthProvider>
    );
  }

  // If no Google Client ID, render without OAuth provider
  // Google login will show an error message
  return content;
};

export default App;
