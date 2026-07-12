import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import GlobalOverlays from './GlobalOverlays';

const DashboardLayout = () => {
  return (
    <div className="bg-background text-on-background font-inter h-screen flex overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col md:ml-[260px] h-full overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-margin-page bg-background">
          <div className="max-w-container-max mx-auto space-y-stack-lg pb-12">
            <Outlet />
          </div>
        </main>
      </div>
      <GlobalOverlays />
    </div>
  );
};

export default DashboardLayout;
