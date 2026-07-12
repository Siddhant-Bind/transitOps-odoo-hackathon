import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ExecutiveDashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (window.lucide && window.lucide.createIcons) {
      window.lucide.createIcons();
    }
  }, []);

  return (
    <>
      
<div className="max-w-container-max mx-auto space-y-stack-lg pb-12">
<div className="flex justify-between items-end mb-stack-md">
<div>
<h2 className="font-section-title text-section-title text-on-surface font-semibold">Executive Command Center</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Real-time enterprise fleet monitoring</p>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-2">
<span className="w-2 h-2 rounded-full bg-tertiary-container animate-pulse"></span>
                        Live sync active
                    </p>
</div>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

<div className="bg-surface rounded-xl p-5 shadow-sm border border-outline-variant/30 hover-card-transition flex flex-col justify-between h-36">
<div className="flex justify-between items-start">
<div className="flex items-center gap-2">
<div className="p-2 rounded-lg bg-secondary-fixed/50 text-secondary">
<i className="w-5 h-5" data-lucide="truck"></i>
</div>
<span className="font-body-sm text-on-surface-variant font-medium">Active Vehicles</span>
</div>
</div>
<div className="flex items-end justify-between mt-4">
<div>
<div className="font-kpi-display text-3xl font-bold text-on-surface counter-animate">1,248</div>
<div className="flex items-center gap-1 text-tertiary-container text-xs font-semibold mt-1">
<i className="w-3 h-3" data-lucide="trending-up"></i>
<span>+4.2% vs last week</span>
</div>
</div>
<div className="w-16 h-8">
<svg className="w-full h-full" viewBox="0 0 100 30">
<path className="sparkline stroke-tertiary-container" d="M0 25 L20 20 L40 22 L60 10 L80 15 L100 5"></path>
</svg>
</div>
</div>
</div>

<div className="bg-surface rounded-xl p-5 shadow-sm border border-outline-variant/30 hover-card-transition flex flex-col justify-between h-36">
<div className="flex justify-between items-start">
<div className="flex items-center gap-2">
<div className="p-2 rounded-lg bg-tertiary-fixed/30 text-tertiary">
<i className="w-5 h-5" data-lucide="check-circle-2"></i>
</div>
<span className="font-body-sm text-on-surface-variant font-medium">Available Vehicles</span>
</div>
</div>
<div className="flex items-end justify-between mt-4">
<div>
<div className="font-kpi-display text-3xl font-bold text-on-surface counter-animate">342</div>
<div className="flex items-center gap-1 text-tertiary-container text-xs font-semibold mt-1">
<i className="w-3 h-3" data-lucide="trending-up"></i>
<span>+1.5% vs last week</span>
</div>
</div>
<div className="w-16 h-8">
<svg className="w-full h-full" viewBox="0 0 100 30">
<path className="sparkline stroke-tertiary-container" d="M0 20 L20 25 L40 18 L60 22 L80 15 L100 10"></path>
</svg>
</div>
</div>
</div>

<div className="bg-surface rounded-xl p-5 shadow-sm border border-outline-variant/30 hover-card-transition flex flex-col justify-between h-36">
<div className="flex justify-between items-start">
<div className="flex items-center gap-2">
<div className="p-2 rounded-lg bg-error-container/50 text-error">
<i className="w-5 h-5" data-lucide="wrench"></i>
</div>
<span className="font-body-sm text-on-surface-variant font-medium">In Maintenance</span>
</div>
</div>
<div className="flex items-end justify-between mt-4">
<div>
<div className="font-kpi-display text-3xl font-bold text-on-surface counter-animate">86</div>
<div className="flex items-center gap-1 text-error text-xs font-semibold mt-1">
<i className="w-3 h-3" data-lucide="trending-down"></i>
<span>-2.1% vs last week</span>
</div>
</div>
<div className="w-16 h-8">
<svg className="w-full h-full" viewBox="0 0 100 30">
<path className="sparkline stroke-error" d="M0 10 L20 15 L40 12 L60 20 L80 25 L100 22"></path>
</svg>
</div>
</div>
</div>

<div className="bg-surface rounded-xl p-5 shadow-sm border border-outline-variant/30 hover-card-transition flex flex-col justify-between h-36">
<div className="flex justify-between items-start">
<div className="flex items-center gap-2">
<div className="p-2 rounded-lg bg-primary-container/20 text-primary-container">
<i className="w-5 h-5" data-lucide="route"></i>
</div>
<span className="font-body-sm text-on-surface-variant font-medium">Active Trips</span>
</div>
</div>
<div className="flex items-end justify-between mt-4">
<div>
<div className="font-kpi-display text-3xl font-bold text-on-surface counter-animate">854</div>
<div className="flex items-center gap-1 text-tertiary-container text-xs font-semibold mt-1">
<i className="w-3 h-3" data-lucide="trending-up"></i>
<span>+8.4% vs last week</span>
</div>
</div>
<div className="w-16 h-8">
<svg className="w-full h-full" viewBox="0 0 100 30">
<path className="sparkline stroke-primary-container" d="M0 25 L20 18 L40 20 L60 12 L80 15 L100 5"></path>
</svg>
</div>
</div>
</div>

<div className="bg-surface rounded-xl p-5 shadow-sm border border-outline-variant/30 hover-card-transition flex flex-col justify-between h-36">
<div className="flex justify-between items-start">
<div className="flex items-center gap-2">
<div className="p-2 rounded-lg bg-surface-variant text-on-surface-variant">
<i className="w-5 h-5" data-lucide="clock"></i>
</div>
<span className="font-body-sm text-on-surface-variant font-medium">Pending Trips</span>
</div>
</div>
<div className="flex items-end justify-between mt-4">
<div>
<div className="font-kpi-display text-3xl font-bold text-on-surface counter-animate">124</div>
<div className="flex items-center gap-1 text-tertiary-container text-xs font-semibold mt-1">
<i className="w-3 h-3" data-lucide="trending-up"></i>
<span>+2.0% vs last week</span>
</div>
</div>
<div className="w-16 h-8">
<svg className="w-full h-full" viewBox="0 0 100 30">
<path className="sparkline stroke-on-surface-variant" d="M0 22 L20 20 L40 25 L60 18 L80 20 L100 15"></path>
</svg>
</div>
</div>
</div>

<div className="bg-surface rounded-xl p-5 shadow-sm border border-outline-variant/30 hover-card-transition flex flex-col justify-between h-36">
<div className="flex justify-between items-start">
<div className="flex items-center gap-2">
<div className="p-2 rounded-lg bg-secondary-fixed/50 text-secondary">
<i className="w-5 h-5" data-lucide="users"></i>
</div>
<span className="font-body-sm text-on-surface-variant font-medium">Drivers On Duty</span>
</div>
</div>
<div className="flex items-end justify-between mt-4">
<div>
<div className="font-kpi-display text-3xl font-bold text-on-surface counter-animate">912</div>
<div className="flex items-center gap-1 text-tertiary-container text-xs font-semibold mt-1">
<i className="w-3 h-3" data-lucide="trending-up"></i>
<span>+5.1% vs last week</span>
</div>
</div>
<div className="w-16 h-8">
<svg className="w-full h-full" viewBox="0 0 100 30">
<path className="sparkline stroke-secondary" d="M0 28 L20 20 L40 22 L60 15 L80 18 L100 8"></path>
</svg>
</div>
</div>
</div>

<div className="bg-surface rounded-xl p-5 shadow-sm border border-outline-variant/30 hover-card-transition flex flex-col justify-between h-36">
<div className="flex justify-between items-start">
<div className="flex items-center gap-2">
<div className="p-2 rounded-lg bg-primary-container/20 text-primary-container">
<i className="w-5 h-5" data-lucide="pie-chart"></i>
</div>
<span className="font-body-sm text-on-surface-variant font-medium">Fleet Utilization</span>
</div>
</div>
<div className="flex items-end justify-between mt-4">
<div>
<div className="font-kpi-display text-3xl font-bold text-on-surface counter-animate">87%</div>
<div className="flex items-center gap-1 text-tertiary-container text-xs font-semibold mt-1">
<i className="w-3 h-3" data-lucide="trending-up"></i>
<span>+1.5% vs last week</span>
</div>
</div>
<div className="w-16 h-8">
<svg className="w-full h-full" viewBox="0 0 100 30">
<path className="sparkline stroke-primary-container" d="M0 20 L20 18 L40 15 L60 12 L80 8 L100 5"></path>
</svg>
</div>
</div>
</div>

<div className="bg-surface rounded-xl p-5 shadow-sm border border-outline-variant/30 hover-card-transition flex flex-col justify-between h-36">
<div className="flex justify-between items-start">
<div className="flex items-center gap-2">
<div className="p-2 rounded-lg bg-tertiary-fixed/30 text-tertiary">
<i className="w-5 h-5" data-lucide="dollar-sign"></i>
</div>
<span className="font-body-sm text-on-surface-variant font-medium">Today's Revenue</span>
</div>
</div>
<div className="flex items-end justify-between mt-4">
<div>
<div className="font-kpi-display text-3xl font-bold text-on-surface counter-animate">$142.5k</div>
<div className="flex items-center gap-1 text-tertiary-container text-xs font-semibold mt-1">
<i className="w-3 h-3" data-lucide="trending-up"></i>
<span>+12.4% vs last week</span>
</div>
</div>
<div className="w-16 h-8">
<svg className="w-full h-full" viewBox="0 0 100 30">
<path className="sparkline stroke-tertiary" d="M0 25 L20 28 L40 15 L60 20 L80 10 L100 2"></path>
</svg>
</div>
</div>
</div>
</div>

<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

<div className="space-y-6">

<div className="bg-surface rounded-xl p-6 shadow-sm border border-outline-variant/30">
<h3 className="font-body-md font-semibold text-on-surface mb-4">Fleet Utilization Trend</h3>
<div className="h-64 w-full bg-surface-container-low rounded-lg flex items-center justify-center border border-outline-variant/20 relative overflow-hidden">

<svg className="w-full h-full px-4" preserveAspectRatio="none" viewBox="0 0 400 200">

<line stroke="#dce2f7" stroke-dasharray="4" x1="0" x2="400" y1="50" y2="50"></line>
<line stroke="#dce2f7" stroke-dasharray="4" x1="0" x2="400" y1="100" y2="100"></line>
<line stroke="#dce2f7" stroke-dasharray="4" x1="0" x2="400" y1="150" y2="150"></line>

<path d="M0 160 Q 50 140, 100 150 T 200 120 T 300 80 T 400 40" fill="none" stroke="#2170e4" stroke-linecap="round" stroke-width="4"></path>

<path d="M0 160 Q 50 140, 100 150 T 200 120 T 300 80 T 400 40 L 400 200 L 0 200 Z" fill="url(#blue-gradient)" opacity="0.2"></path>
<defs>
<linearGradient id="blue-gradient" x1="0" x2="0" y1="0" y2="1">
<stop offset="0%" stop-color="#2170e4"></stop>
<stop offset="100%" stop-color="#ffffff" stop-opacity="0"></stop>
</linearGradient>
</defs>
</svg>
</div>
</div>

<div className="bg-surface rounded-xl p-6 shadow-sm border border-outline-variant/30">
<h3 className="font-body-md font-semibold text-on-surface mb-4">Daily Trips Completed</h3>
<div className="h-64 w-full bg-surface-container-low rounded-lg flex items-end justify-around px-4 pt-8 pb-2 border border-outline-variant/20">

<div className="w-12 h-[40%] bg-primary-container rounded-t-sm"></div>
<div className="w-12 h-[60%] bg-primary-container rounded-t-sm"></div>
<div className="w-12 h-[45%] bg-primary-container rounded-t-sm"></div>
<div className="w-12 h-[80%] bg-primary-container rounded-t-sm"></div>
<div className="w-12 h-[70%] bg-primary-container rounded-t-sm"></div>
<div className="w-12 h-[90%] bg-primary-container rounded-t-sm"></div>
<div className="w-12 h-[85%] bg-primary-container rounded-t-sm"></div>
</div>
</div>
</div>

<div className="space-y-6">

<div className="bg-surface rounded-xl p-6 shadow-sm border border-outline-variant/30">
<h3 className="font-body-md font-semibold text-on-surface mb-4">Fuel Consumption</h3>
<div className="h-64 w-full bg-surface-container-low rounded-lg flex items-center justify-center border border-outline-variant/20">
<svg className="w-full h-full px-4" preserveAspectRatio="none" viewBox="0 0 400 200">
<path d="M0 180 Q 80 170, 150 130 T 250 140 T 350 90 L 400 70 L 400 200 L 0 200 Z" fill="#f59e0b" opacity="0.3"></path>
<path d="M0 180 Q 80 170, 150 130 T 250 140 T 350 90 L 400 70" fill="none" stroke="#f59e0b" stroke-width="3"></path>
</svg>
</div>
</div>

<div className="bg-surface rounded-xl p-6 shadow-sm border border-outline-variant/30">
<h3 className="font-body-md font-semibold text-on-surface mb-4">Maintenance Distribution</h3>
<div className="h-64 w-full bg-surface-container-low rounded-lg flex items-center justify-center border border-outline-variant/20 relative">

<svg className="w-48 h-48" viewBox="0 0 200 200">
<circle cx="100" cy="100" fill="none" r="70" stroke="#2170e4" stroke-dasharray="440" stroke-dashoffset="100" stroke-width="30"></circle>
<circle cx="100" cy="100" fill="none" r="70" stroke="#f59e0b" stroke-dasharray="440" stroke-dashoffset="340" stroke-width="30" transform="rotate(-90 100 100)"></circle>
<circle cx="100" cy="100" fill="none" r="70" stroke="#2bca62" stroke-dasharray="440" stroke-dashoffset="380" stroke-width="30" transform="rotate(45 100 100)"></circle>
<text className="font-semibold text-xl fill-on-surface" text-anchor="middle" x="100" y="105">324</text>
<text className="text-xs fill-on-surface-variant" text-anchor="middle" x="100" y="125">Tickets</text>
</svg>
</div>
</div>
</div>
</div>

<div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">

<div className="xl:col-span-2 bg-surface rounded-xl shadow-sm border border-outline-variant/30 overflow-hidden">
<div className="p-5 border-b border-outline-variant/30 flex justify-between items-center">
<h3 className="font-body-md font-semibold text-on-surface">Recent Trips</h3>
<button onClick={() => navigate('/trips')} className="text-secondary text-sm font-medium hover:underline">View All</button>
</div>
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="bg-surface-container-lowest text-on-surface-variant text-xs uppercase tracking-wider border-b border-outline-variant/30">
<th className="p-4 font-medium">Trip ID</th>
<th className="p-4 font-medium">Vehicle</th>
<th className="p-4 font-medium">Driver</th>
<th className="p-4 font-medium">Route</th>
<th className="p-4 font-medium">ETA</th>
<th className="p-4 font-medium">Status</th>
<th className="p-4 font-medium text-right">Actions</th>
</tr>
</thead>
<tbody className="text-sm">
<tr className="border-b border-outline-variant/20 hover-row-transition">
<td className="p-4 font-medium text-on-surface">#TRP-8492</td>
<td className="p-4">
<div className="flex items-center gap-2">
<div className="w-8 h-8 bg-surface-variant rounded flex items-center justify-center">
<i className="w-4 h-4 text-on-surface-variant" data-lucide="truck"></i>
</div>
<span className="text-on-surface">Volvo FH16</span>
</div>
</td>
<td className="p-4">
<div className="flex items-center gap-2">
<img alt="Driver" className="w-6 h-6 rounded-full border border-outline-variant" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUYrxeHojkrLKQfTfHU3n5iqx9fwXMtOGdqzWAR0VazeQcfV91CzjiVE4GzRXSA0r89n_gbaUqpSbMKTQ80OOxlnKr_EbR3Ksg4aP5Fu57WBGlm4Z0hX-s_SHALr99VAfPD-YddTmfBUZOXZKNM4z1xlbUxey9d5BcXRkXgE2k78L-hkB7adWwejFHLSQ7a1tOGP8P5nsXgFzx_e2mB1loTgeT7e43zYYV0eSCLuJxz6Lz9IYwiUnCmg" />
<span className="text-on-surface">Sarah J.</span>
</div>
</td>
<td className="p-4 text-on-surface-variant">Chicago → Detroit</td>
<td className="p-4 text-on-surface-variant">14:30 Today</td>
<td className="p-4">
<span className="px-2.5 py-1 bg-primary-container/20 text-primary-fixed-dim text-xs font-semibold rounded-full border border-primary-container/30">In Transit</span>
</td>
<td className="p-4 text-right">
<button onClick={() => navigate('/trips')} className="text-on-surface-variant hover:text-secondary transition-colors"><i className="w-5 h-5" data-lucide="more-horizontal"></i></button>
</td>
</tr>
<tr className="border-b border-outline-variant/20 hover-row-transition">
<td className="p-4 font-medium text-on-surface">#TRP-8491</td>
<td className="p-4">
<div className="flex items-center gap-2">
<div className="w-8 h-8 bg-surface-variant rounded flex items-center justify-center">
<i className="w-4 h-4 text-on-surface-variant" data-lucide="truck"></i>
</div>
<span className="text-on-surface">Freightliner Cascadia</span>
</div>
</td>
<td className="p-4">
<div className="flex items-center gap-2">
<img alt="Driver" className="w-6 h-6 rounded-full border border-outline-variant" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBI70nRRkC5Jp_6oCDBNh6GiftyRiK1JKyi9XkaZ7yvbvnaMzc_4Z_c_1Y5vz7Bl0UVDZBsFFkPKU1cgm6MVYIdRmw7OUGnGp8aGDA-0Ig9_lihArW5sm90Ie3TQ4zP6jtbZalHS1F5L8xzIDsGHurNrG_dP1vdzx5dDGKQi7-zS1yw7ddTkKec2IsK-e4ZWCsGVcdWuXVsis7ExSBxJnwrVOT8TU9BilDaV4qocEGrCBOrcotGxKzqaQ" />
<span className="text-on-surface">Mike T.</span>
</div>
</td>
<td className="p-4 text-on-surface-variant">Seattle → Portland</td>
<td className="p-4 text-on-surface-variant">--</td>
<td className="p-4">
<span className="px-2.5 py-1 bg-tertiary-container/20 text-tertiary text-xs font-semibold rounded-full border border-tertiary-container/30">Completed</span>
</td>
<td className="p-4 text-right">
<button onClick={() => navigate('/trips')} className="text-on-surface-variant hover:text-secondary transition-colors"><i className="w-5 h-5" data-lucide="more-horizontal"></i></button>
</td>
</tr>
<tr className="border-b border-outline-variant/20 hover-row-transition">
<td className="p-4 font-medium text-on-surface">#TRP-8490</td>
<td className="p-4">
<div className="flex items-center gap-2">
<div className="w-8 h-8 bg-surface-variant rounded flex items-center justify-center">
<i className="w-4 h-4 text-on-surface-variant" data-lucide="truck"></i>
</div>
<span className="text-on-surface">Kenworth T680</span>
</div>
</td>
<td className="p-4">
<div className="flex items-center gap-2">
<img alt="Driver" className="w-6 h-6 rounded-full border border-outline-variant" src="https://lh3.googleusercontent.com/aida-public/AB6AXuChIM3k2UWTbM0gCvvulbV2nHfYUxmkHu-bHIbdlde543mGD3nTF3CRw7t_WoxxBotQSxcxFy8YWjCB4Xw7_Llbl_jfsE8Mi6ReWWhUOmEhduxI1pBN9OFI68Rex403RbyvcID8oT5hOpvVNLgvxnf2d6teXM-EmGwzqlaYOfJwYet6fqjs1Mquq9jDUa7WMUo6T4WTog_51e-2D1V4bcoFk-P0BOj7ApRN_hMNkz1hVFKtxb_FVuEx1g" />
<span className="text-on-surface">David L.</span>
</div>
</td>
<td className="p-4 text-on-surface-variant">Austin → Dallas</td>
<td className="p-4 text-on-surface-variant">09:15 Tomorrow</td>
<td className="p-4">
<span className="px-2.5 py-1 bg-surface-variant text-on-surface-variant text-xs font-semibold rounded-full border border-outline-variant">Pending</span>
</td>
<td className="p-4 text-right">
<button onClick={() => navigate('/trips')} className="text-on-surface-variant hover:text-secondary transition-colors"><i className="w-5 h-5" data-lucide="more-horizontal"></i></button>
</td>
</tr>
</tbody>
</table>
</div>
</div>

<div className="bg-surface rounded-xl shadow-sm border border-outline-variant/30 p-6 flex flex-col">
<h3 className="font-body-md font-semibold text-on-surface mb-6">Fleet Status Distribution</h3>
<div className="flex-1 flex flex-col justify-center space-y-6">

<div className="w-full h-4 rounded-full overflow-hidden flex">
<div className="bg-tertiary-container h-full" style={{}} title="Available"></div>
<div className="bg-primary-container h-full" style={{}} title="On Trip"></div>
<div className="bg-error h-full" style={{}} title="Maintenance"></div>
<div className="bg-surface-variant h-full" style={{}} title="Retired"></div>
</div>

<div className="space-y-4">
<div className="flex justify-between items-center text-sm hover-row-transition p-2 rounded -mx-2">
<div className="flex items-center gap-2">
<div className="w-3 h-3 rounded-full bg-tertiary-container"></div>
<span className="text-on-surface font-medium">Available</span>
</div>
<span className="text-on-surface-variant">55% (686)</span>
</div>
<div className="flex justify-between items-center text-sm hover-row-transition p-2 rounded -mx-2">
<div className="flex items-center gap-2">
<div className="w-3 h-3 rounded-full bg-primary-container"></div>
<span className="text-on-surface font-medium">On Trip</span>
</div>
<span className="text-on-surface-variant">30% (374)</span>
</div>
<div className="flex justify-between items-center text-sm hover-row-transition p-2 rounded -mx-2">
<div className="flex items-center gap-2">
<div className="w-3 h-3 rounded-full bg-error"></div>
<span className="text-on-surface font-medium">Maintenance</span>
</div>
<span className="text-on-surface-variant">10% (125)</span>
</div>
<div className="flex justify-between items-center text-sm hover-row-transition p-2 rounded -mx-2">
<div className="flex items-center gap-2">
<div className="w-3 h-3 rounded-full bg-surface-variant"></div>
<span className="text-on-surface font-medium">Retired/Other</span>
</div>
<span className="text-on-surface-variant">5% (63)</span>
</div>
</div>
</div>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

<div className="bg-surface rounded-xl shadow-sm border border-outline-variant/30 p-5 flex flex-col h-80">
<div className="flex justify-between items-center mb-4">
<h3 className="font-body-md font-semibold text-on-surface flex items-center gap-2">
<i className="w-4 h-4 text-error" data-lucide="bell"></i> Live Alerts
                            </h3>
</div>
<div className="flex-1 overflow-y-auto pr-2 space-y-3">
<div className="flex gap-3 items-start hover-row-transition p-2 rounded -mx-2">
<div className="mt-0.5 w-2 h-2 rounded-full bg-error shrink-0"></div>
<div>
<p className="text-sm font-medium text-on-surface">Engine Fault: Unit #402</p>
<p className="text-xs text-on-surface-variant">Immediate maintenance required. Route diverted.</p>
<span className="text-[10px] text-on-surface-variant mt-1 block">2 mins ago</span>
</div>
</div>
<div className="flex gap-3 items-start hover-row-transition p-2 rounded -mx-2">
<div className="mt-0.5 w-2 h-2 rounded-full bg-primary-container shrink-0"></div>
<div>
<p className="text-sm font-medium text-on-surface">Fuel Level Low: Unit #118</p>
<p className="text-xs text-on-surface-variant">Under 10% capacity. Nearest station notified.</p>
<span className="text-[10px] text-on-surface-variant mt-1 block">15 mins ago</span>
</div>
</div>
<div className="flex gap-3 items-start hover-row-transition p-2 rounded -mx-2">
<div className="mt-0.5 w-2 h-2 rounded-full bg-surface-variant shrink-0"></div>
<div>
<p className="text-sm font-medium text-on-surface">Driver Log Update</p>
<p className="text-xs text-on-surface-variant">J. Smith exceeded optimal idle time.</p>
<span className="text-[10px] text-on-surface-variant mt-1 block">1 hr ago</span>
</div>
</div>
</div>
</div>

<div className="bg-surface rounded-xl shadow-sm border border-outline-variant/30 p-5 flex flex-col h-80">
<div className="flex justify-between items-center mb-4">
<h3 className="font-body-md font-semibold text-on-surface flex items-center gap-2">
<i className="w-4 h-4 text-primary-container" data-lucide="award"></i> Top Drivers
                            </h3>
</div>
<div className="flex-1 overflow-y-auto">
<table className="w-full text-left border-collapse text-sm">
<thead>
<tr className="text-on-surface-variant text-xs border-b border-outline-variant/20">
<th className="pb-2 font-medium">Driver</th>
<th className="pb-2 font-medium text-center">Score</th>
<th className="pb-2 font-medium text-right">On-Time</th>
</tr>
</thead>
<tbody>
<tr className="border-b border-outline-variant/10 hover-row-transition">
<td className="py-3">
<div className="flex items-center gap-2">
<img alt="Driver" className="w-6 h-6 rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAb8QjY2xQMAUp-nm-UCnTxkrl7nzteIoA61Py0JYhR4DKXrB2CxbMzYgLtYpGm54BGpj6QKe6nhQA1fVZiO_nQwM_nQwLiTX3MA_mbJwFh9NridbUq93E667MkS-_0Z7_-jhQSFix1XX3EXAhWgth8hUfLiCC1p5QQAx3alYzri9E_4Fzu-o_uHTbAUwGs4HXzV0dX312XVR3ugR15vESd5uG7IOqFJVpiaIEIZiCsf70iRRTKsHLm1A" />
<span className="text-on-surface font-medium text-xs">Sarah J.</span>
</div>
</td>
<td className="py-3 text-center text-tertiary font-semibold">98</td>
<td className="py-3 text-right text-on-surface-variant">99.2%</td>
</tr>
<tr className="border-b border-outline-variant/10 hover-row-transition">
<td className="py-3">
<div className="flex items-center gap-2">
<img alt="Driver" className="w-6 h-6 rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCeG-qm623ZHd17dPSwrBtkqkhWW273OLJCTwF_vRDH7XNfABUWRDWQaM7ASj8dNWP6HWVTuUnVFeMx-VKwh3a-mUb9tVqd1flbm45vWjX1xuND19nMYqh_Y4iUhpS2vjCSbeYpPjkdfWI1zZ2vBWqjv0Nb4pZExHRl7Lpq-7jXMPBH12bXeFN-D2VB8Y_8Oxo1R8bdnvkLG71ZtD3qbNFfxGCr6fAhv-QFIKsmPPaE_UNndB3M6VUbdA" />
<span className="text-on-surface font-medium text-xs">Mike T.</span>
</div>
</td>
<td className="py-3 text-center text-tertiary font-semibold">95</td>
<td className="py-3 text-right text-on-surface-variant">97.5%</td>
</tr>
<tr className="hover-row-transition">
<td className="py-3">
<div className="flex items-center gap-2">
<img alt="Driver" className="w-6 h-6 rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAeDzGjiIwtucKRuOQrn6bqs4UijyqxjaKdXAEdPeb5oT0NFcIS-dG78mgvi8vCtpxSDqULXcCJZRJQA8g0XNu2PVToM5QhFllSFvaFrXtnDYg0hn0YOk3zwsnASGLia2zsyYTesCVvJj_zmBJvNWjEgnLISEp2XrdqlMIvBAdpcqGExV-BSi-N8MIvBUt9kXIGIqT1lOcZKS6v5mpO1Jv0lC9InTKplnbtG0ywB8qsfazrWBAeG0IjHQ" />
<span className="text-on-surface font-medium text-xs">David L.</span>
</div>
</td>
<td className="py-3 text-center text-tertiary font-semibold">94</td>
<td className="py-3 text-right text-on-surface-variant">96.8%</td>
</tr>
</tbody>
</table>
</div>
</div>

<div className="bg-surface rounded-xl shadow-sm border border-outline-variant/30 p-5 flex flex-col h-80">
<div className="flex justify-between items-center mb-4">
<h3 className="font-body-md font-semibold text-on-surface flex items-center gap-2">
<i className="w-4 h-4 text-secondary" data-lucide="tool"></i> Upcoming Maintenance
                            </h3>
</div>
<div className="flex-1 overflow-y-auto">
<table className="w-full text-left border-collapse text-sm">
<thead>
<tr className="text-on-surface-variant text-xs border-b border-outline-variant/20">
<th className="pb-2 font-medium">Vehicle</th>
<th className="pb-2 font-medium">Due Date</th>
<th className="pb-2 font-medium text-right">Priority</th>
</tr>
</thead>
<tbody>
<tr className="border-b border-outline-variant/10 hover-row-transition">
<td className="py-3 font-medium text-on-surface text-xs">Unit #293</td>
<td className="py-3 text-on-surface-variant text-xs">Tomorrow</td>
<td className="py-3 text-right">
<span className="px-2 py-0.5 bg-error-container text-error text-[10px] font-bold rounded uppercase tracking-wider">High</span>
</td>
</tr>
<tr className="border-b border-outline-variant/10 hover-row-transition">
<td className="py-3 font-medium text-on-surface text-xs">Unit #104</td>
<td className="py-3 text-on-surface-variant text-xs">Oct 24</td>
<td className="py-3 text-right">
<span className="px-2 py-0.5 bg-primary-container/20 text-primary-fixed-dim text-[10px] font-bold rounded uppercase tracking-wider">Med</span>
</td>
</tr>
<tr className="hover-row-transition">
<td className="py-3 font-medium text-on-surface text-xs">Unit #442</td>
<td className="py-3 text-on-surface-variant text-xs">Oct 28</td>
<td className="py-3 text-right">
<span className="px-2 py-0.5 bg-surface-variant text-on-surface-variant text-[10px] font-bold rounded uppercase tracking-wider">Low</span>
</td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
</div>

    </>
  );
};

export default ExecutiveDashboard;
