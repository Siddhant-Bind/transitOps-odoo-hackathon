import React, { createContext, useState, useContext, useEffect } from 'react';
import { fetchWithAuth } from '../utils/api';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Global State for UI overlays
  const [isAddVehicleOpen, setAddVehicleOpen] = useState(false);
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const [selectedMaintenanceLog, setSelectedMaintenanceLog] = useState(null);
  const [userProfileOpen, setUserProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [isMaintenanceFormOpen, setMaintenanceFormOpen] = useState(false);
  const [isFuelFormOpen, setFuelFormOpen] = useState(false);
  const [isExpenseFormOpen, setExpenseFormOpen] = useState(false);

  const [fleetData, setFleetData] = useState([]);
  const [maintenanceLogs, setMaintenanceLogs] = useState([]);
  const [fuelLogs, setFuelLogs] = useState([]);
  const [expenses, setExpenses] = useState([]);

  // Fetch functions
  const refreshVehicles = async () => {
    try {
      const res = await fetchWithAuth('/vehicles');
      if (res?.success && res.data) {
        const mapped = res.data.map(v => ({
          id: v.vehicle_id,
          regNumber: v.registration_number,
          type: v.vehicle_type,
          model: v.model || v.vehicle_name,
          driver: v.driver_name || 'Unassigned',
          driverInitials: v.driver_name ? v.driver_name.split(' ').map(n => n[0]).join('').substring(0, 2) : '',
          driverAvatar: '',
          odometer: `${Number(v.odometer).toLocaleString()} km`,
          status: v.status,
          image: v.image || "https://placehold.co/100"
        }));
        setFleetData(mapped);
      }
    } catch (err) {
      console.error('Error refreshing vehicles:', err);
    }
  };

  const refreshMaintenance = async () => {
    try {
      const res = await fetchWithAuth('/maintenance');
      if (res?.success && res.data) {
        const mapped = res.data.map(m => ({
          id: m.maintenance_id,
          vehicle: m.vehicle_name || m.registration_number,
          regNumber: m.registration_number,
          serviceType: m.maintenance_type,
          workshop: m.performed_by || 'Main Workshop',
          cost: m.cost ? `$${Number(m.cost).toLocaleString()}` : '$0.00',
          date: new Date(m.actual_date || m.scheduled_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          status: m.status,
          image: 'https://placehold.co/100'
        }));
        setMaintenanceLogs(mapped);
      }
    } catch (err) {
      console.error('Error refreshing maintenance:', err);
    }
  };

  const refreshFuel = async () => {
    try {
      const res = await fetchWithAuth('/fuel');
      if (res?.success && res.data) {
        const mapped = res.data.map(f => ({
          vehicle: f.registration_number,
          date: new Date(f.fuel_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
          litres: `${f.fuel_liters || f.quantity || 0} L`,
          cost: `$${(f.fuel_cost || f.cost || 0).toLocaleString()}`,
          mileage: `${(f.odometer_reading || 0).toLocaleString()} km`,
          station: f.location || 'Local Depot Station'
        }));
        setFuelLogs(mapped);
      }
    } catch (err) {
      console.error('Error refreshing fuel:', err);
    }
  };

  const refreshExpenses = async () => {
    try {
      const res = await fetchWithAuth('/expenses');
      if (res?.success && res.data) {
        const mapped = res.data.map(e => ({
          tripId: e.trip_id ? `#TR-${e.trip_id}` : 'N/A',
          vehicle: e.registration_number,
          type: e.expense_type,
          driver: e.driver_name || 'System',
          amount: `$${(e.amount || 0).toLocaleString()}`,
          status: e.status || 'Approved'
        }));
        setExpenses(mapped);
      }
    } catch (err) {
      console.error('Error refreshing expenses:', err);
    }
  };

  const refreshAll = () => {
    const token = localStorage.getItem('token');
    if (token) {
      refreshVehicles();
      refreshMaintenance();
      refreshFuel();
      refreshExpenses();
    }
  };

  useEffect(() => {
    refreshAll();
  }, []);

  return (
    <AppContext.Provider value={{
      isAddVehicleOpen, setAddVehicleOpen,
      isSettingsOpen, setSettingsOpen,
      selectedMaintenanceLog, setSelectedMaintenanceLog,
      userProfileOpen, setUserProfileOpen,
      notificationsOpen, setNotificationsOpen,
      isMaintenanceFormOpen, setMaintenanceFormOpen,
      isFuelFormOpen, setFuelFormOpen,
      isExpenseFormOpen, setExpenseFormOpen,
      fleetData, setFleetData,
      maintenanceLogs, setMaintenanceLogs,
      fuelLogs, setFuelLogs,
      expenses, setExpenses,
      refreshVehicles,
      refreshMaintenance,
      refreshFuel,
      refreshExpenses,
      refreshAll
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
