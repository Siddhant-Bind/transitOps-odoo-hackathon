
import React, { useEffect } from 'react';

const Settings = () => {
  useEffect(() => {
    if (window.lucide && window.lucide.createIcons) {
      window.lucide.createIcons();
    }
  }, []);

  return (
    <>
      

<header className="sticky top-0 z-40 w-full bg-surface/80 dark:bg-inverse-surface/80 backdrop-blur-md shadow-sm">
<div className="flex justify-between items-center h-16 px-margin-page max-w-container-max mx-auto">
<div className="flex-1 max-w-md hidden md:flex items-center bg-surface-container-low rounded-lg px-3 py-2 border border-outline-variant focus-within:ring-2 focus-within:ring-secondary focus-within:border-secondary transition-all">
<span className="material-symbols-outlined text-on-surface-variant mr-2">search</span>
<input className="bg-transparent border-none outline-none w-full text-body-sm text-on-surface placeholder-on-surface-variant focus:ring-0 p-0" placeholder="Search settings..." type="text" />
</div>
<div className="flex items-center gap-4 ml-auto">
<button className="p-2 text-on-surface-variant hover:text-primary transition-all rounded-full hover:bg-surface-container relative">
<span className="material-symbols-outlined">notifications</span>
<span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full"></span>
</button>
<button className="p-2 text-on-surface-variant hover:text-primary transition-all rounded-full hover:bg-surface-container">
<span className="material-symbols-outlined">mail</span>
</button>
<div className="h-8 w-px bg-outline-variant mx-2"></div>
<button className="bg-white border border-outline-variant text-on-surface px-4 py-2 rounded-lg font-body-sm text-body-sm hover:bg-surface-container-low transition-colors">
                        Add Vehicle
                    </button>
</div>
</div>
</header>

<div className="p-margin-page max-w-container-max mx-auto w-full flex-grow flex flex-col md:flex-row gap-gutter">

<aside className="w-full md:w-64 flex-shrink-0">
<div className="sticky top-[100px]">
<h2 className="font-section-title text-section-title text-on-surface mb-6">Settings</h2>
<nav className="flex flex-col gap-1">
<button className="text-left px-4 py-2.5 rounded-lg font-body-md text-body-md text-on-surface-variant hover:bg-surface-container transition-colors flex items-center justify-between group">
                            General
                            <span className="material-symbols-outlined text-sm opacity-0 group-hover:opacity-100 transition-opacity">chevron_right</span>
</button>
<button className="text-left px-4 py-2.5 rounded-lg font-body-md text-body-md text-on-surface-variant hover:bg-surface-container transition-colors flex items-center justify-between group">
                            Company
                            <span className="material-symbols-outlined text-sm opacity-0 group-hover:opacity-100 transition-opacity">chevron_right</span>
</button>
<button className="text-left px-4 py-2.5 rounded-lg font-body-md text-body-md text-on-surface-variant hover:bg-surface-container transition-colors flex items-center justify-between group">
                            Depot
                            <span className="material-symbols-outlined text-sm opacity-0 group-hover:opacity-100 transition-opacity">chevron_right</span>
</button>
<button className="text-left px-4 py-2.5 rounded-lg font-body-md text-body-md text-on-surface-variant hover:bg-surface-container transition-colors flex items-center justify-between group">
                            Notifications
                            <span className="material-symbols-outlined text-sm opacity-0 group-hover:opacity-100 transition-opacity">chevron_right</span>
</button>
<button className="text-left px-4 py-2.5 rounded-lg font-body-md text-body-md text-on-surface-variant hover:bg-surface-container transition-colors flex items-center justify-between group">
                            Users
                            <span className="material-symbols-outlined text-sm opacity-0 group-hover:opacity-100 transition-opacity">chevron_right</span>
</button>
<button className="text-left px-4 py-2.5 rounded-lg font-body-md text-body-md text-on-surface-variant hover:bg-surface-container transition-colors flex items-center justify-between group">
                            Security
                            <span className="material-symbols-outlined text-sm opacity-0 group-hover:opacity-100 transition-opacity">chevron_right</span>
</button>
<button className="text-left px-4 py-2.5 rounded-lg font-body-md text-body-md bg-white border border-outline-variant shadow-sm text-primary font-medium flex items-center justify-between">
                            RBAC (Roles &amp; Permissions)
                            <span className="material-symbols-outlined text-sm">chevron_right</span>
</button>
</nav>
</div>
</aside>

<div className="flex-1 flex flex-col gap-stack-lg">

<section className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden p-stack-lg">
<div className="flex items-center justify-between mb-6 pb-4 border-b border-outline-variant">
<div>
<h3 className="font-section-title text-section-title text-on-surface">Role-Based Access Control</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Manage permissions for different user roles across the platform.</p>
</div>
<button className="bg-secondary text-white px-4 py-2 rounded-lg font-body-sm text-body-sm font-medium hover:bg-secondary-container transition-colors flex items-center gap-2">
<span className="material-symbols-outlined text-sm">add</span>
                            New Role
                        </button>
</div>
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr>
<th className="font-label-caps text-label-caps text-on-surface-variant pb-3 border-b border-outline-variant font-semibold min-w-[150px]">Module</th>
<th className="font-label-caps text-label-caps text-on-surface-variant pb-3 border-b border-outline-variant font-semibold text-center w-24">View</th>
<th className="font-label-caps text-label-caps text-on-surface-variant pb-3 border-b border-outline-variant font-semibold text-center w-24">Create</th>
<th className="font-label-caps text-label-caps text-on-surface-variant pb-3 border-b border-outline-variant font-semibold text-center w-24">Edit</th>
<th className="font-label-caps text-label-caps text-on-surface-variant pb-3 border-b border-outline-variant font-semibold text-center w-24">Delete</th>
</tr>
</thead>
<tbody>

<tr className="border-b border-outline-variant/50 hover:bg-surface-container-low/50 transition-colors">
<td className="py-4 font-body-md text-body-md text-on-surface font-medium">Dashboard</td>
<td className="py-4 text-center"><input checked="" className="rounded text-primary focus:ring-primary h-4 w-4 border-outline-variant bg-surface-container-low cursor-pointer" type="checkbox" /></td>
<td className="py-4 text-center"><input checked="" className="rounded text-primary focus:ring-primary h-4 w-4 border-outline-variant bg-surface-container-low cursor-pointer" type="checkbox" /></td>
<td className="py-4 text-center"><input checked="" className="rounded text-primary focus:ring-primary h-4 w-4 border-outline-variant bg-surface-container-low cursor-pointer" type="checkbox" /></td>
<td className="py-4 text-center"><input className="rounded text-primary focus:ring-primary h-4 w-4 border-outline-variant bg-surface-container-low cursor-pointer" type="checkbox" /></td>
</tr>
<tr className="bg-surface-bright border-b border-outline-variant/50 hover:bg-surface-container-low/50 transition-colors">
<td className="py-4 font-body-md text-body-md text-on-surface font-medium">Fleet</td>
<td className="py-4 text-center"><input checked="" className="rounded text-primary focus:ring-primary h-4 w-4 border-outline-variant bg-surface-container-low cursor-pointer" type="checkbox" /></td>
<td className="py-4 text-center"><input checked="" className="rounded text-primary focus:ring-primary h-4 w-4 border-outline-variant bg-surface-container-low cursor-pointer" type="checkbox" /></td>
<td className="py-4 text-center"><input checked="" className="rounded text-primary focus:ring-primary h-4 w-4 border-outline-variant bg-surface-container-low cursor-pointer" type="checkbox" /></td>
<td className="py-4 text-center"><input checked="" className="rounded text-primary focus:ring-primary h-4 w-4 border-outline-variant bg-surface-container-low cursor-pointer" type="checkbox" /></td>
</tr>
<tr className="border-b border-outline-variant/50 hover:bg-surface-container-low/50 transition-colors">
<td className="py-4 font-body-md text-body-md text-on-surface font-medium">Drivers</td>
<td className="py-4 text-center"><input checked="" className="rounded text-primary focus:ring-primary h-4 w-4 border-outline-variant bg-surface-container-low cursor-pointer" type="checkbox" /></td>
<td className="py-4 text-center"><input checked="" className="rounded text-primary focus:ring-primary h-4 w-4 border-outline-variant bg-surface-container-low cursor-pointer" type="checkbox" /></td>
<td className="py-4 text-center"><input checked="" className="rounded text-primary focus:ring-primary h-4 w-4 border-outline-variant bg-surface-container-low cursor-pointer" type="checkbox" /></td>
<td className="py-4 text-center"><input className="rounded text-primary focus:ring-primary h-4 w-4 border-outline-variant bg-surface-container-low cursor-pointer" type="checkbox" /></td>
</tr>
</tbody>
</table>
</div>
<div className="mt-6 flex justify-end">
<button className="bg-white border border-outline-variant text-on-surface px-6 py-2 rounded-lg font-body-sm text-body-sm font-medium hover:bg-surface-container-low transition-colors mr-3">
                            Cancel
                        </button>
<button className="bg-primary text-white px-6 py-2 rounded-lg font-body-sm text-body-sm font-medium hover:bg-surface-tint transition-colors shadow-sm">
                            Save Changes
                        </button>
</div>
</section>

<section className="glass rounded-xl p-stack-lg shadow-sm border border-outline-variant/50 relative overflow-hidden">
<div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none"></div>
<div className="relative z-10">
<div className="mb-6 pb-4 border-b border-outline-variant/50">
<h3 className="font-section-title text-section-title text-on-surface">General Preferences</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Configure your personal workspace settings.</p>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-stack-lg">

<div className="space-y-6">
<div className="flex items-center justify-between">
<div>
<p className="font-body-md text-body-md text-on-surface font-medium">Dark Mode</p>
<p className="font-body-sm text-body-sm text-on-surface-variant">Switch between light and dark themes.</p>
</div>
<label className="relative inline-flex items-center cursor-pointer">
<input className="sr-only peer" type="checkbox" value="" />
<div className="w-11 h-6 bg-surface-dim peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
</label>
</div>
<div className="flex items-center justify-between">
<div>
<p className="font-body-md text-body-md text-on-surface font-medium">Email Notifications</p>
<p className="font-body-sm text-body-sm text-on-surface-variant">Receive daily summary reports.</p>
</div>
<label className="relative inline-flex items-center cursor-pointer">
<input checked="" className="sr-only peer" type="checkbox" value="" />
<div className="w-11 h-6 bg-surface-dim peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
</label>
</div>
</div>

<div className="space-y-4">
<div>
<label className="block font-body-sm text-body-sm text-on-surface font-medium mb-1">Currency</label>
<div className="relative">
<select className="block w-full bg-white border border-outline-variant text-on-surface text-body-sm rounded-lg focus:ring-primary focus:border-primary block p-2.5 appearance-none shadow-sm cursor-pointer">
<option>USD ($)</option>
<option>EUR (€)</option>
<option>GBP (£)</option>
</select>
<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-on-surface-variant">
<span className="material-symbols-outlined text-sm">expand_more</span>
</div>
</div>
</div>
<div>
<label className="block font-body-sm text-body-sm text-on-surface font-medium mb-1">Distance Unit</label>
<div className="relative">
<select className="block w-full bg-white border border-outline-variant text-on-surface text-body-sm rounded-lg focus:ring-primary focus:border-primary block p-2.5 appearance-none shadow-sm cursor-pointer">
<option>Miles (mi)</option>
<option>Kilometers (km)</option>
</select>
<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-on-surface-variant">
<span className="material-symbols-outlined text-sm">expand_more</span>
</div>
</div>
</div>
</div>
</div>
</div>
</section>
</div>
</div>

    </>
  );
};

export default Settings;
