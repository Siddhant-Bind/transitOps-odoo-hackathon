import React, { useEffect, useState } from 'react';
import { fetchWithAuth, apiRequest } from '../utils/api';

const Drivers = () => {
  const [driversData, setDriversData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [licenseFilter, setLicenseFilter] = useState('All Licenses');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newDriver, setNewDriver] = useState({
    fullName: '',
    licenseNumber: '',
    licenseCategory: 'CDL Class A',
    licenseExpiryDate: '',
    contactNumber: ''
  });

  const itemsPerPage = 5;

  const loadDrivers = async () => {
    try {
      setLoading(true);
      const res = await fetchWithAuth('/drivers');
      if (res?.success && res.data) {
        const mapped = res.data.map(d => {
          const isExpired = new Date(d.license_expiry_date) < new Date();
          return {
            id: `DRV-${d.driver_id}`,
            realId: d.driver_id,
            name: d.full_name,
            initials: d.full_name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase(),
            license: d.license_category || 'CDL Class A',
            licenseNo: d.license_number,
            phone: d.contact_number,
            licenseWarning: isExpired,
            trips: d.trips_count || 0,
            safety: `${Math.round(d.safety_score)}/100`,
            safetyRaw: Math.round(d.safety_score),
            vehicle: d.assigned_vehicle_reg || 'Unassigned',
            depot: d.region || 'Main Depot',
            status: d.status,
            avatar: d.avatar || ''
          };
        });
        setDriversData(mapped);
      }
    } catch (err) {
      console.error('Error loading drivers:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDrivers();
  }, []);

  const handleAddDriver = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        full_name: newDriver.fullName,
        license_number: newDriver.licenseNumber,
        license_category: newDriver.licenseCategory,
        license_expiry_date: newDriver.licenseExpiryDate || new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        contact_number: newDriver.contactNumber,
        hire_date: new Date().toISOString().split('T')[0],
        status: 'Available',
        safety_score: 100.00
      };

      await apiRequest('/drivers', 'POST', payload);
      await loadDrivers();
      setIsAddModalOpen(false);
      setNewDriver({
        fullName: '',
        licenseNumber: '',
        licenseCategory: 'CDL Class A',
        licenseExpiryDate: '',
        contactNumber: ''
      });
    } catch (err) {
      alert(err.message || 'Failed to create driver');
    }
  };

  // Compute status and count summaries dynamically
  const totalDriversCount = driversData.length;
  const availableCount = driversData.filter(d => d.status === 'Available').length;
  const onTripCount = driversData.filter(d => d.status === 'On Trip').length;
  const warningCount = driversData.filter(d => d.licenseWarning).length;
  const suspendedCount = driversData.filter(d => d.status === 'Suspended').length;

  // Filter logic
  const filteredDrivers = driversData.filter(d => {
    const statusMatch = statusFilter === 'All Statuses' || d.status === statusFilter;
    const licenseMatch = licenseFilter === 'All Licenses' || d.license === licenseFilter;
    return statusMatch && licenseMatch;
  });

  const totalPages = Math.ceil(filteredDrivers.length / itemsPerPage) || 1;
  const paginatedDrivers = filteredDrivers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const getStatusColorClasses = (status) => {
    switch (status) {
      case 'Available':
        return {
          bg: 'bg-[#3B82F6]/10 text-[#3B82F6]',
          dot: 'bg-[#3B82F6]'
        };
      case 'On Trip':
        return {
          bg: 'bg-tertiary-container/10 text-tertiary-container',
          dot: 'bg-tertiary-container'
        };
      case 'Suspended':
      case 'Off Duty':
      default:
        return {
          bg: 'bg-error/10 text-error',
          dot: 'bg-error'
        };
    }
  };

  const getSafetyColorClass = (safetyStr) => {
    const score = parseInt(safetyStr);
    if (score >= 90) return 'text-tertiary-container';
    if (score >= 75) return 'text-[#F59E0B]';
    return 'text-error';
  };

  return (
    <>
      <div className="max-w-container-max mx-auto space-y-stack-lg">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="font-section-title text-section-title text-on-surface">Driver Directory</h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Manage personnel, licenses, and performance metrics.</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => alert('Exporting Driver List...')} className="bg-surface-container-lowest border border-[#E5E7EB] text-on-surface px-4 py-2 rounded-[14px] font-body-md text-body-md hover:bg-surface-container transition-colors flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">download</span> Export
            </button>
            <button onClick={() => setIsAddModalOpen(true)} className="bg-primary text-on-primary px-4 py-2 rounded-[14px] font-body-md text-body-md hover:bg-opacity-90 space-x-2 transition-opacity flex items-center shadow-sm">
              <span className="material-symbols-outlined text-[18px]">person_add</span> <span>Add Driver</span>
            </button>
          </div>
        </div>

        {/* Dynamic Metric Counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-gutter">
          <div className="bg-surface-container-lowest p-stack-lg rounded-xl border border-[#E5E7EB] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.03)] flex flex-col gap-2">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Total Drivers</span>
            <div className="flex items-baseline gap-2">
              <span className="font-kpi-display text-kpi-display text-on-surface">{totalDriversCount}</span>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-stack-lg rounded-xl border border-[#E5E7EB] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.03)] flex flex-col gap-2 border-l-4 border-l-[#3B82F6]">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Available</span>
            <div className="flex items-baseline gap-2">
              <span className="font-kpi-display text-kpi-display text-on-surface">{availableCount}</span>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-stack-lg rounded-xl border border-[#E5E7EB] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.03)] flex flex-col gap-2 border-l-4 border-l-tertiary-container">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">On Trip</span>
            <div className="flex items-baseline gap-2">
              <span className="font-kpi-display text-kpi-display text-on-surface">{onTripCount}</span>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-stack-lg rounded-xl border border-[#E5E7EB] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.03)] flex flex-col gap-2 border-l-4 border-l-[#F59E0B]">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Expiring Licenses</span>
            <div className="flex items-baseline gap-2">
              <span className="font-kpi-display text-kpi-display text-on-surface">{warningCount}</span>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-stack-lg rounded-xl border border-[#E5E7EB] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.03)] flex flex-col gap-2 border-l-4 border-l-error">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Suspended</span>
            <div className="flex items-baseline gap-2">
              <span className="font-kpi-display text-kpi-display text-on-surface">{suspendedCount}</span>
            </div>
          </div>
        </div>

        {/* Table & Filtering */}
        <div className="bg-surface-container-lowest rounded-xl border border-[#E5E7EB] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.03)] overflow-hidden flex flex-col">
          <div className="p-4 border-b border-[#E5E7EB] flex flex-wrap gap-4 items-center justify-between bg-surface-container-low/50">
            <div className="flex gap-2 items-center flex-wrap">
              <select 
                value={statusFilter}
                onChange={e => { setStatusFilter(e.target.value); setCurrentPage(1); }}
                className="bg-surface-container-lowest border border-[#E5E7EB] rounded-lg font-body-sm text-on-surface px-3 py-1.5 focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] outline-none"
              >
                <option>All Statuses</option>
                <option>Available</option>
                <option>On Trip</option>
                <option>Suspended</option>
                <option>Off Duty</option>
              </select>
              <select 
                value={licenseFilter}
                onChange={e => { setLicenseFilter(e.target.value); setCurrentPage(1); }}
                className="bg-surface-container-lowest border border-[#E5E7EB] rounded-lg font-body-sm text-on-surface px-3 py-1.5 focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] outline-none"
              >
                <option>All Licenses</option>
                <option>CDL Class A</option>
                <option>CDL Class B</option>
              </select>
            </div>
            <div className="text-on-surface-variant font-body-sm text-body-sm">
              Showing {filteredDrivers.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, filteredDrivers.length)} of {filteredDrivers.length} drivers
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
                {loading ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center text-on-surface-variant">Loading drivers data...</td>
                  </tr>
                ) : paginatedDrivers.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center text-on-surface-variant">No drivers found matching current filters.</td>
                  </tr>
                ) : (
                  paginatedDrivers.map((driver, index) => {
                    const colors = getStatusColorClasses(driver.status);
                    return (
                      <tr key={driver.id} className={`${index % 2 === 0 ? 'bg-[#FFFFFF]' : 'bg-[#F9FAFB]'} hover:bg-surface-container-low transition-colors group border-b border-[#E5E7EB]/50`}>
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
                              <div className={`font-medium ${getSafetyColorClass(driver.safety)}`}>{driver.safety}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className={`font-medium ${driver.vehicle === 'Unassigned' ? 'text-on-surface-variant' : 'text-secondary'}`}>{driver.vehicle}</div>
                          <div className="text-on-surface-variant mt-0.5">{driver.depot}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${colors.bg}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${colors.dot} mr-1.5`}></span> {driver.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end">
                            <button onClick={() => alert('Opening Messages')} className="text-on-surface-variant hover:text-primary transition-colors p-1" title="Message Driver">
                              <span className="material-symbols-outlined text-[20px]">chat</span>
                            </button>
                            <button onClick={() => alert('Calling Driver')} className="text-on-surface-variant hover:text-primary transition-colors p-1 ml-2" title="Call Driver">
                              <span className="material-symbols-outlined text-[20px]">call</span>
                            </button>
                            <button className="text-on-surface-variant hover:text-primary transition-colors p-1 ml-2">
                              <span className="material-symbols-outlined text-[20px]" data-icon="more_vert">more_vert</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          <div className="p-4 border-t border-[#E5E7EB] flex items-center justify-between bg-surface-container-lowest">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
              disabled={currentPage === 1} 
              className="px-3 py-1.5 border border-[#E5E7EB] rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors font-body-sm text-body-sm disabled:opacity-50"
            >
              Previous
            </button>
            <div className="flex gap-1">
              <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary-container text-on-primary-container font-medium text-sm">{currentPage}</button>
              <span className="w-8 h-8 flex items-center justify-center text-on-surface-variant">/</span>
              <span className="w-8 h-8 flex items-center justify-center text-on-surface-variant font-medium text-sm">{totalPages}</span>
            </div>
            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
              disabled={currentPage === totalPages} 
              className="px-3 py-1.5 border border-[#E5E7EB] rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors font-body-sm text-body-sm disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Add Driver Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-surface-dim/50 backdrop-blur-sm" onClick={() => setIsAddModalOpen(false)}></div>
          <div className="relative bg-surface-container-lowest rounded-xl shadow-lg border border-outline-variant w-full max-w-md p-6 z-10 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-section-title text-xl font-semibold text-on-surface">Add New Driver</h3>
              <button className="text-on-surface-variant hover:text-on-surface" onClick={() => setIsAddModalOpen(false)}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleAddDriver} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-on-surface mb-1">Full Name</label>
                <input required type="text" value={newDriver.fullName} onChange={e => setNewDriver({...newDriver, fullName: e.target.value})} className="w-full px-3 py-2 bg-surface border border-outline-variant rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Alex" />
              </div>
              <div>
                <label className="block text-sm font-medium text-on-surface mb-1">License Number</label>
                <input required type="text" value={newDriver.licenseNumber} onChange={e => setNewDriver({...newDriver, licenseNumber: e.target.value})} className="w-full px-3 py-2 bg-surface border border-outline-variant rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" placeholder="DL-928347" />
              </div>
              <div>
                <label className="block text-sm font-medium text-on-surface mb-1">License Class</label>
                <select value={newDriver.licenseCategory} onChange={e => setNewDriver({...newDriver, licenseCategory: e.target.value})} className="w-full px-3 py-2 bg-surface border border-outline-variant rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                  <option value="CDL Class A">CDL Class A</option>
                  <option value="CDL Class B">CDL Class B</option>
                  <option value="Standard">Standard DL</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-on-surface mb-1">License Expiry Date</label>
                <input required type="date" value={newDriver.licenseExpiryDate} onChange={e => setNewDriver({...newDriver, licenseExpiryDate: e.target.value})} className="w-full px-3 py-2 bg-surface border border-outline-variant rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-on-surface mb-1">Phone Number</label>
                <input required type="text" value={newDriver.contactNumber} onChange={e => setNewDriver({...newDriver, contactNumber: e.target.value})} className="w-full px-3 py-2 bg-surface border border-outline-variant rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" placeholder="+1 (555) 019-2834" />
              </div>
              <div className="pt-4 flex gap-3 justify-end">
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 border border-outline-variant rounded-lg font-medium text-on-surface">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-primary text-on-primary rounded-lg font-medium shadow-sm hover:opacity-90">Save Driver</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Drivers;
