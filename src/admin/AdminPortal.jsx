import React, { useState, useEffect } from 'react';
import { getAdminSession, logoutAdmin } from './adminAuth';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

export default function AdminPortal({ onNavigateToStore }) {
  const [session, setSession] = useState(getAdminSession());

  useEffect(() => {
    setSession(getAdminSession());
  }, []);

  const handleLoginSuccess = (newSession) => {
    setSession(newSession);
  };

  const handleLogout = () => {
    logoutAdmin();
    setSession(null);
  };

  if (!session) {
    return (
      <AdminLogin
        onLoginSuccess={handleLoginSuccess}
        onCancel={onNavigateToStore}
      />
    );
  }

  return (
    <AdminDashboard
      session={session}
      onLogout={handleLogout}
      onNavigateToStore={onNavigateToStore}
    />
  );
}
