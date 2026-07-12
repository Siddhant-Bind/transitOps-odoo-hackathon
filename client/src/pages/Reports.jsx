
import React, { useEffect } from 'react';

const Reports = () => {
  useEffect(() => {
    if (window.lucide && window.lucide.createIcons) {
      window.lucide.createIcons();
    }
  }, []);

  return (
    <>
      

<div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
<div>
<h2 className="font-section-title text-section-title text-on-background">Reports &amp; Analytics</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Executive overview of fleet performance and financials.</p>
</div>
<div className="flex flex-wrap items-center gap-3">

<div className="flex items-center bg-surface border border-outline-variant rounded-lg px-3 py-2">
<span className="material-symbols-outlined text-on-surface-variant mr-2 text-[20px]">calendar_today</span>
<select className="bg-transparent border-none text-body-sm font-body-sm text-on-surface focus:ring-0 p-0 pr-6">
<option>Last 30 Days</option>
<option>This Quarter</option>
<option>Year to Date</option>
<option>Custom Range...</option>
</select>
</div>

<div className="flex items-center bg-surface border border-outline-variant rounded-lg overflow-hidden">
<button className="px-3 py-2 border-r border-outline-variant hover:bg-surface-container text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1 font-label-caps text-label-caps" title="Export PDF">
<span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
                            PDF
                        </button>
<button className="px-3 py-2 border-r border-outline-variant hover:bg-surface-container text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1 font-label-caps text-label-caps" title="Export Excel">
<span className="material-symbols-outlined text-[18px]">table_view</span>
                            XLSX
                        </button>
<button className="px-3 py-2 hover:bg-surface-container text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1 font-label-caps text-label-caps" title="Export CSV">
<span className="material-symbols-outlined text-[18px]">data_object</span>
                            CSV
                        </button>
</div>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter mb-8">

<div className="bg-surface rounded-xl p-6 border border-outline-variant/30 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),_0_2px_4px_-1px_rgba(0,0,0,0.03)] flex flex-col justify-between">
<div className="flex justify-between items-start mb-4">
<span className="font-body-sm text-body-sm text-on-surface-variant">Total Revenue</span>
<div className="w-8 h-8 rounded-full bg-tertiary/10 text-tertiary flex items-center justify-center">
<span className="material-symbols-outlined text-[20px]">payments</span>
</div>
</div>
<div>
<div className="font-kpi-display text-kpi-display text-on-background">$1.24M</div>
<div className="flex items-center gap-1 mt-2 text-tertiary font-body-sm text-body-sm">
<span className="material-symbols-outlined text-[16px]">trending_up</span>
<span>+12.5% vs last period</span>
</div>
</div>
</div>

<div className="bg-surface rounded-xl p-6 border border-outline-variant/30 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),_0_2px_4px_-1px_rgba(0,0,0,0.03)] flex flex-col justify-between">
<div className="flex justify-between items-start mb-4">
<span className="font-body-sm text-body-sm text-on-surface-variant">Operational Cost</span>
<div className="w-8 h-8 rounded-full bg-error/10 text-error flex items-center justify-center">
<span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
</div>
</div>
<div>
<div className="font-kpi-display text-kpi-display text-on-background">$842K</div>
<div className="flex items-center gap-1 mt-2 text-error font-body-sm text-body-sm">
<span className="material-symbols-outlined text-[16px]">trending_up</span>
<span>+4.2% vs last period</span>
</div>
</div>
</div>

<div className="bg-surface rounded-xl p-6 border border-outline-variant/30 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),_0_2px_4px_-1px_rgba(0,0,0,0.03)] flex flex-col justify-between">
<div className="flex justify-between items-start mb-4">
<span className="font-body-sm text-body-sm text-on-surface-variant">Net Profit</span>
<div className="w-8 h-8 rounded-full bg-secondary/10 text-secondary flex items-center justify-center">
<span className="material-symbols-outlined text-[20px]">savings</span>
</div>
</div>
<div>
<div className="font-kpi-display text-kpi-display text-on-background">$398K</div>
<div className="flex items-center gap-1 mt-2 text-tertiary font-body-sm text-body-sm">
<span className="material-symbols-outlined text-[16px]">trending_up</span>
<span>+8.7% vs last period</span>
</div>
</div>
</div>

<div className="bg-surface rounded-xl p-6 border border-outline-variant/30 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),_0_2px_4px_-1px_rgba(0,0,0,0.03)] flex flex-col justify-between">
<div className="flex justify-between items-start mb-4">
<span className="font-body-sm text-body-sm text-on-surface-variant">Fleet Utilization</span>
<div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
<span className="material-symbols-outlined text-[20px]">pie_chart</span>
</div>
</div>
<div>
<div className="font-kpi-display text-kpi-display text-on-background">87.3%</div>
<div className="flex items-center gap-1 mt-2 text-tertiary font-body-sm text-body-sm">
<span className="material-symbols-outlined text-[16px]">trending_up</span>
<span>+2.1% vs last period</span>
</div>
</div>
</div>

<div className="bg-surface rounded-xl p-6 border border-outline-variant/30 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),_0_2px_4px_-1px_rgba(0,0,0,0.03)] flex flex-col justify-between">
<div className="flex justify-between items-start mb-4">
<span className="font-body-sm text-body-sm text-on-surface-variant">Fuel Efficiency</span>
<div className="w-8 h-8 rounded-full bg-secondary-container/20 text-secondary-container flex items-center justify-center">
<span className="material-symbols-outlined text-[20px]">local_gas_station</span>
</div>
</div>
<div>
<div className="font-kpi-display text-kpi-display text-on-background">6.2 <span className="text-lg text-on-surface-variant">MPG</span></div>
<div className="flex items-center gap-1 mt-2 text-tertiary font-body-sm text-body-sm">
<span className="material-symbols-outlined text-[16px]">trending_up</span>
<span>+0.4 MPG vs last period</span>
</div>
</div>
</div>
<div className="bg-surface rounded-xl p-6 border border-outline-variant/30 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),_0_2px_4px_-1px_rgba(0,0,0,0.03)] flex flex-col justify-between">
<div className="flex justify-between items-start mb-4">
<span className="font-body-sm text-body-sm text-on-surface-variant">Completed Trips</span>
<div className="w-8 h-8 rounded-full bg-tertiary-container/20 text-tertiary-container flex items-center justify-center">
<span className="material-symbols-outlined text-[20px]">route</span>
</div>
</div>
<div>
<div className="font-kpi-display text-kpi-display text-on-background">1,492</div>
<div className="flex items-center gap-1 mt-2 text-tertiary font-body-sm text-body-sm">
<span className="material-symbols-outlined text-[16px]">trending_up</span>
<span>+112 vs last period</span>
</div>
</div>
</div>
<div className="bg-surface rounded-xl p-6 border border-outline-variant/30 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),_0_2px_4px_-1px_rgba(0,0,0,0.03)] flex flex-col justify-between">
<div className="flex justify-between items-start mb-4">
<span className="font-body-sm text-body-sm text-on-surface-variant">Avg Trip Cost</span>
<div className="w-8 h-8 rounded-full bg-error-container/20 text-error flex items-center justify-center">
<span className="material-symbols-outlined text-[20px]">request_quote</span>
</div>
</div>
<div>
<div className="font-kpi-display text-kpi-display text-on-background">$564</div>
<div className="flex items-center gap-1 mt-2 text-error font-body-sm text-body-sm">
<span className="material-symbols-outlined text-[16px]">trending_up</span>
<span>+$12 vs last period</span>
</div>
</div>
</div>
<div className="bg-surface rounded-xl p-6 border border-outline-variant/30 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),_0_2px_4px_-1px_rgba(0,0,0,0.03)] flex flex-col justify-between">
<div className="flex justify-between items-start mb-4">
<span className="font-body-sm text-body-sm text-on-surface-variant">ROI</span>
<div className="w-8 h-8 rounded-full bg-primary-container/20 text-primary-container flex items-center justify-center">
<span className="material-symbols-outlined text-[20px]">monitoring</span>
</div>
</div>
<div>
<div className="font-kpi-display text-kpi-display text-on-background">18.4%</div>
<div className="flex items-center gap-1 mt-2 text-tertiary font-body-sm text-body-sm">
<span className="material-symbols-outlined text-[16px]">trending_up</span>
<span>+1.2% vs last period</span>
</div>
</div>
</div>
</div>

<div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter mb-8">

<div className="lg:col-span-2 bg-surface rounded-xl p-6 border border-outline-variant/30 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),_0_2px_4px_-1px_rgba(0,0,0,0.03)]">
<div className="flex justify-between items-center mb-6">
<h3 className="font-section-title text-section-title text-on-background">Monthly Revenue</h3>
<button className="p-1 hover:bg-surface-container rounded transition-colors text-on-surface-variant">
<span className="material-symbols-outlined">more_vert</span>
</button>
</div>
<div className="h-[300px] w-full">
<canvas id="revenueChart"></canvas>
</div>
</div>

<div className="bg-surface rounded-xl p-6 border border-outline-variant/30 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),_0_2px_4px_-1px_rgba(0,0,0,0.03)]">
<div className="flex justify-between items-center mb-6">
<h3 className="font-section-title text-section-title text-on-background">Trip Status</h3>
<button className="p-1 hover:bg-surface-container rounded transition-colors text-on-surface-variant">
<span className="material-symbols-outlined">more_vert</span>
</button>
</div>
<div className="h-[300px] w-full">
<canvas id="tripChart"></canvas>
</div>
</div>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-8">

<div className="bg-surface rounded-xl p-6 border border-outline-variant/30 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),_0_2px_4px_-1px_rgba(0,0,0,0.03)]">
<div className="flex justify-between items-center mb-6">
<h3 className="font-section-title text-section-title text-on-background">Rev vs Cost</h3>
<button className="p-1 hover:bg-surface-container rounded transition-colors text-on-surface-variant">
<span className="material-symbols-outlined">more_vert</span>
</button>
</div>
<div className="h-[250px] w-full">
<canvas id="revCostChart"></canvas>
</div>
</div>

<div className="bg-surface rounded-xl p-6 border border-outline-variant/30 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),_0_2px_4px_-1px_rgba(0,0,0,0.03)]">
<div className="flex justify-between items-center mb-6">
<h3 className="font-section-title text-section-title text-on-background">Maint. Costs</h3>
<button className="p-1 hover:bg-surface-container rounded transition-colors text-on-surface-variant">
<span className="material-symbols-outlined">more_vert</span>
</button>
</div>
<div className="h-[250px] w-full flex justify-center items-center relative">
<canvas id="maintChart"></canvas>
<div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
<span className="font-label-caps text-label-caps text-on-surface-variant">Total</span>
<span className="font-body-md text-body-md font-bold text-on-background">$124K</span>
</div>
</div>
</div>

<div className="bg-surface rounded-xl p-6 border border-outline-variant/30 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),_0_2px_4px_-1px_rgba(0,0,0,0.03)]">
<div className="flex justify-between items-center mb-6">
<h3 className="font-section-title text-section-title text-on-background">Driver Metrics</h3>
<button className="p-1 hover:bg-surface-container rounded transition-colors text-on-surface-variant">
<span className="material-symbols-outlined">more_vert</span>
</button>
</div>
<div className="h-[250px] w-full">
<canvas id="driverChart"></canvas>
</div>
</div>
</div>

    </>
  );
};

export default Reports;
