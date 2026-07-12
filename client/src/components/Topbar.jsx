import React from 'react';
import { Search, Bell, Mail } from 'lucide-react';
import { dummyUser } from '../data/mockData';
import { useAppContext } from '../context/AppContext';

const Topbar = () => {
  const { setAddVehicleOpen, setSettingsOpen, setNotificationsOpen, setUserProfileOpen } = useAppContext();

  return (
    <header className="sticky top-0 z-40 w-full bg-surface/80 backdrop-blur-md border-b border-outline-variant shadow-sm flex justify-between items-center h-16 px-margin-page max-w-container-max mx-auto">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative focus-within:ring-2 focus-within:ring-secondary rounded-lg">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" size={20} />
          <input 
            type="text" 
            placeholder="Search..." 
            className="pl-10 pr-4 py-2 bg-surface border border-outline-variant rounded-lg text-sm text-on-surface focus:outline-none focus:border-secondary w-64" 
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button onClick={() => setAddVehicleOpen(true)} className="bg-primary-container text-on-primary py-1.5 px-4 rounded-lg text-sm font-medium hover:bg-surface-tint transition-colors">
          Add Vehicle
        </button>
        <button onClick={() => setSettingsOpen(true)} className="bg-surface border border-outline-variant text-on-surface py-1.5 px-4 rounded-lg text-sm font-medium hover:bg-surface-container transition-colors">
          Settings
        </button>
        <div className="flex items-center gap-2 border-l border-outline-variant pl-4 ml-2">
          <button onClick={() => setNotificationsOpen(true)} className="p-2 text-on-surface-variant hover:text-primary transition-all rounded-full hover:bg-surface-container">
            <Bell size={20} />
          </button>
          <button className="p-2 text-on-surface-variant hover:text-primary transition-all rounded-full hover:bg-surface-container">
            <Mail size={20} />
          </button>
          <img 
            onClick={() => setUserProfileOpen(true)}
            src={dummyUser.avatar} 
            alt="User Avatar" 
            className="w-8 h-8 rounded-full ml-2 object-cover border border-outline-variant cursor-pointer hover:ring-2 hover:ring-primary-container" 
          />
        </div>
      </div>
    </header>
  );
};

export default Topbar;
