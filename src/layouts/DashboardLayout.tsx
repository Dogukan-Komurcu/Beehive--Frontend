
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { Header } from '@/components/dashboard/Header';
import SmartNavigation from '@/components/common/SmartNavigation';
import SmartBreadcrumb from '@/components/common/SmartBreadcrumb';

const DashboardLayout = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="text-center">
          <div className="text-6xl mb-4 bee-float">🐝</div>
          <div className="text-xl text-gray-600 animate-pulse">Yükleniyor...</div>
          <div className="mt-4 w-32 h-1 bg-gradient-honey rounded-full mx-auto animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <SmartBreadcrumb />
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
      <SmartNavigation />
    </div>
  );
};

export default DashboardLayout;
