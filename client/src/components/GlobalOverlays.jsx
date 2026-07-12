import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { apiRequest } from '../utils/api';

export default function GlobalOverlays() {
  const navigate = useNavigate();
  const {
    isAddVehicleOpen, setAddVehicleOpen,
    isSettingsOpen, setSettingsOpen,
    selectedMaintenanceLog, setSelectedMaintenanceLog,
    userProfileOpen, setUserProfileOpen,
    notificationsOpen, setNotificationsOpen,
    isMaintenanceFormOpen, setMaintenanceFormOpen,
    isFuelFormOpen, setFuelFormOpen,
    isExpenseFormOpen, setExpenseFormOpen,
    fleetData,
    refreshVehicles,
    refreshMaintenance,
    refreshFuel,
    refreshExpenses
  } = useAppContext();

  // Load User context dynamically
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userName = user.full_name || 'Susan Supervisor';
  const userRole = user.role_name || 'Fleet Manager';

  const handleNavigation = (path) => {
    setUserProfileOpen(false);
    setNotificationsOpen(false);
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUserProfileOpen(false);
    navigate('/login');
  };

  // Handle Add Vehicle Form
  const [vehicleForm, setVehicleForm] = useState({
    regNumber: '', model: '', type: 'Van', odometer: ''
  });

  const handleAddVehicleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiRequest('/vehicles', 'POST', {
        registration_number: vehicleForm.regNumber,
        vehicle_name: vehicleForm.model,
        model: vehicleForm.model,
        vehicle_type: vehicleForm.type,
        max_load_capacity: vehicleForm.type.includes('Articulated') ? 3000 : vehicleForm.type.includes('Panel') ? 1500 : 800,
        odometer: Number(vehicleForm.odometer.replace(/[^0-9.]/g, '')) || 0,
        acquisition_cost: 35000,
        status: 'Available',
        region: 'North'
      });
      await refreshVehicles();
      setAddVehicleOpen(false);
      setVehicleForm({ regNumber: '', model: '', type: 'Van', odometer: '' });
    } catch (err) {
      alert(err.message || 'Failed to save vehicle');
    }
  };

  const [maintenanceForm, setMaintenanceForm] = useState({ vehicle: '', serviceType: '', cost: '' });
  
  const handleMaintenanceSubmit = async (e) => {
    e.preventDefault();
    const targetVehicle = fleetData.find(v => 
      v.regNumber.toLowerCase() === maintenanceForm.vehicle.trim().toLowerCase() ||
      v.id.toString() === maintenanceForm.vehicle.trim()
    );
    if (!targetVehicle) {
      alert('Vehicle registration/ID not found in fleet. Please use a valid registration like VAN-001.');
      return;
    }

    try {
      await apiRequest('/maintenance', 'POST', {
        vehicle_id: targetVehicle.id,
        maintenance_type: maintenanceForm.serviceType,
        description: `Scheduled service: ${maintenanceForm.serviceType}`,
        scheduled_date: new Date().toISOString().split('T')[0]
      });
      await refreshMaintenance();
      await refreshVehicles();
      setMaintenanceFormOpen(false);
      setMaintenanceForm({ vehicle: '', serviceType: '', cost: '' });
    } catch (err) {
      alert(err.message || 'Failed to schedule maintenance');
    }
  };

  const [fuelForm, setFuelForm] = useState({ vehicle: '', litres: '', cost: '' });
  
  const handleFuelSubmit = async (e) => {
    e.preventDefault();
    const targetVehicle = fleetData.find(v => 
      v.regNumber.toLowerCase() === fuelForm.vehicle.trim().toLowerCase() ||
      v.id.toString() === fuelForm.vehicle.trim()
    );
    if (!targetVehicle) {
      alert('Vehicle registration/ID not found in fleet. Please use a valid registration like VAN-001.');
      return;
    }

    const odometerVal = Number(targetVehicle.odometer.replace(/[^0-9.]/g, '')) || 0;

    try {
      await apiRequest('/fuel', 'POST', {
        vehicle_id: targetVehicle.id,
        fuel_date: new Date().toISOString().split('T')[0],
        fuel_liters: Number(fuelForm.litres),
        fuel_cost: Number(fuelForm.cost),
        odometer_reading: odometerVal + 10
      });
      await refreshFuel();
      setFuelFormOpen(false);
      setFuelForm({ vehicle: '', litres: '', cost: '' });
    } catch (err) {
      alert(err.message || 'Failed to log fuel');
    }
  };

  const [expenseForm, setExpenseForm] = useState({ vehicle: '', amount: '', type: '' });
  
  const handleExpenseSubmit = async (e) => {
    e.preventDefault();
    const targetVehicle = fleetData.find(v => 
      v.regNumber.toLowerCase() === expenseForm.vehicle.trim().toLowerCase() ||
      v.id.toString() === expenseForm.vehicle.trim()
    );
    if (!targetVehicle) {
      alert('Vehicle registration/ID not found in fleet. Please use a valid registration like VAN-001.');
      return;
    }

    try {
      await apiRequest('/expenses', 'POST', {
        vehicle_id: targetVehicle.id,
        expense_type: expenseForm.type,
        description: `Expense log: ${expenseForm.type}`,
        amount: Number(expenseForm.amount),
        expense_date: new Date().toISOString().split('T')[0]
      });
      await refreshExpenses();
      setExpenseFormOpen(false);
      setExpenseForm({ vehicle: '', amount: '', type: '' });
    } catch (err) {
      alert(err.message || 'Failed to log expense');
    }
  };

  return (
    <>
      {/* 1. Add Vehicle Modal */}
      {isAddVehicleOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-surface-dim/50 backdrop-blur-sm" onClick={() => setAddVehicleOpen(false)}></div>
          <div className="relative bg-surface-container-lowest rounded-xl shadow-lg border border-outline-variant w-full max-w-md p-6 z-10 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-section-title text-xl font-semibold text-on-surface">Add New Vehicle</h3>
              <button className="text-on-surface-variant hover:text-on-surface" onClick={() => setAddVehicleOpen(false)}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleAddVehicleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-on-surface mb-1">Registration Number</label>
                <input required type="text" value={vehicleForm.regNumber} onChange={e => setVehicleForm({...vehicleForm, regNumber: e.target.value})} className="w-full px-3 py-2 bg-surface border border-outline-variant rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" placeholder="VAN-005" />
              </div>
              <div>
                <label className="block text-sm font-medium text-on-surface mb-1">Make & Model</label>
                <input required type="text" value={vehicleForm.model} onChange={e => setVehicleForm({...vehicleForm, model: e.target.value})} className="w-full px-3 py-2 bg-surface border border-outline-variant rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Ford Transit" />
              </div>
              <div>
                <label className="block text-sm font-medium text-on-surface mb-1">Type</label>
                <select value={vehicleForm.type} onChange={e => setVehicleForm({...vehicleForm, type: e.target.value})} className="w-full px-3 py-2 bg-surface border border-outline-variant rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                  <option value="Van">Delivery Van</option>
                  <option value="Truck">Heavy Goods (HGV)</option>
                  <option value="LGV">Light Goods (LGV)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-on-surface mb-1">Initial Odometer (km)</label>
                <input required type="text" value={vehicleForm.odometer} onChange={e => setVehicleForm({...vehicleForm, odometer: e.target.value})} className="w-full px-3 py-2 bg-surface border border-outline-variant rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" placeholder="12500" />
              </div>
              <div className="pt-4 flex gap-3 justify-end">
                <button type="button" onClick={() => setAddVehicleOpen(false)} className="px-4 py-2 border border-outline-variant rounded-lg font-medium text-on-surface">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-primary text-on-primary rounded-lg font-medium shadow-sm hover:opacity-90">Save Vehicle</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. Settings Drawer */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-surface-dim/50 backdrop-blur-sm" onClick={() => setSettingsOpen(false)}></div>
          <div className="relative w-full max-w-sm h-full bg-surface-container-lowest border-l border-outline-variant shadow-2xl z-10 flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-4 border-b border-outline-variant flex justify-between items-center bg-surface-container">
              <h3 className="font-section-title text-lg font-semibold text-on-surface flex items-center gap-2"><span className="material-symbols-outlined">settings</span> Quick Settings</h3>
              <button className="text-on-surface-variant hover:text-on-surface" onClick={() => setSettingsOpen(false)}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              <div>
                <h4 className="font-medium text-on-surface mb-2 border-b border-outline-variant pb-2">Appearance</h4>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-on-surface-variant">Dark Mode</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-9 h-5 bg-surface-dim rounded-full peer peer-checked:after:translate-x-full after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-on-surface mb-2 border-b border-outline-variant pb-2">Notifications</h4>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-on-surface-variant">Email Alerts</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                     <div className="w-9 h-5 bg-surface-dim rounded-full peer peer-checked:after:translate-x-full after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-outline-variant">
              <button className="w-full flex items-center justify-center gap-2 bg-white border border-outline-variant text-on-surface px-4 py-2 rounded-lg font-medium hover:bg-surface-container" onClick={() => setSettingsOpen(false)}>
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Maintenance Details Drawer */}
      {selectedMaintenanceLog && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-surface-dim/50 backdrop-blur-sm" onClick={() => setSelectedMaintenanceLog(null)}></div>
          <div className="relative w-full max-w-md h-full bg-surface-container-lowest border-l border-outline-variant shadow-2xl z-10 flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-4 border-b border-outline-variant flex justify-between items-start bg-surface-container">
              <div>
                <h3 className="font-section-title text-xl font-semibold text-on-surface">{selectedMaintenanceLog.vehicle}</h3>
                <p className="text-sm text-on-surface-variant mt-1">Log ID: {selectedMaintenanceLog.id}</p>
              </div>
              <button className="text-on-surface-variant hover:text-on-surface rounded p-1" onClick={() => setSelectedMaintenanceLog(null)}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto w-full">
              {selectedMaintenanceLog.image && (
                <div className="w-full h-48 bg-surface-variant">
                  <img src={selectedMaintenanceLog.image} alt="vehicle" className="w-full h-full object-cover" />
                </div>
              )}
              <div className="p-6 space-y-6">
                <div>
                  <h4 className="text-xs font-semibold uppercase text-on-surface-variant tracking-wider mb-2">Service Details</h4>
                  <div className="bg-surface border border-outline-variant rounded-lg p-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-on-surface-variant">Type</span>
                      <span className="text-sm font-medium text-on-surface">{selectedMaintenanceLog.serviceType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-on-surface-variant">Date</span>
                      <span className="text-sm font-medium text-on-surface">{selectedMaintenanceLog.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-on-surface-variant">Workshop</span>
                      <span className="text-sm font-medium text-on-surface">{selectedMaintenanceLog.workshop}</span>
                    </div>
                  </div>
                </div>

                <div>
                   <h4 className="text-xs font-semibold uppercase text-on-surface-variant tracking-wider mb-2">Billing Information</h4>
                  <div className="bg-surface border border-outline-variant rounded-lg p-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-on-surface-variant">Status</span>
                      <span className="text-sm font-medium text-primary bg-primary-container px-2 py-0.5 rounded">{selectedMaintenanceLog.status}</span>
                    </div>
                    <div className="flex justify-between border-t border-outline-variant pt-3 mt-3">
                      <span className="text-sm font-medium text-on-surface">Total Cost</span>
                      <span className="text-sm font-bold text-on-surface">{selectedMaintenanceLog.cost}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. Profile Drawer */}
      {userProfileOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-surface-dim/40 backdrop-blur-sm" onClick={() => setUserProfileOpen(false)}></div>
          <div className="relative w-80 h-full bg-surface-container-lowest border-l border-outline-variant shadow-xl z-10 flex flex-col transition-transform animate-in slide-in-from-right duration-300">
            <div className="p-6 text-center border-b border-outline-variant">
               <button className="absolute top-4 right-4 text-on-surface-variant" onClick={() => setUserProfileOpen(false)}>
                 <span className="material-symbols-outlined">close</span>
               </button>
               <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmolZtt7mRq3yBow4bFHhqa7bmbjrgYKNQcjitYzem15tkmhfo7iNNecBJsbdX2XIT59Tgi_HMLRi2sZSdbjVa5XMosWi0zs3RCypfv5b47htnk1YXEBnL5Zyh675375kf9aSuTt49LkpHL7kEhJyZM4ZNkynXHFYa-PnpC8brhnjiSAiNneWy1DPLt5ynV1iB_F2NUcjGd451dQaXCuvEIlqO1KMU2KBoH52v6ABjnLhN-edQpHydzQ" className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-primary object-cover" alt="User" />
               <h3 className="text-lg font-bold text-on-surface">{userName}</h3>
               <p className="text-sm text-on-surface-variant">{userRole}</p>
            </div>
            <div className="p-4 flex-1">
              <ul className="space-y-1">
                <li><button onClick={() => handleNavigation('/settings')} className="w-full text-left px-4 py-2 text-sm text-on-surface-variant hover:bg-surface-container rounded-lg flex items-center gap-3"><span className="material-symbols-outlined text-[18px]">person</span> My Account</button></li>
                <li><button onClick={() => handleNavigation('/settings')} className="w-full text-left px-4 py-2 text-sm text-on-surface-variant hover:bg-surface-container rounded-lg flex items-center gap-3"><span className="material-symbols-outlined text-[18px]">lock</span> Security</button></li>
                <li><button onClick={() => alert('Opening Help Center')} className="w-full text-left px-4 py-2 text-sm text-on-surface-variant hover:bg-surface-container rounded-lg flex items-center gap-3"><span className="material-symbols-outlined text-[18px]">help</span> Help Center</button></li>
              </ul>
            </div>
            <div className="p-4 border-t border-outline-variant">
              <button onClick={handleLogout} className="w-full bg-error-container text-error px-4 py-2 rounded-lg font-medium flex justify-center items-center gap-2 hover:opacity-90">
                <span className="material-symbols-outlined text-[18px]">logout</span> Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. Notifications Drawer */}
      {notificationsOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-surface-dim/40 backdrop-blur-sm" onClick={() => setNotificationsOpen(false)}></div>
          <div className="relative w-80 h-full bg-surface-container-lowest border-l border-outline-variant shadow-xl z-10 flex flex-col transition-transform animate-in slide-in-from-right duration-300">
            <div className="p-4 border-b border-outline-variant flex justify-between items-center">
               <h3 className="font-semibold text-on-surface">Notifications (2)</h3>
               <button className="text-secondary text-sm hover:underline" onClick={() => setNotificationsOpen(false)}>Mark all read</button>
            </div>
            <div className="flex-1 overflow-y-auto">
               <div className="p-4 border-b border-outline-variant/30 hover:bg-surface-container cursor-pointer transition-colors">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-xs font-bold text-error uppercase">Maintenance Alert</span>
                    <span className="text-xs text-on-surface-variant">10m ago</span>
                  </div>
                  <p className="text-sm text-on-surface">Vehicle temperature readings abnormal.</p>
               </div>
               <div className="p-4 border-b border-outline-variant/30 hover:bg-surface-container cursor-pointer transition-colors bg-surface-container-low">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-xs font-bold text-secondary uppercase">Approval Required</span>
                    <span className="text-xs text-on-surface-variant">1h ago</span>
                  </div>
                  <p className="text-sm text-on-surface">Fuel logged pending approval.</p>
               </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. Maintenance Form Drawer */}
      {isMaintenanceFormOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-surface-dim/40 backdrop-blur-sm" onClick={() => setMaintenanceFormOpen(false)}></div>
          <div className="relative w-full max-w-sm h-full bg-surface-container-lowest border-l border-outline-variant shadow-xl z-10 flex flex-col transition-transform animate-in slide-in-from-right duration-300">
            <div className="p-4 border-b border-outline-variant flex justify-between items-center">
               <h3 className="font-semibold text-on-surface">Schedule / Log Service</h3>
               <button className="text-on-surface-variant hover:text-on-surface" onClick={() => setMaintenanceFormOpen(false)}>
                 <span className="material-symbols-outlined">close</span>
               </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <form onSubmit={handleMaintenanceSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-1">Vehicle Registration / ID</label>
                  <input required type="text" value={maintenanceForm.vehicle} onChange={e => setMaintenanceForm({...maintenanceForm, vehicle: e.target.value})} className="w-full px-3 py-2 bg-surface border border-outline-variant rounded-lg" placeholder="VAN-001" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-1">Service Type</label>
                  <input required type="text" value={maintenanceForm.serviceType} onChange={e => setMaintenanceForm({...maintenanceForm, serviceType: e.target.value})} className="w-full px-3 py-2 bg-surface border border-outline-variant rounded-lg" placeholder="Oil Change" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-1">Estimated Cost ($)</label>
                  <input required type="number" value={maintenanceForm.cost} onChange={e => setMaintenanceForm({...maintenanceForm, cost: e.target.value})} className="w-full px-3 py-2 bg-surface border border-outline-variant rounded-lg" placeholder="150" />
                </div>
                <div className="pt-4">
                  <button type="submit" className="w-full px-4 py-2 bg-primary text-on-primary rounded-lg font-medium shadow-sm hover:opacity-90">Save Log</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* 7. Fuel Form Drawer */}
      {isFuelFormOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-surface-dim/40 backdrop-blur-sm" onClick={() => setFuelFormOpen(false)}></div>
          <div className="relative w-full max-w-sm h-full bg-surface-container-lowest border-l border-outline-variant shadow-xl z-10 flex flex-col transition-transform animate-in slide-in-from-right duration-300">
            <div className="p-4 border-b border-outline-variant flex justify-between items-center">
               <h3 className="font-semibold text-on-surface">Add Fuel Log</h3>
               <button className="text-on-surface-variant hover:text-on-surface" onClick={() => setFuelFormOpen(false)}>
                 <span className="material-symbols-outlined">close</span>
               </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <form onSubmit={handleFuelSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-1">Vehicle Registration / ID</label>
                  <input required type="text" value={fuelForm.vehicle} onChange={e => setFuelForm({...fuelForm, vehicle: e.target.value})} className="w-full px-3 py-2 bg-surface border border-outline-variant rounded-lg" placeholder="VAN-001" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-1">Litres</label>
                  <input required type="number" value={fuelForm.litres} onChange={e => setFuelForm({...fuelForm, litres: e.target.value})} className="w-full px-3 py-2 bg-surface border border-outline-variant rounded-lg" placeholder="85" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-1">Total Cost ($)</label>
                  <input required type="number" value={fuelForm.cost} onChange={e => setFuelForm({...fuelForm, cost: e.target.value})} className="w-full px-3 py-2 bg-surface border border-outline-variant rounded-lg" placeholder="120" />
                </div>
                <div className="pt-4">
                  <button type="submit" className="w-full px-4 py-2 bg-primary text-on-primary rounded-lg font-medium shadow-sm hover:opacity-90">Log Fuel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* 8. Expense Form Drawer */}
      {isExpenseFormOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-surface-dim/40 backdrop-blur-sm" onClick={() => setExpenseFormOpen(false)}></div>
          <div className="relative w-full max-w-sm h-full bg-surface-container-lowest border-l border-outline-variant shadow-xl z-10 flex flex-col transition-transform animate-in slide-in-from-right duration-300">
            <div className="p-4 border-b border-outline-variant flex justify-between items-center">
               <h3 className="font-semibold text-on-surface">Add Expense</h3>
               <button className="text-on-surface-variant hover:text-on-surface" onClick={() => setExpenseFormOpen(false)}>
                 <span className="material-symbols-outlined">close</span>
               </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <form onSubmit={handleExpenseSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-1">Vehicle Registration / ID</label>
                  <input required type="text" value={expenseForm.vehicle} onChange={e => setExpenseForm({...expenseForm, vehicle: e.target.value})} className="w-full px-3 py-2 bg-surface border border-outline-variant rounded-lg" placeholder="VAN-001" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-1">Expense Type</label>
                  <input required type="text" value={expenseForm.type} onChange={e => setExpenseForm({...expenseForm, type: e.target.value})} className="w-full px-3 py-2 bg-surface border border-outline-variant rounded-lg" placeholder="Toll Gate" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-1">Amount ($)</label>
                  <input required type="number" value={expenseForm.amount} onChange={e => setExpenseForm({...expenseForm, amount: e.target.value})} className="w-full px-3 py-2 bg-surface border border-outline-variant rounded-lg" placeholder="45" />
                </div>
                <div className="pt-4">
                  <button type="submit" className="w-full px-4 py-2 bg-primary text-on-primary rounded-lg font-medium shadow-sm hover:opacity-90">Submit Expense</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
