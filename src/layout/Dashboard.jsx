import React from 'react';
import Sidebar from '../component/Sidebar';
import { Outlet } from 'react-router-dom';

function DashboardLayout() {
  return (
    <div className="flex h-screen p-1 gap-x-2 bg-slate-200">
      <Sidebar />
      <main className="flex-1 px-5 py-1 bg-white rounded-xl overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;
