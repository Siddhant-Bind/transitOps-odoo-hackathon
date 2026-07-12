
import React, { useEffect } from 'react';

const Maintenance = () => {
  useEffect(() => {
    if (window.lucide && window.lucide.createIcons) {
      window.lucide.createIcons();
    }
  }, []);

  return (
    <>
      

<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
<div>
<h2 className="font-section-title text-section-title text-on-surface">Maintenance Overview</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Track and manage fleet service schedules and repairs.</p>
</div>
<div className="flex gap-3">
<button className="font-body-md text-body-md font-medium text-on-surface bg-surface-container-lowest border border-outline-variant px-4 py-2 rounded-lg hover:bg-surface-variant transition-colors flex items-center gap-2">
<span className="material-symbols-outlined text-sm">history</span> Log Service
                    </button>
<button className="font-body-md text-body-md font-medium text-on-primary-container bg-primary-container px-4 py-2 rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2 shadow-sm">
<span className="material-symbols-outlined text-sm">calendar_month</span> Schedule Service
                    </button>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
<div className="bg-surface-container-lowest p-stack-lg rounded-xl border border-outline-variant shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.03)] flex flex-col justify-between">
<div className="flex justify-between items-start mb-2">
<span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Vehicles In Shop</span>
<span className="material-symbols-outlined text-error p-1 bg-error-container rounded-md">build</span>
</div>
<div className="font-kpi-display text-kpi-display text-on-surface">12</div>
<div className="text-error font-body-sm text-body-sm mt-2 flex items-center gap-1">
<span className="material-symbols-outlined text-[16px]">trending_up</span> +2 from last week
                    </div>
</div>
<div className="bg-surface-container-lowest p-stack-lg rounded-xl border border-outline-variant shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.03)] flex flex-col justify-between">
<div className="flex justify-between items-start mb-2">
<span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Upcoming Services</span>
<span className="material-symbols-outlined text-secondary p-1 bg-secondary-fixed rounded-md">event</span>
</div>
<div className="font-kpi-display text-kpi-display text-on-surface">24</div>
<div className="text-on-surface-variant font-body-sm text-body-sm mt-2">Next 7 days</div>
</div>
<div className="bg-surface-container-lowest p-stack-lg rounded-xl border border-outline-variant shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.03)] flex flex-col justify-between">
<div className="flex justify-between items-start mb-2">
<span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Completed Services</span>
<span className="material-symbols-outlined text-tertiary p-1 bg-tertiary-fixed rounded-md">check_circle</span>
</div>
<div className="font-kpi-display text-kpi-display text-on-surface">148</div>
<div className="text-tertiary font-body-sm text-body-sm mt-2 flex items-center gap-1">
<span className="material-symbols-outlined text-[16px]">trending_up</span> +15% this month
                    </div>
</div>
<div className="bg-surface-container-lowest p-stack-lg rounded-xl border border-outline-variant shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.03)] flex flex-col justify-between">
<div className="flex justify-between items-start mb-2">
<span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Total Maintenance Cost</span>
<span className="material-symbols-outlined text-primary p-1 bg-primary-fixed rounded-md">payments</span>
</div>
<div className="font-kpi-display text-kpi-display text-on-surface">$42.5k</div>
<div className="text-on-surface-variant font-body-sm text-body-sm mt-2">Year to Date</div>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.03)] overflow-hidden flex flex-col">
<div className="p-stack-md border-b border-outline-variant flex justify-between items-center bg-surface-container-lowest">
<h3 className="font-body-md text-body-md font-semibold text-on-surface">Recent Maintenance Logs</h3>
<div className="flex gap-2">
<button className="p-2 border border-outline-variant rounded-md hover:bg-surface-variant transition-colors text-on-surface-variant">
<span className="material-symbols-outlined text-sm">filter_list</span>
</button>
</div>
</div>
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="border-b border-outline-variant">
<th className="py-3 px-4 font-label-caps text-label-caps text-on-surface-variant font-semibold">Vehicle</th>
<th className="py-3 px-4 font-label-caps text-label-caps text-on-surface-variant font-semibold">Service Type</th>
<th className="py-3 px-4 font-label-caps text-label-caps text-on-surface-variant font-semibold">Workshop</th>
<th className="py-3 px-4 font-label-caps text-label-caps text-on-surface-variant font-semibold text-right">Cost</th>
<th className="py-3 px-4 font-label-caps text-label-caps text-on-surface-variant font-semibold">Date</th>
<th className="py-3 px-4 font-label-caps text-label-caps text-on-surface-variant font-semibold">Status</th>
<th className="py-3 px-4 font-label-caps text-label-caps text-on-surface-variant font-semibold text-right">Action</th>
</tr>
</thead>
<tbody className="font-body-sm text-body-sm">

<tr className="bg-surface-bright border-b border-outline-variant hover:bg-surface-container-low transition-colors group">
<td className="py-3 px-4 flex items-center gap-3">
<div className="w-10 h-10 rounded bg-surface-variant flex items-center justify-center overflow-hidden border border-outline-variant">
<img className="w-full h-full object-cover" data-alt="A clean photograph of a white commercial delivery van, 3/4 front angle, parked in a modern industrial lot, daylight, corporate modern aesthetic, 50-100 words" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAAWhoM80V3fkeDobTdWfUmukCSNjoKc8Vm2f2oCDYltFs2izEnyFH1LU-6TG09doE4ibTk-Ip0M9g1a4PYhFmbicSe-fF5oE1RM6ep4fNd2v_3fp5ldpL7VJt2qJaX9AyXUkLX34lyRXXq_8lFv0lzUq5y_QPaEp1TOCe8hUX-MalMntLh7F_hsmTOVBX9bwSTUDFQDEwnqmLzVBvWM8qx5RJFlxMw6JWXgNRtHXFYdW20xtmgBmQzNg" />
</div>
<div>
<div className="font-medium text-on-surface">Ford Transit T-250</div>
<div className="text-on-surface-variant text-xs">V-1042</div>
</div>
</td>
<td className="py-3 px-4 text-on-surface">Oil Change &amp; Filter</td>
<td className="py-3 px-4 text-on-surface-variant">Downtown Fleet Auto</td>
<td className="py-3 px-4 text-on-surface text-right font-medium">$125.00</td>
<td className="py-3 px-4 text-on-surface-variant">Oct 12, 2023</td>
<td className="py-3 px-4">
<span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-tertiary/10 text-tertiary border border-tertiary/20">
                                        Completed
                                    </span>
</td>
<td className="py-3 px-4 text-right">
<button className="text-secondary hover:text-secondary-container transition-colors" >View Details</button>
</td>
</tr>

<tr className="bg-surface-container-lowest border-b border-outline-variant hover:bg-surface-container-low transition-colors group">
<td className="py-3 px-4 flex items-center gap-3">
<div className="w-10 h-10 rounded bg-surface-variant flex items-center justify-center overflow-hidden border border-outline-variant">
<img className="w-full h-full object-cover" data-alt="A pristine photograph of a heavy duty commercial truck cab, silver color, parked in a depot, soft natural lighting, corporate modern aesthetic, 50-100 words" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSPmbOZHyJUbgDXbDrAU4aduAkSJBLY_Cylt_jO1z2tArGiKG4t1T6faEC37igx-JGJcCH-9bSkt2s1Q7ZJ_T_AyKsmEJEHVs3vNPjUwImHxnkYqZf3mgRqyvlDI8zup8vpcQYwa9K-SE3bp8FncxT0_2YsHpCZ1P4htM-ZdO3dYYRGftiHFLIVb8Tu3CCdyudaOSOgaJomvjteltgzYSWNe8blvn-578Gjo3FDNSNtm9stjxDrkSB_A" />
</div>
<div>
<div className="font-medium text-on-surface">Freightliner Cascadia</div>
<div className="text-on-surface-variant text-xs">H-9011</div>
</div>
</td>
<td className="py-3 px-4 text-on-surface">Transmission Overhaul</td>
<td className="py-3 px-4 text-on-surface-variant">Central Heavy Duty</td>
<td className="py-3 px-4 text-on-surface text-right font-medium">$3,450.00</td>
<td className="py-3 px-4 text-on-surface-variant">Oct 15, 2023</td>
<td className="py-3 px-4">
<span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-error/10 text-error border border-error/20">
                                        In Shop
                                    </span>
</td>
<td className="py-3 px-4 text-right">
<button className="text-secondary hover:text-secondary-container transition-colors" >View Details</button>
</td>
</tr>
</tbody>
</table>
</div>
</div>

    </>
  );
};

export default Maintenance;
