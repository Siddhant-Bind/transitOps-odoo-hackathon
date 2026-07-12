
import React, { useEffect } from 'react';

const Fleet = () => {
  useEffect(() => {
    if (window.lucide && window.lucide.createIcons) {
      window.lucide.createIcons();
    }
  }, []);

  return (
    <>
      
<div className="max-w-container-max mx-auto">

<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
<div>
<h1 className="font-headline-lg text-headline-lg text-on-surface">Fleet Registry</h1>
<p className="font-body-md text-body-md text-on-surface-variant mt-1">Manage and monitor all active vehicles across depots.</p>
</div>
<div className="flex items-center gap-3">
<button className="bg-surface-container-lowest border border-outline-variant text-on-surface py-2 px-4 rounded-lg font-body-md text-body-md font-medium hover:bg-surface-container transition-colors shadow-soft flex items-center gap-2">
<span className="material-symbols-outlined" style={{}}>download</span>
                            Export
                        </button>
<button className="bg-primary-container text-on-primary py-2 px-4 rounded-lg font-body-md text-body-md font-medium hover:bg-opacity-90 transition-colors shadow-soft flex items-center gap-2">
<span className="material-symbols-outlined" style={{}}>add</span>
                            Add Vehicle
                        </button>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-soft p-4 mb-6 flex flex-col lg:flex-row gap-4 justify-between items-center">
<div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
<div className="relative">
<select className="appearance-none bg-surface-container-lowest border border-outline-variant text-on-surface py-2 pl-3 pr-10 rounded-lg font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary">
<option value="">All Vehicle Types</option>
<option value="hgv">Heavy Goods Vehicle (HGV)</option>
<option value="lgv">Light Goods Vehicle (LGV)</option>
<option value="van">Delivery Van</option>
</select>
<span className="material-symbols-outlined absolute right-2 top-2.5 text-on-surface-variant pointer-events-none" style={{}}>expand_more</span>
</div>
<div className="relative">
<select className="appearance-none bg-surface-container-lowest border border-outline-variant text-on-surface py-2 pl-3 pr-10 rounded-lg font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary">
<option value="">All Statuses</option>
<option value="active">Active (On Route)</option>
<option value="idle">Idle (At Depot)</option>
<option value="maintenance">Maintenance</option>
</select>
<span className="material-symbols-outlined absolute right-2 top-2.5 text-on-surface-variant pointer-events-none" style={{}}>expand_more</span>
</div>
<div className="relative">
<select className="appearance-none bg-surface-container-lowest border border-outline-variant text-on-surface py-2 pl-3 pr-10 rounded-lg font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary">
<option value="">All Depots</option>
<option value="north">North Hub</option>
<option value="south">South Terminal</option>
<option value="east">East Distribution</option>
</select>
<span className="material-symbols-outlined absolute right-2 top-2.5 text-on-surface-variant pointer-events-none" style={{}}>expand_more</span>
</div>
<button className="text-secondary hover:bg-secondary-fixed/50 py-2 px-3 rounded-lg font-body-sm text-body-sm font-medium transition-colors flex items-center gap-1">
<span className="material-symbols-outlined" style={{}}>filter_list</span>
                            More Filters
                        </button>
</div>
<div className="flex items-center gap-2 w-full lg:w-auto border-t lg:border-t-0 border-outline-variant pt-4 lg:pt-0">
<span className="font-body-sm text-body-sm text-on-surface-variant mr-2">View:</span>
<div className="flex bg-surface-container rounded-lg p-1">
<button aria-label="Table View" className="p-1.5 bg-surface-container-lowest rounded-md shadow-sm text-on-surface">
<span className="material-symbols-outlined" style={{}}>table_rows</span>
</button>
<button aria-label="Grid View" className="p-1.5 text-on-surface-variant hover:text-on-surface rounded-md transition-colors">
<span className="material-symbols-outlined" style={{}}>grid_view</span>
</button>
</div>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-soft overflow-hidden">
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse whitespace-nowrap">
<thead>
<tr className="border-b border-outline-variant">
<th className="py-3 px-4 font-label-caps text-label-caps text-on-surface-variant uppercase">Vehicle</th>
<th className="py-3 px-4 font-label-caps text-label-caps text-on-surface-variant uppercase">Reg Number</th>
<th className="py-3 px-4 font-label-caps text-label-caps text-on-surface-variant uppercase">Capacity / Type</th>
<th className="py-3 px-4 font-label-caps text-label-caps text-on-surface-variant uppercase">Current Driver</th>
<th className="py-3 px-4 font-label-caps text-label-caps text-on-surface-variant uppercase">Odometer</th>
<th className="py-3 px-4 font-label-caps text-label-caps text-on-surface-variant uppercase">Status</th>
<th className="py-3 px-4 font-label-caps text-label-caps text-on-surface-variant uppercase text-right">Actions</th>
</tr>
</thead>
<tbody className="font-body-sm text-body-sm">

<tr className="border-b border-outline-variant hover:bg-surface-container-low transition-colors group cursor-pointer" >
<td className="py-3 px-4">
<div className="flex items-center gap-3">
<div className="w-12 h-10 rounded bg-surface-container border border-outline-variant flex items-center justify-center overflow-hidden">
<img className="w-full h-full object-cover" data-alt="A clean, modern heavy goods vehicle (HGV) cab in pristine white, parked at a stylized logistics depot. Bright, diffused daylight illumination, giving a crisp, professional aesthetic. Shot from a slight low angle to emphasize robust industrial reliability. Soft, neutral background to keep focus on the vehicle." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDp0WhM0lnY0j3C1eXb6vWKFRYg0no7Gc6HdzPqaTwJbY-KV93g-uuVpyTarD4okVQc6nBKqj1x0r__1YNDbYskTKMyOveGcV3t30BqwmjFcOCBMOwhBLkrKemmWbE5ffXBdnEd87SsX45_asdKRFdNf655cA-8AysNUsfIpfUM5DccLe0FYbx2v1GgrqOmBpc9GvNbXIGIvWaGYvwPIrOAF-jFTUH8Fj3nHcMrADgEW57_y4Zce4j7IA" />
</div>
<div>
<div className="font-medium text-on-surface">Volvo FH16</div>
<div className="text-on-surface-variant text-xs mt-0.5">Heavy Goods</div>
</div>
</div>
</td>
<td className="py-3 px-4 text-on-surface font-medium">HG23 KLP</td>
<td className="py-3 px-4 text-on-surface-variant">44t / Articulated</td>
<td className="py-3 px-4">
<div className="flex items-center gap-2">
<div className="w-6 h-6 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center text-xs font-bold">JD</div>
<span className="text-on-surface">John Doe</span>
</div>
</td>
<td className="py-3 px-4 text-on-surface-variant">142,500 mi</td>
<td className="py-3 px-4">
<span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-tertiary-container/10 text-tertiary-container border border-tertiary-container/20">
<span className="w-1.5 h-1.5 rounded-full bg-tertiary-container mr-1.5"></span>
                                            Active Route
                                        </span>
</td>
<td className="py-3 px-4 text-right">
<button className="p-1.5 text-on-surface-variant hover:text-primary hover:bg-primary-fixed/20 rounded-md transition-colors" title="View Details">
<span className="material-symbols-outlined" style={{}}>visibility</span>
</button>
<button className="p-1.5 text-on-surface-variant hover:text-secondary hover:bg-secondary-fixed/20 rounded-md transition-colors" title="Edit">
<span className="material-symbols-outlined" style={{}}>edit</span>
</button>
</td>
</tr>

<tr className="bg-surface-bright border-b border-outline-variant hover:bg-surface-container-low transition-colors group cursor-pointer" >
<td className="py-3 px-4">
<div className="flex items-center gap-3">
<div className="w-12 h-10 rounded bg-surface-container border border-outline-variant flex items-center justify-center overflow-hidden">
<img className="w-full h-full object-cover" data-alt="A sleek, aerodynamic delivery van in a corporate silver finish, stationed in a modern loading bay. High-key lighting highlights the smooth panels and clean design. The setting suggests efficiency and rapid urban logistics, fitting a high-end corporate management interface." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAyfA56-t1ymGgDJdgNfffK8yIf4yj2kL8sj4M_WWjZMn4nl6V1U3SrJtmki3E0y4MgP7j7oTntX8ifkvPONdpxqRxRhlT17egVLxYleVoOIL54KWTQVnjkWbcBF0CZMmAqyQSd3hlIr04oDZF-PXwQ7-1DuFfIMvSdUuoFUkXe9D9BunTUC0ykF0J1FKc6GL6T2w3Yz0f0Vf31puw2V-irPTrYbCkVVt6T78Wp1PhTm5gVDyjIipRSHg" />
</div>
<div>
<div className="font-medium text-on-surface">Mercedes Sprinter</div>
<div className="text-on-surface-variant text-xs mt-0.5">Delivery Van</div>
</div>
</div>
</td>
<td className="py-3 px-4 text-on-surface font-medium">VN22 OQM</td>
<td className="py-3 px-4 text-on-surface-variant">3.5t / Panel</td>
<td className="py-3 px-4">
<div className="text-on-surface-variant italic text-xs">Unassigned</div>
</td>
<td className="py-3 px-4 text-on-surface-variant">45,120 mi</td>
<td className="py-3 px-4">
<span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-surface-variant text-on-surface border border-outline-variant">
<span className="w-1.5 h-1.5 rounded-full bg-outline-variant mr-1.5"></span>
                                            Idle (Depot)
                                        </span>
</td>
<td className="py-3 px-4 text-right">
<button className="p-1.5 text-on-surface-variant hover:text-primary hover:bg-primary-fixed/20 rounded-md transition-colors" title="View Details">
<span className="material-symbols-outlined" style={{}}>visibility</span>
</button>
<button className="p-1.5 text-on-surface-variant hover:text-secondary hover:bg-secondary-fixed/20 rounded-md transition-colors" title="Edit">
<span className="material-symbols-outlined" style={{}}>edit</span>
</button>
</td>
</tr>

<tr className="border-b border-outline-variant hover:bg-surface-container-low transition-colors group cursor-pointer" >
<td className="py-3 px-4">
<div className="flex items-center gap-3">
<div className="w-12 h-10 rounded bg-surface-container border border-outline-variant flex items-center justify-center overflow-hidden">
<img className="w-full h-full object-cover" data-alt="A heavy-duty Scania R-Series truck cab, viewed from a three-quarter angle. The vehicle is painted in a muted corporate blue, standing inside a brightly lit, spotless maintenance hangar. Soft shadows, clinical lighting, conveying operational readiness and meticulous upkeep." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDaVg9P7WrcOTybZu8LJNfjnMpg_VwuEI2b6DHjckhi7mpaQRusTrYBu1uv1pFIUlZRXsq1rgLHinGFn18nDACW_kKA9QxcbIjxS9BhTMQuig6COx3TdkXdCAY1EaBvyGX7xB0OL2LQA7BgHhUivg5D-8YgV9e5isMHWiEmwwBwGOxabzsTmrVNh4GORrrY8_Ns2EzPwyQxaG2Y_DJWrKyN7oaW91ilael6Q5cJHdKZZ6VLSLAXzXY4Bg" />
</div>
<div>
<div className="font-medium text-on-surface">Scania R-Series</div>
<div className="text-on-surface-variant text-xs mt-0.5">Heavy Goods</div>
</div>
</div>
</td>
<td className="py-3 px-4 text-on-surface font-medium">HG21 ZXC</td>
<td className="py-3 px-4 text-on-surface-variant">44t / Articulated</td>
<td className="py-3 px-4">
<div className="flex items-center gap-2">
<img className="w-6 h-6 rounded-full object-cover border border-outline-variant" data-alt="Small thumbnail portrait of a middle-aged male truck driver wearing a high-visibility vest over a dark polo shirt. Friendly but professional demeanor, well-lit against a plain light gray background. Suitable for a corporate employee directory avatar." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDXvuJnAXN4i98TIYSeKdydrTAE_3WiZ8QPlLwx8i5yX_IoRIlSZARsrZVFhZpBTHSrUjb_i_iNgSVggs1B7pJJDCfcpdvFc_dDrEyCHTomGMZ4FaYHeCc5MvBpeY-GPNCYeSnpJtqeEiVU1rrnHN0WhI43JYW3u9GS_gNMWO6dbM_Tai3E6Kj_xoCVh3KpVlIgRDVQ60U9tBPJRPXjr2Qkf1GeKAWsCyDCcjW62gpgIaeEuovWBljTQ" />
<span className="text-on-surface">Mike Torres</span>
</div>
</td>
<td className="py-3 px-4 text-on-surface-variant">210,000 mi</td>
<td className="py-3 px-4">
<span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-error/10 text-error border border-error/20">
<span className="w-1.5 h-1.5 rounded-full bg-error mr-1.5"></span>
                                            Maintenance
                                        </span>
</td>
<td className="py-3 px-4 text-right">
<button className="p-1.5 text-on-surface-variant hover:text-primary hover:bg-primary-fixed/20 rounded-md transition-colors" title="View Details">
<span className="material-symbols-outlined" style={{}}>visibility</span>
</button>
<button className="p-1.5 text-on-surface-variant hover:text-secondary hover:bg-secondary-fixed/20 rounded-md transition-colors" title="Edit">
<span className="material-symbols-outlined" style={{}}>edit</span>
</button>
</td>
</tr>
</tbody>
</table>
</div>

<div className="flex items-center justify-between px-4 py-3 border-t border-outline-variant bg-surface-container-lowest">
<div className="font-body-sm text-body-sm text-on-surface-variant">
                            Showing <span className="font-medium text-on-surface">1</span> to <span className="font-medium text-on-surface">3</span> of <span className="font-medium text-on-surface">142</span> vehicles
                        </div>
<div className="flex items-center gap-2">
<button className="p-1.5 rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container disabled:opacity-50 disabled:cursor-not-allowed" disabled="">
<span className="material-symbols-outlined" style={{}}>chevron_left</span>
</button>
<button className="w-8 h-8 rounded-lg bg-primary-container text-on-primary font-body-sm text-body-sm font-medium flex items-center justify-center">1</button>
<button className="w-8 h-8 rounded-lg hover:bg-surface-container text-on-surface font-body-sm text-body-sm font-medium flex items-center justify-center">2</button>
<button className="w-8 h-8 rounded-lg hover:bg-surface-container text-on-surface font-body-sm text-body-sm font-medium flex items-center justify-center">3</button>
<span className="text-on-surface-variant">...</span>
<button className="p-1.5 rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container">
<span className="material-symbols-outlined" style={{}}>chevron_right</span>
</button>
</div>
</div>
</div>
</div>

    </>
  );
};

export default Fleet;
