import React, { useEffect, useState } from 'react';

const Trips = () => {
  const [tripsData] = useState([
    { id: 'TRP-8892', status: 'Dispatched', route: 'Chicago ➔ Detroit', icon: 'person', details: 'Sarah Jenkins • TRK-1042', progress: 45, eta: '4h 12m' },
    { id: 'TRP-8893', status: 'Scheduled', route: 'Atlanta ➔ Miami', icon: 'schedule', details: 'Departs: 14:00 EST' },
    { id: 'TRP-8894', status: 'Draft', route: 'Dallas ➔ Houston', icon: 'warning', details: 'Missing Driver' },
    { id: 'TRP-8890', status: 'Cancelled', route: 'Seattle ➔ Portland', icon: 'cancel', details: 'Cancelled by Dispatch' }
  ]);

  useEffect(() => {
    if (window.lucide && window.lucide.createIcons) {
      window.lucide.createIcons();
    }
  }, []);

  return (
    <>
      
<div className="flex justify-between items-end mb-4">
<div>
<h1 className="font-headline-lg text-headline-lg text-on-surface">Trip Dispatch</h1>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Create and manage active routes.</p>
</div>
</div>

<div className="grid grid-cols-1 xl:grid-cols-12 gap-gutter">

<div className="xl:col-span-7 flex flex-col gap-gutter">

<div className="bg-surface-container-lowest rounded-xl p-stack-lg border border-outline-variant shadow-sm flex-1">
<h2 className="font-section-title text-section-title text-on-surface mb-6 border-b border-outline-variant pb-2">New Trip Details</h2>
<form className="grid grid-cols-2 gap-4">
<div className="col-span-2 md:col-span-1">
<label className="block font-label-caps text-label-caps text-on-surface-variant mb-1">Source Location</label>
<input className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-3 py-2 text-body-sm font-body-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-shadow" placeholder="e.g., Warehouse A, Chicago" type="text" />
</div>
<div className="col-span-2 md:col-span-1">
<label className="block font-label-caps text-label-caps text-on-surface-variant mb-1">Destination</label>
<input className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-3 py-2 text-body-sm font-body-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-shadow" placeholder="e.g., Distribution Center B, Detroit" type="text" />
</div>
<div className="col-span-2 border-t border-outline-variant my-2 pt-4"></div>
<div className="col-span-2 md:col-span-1">
<label className="block font-label-caps text-label-caps text-on-surface-variant mb-1">Cargo Type</label>
<select className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-3 py-2 text-body-sm font-body-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary">
<option>General Freight</option>
<option>Refrigerated</option>
<option>Hazardous Materials</option>
</select>
</div>
<div className="col-span-2 md:col-span-1">
<label className="block font-label-caps text-label-caps text-on-surface-variant mb-1">Cargo Weight (lbs)</label>
<input className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-3 py-2 text-body-sm font-body-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-shadow" placeholder="45,000" type="number" />
</div>
<div className="col-span-2 border-t border-outline-variant my-2 pt-4"></div>
<div className="col-span-2 md:col-span-1">
<label className="block font-label-caps text-label-caps text-on-surface-variant mb-1">Assign Vehicle</label>
<select className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-3 py-2 text-body-sm font-body-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary">
<option>TRK-1042 (Volvo VNL)</option>
<option>TRK-1055 (Freightliner Cascadia)</option>
</select>
</div>
<div className="col-span-2 md:col-span-1">
<label className="block font-label-caps text-label-caps text-on-surface-variant mb-1">Assign Driver</label>
<select className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-3 py-2 text-body-sm font-body-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary">
<option>Sarah Jenkins (Available)</option>
<option>Marcus Cole (Available in 2h)</option>
</select>
</div>
<div className="col-span-2 border-t border-outline-variant my-2 pt-4"></div>
<div className="col-span-2 md:col-span-1">
<label className="block font-label-caps text-label-caps text-on-surface-variant mb-1">Estimated Distance (mi)</label>
<input className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-3 py-2 text-body-sm font-body-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-shadow bg-surface-container-low" placeholder="285" readonly="" type="number" />
</div>
<div className="col-span-2 md:col-span-1">
<label className="block font-label-caps text-label-caps text-on-surface-variant mb-1">Planned Departure</label>
<input className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-3 py-2 text-body-sm font-body-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-shadow" type="datetime-local" />
</div>
<div className="col-span-2 flex justify-end gap-3 mt-4">
<button className="px-4 py-2 border border-outline-variant rounded-lg text-body-sm font-body-sm text-on-surface-variant hover:bg-surface-container-high transition-colors" type="button">Save Draft</button>
<button className="px-6 py-2 bg-primary-container text-on-primary-container rounded-lg text-body-sm font-body-sm font-medium hover:opacity-90 transition-opacity" type="button">Dispatch Trip</button>
</div>
</form>
</div>

<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
<div className="bg-surface/60 backdrop-blur-sm border border-outline-variant rounded-lg p-3 flex flex-col items-center justify-center text-center gap-1 shadow-sm">
<span className="material-symbols-outlined text-tertiary-container" style={{}}>check_circle</span>
<span className="font-label-caps text-label-caps text-on-surface-variant">Capacity OK</span>
</div>
<div className="bg-surface/60 backdrop-blur-sm border border-outline-variant rounded-lg p-3 flex flex-col items-center justify-center text-center gap-1 shadow-sm">
<span className="material-symbols-outlined text-tertiary-container" style={{}}>build_circle</span>
<span className="font-label-caps text-label-caps text-on-surface-variant">Maint. Clear</span>
</div>
<div className="bg-surface/60 backdrop-blur-sm border border-outline-variant rounded-lg p-3 flex flex-col items-center justify-center text-center gap-1 shadow-sm relative overflow-hidden">
<div className="absolute inset-0 bg-primary-container/10"></div>
<span className="material-symbols-outlined text-primary-container z-10" style={{}}>warning</span>
<span className="font-label-caps text-label-caps text-on-primary-fixed-variant z-10">Hours Limit</span>
</div>
<div className="bg-surface/60 backdrop-blur-sm border border-outline-variant rounded-lg p-3 flex flex-col items-center justify-center text-center gap-1 shadow-sm">
<span className="material-symbols-outlined text-tertiary-container" style={{}}>fact_check</span>
<span className="font-label-caps text-label-caps text-on-surface-variant">License Valid</span>
</div>
</div>
</div>

<div className="xl:col-span-5 flex flex-col h-[700px]">
<div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm flex flex-col h-full overflow-hidden">
<div className="p-4 border-b border-outline-variant bg-surface-container-low flex justify-between items-center">
<h2 className="font-section-title text-section-title text-on-surface">Live Board</h2>
<button className="text-on-surface-variant hover:text-primary"><span className="material-symbols-outlined">filter_list</span></button>
</div>

<div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background">

{tripsData.map((trip) => (
<div key={trip.id} className={`bg-surface-container-lowest border-l-4 ${trip.status === 'Dispatched' ? 'border-l-secondary' : trip.status === 'Scheduled' ? 'border-l-tertiary-container' : trip.status === 'Draft' ? 'border-l-surface-variant opacity-70 hover:opacity-100' : 'border-l-error opacity-60'} border-y border-r border-outline-variant rounded-r-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer`}>
<div className="flex justify-between items-start mb-2">
<span className={`${trip.status === 'Dispatched' ? 'bg-secondary/10 text-secondary' : trip.status === 'Scheduled' ? 'bg-tertiary-container/10 text-tertiary-container' : trip.status === 'Draft' ? 'bg-surface-variant text-on-surface-variant' : 'bg-error/10 text-error'} px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider`}>{trip.status}</span>
<span className="font-label-caps text-label-caps text-on-surface-variant">{trip.id}</span>
</div>
<h3 className={`font-body-md text-body-md text-on-surface mb-1 ${trip.status === 'Cancelled' ? 'line-through' : ''}`}>{trip.route}</h3>
<div className="flex items-center gap-2 text-on-surface-variant font-body-sm text-body-sm mb-3">
<span className="material-symbols-outlined text-[16px]">{trip.icon}</span> {trip.details}
</div>
{trip.progress !== undefined && (
<>
<div className="w-full bg-surface-container-high rounded-full h-1.5 mb-1">
<div className="bg-secondary h-1.5 rounded-full" style={{width: `${trip.progress}%`}}></div>
</div>
<div className="flex justify-between font-label-caps text-[10px] text-on-surface-variant">
<span>ETA: {trip.eta}</span>
<span>On Time</span>
</div>
</>
)}
</div>
))}
</div>
</div>
</div>
</div>

    </>
  );
};

export default Trips;
