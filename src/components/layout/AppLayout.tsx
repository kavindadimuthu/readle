import React from 'react';
import PublicHeader from '@/components/headers/PublicHeader';
import DashboardHeader from '@/components/headers/DashboardHeader';
import ChildHeader from '@/components/headers/ChildHeader';
import { PublicFooter, DashboardFooter } from '@/components/footers';

type AppLayoutProps = {
  role: 'public' | 'parent' | 'child';
  children: React.ReactNode;
};

export default function AppLayout({ role, children }: AppLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      {role === 'public' && <PublicHeader />}
      {role === 'parent' && <DashboardHeader userName="Kasun" />}
      {role === 'child' && (
        <ChildHeader 
          childName="Amara" 
          avatar="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=150&h=150&fit=crop&crop=face" 
          level={1} 
          coins={50}
        />
      )}

      {/* Main content */}
      <div className="flex-grow">
        {children}
      </div>

      {/* Footer */}
      <footer className="bg-white mt-auto">
        {role === 'public' && <PublicFooter />}
        {role === 'parent' && <DashboardFooter />}
        {/* {role === 'child' && <ChildFooter />} */}
      </footer>
    </div>
  );
}