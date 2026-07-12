import React, { useEffect, useState } from 'react';

const Drivers = () => {
  const [driversData] = useState([
    {
      name: 'Marcus Reynolds', id: 'DRV-8492', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBhiOKWX4tjwo2atHC3km3gM8UFSF4gAL4duVxxV_2c8bN-BZ2nMb53I4wpX0_KvnTahecS-0o0pTPlyhvCCrRou9tPFFlTMYxP-LaURHBdZ7r7bta-3u4OvGwGALJiTzl3huJYLmO_WkPEEahxOydrMUvGn_aLVbWtn0fsC0CDABNzj08P_3NNbNBk6gSB2X4OCe-9mlOCLDTbXqVKsf0iAhZrcTL1HtgdYlLNl0TNRc7Vpn9Q90aTUQ',
      license: 'CDL Class A', phone: '+1 (555) 019-2834', licenseWarning: false,
      trips: '1,204', safety: '98/100', safetyColor: 'text-tertiary-container',
      vehicle: 'TRK-902 (Volvo VNL)', depot: 'North Hub',
      status: 'On Trip', statusColor: 'bg-tertiary-container/10 text-tertiary-container', statusDotColor: 'bg-tertiary-container'
    },
    {
      name: 'Sarah Jenkins', id: 'DRV-7731', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEBox-hGSVPF_81PlKPqZ3GeVy0bZ6b5t-1gMKwBpiFY-juWFxZftHxA5R1xjknGOaInlpfuFaoJ--AMnJI4AZjWYLDWbjMoz643-RfEyonR1-PduksBRTFt6DxAPWIDaufsl5EXtc_5IcDVf3e0XswYlG5X5nPPQ0af4PtryRmmy73cbYpHtBJRnIEmVQsAgPodS-8-v23iJsJCgQDS6ZavFyeklHC1eP2nRhWVi8frZD1lT6tAPcGg',
      license: 'CDL Class B', phone: '+1 (555) 832-1102', licenseWarning: false,
      trips: '432', safety: '82/100', safetyColor: 'text-[#F59E0B]',
      vehicle: 'Unassigned', depot: 'South Hub',
      status: 'Available', statusColor: 'bg-[#3B82F6]/10 text-[#3B82F6]', statusDotColor: 'bg-[#3B82F6]'
    },
    {
      name: 'David Torres', id: 'DRV-9920', initials: 'DT',
      license: 'CDL Class A', phone: '+1 (555) 443-9001', licenseWarning: true,
      trips: '2,891', safety: '64/100', safetyColor: 'text-error',
      vehicle: 'Unassigned', depot: 'West Depot',
      status: 'Suspended', statusColor: 'bg-error/10 text-error', statusDotColor: 'bg-error'
    }
  ]);

  useEffect(() => {
    if (window.lucide && window.lucide.createIcons) {
      window.lucide.createIcons();
    }
  }, []);

  return (
    <>
      
<div className="max-w-container-max mx-auto space-y-stack-lg">

<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
<div>
<h2 className="font-section-title text-section-title text-on-surface">Driver Directory</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Manage personnel, licenses, and performance metrics.</p>
</div>
<div className="flex gap-2">
<button className="bg-surface-container-lowest border border-[#E5E7EB] text-on-surface px-4 py-2 rounded-[14px] font-body-md text-body-md hover:bg-surface-container transition-colors flex items-center gap-2">
<span className="material-symbols-outlined text-[18px]" data-icon="filter_list">filter_list</span> Filters
                        </button>
<button className="bg-surface-container-lowest border border-[#E5E7EB] text-on-surface px-4 py-2 rounded-[14px] font-body-md text-body-md hover:bg-surface-container transition-colors flex items-center gap-2">
<span className="material-symbols-outlined text-[18px]" data-icon="download">download</span> Export
                        </button>
</div>
</div>

<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-gutter">

<div className="bg-surface-container-lowest p-stack-lg rounded-xl border border-[#E5E7EB] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.03)] flex flex-col gap-2">
<span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Total Drivers</span>
<div className="flex items-baseline gap-2">
<span className="font-kpi-display text-kpi-display text-on-surface">248</span>
</div>
</div>

<div className="bg-surface-container-lowest p-stack-lg rounded-xl border border-[#E5E7EB] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.03)] flex flex-col gap-2 border-l-4 border-l-[#3B82F6]">
<span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Available</span>
<div className="flex items-baseline gap-2">
<span className="font-kpi-display text-kpi-display text-on-surface">42</span>
</div>
</div>

<div className="bg-surface-container-lowest p-stack-lg rounded-xl border border-[#E5E7EB] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.03)] flex flex-col gap-2 border-l-4 border-l-tertiary-container">
<span className="font-label-caps text-label-caps text-on-surface-variant uppercase">On Trip</span>
<div className="flex items-baseline gap-2">
<span className="font-kpi-display text-kpi-display text-on-surface">195</span>
</div>
</div>

<div className="bg-surface-container-lowest p-stack-lg rounded-xl border border-[#E5E7EB] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.03)] flex flex-col gap-2 border-l-4 border-l-[#F59E0B]">
<span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Expiring Licenses</span>
<div className="flex items-baseline gap-2">
<span className="font-kpi-display text-kpi-display text-on-surface">8</span>
</div>
</div>

<div className="bg-surface-container-lowest p-stack-lg rounded-xl border border-[#E5E7EB] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.03)] flex flex-col gap-2 border-l-4 border-l-error">
<span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Suspended</span>
<div className="flex items-baseline gap-2">
<span className="font-kpi-display text-kpi-display text-on-surface">3</span>
</div>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl border border-[#E5E7EB] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.03)] overflow-hidden flex flex-col">

<div className="p-4 border-b border-[#E5E7EB] flex flex-wrap gap-4 items-center justify-between bg-surface-container-low/50">
<div className="flex gap-2 items-center flex-wrap">
<select className="bg-surface-container-lowest border border-[#E5E7EB] rounded-lg font-body-sm text-on-surface px-3 py-1.5 focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] outline-none">
<option>All Statuses</option>
<option>Available</option>
<option>On Trip</option>
<option>Suspended</option>
</select>
<select className="bg-surface-container-lowest border border-[#E5E7EB] rounded-lg font-body-sm text-on-surface px-3 py-1.5 focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] outline-none">
<option>All Licenses</option>
<option>CDL Class A</option>
<option>CDL Class B</option>
</select>
<select className="bg-surface-container-lowest border border-[#E5E7EB] rounded-lg font-body-sm text-on-surface px-3 py-1.5 focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] outline-none">
<option>All Depots</option>
<option>North Hub</option>
<option>South Hub</option>
</select>
</div>
<div className="text-on-surface-variant font-body-sm text-body-sm">
                            Showing 1-10 of 248 drivers
                        </div>
</div>

<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="font-label-caps text-label-caps uppercase text-on-surface-variant border-b border-[#E5E7EB]">
<th className="px-6 py-4 font-semibold">Driver</th>
<th className="px-6 py-4 font-semibold">License / Phone</th>
<th className="px-6 py-4 font-semibold">Metrics</th>
<th className="px-6 py-4 font-semibold">Vehicle / Depot</th>
<th className="px-6 py-4 font-semibold">Status</th>
<th className="px-6 py-4 font-semibold text-right">Actions</th>
</tr>
</thead>
<tbody className="font-body-sm text-body-sm text-on-surface">
{driversData.map((driver, index) => (
<tr key={index} className={`${index % 2 === 0 ? 'bg-[#FFFFFF]' : 'bg-[#F9FAFB]'} hover:bg-surface-container-low transition-colors group border-b border-[#E5E7EB]/50`}>
<td className="px-6 py-4">
<div className="flex items-center gap-3">
{driver.avatar ? (
<img className="w-10 h-10 rounded-full object-cover" src={driver.avatar} alt="driver" />
) : (
<div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center text-on-surface-variant font-bold">{driver.initials}</div>
)}
<div>
<div className="font-body-md text-body-md text-on-surface font-semibold">{driver.name}</div>
<div className="text-on-surface-variant text-xs mt-0.5">ID: {driver.id}</div>
</div>
</div>
</td>
<td className="px-6 py-4">
<div className="font-medium flex items-center gap-2">
{driver.license} 
{driver.licenseWarning && <span className="material-symbols-outlined text-error text-[16px]" data-icon="warning">warning</span>}
</div>
<div className="text-on-surface-variant mt-0.5">{driver.phone}</div>
</td>
<td className="px-6 py-4">
<div className="flex items-center gap-4">
<div>
<div className="text-on-surface-variant text-[11px] uppercase tracking-wider">Trips</div>
<div className="font-medium">{driver.trips}</div>
</div>
<div>
<div className="text-on-surface-variant text-[11px] uppercase tracking-wider">Safety</div>
<div className={`font-medium ${driver.safetyColor}`}>{driver.safety}</div>
</div>
</div>
</td>
<td className="px-6 py-4">
<div className={`font-medium ${driver.vehicle === 'Unassigned' ? 'text-on-surface-variant' : 'text-secondary'}`}>{driver.vehicle}</div>
<div className="text-on-surface-variant mt-0.5">{driver.depot}</div>
</td>
<td className="px-6 py-4">
<span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${driver.statusColor}`}>
<span className={`w-1.5 h-1.5 rounded-full ${driver.statusDotColor} mr-1.5`}></span> {driver.status}
</span>
</td>
<td className="px-6 py-4 text-right">
<button className="text-on-surface-variant hover:text-primary transition-colors p-1" >
<span className="material-symbols-outlined text-[20px]" data-icon="visibility">visibility</span>
</button>
<button className="text-on-surface-variant hover:text-primary transition-colors p-1 ml-2">
<span className="material-symbols-outlined text-[20px]" data-icon="more_vert">more_vert</span>
</button>
</td>
</tr>
))}
</tbody>
</table>
</div>

<div className="p-4 border-t border-[#E5E7EB] flex items-center justify-between bg-surface-container-lowest">
<button className="px-3 py-1.5 border border-[#E5E7EB] rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors font-body-sm text-body-sm disabled:opacity-50" disabled="">Previous</button>
<div className="flex gap-1">
<button className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary-container text-on-primary-container font-medium text-sm">1</button>
<button className="w-8 h-8 flex items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container font-medium text-sm">2</button>
<button className="w-8 h-8 flex items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container font-medium text-sm">3</button>
<span className="w-8 h-8 flex items-center justify-center text-on-surface-variant">...</span>
</div>
<button className="px-3 py-1.5 border border-[#E5E7EB] rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors font-body-sm text-body-sm">Next</button>
</div>
</div>
</div>

    </>
  );
};

export default Drivers;
