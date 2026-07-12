import React, { useEffect } from 'react';
import { useAppContext } from '../context/AppContext';

const Fuel = () => {
  const { setFuelFormOpen, setExpenseFormOpen, fuelLogs, expenses } = useAppContext();
  useEffect(() => {
    if (window.lucide && window.lucide.createIcons) {
      window.lucide.createIcons();
    }
  }, []);

  return (
    <>
      



<div className="p-margin-page flex-1 max-w-container-max w-full mx-auto space-y-stack-lg">

<div className="flex justify-between items-end">
<div>
<h2 className="font-headline-lg text-headline-lg font-bold text-on-surface">Fuel &amp; Expenses</h2>
<p className="font-body-md text-body-md text-on-surface-variant mt-1">Monitor operational costs and log receipts across the fleet.</p>
</div>
<div className="flex items-center gap-3">
<button onClick={() => setExpenseFormOpen(true)} className="text-body-sm font-medium px-5 py-2.5 bg-surface-container-lowest border border-outline-variant text-on-surface rounded-[14px] hover:bg-surface-container transition-colors flex items-center gap-2 shadow-sm">
<span className="material-symbols-outlined text-[18px]">receipt_long</span> Add Expense
                    </button>
<button onClick={() => setFuelFormOpen(true)} className="text-body-sm font-medium px-5 py-2.5 bg-primary-container text-on-primary-container rounded-[14px] hover:opacity-90 transition-opacity flex items-center gap-2 shadow-sm">
<span className="material-symbols-outlined text-[18px]">local_gas_station</span> Add Fuel Log
                    </button>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-gutter">

<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-stack-lg shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.03)] flex flex-col justify-between">
<div className="flex justify-between items-start mb-4">
<span className="font-label-caps text-label-caps text-on-surface-variant">Total Fuel Consumed</span>
<div className="p-2 bg-surface-container rounded-lg text-secondary">
<span className="material-symbols-outlined text-[20px]">water_drop</span>
</div>
</div>
<div>
<div className="font-kpi-display text-kpi-display text-on-surface">14,250 <span className="text-body-md text-on-surface-variant font-medium">L</span></div>
<div className="flex items-center gap-1 mt-2 text-tertiary-container font-medium text-sm">
<span className="material-symbols-outlined text-[16px]">trending_down</span>
<span>2.4% vs last month</span>
</div>
</div>
</div>

<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-stack-lg shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.03)] flex flex-col justify-between">
<div className="flex justify-between items-start mb-4">
<span className="font-label-caps text-label-caps text-on-surface-variant">Total Fuel Cost</span>
<div className="p-2 bg-surface-container rounded-lg text-secondary">
<span className="material-symbols-outlined text-[20px]">payments</span>
</div>
</div>
<div>
<div className="font-kpi-display text-kpi-display text-on-surface">$22,410</div>
<div className="flex items-center gap-1 mt-2 text-error font-medium text-sm">
<span className="material-symbols-outlined text-[16px]">trending_up</span>
<span>1.1% vs last month</span>
</div>
</div>
</div>

<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-stack-lg shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.03)] flex flex-col justify-between">
<div className="flex justify-between items-start mb-4">
<span className="font-label-caps text-label-caps text-on-surface-variant">Operational Cost</span>
<div className="p-2 bg-surface-container rounded-lg text-secondary">
<span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
</div>
</div>
<div>
<div className="font-kpi-display text-kpi-display text-on-surface">$34,890</div>
<div className="flex items-center gap-1 mt-2 text-tertiary-container font-medium text-sm">
<span className="material-symbols-outlined text-[16px]">trending_down</span>
<span>0.5% vs last month</span>
</div>
</div>
</div>

<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-stack-lg shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.03)] flex flex-col justify-between">
<div className="flex justify-between items-start mb-4">
<span className="font-label-caps text-label-caps text-on-surface-variant">Avg Cost / KM</span>
<div className="p-2 bg-surface-container rounded-lg text-secondary">
<span className="material-symbols-outlined text-[20px]">speed</span>
</div>
</div>
<div>
<div className="font-kpi-display text-kpi-display text-on-surface">$0.42</div>
<div className="flex items-center gap-1 mt-2 text-on-surface-variant font-medium text-sm">
<span className="material-symbols-outlined text-[16px]">horizontal_rule</span>
<span>Stable vs last month</span>
</div>
</div>
</div>
</div>

<div className="grid grid-cols-1 xl:grid-cols-12 gap-gutter">

<div className="xl:col-span-8 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.03)] overflow-hidden flex flex-col">
<div className="px-stack-lg py-5 border-b border-outline-variant flex justify-between items-center bg-surface-container-lowest">
<h3 className="font-section-title text-section-title text-on-surface">Recent Fuel Logs</h3>
<button className="text-primary font-medium text-sm hover:underline">View All</button>
</div>
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse zebra-table">
<thead>
<tr>
<th className="px-stack-lg py-4 border-b border-outline-variant font-label-caps text-label-caps text-on-surface-variant">Vehicle</th>
<th className="px-stack-lg py-4 border-b border-outline-variant font-label-caps text-label-caps text-on-surface-variant">Date</th>
<th className="px-stack-lg py-4 border-b border-outline-variant font-label-caps text-label-caps text-on-surface-variant">Litres</th>
<th className="px-stack-lg py-4 border-b border-outline-variant font-label-caps text-label-caps text-on-surface-variant">Cost</th>
<th className="px-stack-lg py-4 border-b border-outline-variant font-label-caps text-label-caps text-on-surface-variant">Mileage</th>
<th className="px-stack-lg py-4 border-b border-outline-variant font-label-caps text-label-caps text-on-surface-variant">Station</th>
</tr>
</thead>
<tbody className="text-body-sm">
{fuelLogs.map((log, index) => (
<tr key={index}>
<td className="px-stack-lg py-3 font-medium text-on-surface">{log.vehicle}</td>
<td className="px-stack-lg py-3 text-on-surface-variant">{log.date}</td>
<td className="px-stack-lg py-3">{log.litres}</td>
<td className="px-stack-lg py-3 font-medium">{log.cost}</td>
<td className="px-stack-lg py-3 text-on-surface-variant">{log.mileage}</td>
<td className="px-stack-lg py-3 text-on-surface-variant">{log.station}</td>
</tr>
))}
</tbody>
</table>
</div>
</div>

<div className="xl:col-span-4 flex flex-col gap-gutter">

<div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.03)] p-stack-lg">
<h3 className="font-section-title text-section-title text-on-surface mb-6">Cost Breakdown (Oct)</h3>
<div className="space-y-6">

<div>
<div className="flex justify-between items-center mb-2">
<div className="flex items-center gap-2">
<div className="w-3 h-3 rounded-full bg-secondary"></div>
<span className="font-body-md text-on-surface">Fuel Cost</span>
</div>
<span className="font-medium">$22,410</span>
</div>
<div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
<div className="bg-secondary h-full rounded-full" style={{}}></div>
</div>
</div>

<div>
<div className="flex justify-between items-center mb-2">
<div className="flex items-center gap-2">
<div className="w-3 h-3 rounded-full bg-primary-container"></div>
<span className="font-body-md text-on-surface">Maintenance</span>
</div>
<span className="font-medium">$8,520</span>
</div>
<div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
<div className="bg-primary-container h-full rounded-full" style={{}}></div>
</div>
</div>

<div>
<div className="flex justify-between items-center mb-2">
<div className="flex items-center gap-2">
<div className="w-3 h-3 rounded-full bg-tertiary-container"></div>
<span className="font-body-md text-on-surface">Tolls &amp; Other</span>
</div>
<span className="font-medium">$3,960</span>
</div>
<div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
<div className="bg-tertiary-container h-full rounded-full" style={{}}></div>
</div>
</div>
</div>
</div>

<div className="bg-surface border border-outline-variant rounded-xl p-stack-lg shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.03)] flex flex-col items-center text-center mt-auto">
<div className="w-12 h-12 bg-surface-container-high rounded-full flex items-center justify-center text-on-surface-variant mb-4">
<span className="material-symbols-outlined text-[24px]">description</span>
</div>
<h4 className="font-body-md font-semibold text-on-surface mb-2">Generate Monthly Report</h4>
<p className="text-body-sm text-on-surface-variant mb-4">Download a detailed PDF or CSV breakdown of all expenses.</p>
<button className="w-full py-2.5 bg-surface-container-lowest border border-outline-variant text-on-surface font-medium rounded-lg hover:bg-surface-container transition-colors">Export Data</button>
</div>
</div>
</div>

<div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.03)] overflow-hidden">
<div className="px-stack-lg py-5 border-b border-outline-variant flex justify-between items-center bg-surface-container-lowest">
<div className="flex items-center gap-4">
<h3 className="font-section-title text-section-title text-on-surface">Other Expenses</h3>
<div className="px-3 py-1 bg-surface-container rounded-full text-xs font-semibold text-on-surface-variant">Requires Approval (2)</div>
</div>
<div className="flex gap-2">
<button className="p-2 border border-outline-variant rounded-lg hover:bg-surface-container text-on-surface-variant transition-colors"><span className="material-symbols-outlined text-[18px]">filter_list</span></button>
</div>
</div>
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse zebra-table">
<thead>
<tr>
<th className="px-stack-lg py-4 border-b border-outline-variant font-label-caps text-label-caps text-on-surface-variant w-24">Trip ID</th>
<th className="px-stack-lg py-4 border-b border-outline-variant font-label-caps text-label-caps text-on-surface-variant">Vehicle</th>
<th className="px-stack-lg py-4 border-b border-outline-variant font-label-caps text-label-caps text-on-surface-variant">Expense Type</th>
<th className="px-stack-lg py-4 border-b border-outline-variant font-label-caps text-label-caps text-on-surface-variant">Driver</th>
<th className="px-stack-lg py-4 border-b border-outline-variant font-label-caps text-label-caps text-on-surface-variant">Amount</th>
<th className="px-stack-lg py-4 border-b border-outline-variant font-label-caps text-label-caps text-on-surface-variant">Status</th>
<th className="px-stack-lg py-4 border-b border-outline-variant font-label-caps text-label-caps text-on-surface-variant text-right">Actions</th>
</tr>
</thead>
<tbody className="text-body-sm">
{expenses.map((expense, index) => (
<tr key={index}>
<td className="px-stack-lg py-3 font-medium text-on-surface">{expense.tripId}</td>
<td className="px-stack-lg py-3 text-on-surface-variant">{expense.vehicle}</td>
<td className="px-stack-lg py-3">{expense.type}</td>
<td className="px-stack-lg py-3 text-on-surface-variant">{expense.driver}</td>
<td className="px-stack-lg py-3 font-medium">{expense.amount}</td>
<td className="px-stack-lg py-3">
<span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${expense.status === 'Approved' ? 'bg-tertiary-container/10 text-tertiary' : 'bg-primary-container/10 text-primary-container'}`}>{expense.status}</span>
</td>
<td className="px-stack-lg py-3 text-right">
{expense.status === 'Pending Approval' && <button className="text-secondary font-medium hover:underline mr-3">Review</button>}
<button className="text-on-surface-variant hover:text-primary"><span className="material-symbols-outlined text-[20px]">more_vert</span></button>
</td>
</tr>
))}
</tbody>
</table>
</div>
</div>
</div>

    </>
  );
};

export default Fuel;
