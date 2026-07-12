import { useAppContext } from '../context/AppContext';

const Maintenance = () => {
  const { maintenanceLogs, setSelectedMaintenanceLog, setMaintenanceFormOpen } = useAppContext();
  


  // Compute dynamic KPIs
  const vehiclesInShop = maintenanceLogs.filter(log => log.status !== 'Completed' && log.status !== 'Cancelled').length;
  const upcomingServices = maintenanceLogs.filter(log => log.status === 'Scheduled').length;
  const completedServices = maintenanceLogs.filter(log => log.status === 'Completed').length;
  const totalCost = maintenanceLogs.reduce((sum, log) => sum + log.costRaw, 0);

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="font-section-title text-section-title text-on-surface">Maintenance Overview</h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Track and manage fleet service schedules and repairs.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setMaintenanceFormOpen(true)} className="font-body-md text-body-md font-medium text-on-surface bg-surface-container-lowest border border-outline-variant px-4 py-2 rounded-lg hover:bg-surface-variant transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">history</span> Log Service
          </button>
          <button onClick={() => setMaintenanceFormOpen(true)} className="font-body-md text-body-md font-medium text-on-primary-container bg-primary-container px-4 py-2 rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2 shadow-sm">
            <span className="material-symbols-outlined text-sm">calendar_month</span> Schedule Service
          </button>
        </div>
      </div>

      {/* Dynamic KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
        <div className="bg-surface-container-lowest p-stack-lg rounded-xl border border-outline-variant shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.03)] flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Vehicles In Shop</span>
            <span className="material-symbols-outlined text-error p-1 bg-error-container rounded-md">build</span>
          </div>
          <div className="font-kpi-display text-kpi-display text-on-surface">{vehiclesInShop}</div>
          <div className="text-error font-body-sm text-body-sm mt-2 flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">info</span> Active service schedules
          </div>
        </div>

        <div className="bg-surface-container-lowest p-stack-lg rounded-xl border border-outline-variant shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.03)] flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Upcoming Services</span>
            <span className="material-symbols-outlined text-secondary p-1 bg-secondary-fixed rounded-md">event</span>
          </div>
          <div className="font-kpi-display text-kpi-display text-on-surface">{upcomingServices}</div>
          <div className="text-on-surface-variant font-body-sm text-body-sm mt-2">Planned service logs</div>
        </div>

        <div className="bg-surface-container-lowest p-stack-lg rounded-xl border border-outline-variant shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.03)] flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Completed Services</span>
            <span className="material-symbols-outlined text-tertiary p-1 bg-tertiary-fixed rounded-md">check_circle</span>
          </div>
          <div className="font-kpi-display text-kpi-display text-on-surface">{completedServices}</div>
          <div className="text-tertiary font-body-sm text-body-sm mt-2 flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">trending_up</span> Fully resolved services
          </div>
        </div>

        <div className="bg-surface-container-lowest p-stack-lg rounded-xl border border-outline-variant shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.03)] flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Total Maintenance Cost</span>
            <span className="material-symbols-outlined text-primary p-1 bg-primary-fixed rounded-md">payments</span>
          </div>
          <div className="font-kpi-display text-kpi-display text-on-surface">
            ${totalCost >= 1000 ? `${(totalCost / 1000).toFixed(1)}k` : totalCost}
          </div>
          <div className="text-on-surface-variant font-body-sm text-body-sm mt-2">Database accumulated</div>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.03)] overflow-hidden flex flex-col">
        <div className="p-stack-md border-b border-outline-variant flex justify-between items-center bg-surface-container-lowest">
          <h3 className="font-body-md text-body-md font-semibold text-on-surface">Recent Maintenance Logs</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant">
                <th className="py-3 px-4 font-label-caps text-label-caps text-on-surface-variant font-semibold">Vehicle</th>
                <th className="py-3 px-4 font-label-caps text-label-caps text-on-surface-variant font-semibold">Service Type</th>
                <th className="py-3 px-4 font-label-caps text-label-caps text-on-surface-variant font-semibold">Workshop / Details</th>
                <th className="py-3 px-4 font-label-caps text-label-caps text-on-surface-variant font-semibold text-right">Cost</th>
                <th className="py-3 px-4 font-label-caps text-label-caps text-on-surface-variant font-semibold">Date</th>
                <th className="py-3 px-4 font-label-caps text-label-caps text-on-surface-variant font-semibold">Status</th>
                <th className="py-3 px-4 font-label-caps text-label-caps text-on-surface-variant font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="font-body-sm text-body-sm">
              {maintenanceLogs.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-on-surface-variant">No maintenance logs found.</td>
                </tr>
              ) : (
                maintenanceLogs.map((log, index) => (
                  <tr key={log.id} className={`border-b border-outline-variant hover:bg-surface-container-low transition-colors group ${index % 2 !== 0 ? 'bg-surface-bright' : 'bg-surface-container-lowest'}`}>
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium text-on-surface">{log.vehicle}</div>
                        <div className="text-on-surface-variant text-xs">{log.regNumber}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-on-surface">{log.serviceType}</td>
                    <td className="py-3 px-4 text-on-surface-variant">{log.workshop}</td>
                    <td className="py-3 px-4 text-on-surface text-right font-medium">{log.cost}</td>
                    <td className="py-3 px-4 text-on-surface-variant">{log.date}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium border ${log.status === 'Completed' ? 'bg-tertiary/10 text-tertiary border-tertiary/20' : 'bg-error/10 text-error border-error/20'}`}>
                        {log.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button onClick={() => setSelectedMaintenanceLog(log)} className="text-secondary hover:text-secondary-container transition-colors">View Details</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Maintenance;
