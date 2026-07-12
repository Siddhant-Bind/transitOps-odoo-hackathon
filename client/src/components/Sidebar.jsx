import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Truck, Users, Route, Wrench, Fuel, BarChart3, Settings } from 'lucide-react';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/fleet', label: 'Fleet', icon: Truck },
  { path: '/drivers', label: 'Drivers', icon: Users },
  { path: '/trips', label: 'Trips', icon: Route },
  { path: '/maintenance', label: 'Maintenance', icon: Wrench },
  { path: '/fuel', label: 'Fuel & Expenses', icon: Fuel },
  { path: '/reports', label: 'Reports & Analytics', icon: BarChart3 },
  { path: '/settings', label: 'Settings', icon: Settings },
];

const Sidebar = () => {
  return (
    <nav className="fixed left-0 top-0 h-full w-[260px] bg-surface border-r border-outline-variant shadow-sm z-50 flex-col p-stack-lg hidden md:flex">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-primary tracking-tight">TransitOps</h1>
        <p className="text-sm text-on-surface-variant">Enterprise Fleet</p>
      </div>
      <button className="mb-8 w-full bg-primary-container text-on-primary py-2 px-4 rounded-lg text-[15px] font-medium hover:bg-surface-tint transition-colors duration-200">
        Quick Add
      </button>
      <ul className="flex-1 space-y-2">
        {navItems.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              end
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg duration-150 ease-in-out ${
                  isActive
                    ? 'bg-primary-container text-on-primary-container font-bold scale-95'
                    : 'text-on-surface-variant hover:bg-surface-container hover:bg-surface-container-high transition-colors scale-95'
                }`
              }
            >
              <item.icon size={24} />
              <span className="text-[15px] font-medium">{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
