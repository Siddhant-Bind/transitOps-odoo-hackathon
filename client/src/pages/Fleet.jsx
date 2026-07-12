import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';

const Fleet = () => {
  const { fleetData, setFleetData, setAddVehicleOpen } = useAppContext();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  const [viewingVehicle, setViewingVehicle] = useState(null);
  
  const totalPages = Math.ceil(fleetData.length / itemsPerPage);
  const paginatedFleet = fleetData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const exportToCSV = () => {
    const headers = ['ID,Reg Number,Model,Type,Driver,Status,Odometer\n'];
    const csvContent = fleetData.map(v => `${v.id},${v.regNumber},${v.model},${v.type},${v.driver},${v.status},"${v.odometer}"`).join('\n');
    const blob = new Blob([headers + csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'fleet_export.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };
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
<button onClick={exportToCSV} className="bg-surface-container-lowest border border-outline-variant text-on-surface py-2 px-4 rounded-lg font-body-md text-body-md font-medium hover:bg-surface-container transition-colors shadow-soft flex items-center gap-2">
<span className="material-symbols-outlined" style={{}}>download</span>
                            Export
                        </button>
<button onClick={() => setAddVehicleOpen(true)} className="bg-primary-container text-on-primary py-2 px-4 rounded-lg font-body-md text-body-md font-medium hover:bg-opacity-90 transition-colors shadow-soft flex items-center gap-2">
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
{paginatedFleet.map((vehicle, index) => (
<tr key={vehicle.id} className={`border-b border-outline-variant hover:bg-surface-container-low transition-colors group cursor-pointer ${index % 2 !== 0 ? 'bg-surface-bright' : ''}`} >
<td className="py-3 px-4">
<div className="flex items-center gap-3">
<div className="w-12 h-10 rounded bg-surface-container border border-outline-variant flex items-center justify-center overflow-hidden">
<img className="w-full h-full object-cover" src={vehicle.image || "https://placehold.co/100"} alt="vehicle" />
</div>
<div>
<div className="font-medium text-on-surface">{vehicle.model}</div>
<div className="text-on-surface-variant text-xs mt-0.5">{vehicle.type.split('/')[1] || vehicle.type}</div>
</div>
</div>
</td>
<td className="py-3 px-4 text-on-surface font-medium">{vehicle.regNumber}</td>
<td className="py-3 px-4 text-on-surface-variant">{vehicle.type}</td>
<td className="py-3 px-4">
<div className="flex items-center gap-2">
{vehicle.driverAvatar ? (
<img className="w-6 h-6 rounded-full object-cover border border-outline-variant" src={vehicle.driverAvatar} alt="driver" />
) : (
vehicle.driverInitials ? (
<div className="w-6 h-6 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center text-xs font-bold">{vehicle.driverInitials}</div>
) : (
<div className="text-on-surface-variant italic text-xs">Unassigned</div>
)
)}
{vehicle.driver !== 'Unassigned' && <span className="text-on-surface">{vehicle.driver}</span>}
</div>
</td>
<td className="py-3 px-4 text-on-surface-variant">{vehicle.odometer}</td>
<td className="py-3 px-4">
<span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${vehicle.status === 'Active Route' ? 'bg-tertiary-container/10 text-tertiary-container border-tertiary-container/20' : vehicle.status === 'Maintenance' ? 'bg-error/10 text-error border-error/20' : 'bg-surface-variant text-on-surface border-outline-variant'}`}>
<span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${vehicle.status === 'Active Route' ? 'bg-tertiary-container' : vehicle.status === 'Maintenance' ? 'bg-error' : 'bg-outline-variant'}`}></span>
{vehicle.status}
</span>
</td>
<td className="py-3 px-4 text-right">
<button onClick={() => setViewingVehicle(vehicle)} className="p-1.5 text-on-surface-variant hover:text-primary hover:bg-primary-fixed/20 rounded-md transition-colors" title="View Details">
<span className="material-symbols-outlined">visibility</span>
</button>
<button onClick={() => alert("Edit Vehicle Functional Stub. Imagine an edit form opening! ")} className="p-1.5 text-on-surface-variant hover:text-secondary hover:bg-secondary-fixed/20 rounded-md transition-colors" title="Edit">
<span className="material-symbols-outlined">edit</span>
</button>
</td>
</tr>
))}
</tbody>
</table>
</div>

<div className="flex items-center justify-between px-4 py-3 border-t border-outline-variant bg-surface-container-lowest">
<div className="font-body-sm text-body-sm text-on-surface-variant">
Showing <span className="font-medium text-on-surface">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-medium text-on-surface">{Math.min(currentPage * itemsPerPage, fleetData.length)}</span> of <span className="font-medium text-on-surface">{fleetData.length}</span> vehicles
                        </div>
<div className="flex items-center gap-2">
<button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="p-1.5 rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container disabled:opacity-50 disabled:cursor-not-allowed">
<span className="material-symbols-outlined" style={{}}>chevron_left</span>
</button>
<button className="w-8 h-8 rounded-lg bg-primary-container text-on-primary font-body-sm text-body-sm font-medium flex items-center justify-center">{currentPage}</button>
<button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="p-1.5 rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container disabled:opacity-50 disabled:cursor-not-allowed">
<span className="material-symbols-outlined" style={{}}>chevron_right</span>
</button>
</div>
</div>
</div>
</div>

      {viewingVehicle && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-surface-dim/50 backdrop-blur-sm" onClick={() => setViewingVehicle(null)}></div>
          <div className="relative w-full max-w-md h-full bg-surface-container-lowest border-l border-outline-variant shadow-2xl z-10 flex flex-col pt-8 animate-in slide-in-from-right duration-300">
            <div className="p-4 border-b border-outline-variant flex justify-between items-start bg-surface-container">
              <div>
                <h3 className="font-section-title text-xl font-semibold text-on-surface">{viewingVehicle.regNumber}</h3>
                <p className="text-sm text-on-surface-variant mt-1">{viewingVehicle.model}</p>
              </div>
              <button className="text-on-surface-variant hover:text-on-surface rounded p-1" onClick={() => setViewingVehicle(null)}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {viewingVehicle.image && <img src={viewingVehicle.image} alt="vehicle" className="w-full h-48 object-cover rounded-lg border border-outline-variant mb-4" />}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-surface border border-outline-variant rounded-lg p-3">
                  <span className="text-xs text-on-surface-variant block mb-1">Status</span>
                  <span className="font-semibold text-on-surface">{viewingVehicle.status}</span>
                </div>
                <div className="bg-surface border border-outline-variant rounded-lg p-3">
                  <span className="text-xs text-on-surface-variant block mb-1">Odometer</span>
                  <span className="font-semibold text-on-surface">{viewingVehicle.odometer}</span>
                </div>
              </div>
              <div className="bg-surface border border-outline-variant rounded-lg p-4">
                  <h4 className="text-sm font-semibold mb-3 border-b border-outline-variant pb-2">Driver Assignment</h4>
                  <p className="text-sm text-on-surface">{viewingVehicle.driver}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Fleet;
