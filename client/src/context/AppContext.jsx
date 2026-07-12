import React, { createContext, useState, useContext } from 'react';

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
  const [isDarkMode, setDarkMode] = useState(false);

  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);
  const [fleetData, setFleetData] = useState([
    {
      id: "FL-101",
      regNumber: "HG23 KLP",
      type: "44t / Articulated",
      model: "Volvo FH16",
      driver: "John Doe",
      driverInitials: "JD",
      driverAvatar: "",
      odometer: "142,500 mi",
      status: "Active Route",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDp0WhM0lnY0j3C1eXb6vWKFRYg0no7Gc6HdzPqaTwJbY-KV93g-uuVpyTarD4okVQc6nBKqj1x0r__1YNDbYskTKMyOveGcV3t30BqwmjFcOCBMOwhBLkrKemmWbE5ffXBdnEd87SsX45_asdKRFdNf655cA-8AysNUsfIpfUM5DccLe0FYbx2v1GgrqOmBpc9GvNbXIGIvWaGYvwPIrOAF-jFTUH8Fj3nHcMrADgEW57_y4Zce4j7IA"
    },
    {
      id: "FL-102",
      regNumber: "VN22 OQM",
      type: "3.5t / Panel",
      model: "Mercedes Sprinter",
      driver: "Unassigned",
      driverInitials: "",
      driverAvatar: "",
      odometer: "45,120 mi",
      status: "Idle (Depot)",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAyfA56-t1ymGgDJdgNfffK8yIf4yj2kL8sj4M_WWjZMn4nl6V1U3SrJtmki3E0y4MgP7j7oTntX8ifkvPONdpxqRxRhlT17egVLxYleVoOIL54KWTQVnjkWbcBF0CZMmAqyQSd3hlIr04oDZF-PXwQ7-1DuFfIMvSdUuoFUkXe9D9BunTUC0ykF0J1FKc6GL6T2w3Yz0f0Vf31puw2V-irPTrYbCkVVt6T78Wp1PhTm5gVDyjIipRSHg"
    },
    {
      id: "FL-103",
      regNumber: "HG21 ZXC",
      type: "44t / Articulated",
      model: "Scania R-Series",
      driver: "Mike Torres",
      driverInitials: "MT",
      driverAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDXvuJnAXN4i98TIYSeKdydrTAE_3WiZ8QPlLwx8i5yX_IoRIlSZARsrZVFhZpBTHSrUjb_i_iNgSVggs1B7pJJDCfcpdvFc_dDrEyCHTomGMZ4FaYHeCc5MvBpeY-GPNCYeSnpJtqeEiVU1rrnHN0WhI43JYW3u9GS_gNMWO6dbM_Tai3E6Kj_xoCVh3KpVlIgRDVQ60U9tBPJRPXjr2Qkf1GeKAWsCyDCcjW62gpgIaeEuovWBljTQ",
      odometer: "210,000 mi",
      status: "Maintenance",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDaVg9P7WrcOTybZu8LJNfjnMpg_VwuEI2b6DHjckhi7mpaQRusTrYBu1uv1pFIUlZRXsq1rgLHinGFn18nDACW_kKA9QxcbIjxS9BhTMQuig6COx3TdkXdCAY1EaBvyGX7xB0OL2LQA7BgHhUivg5D-8YgV9e5isMHWiEmwwBwGOxabzsTmrVNh4GORrrY8_Ns2EzPwyQxaG2Y_DJWrKyN7oaW91ilael6Q5cJHdKZZ6VLSLAXzXY4Bg"
    }
  ]);

  const [maintenanceLogs, setMaintenanceLogs] = useState([
    {
      id: "ML-1",
      vehicle: "Ford Transit T-250",
      regNumber: "V-1042",
      serviceType: "Oil Change & Filter",
      workshop: "Downtown Fleet Auto",
      cost: "$125.00",
      date: "Oct 12, 2023",
      status: "Completed",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAAWhoM80V3fkeDobTdWfUmukCSNjoKc8Vm2f2oCDYltFs2izEnyFH1LU-6TG09doE4ibTk-Ip0M9g1a4PYhFmbicSe-fF5oE1RM6ep4fNd2v_3fp5ldpL7VJt2qJaX9AyXUkLX34lyRXXq_8lFv0lzUq5y_QPaEp1TOCe8hUX-MalMntLh7F_hsmTOVBX9bwSTUDFQDEwnqmLzVBvWM8qx5RJFlxMw6JWXgNRtHXFYdW20xtmgBmQzNg"
    },
    {
      id: "ML-2",
      vehicle: "Freightliner Cascadia",
      regNumber: "H-9011",
      serviceType: "Transmission Overhaul",
      workshop: "Central Heavy Duty",
      cost: "$3,450.00",
      date: "Oct 15, 2023",
      status: "In Shop",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBSPmbOZHyJUbgDXbDrAU4aduAkSJBLY_Cylt_jO1z2tArGiKG4t1T6faEC37igx-JGJcCH-9bSkt2s1Q7ZJ_T_AyKsmEJEHVs3vNPjUwImHxnkYqZf3mgRqyvlDI8zup8vpcQYwa9K-SE3bp8FncxT0_2YsHpCZ1P4htM-ZdO3dYYRGftiHFLIVb8Tu3CCdyudaOSOgaJomvjteltgzYSWNe8blvn-578Gjo3FDNSNtm9stjxDrkSB_A"
    }
  ]);

  const [fuelLogs, setFuelLogs] = useState([
    { vehicle: 'VH-492', date: 'Oct 24, 08:30', litres: '85 L', cost: '$134.50', mileage: '142,500 km', station: 'Shell Express' },
    { vehicle: 'VH-118', date: 'Oct 24, 07:15', litres: '120 L', cost: '$189.20', mileage: '88,320 km', station: 'PetroCanada' },
    { vehicle: 'VH-902', date: 'Oct 23, 16:45', litres: '65 L', cost: '$102.80', mileage: '210,105 km', station: 'Esso' },
    { vehicle: 'VH-334', date: 'Oct 23, 14:20', litres: '90 L', cost: '$142.10', mileage: '54,900 km', station: 'Shell Express' },
    { vehicle: 'VH-551', date: 'Oct 22, 09:10', litres: '110 L', cost: '$173.00', mileage: '112,450 km', station: 'PetroCanada' }
  ]);
  const [expenses, setExpenses] = useState([
    { tripId: '#TR-8921', vehicle: 'VH-118', type: 'Toll Gate', driver: 'Sarah Jenkins', amount: '$45.00', status: 'Approved' },
    { tripId: '#TR-8944', vehicle: 'VH-334', type: 'Emergency Repair', driver: 'Mike Torres', amount: '$320.50', status: 'Pending Approval' },
    { tripId: '#TR-8890', vehicle: 'VH-492', type: 'Parking', driver: 'David Chen', amount: '$18.00', status: 'Approved' },
    { tripId: '#TR-8955', vehicle: 'VH-551', type: 'Weigh Station Fee', driver: 'Anna Smith', amount: '$25.00', status: 'Pending Approval' }
  ]);

  const addVehicle = (vehicle) => {
    setFleetData([...fleetData, { ...vehicle, id: `FL-${fleetData.length + 101}` }]);
  };

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
      isDarkMode, setDarkMode,
      fleetData, setFleetData, addVehicle,
      maintenanceLogs, setMaintenanceLogs,
      fuelLogs, setFuelLogs,
      expenses, setExpenses
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
