
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
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="text-6xl mb-4 animate-bounce">🐝</div>
            <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-xl animate-pulse"></div>
          </div>
          <div className="space-y-2">
            <div className="text-xl text-gray-700 font-medium animate-pulse">Yükleniyor...</div>
            <div className="mt-4 w-48 h-2 bg-gradient-to-r from-amber-200 via-orange-300 to-amber-200 rounded-full mx-auto overflow-hidden">
              <div className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <SmartBreadcrumb />
        <main className="flex-1 p-6 overflow-auto">
          <div className="animate-fade-in">
            <Outlet />
          </div>
        </main>
      </div>
      <SmartNavigation />
    </div>
  );
};

export default DashboardLayout;
