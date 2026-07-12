import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchWithAuth } from '../utils/api';
import { 
  Truck, CheckCircle2, Wrench, Route, Clock, Users, PieChart, DollarSign, 
  Bell, Award, Tool, MoreHorizontal, ChevronRight, Activity 
} from 'lucide-react';

const ExecutiveDashboard = () => {
  const navigate = useNavigate();
  const [kpis, setKpis] = useState({
    active_vehicles: 0,
    available_vehicles: 0,
    vehicles_in_maintenance: 0,
    active_trips: 0,
    pending_trips: 0,
    drivers_on_duty: 0,
    fleet_utilization_percentage: 0
  });
  const [trips, setTrips] = useState([]);
  const [topDrivers, setTopDrivers] = useState([]);
  const [maintenance, setMaintenance] = useState([]);
  const [vehicleSummary, setVehicleSummary] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // Fetch KPIs
        const kpisRes = await fetchWithAuth('/dashboard/kpis');
        if (kpisRes?.success && kpisRes.data) {
          setKpis(kpisRes.data);
        }

        // Fetch recent trips
        const tripsRes = await fetchWithAuth('/trips');
        if (tripsRes?.success && tripsRes.data) {
          setTrips(tripsRes.data.slice(0, 5));
        }

        // Fetch top drivers
        const driversRes = await fetchWithAuth('/drivers');
        if (driversRes?.success && driversRes.data) {
          const sorted = [...driversRes.data]
            .sort((a, b) => Number(b.safety_score || 0) - Number(a.safety_score || 0))
            .slice(0, 3);
          setTopDrivers(sorted);
        }

        // Fetch upcoming maintenance
        const maintRes = await fetchWithAuth('/maintenance');
        if (maintRes?.success && maintRes.data) {
          const scheduled = maintRes.data
            .filter(m => m.status === 'Scheduled')
            .slice(0, 3);
          setMaintenance(scheduled);
        }

        // Fetch vehicle status summary for distribution
        const summaryRes = await fetchWithAuth('/dashboard/vehicle-summary');
        if (summaryRes?.success && summaryRes.data) {
          setVehicleSummary(summaryRes.data);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();

    if (window.lucide && window.lucide.createIcons) {
      window.lucide.createIcons();
    }
  }, []);

  // Calculate today's revenue from completed trips
  const todayRevenue = trips
    .filter(t => t.status === 'Completed')
    .reduce((sum, t) => sum + Number(t.revenue || 0), 0);

  // Status breakdown calculations
  const getStatusCount = (status) => {
    const found = vehicleSummary.find(s => s.status === status);
    return found ? found.count : 0;
  };

  const availableCount = getStatusCount('Available');
  const onTripCount = getStatusCount('On Trip');
  const inShopCount = getStatusCount('In Shop');
  const retiredCount = getStatusCount('Retired');
  const totalVehiclesCount = availableCount + onTripCount + inShopCount + retiredCount || 1;

  const availablePct = Math.round((availableCount / totalVehiclesCount) * 100);
  const onTripPct = Math.round((onTripCount / totalVehiclesCount) * 100);
  const inShopPct = Math.round((inShopCount / totalVehiclesCount) * 100);
  const retiredPct = Math.round((retiredCount / totalVehiclesCount) * 100);

  return (
    <>
      <div className="max-w-container-max mx-auto space-y-stack-lg pb-12">
        <div className="flex justify-between items-end mb-stack-md">
          <div>
            <h2 className="font-section-title text-section-title text-on-surface font-semibold">Executive Command Center</h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 font-medium">Real-time enterprise fleet monitoring</p>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-2 font-medium">
            <span className="w-2 h-2 rounded-full bg-tertiary-container animate-pulse"></span>
            Live sync active
          </p>
        </div>

        {/* 1. KPI Grid (8 Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Active Vehicles */}
          <div className="bg-surface rounded-xl p-5 shadow-sm border border-outline-variant/30 hover-card-transition flex flex-col justify-between h-36">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-secondary-fixed/50 text-secondary">
                  <Truck size={20} />
                </div>
                <span className="font-body-sm text-on-surface-variant font-medium">Active Vehicles</span>
              </div>
            </div>
            <div className="flex items-end justify-between mt-4">
              <div>
                <div className="font-kpi-display text-3xl font-bold text-on-surface">
                  {loading ? '--' : kpis.active_vehicles}
                </div>
                <div className="flex items-center gap-1 text-tertiary-container text-xs font-semibold mt-1">
                  <Activity size={12} />
                  <span>Real-time count</span>
                </div>
              </div>
              <div className="w-16 h-8">
                <svg className="w-full h-full" viewBox="0 0 100 30">
                  <path className="sparkline stroke-tertiary-container" d="M0 25 L20 20 L40 22 L60 10 L80 15 L100 5"></path>
                </svg>
              </div>
            </div>
          </div>

          {/* Available Vehicles */}
          <div className="bg-surface rounded-xl p-5 shadow-sm border border-outline-variant/30 hover-card-transition flex flex-col justify-between h-36">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-tertiary-fixed/30 text-tertiary">
                  <CheckCircle2 size={20} />
                </div>
                <span className="font-body-sm text-on-surface-variant font-medium">Available Vehicles</span>
              </div>
            </div>
            <div className="flex items-end justify-between mt-4">
              <div>
                <div className="font-kpi-display text-3xl font-bold text-on-surface">
                  {loading ? '--' : kpis.available_vehicles}
                </div>
                <div className="flex items-center gap-1 text-tertiary-container text-xs font-semibold mt-1">
                  <Activity size={12} />
                  <span>Ready for dispatch</span>
                </div>
              </div>
              <div className="w-16 h-8">
                <svg className="w-full h-full" viewBox="0 0 100 30">
                  <path className="sparkline stroke-tertiary-container" d="M0 20 L20 25 L40 18 L60 22 L80 15 L100 10"></path>
                </svg>
              </div>
            </div>
          </div>

          {/* Vehicles in Maintenance */}
          <div className="bg-surface rounded-xl p-5 shadow-sm border border-outline-variant/30 hover-card-transition flex flex-col justify-between h-36">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-error-container/50 text-error">
                  <Wrench size={20} />
                </div>
                <span className="font-body-sm text-on-surface-variant font-medium">In Maintenance</span>
              </div>
            </div>
            <div className="flex items-end justify-between mt-4">
              <div>
                <div className="font-kpi-display text-3xl font-bold text-on-surface">
                  {loading ? '--' : kpis.vehicles_in_maintenance}
                </div>
                <div className="flex items-center gap-1 text-error text-xs font-semibold mt-1">
                  <Activity size={12} />
                  <span>Currently in shop</span>
                </div>
              </div>
              <div className="w-16 h-8">
                <svg className="w-full h-full" viewBox="0 0 100 30">
                  <path className="sparkline stroke-error" d="M0 10 L20 15 L40 12 L60 20 L80 25 L100 22"></path>
                </svg>
              </div>
            </div>
          </div>

          {/* Active Trips */}
          <div className="bg-surface rounded-xl p-5 shadow-sm border border-outline-variant/30 hover-card-transition flex flex-col justify-between h-36">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-primary-container/20 text-primary-container">
                  <Route size={20} />
                </div>
                <span className="font-body-sm text-on-surface-variant font-medium">Active Trips</span>
              </div>
            </div>
            <div className="flex items-end justify-between mt-4">
              <div>
                <div className="font-kpi-display text-3xl font-bold text-on-surface">
                  {loading ? '--' : kpis.active_trips}
                </div>
                <div className="flex items-center gap-1 text-tertiary-container text-xs font-semibold mt-1">
                  <Activity size={12} />
                  <span>Dispatched trips</span>
                </div>
              </div>
              <div className="w-16 h-8">
                <svg className="w-full h-full" viewBox="0 0 100 30">
                  <path className="sparkline stroke-primary-container" d="M0 25 L20 18 L40 20 L60 12 L80 15 L100 5"></path>
                </svg>
              </div>
            </div>
          </div>

          {/* Pending Trips */}
          <div className="bg-surface rounded-xl p-5 shadow-sm border border-outline-variant/30 hover-card-transition flex flex-col justify-between h-36">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-surface-variant text-on-surface-variant">
                  <Clock size={20} />
                </div>
                <span className="font-body-sm text-on-surface-variant font-medium">Pending Trips</span>
              </div>
            </div>
            <div className="flex items-end justify-between mt-4">
              <div>
                <div className="font-kpi-display text-3xl font-bold text-on-surface">
                  {loading ? '--' : kpis.pending_trips}
                </div>
                <div className="flex items-center gap-1 text-tertiary-container text-xs font-semibold mt-1">
                  <Activity size={12} />
                  <span>Trips in draft</span>
                </div>
              </div>
              <div className="w-16 h-8">
                <svg className="w-full h-full" viewBox="0 0 100 30">
                  <path className="sparkline stroke-on-surface-variant" d="M0 22 L20 20 L40 25 L60 18 L80 20 L100 15"></path>
                </svg>
              </div>
            </div>
          </div>

          {/* Drivers On Duty */}
          <div className="bg-surface rounded-xl p-5 shadow-sm border border-outline-variant/30 hover-card-transition flex flex-col justify-between h-36">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-secondary-fixed/50 text-secondary">
                  <Users size={20} />
                </div>
                <span className="font-body-sm text-on-surface-variant font-medium">Drivers On Duty</span>
              </div>
            </div>
            <div className="flex items-end justify-between mt-4">
              <div>
                <div className="font-kpi-display text-3xl font-bold text-on-surface">
                  {loading ? '--' : kpis.drivers_on_duty}
                </div>
                <div className="flex items-center gap-1 text-tertiary-container text-xs font-semibold mt-1">
                  <Activity size={12} />
                  <span>Available + On Trip</span>
                </div>
              </div>
              <div className="w-16 h-8">
                <svg className="w-full h-full" viewBox="0 0 100 30">
                  <path className="sparkline stroke-secondary" d="M0 28 L20 20 L40 22 L60 15 L80 18 L100 8"></path>
                </svg>
              </div>
            </div>
          </div>

          {/* Fleet Utilization */}
          <div className="bg-surface rounded-xl p-5 shadow-sm border border-outline-variant/30 hover-card-transition flex flex-col justify-between h-36">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-primary-container/20 text-primary-container">
                  <PieChart size={20} />
                </div>
                <span className="font-body-sm text-on-surface-variant font-medium">Fleet Utilization</span>
              </div>
            </div>
            <div className="flex items-end justify-between mt-4">
              <div>
                <div className="font-kpi-display text-3xl font-bold text-on-surface">
                  {loading ? '--' : `${kpis.fleet_utilization_percentage}%`}
                </div>
                <div className="flex items-center gap-1 text-tertiary-container text-xs font-semibold mt-1">
                  <Activity size={12} />
                  <span>On Trip / Total</span>
                </div>
              </div>
              <div className="w-16 h-8">
                <svg className="w-full h-full" viewBox="0 0 100 30">
                  <path className="sparkline stroke-primary-container" d="M0 20 L20 18 L40 15 L60 12 L80 8 L100 5"></path>
                </svg>
              </div>
            </div>
          </div>

          {/* Today's Revenue */}
          <div className="bg-surface rounded-xl p-5 shadow-sm border border-outline-variant/30 hover-card-transition flex flex-col justify-between h-36">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-tertiary-fixed/30 text-tertiary">
                  <DollarSign size={20} />
                </div>
                <span className="font-body-sm text-on-surface-variant font-medium">Today's Revenue</span>
              </div>
            </div>
            <div className="flex items-end justify-between mt-4">
              <div>
                <div className="font-kpi-display text-3xl font-bold text-on-surface">
                  {loading ? '--' : `$${todayRevenue.toLocaleString()}`}
                </div>
                <div className="flex items-center gap-1 text-tertiary-container text-xs font-semibold mt-1">
                  <Activity size={12} />
                  <span>From completed trips</span>
                </div>
              </div>
              <div className="w-16 h-8">
                <svg className="w-full h-full" viewBox="0 0 100 30">
                  <path className="sparkline stroke-tertiary" d="M0 25 L20 28 L40 15 L60 20 L80 10 L100 2"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <div className="space-y-6">
            {/* Utilization Trend */}
            <div className="bg-surface rounded-xl p-6 shadow-sm border border-outline-variant/30">
              <h3 className="font-body-md font-semibold text-on-surface mb-4">Fleet Utilization Trend</h3>
              <div className="h-64 w-full bg-surface-container-low rounded-lg flex items-center justify-center border border-outline-variant/20 relative overflow-hidden">
                <svg className="w-full h-full px-4" preserveAspectRatio="none" viewBox="0 0 400 200">
                  <line stroke="#dce2f7" strokeDasharray="4" x1="0" x2="400" y1="50" y2="50"></line>
                  <line stroke="#dce2f7" strokeDasharray="4" x1="0" x2="400" y1="100" y2="100"></line>
                  <line stroke="#dce2f7" strokeDasharray="4" x1="0" x2="400" y1="150" y2="150"></line>
                  <path d="M0 160 Q 50 140, 100 150 T 200 120 T 300 80 T 400 40" fill="none" stroke="#2170e4" strokeLinecap="round" strokeWidth="4"></path>
                  <path d="M0 160 Q 50 140, 100 150 T 200 120 T 300 80 T 400 40 L 400 200 L 0 200 Z" fill="url(#blue-gradient)" opacity="0.2"></path>
                  <defs>
                    <linearGradient id="blue-gradient" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#2170e4"></stop>
                      <stop offset="100%" stopColor="#ffffff" stopOpacity="0"></stop>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>

            {/* Daily Trips */}
            <div className="bg-surface rounded-xl p-6 shadow-sm border border-outline-variant/30">
              <h3 className="font-body-md font-semibold text-on-surface mb-4">Daily Trips Completed</h3>
              <div className="h-64 w-full bg-surface-container-low rounded-lg flex items-end justify-around px-4 pt-8 pb-2 border border-outline-variant/20">
                <div className="w-12 h-[40%] bg-primary-container rounded-t-sm"></div>
                <div className="w-12 h-[60%] bg-primary-container rounded-t-sm"></div>
                <div className="w-12 h-[45%] bg-primary-container rounded-t-sm"></div>
                <div className="w-12 h-[80%] bg-primary-container rounded-t-sm"></div>
                <div className="w-12 h-[70%] bg-primary-container rounded-t-sm"></div>
                <div className="w-12 h-[90%] bg-primary-container rounded-t-sm"></div>
                <div className="w-12 h-[85%] bg-primary-container rounded-t-sm"></div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Fuel Consumption */}
            <div className="bg-surface rounded-xl p-6 shadow-sm border border-outline-variant/30">
              <h3 className="font-body-md font-semibold text-on-surface mb-4">Fuel Consumption</h3>
              <div className="h-64 w-full bg-surface-container-low rounded-lg flex items-center justify-center border border-outline-variant/20">
                <svg className="w-full h-full px-4" preserveAspectRatio="none" viewBox="0 0 400 200">
                  <path d="M0 180 Q 80 170, 150 130 T 250 140 T 350 90 L 400 70 L 400 200 L 0 200 Z" fill="#f59e0b" opacity="0.3"></path>
                  <path d="M0 180 Q 80 170, 150 130 T 250 140 T 350 90 L 400 70" fill="none" stroke="#f59e0b" strokeWidth="3"></path>
                </svg>
              </div>
            </div>

            {/* Fleet Status Distribution */}
            <div className="bg-surface rounded-xl shadow-sm border border-outline-variant/30 p-6 flex flex-col">
              <h3 className="font-body-md font-semibold text-on-surface mb-6">Fleet Status Distribution</h3>
              <div className="flex-1 flex flex-col justify-center space-y-6">
                <div className="w-full h-4 rounded-full overflow-hidden flex">
                  <div className="bg-tertiary-container h-full" style={{ width: `${availablePct}%` }} title="Available"></div>
                  <div className="bg-primary-container h-full" style={{ width: `${onTripPct}%` }} title="On Trip"></div>
                  <div className="bg-error h-full" style={{ width: `${inShopPct}%` }} title="Maintenance"></div>
                  <div className="bg-surface-variant h-full" style={{ width: `${retiredPct}%` }} title="Retired"></div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm hover-row-transition p-2 rounded -mx-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-tertiary-container"></div>
                      <span className="text-on-surface font-medium">Available</span>
                    </div>
                    <span className="text-on-surface-variant font-medium">{availablePct}% ({availableCount})</span>
                  </div>
                  <div className="flex justify-between items-center text-sm hover-row-transition p-2 rounded -mx-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-primary-container"></div>
                      <span className="text-on-surface font-medium">On Trip</span>
                    </div>
                    <span className="text-on-surface-variant font-medium">{onTripPct}% ({onTripCount})</span>
                  </div>
                  <div className="flex justify-between items-center text-sm hover-row-transition p-2 rounded -mx-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-error"></div>
                      <span className="text-on-surface font-medium">Maintenance</span>
                    </div>
                    <span className="text-on-surface-variant font-medium">{inShopPct}% ({inShopCount})</span>
                  </div>
                  <div className="flex justify-between items-center text-sm hover-row-transition p-2 rounded -mx-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-surface-variant"></div>
                      <span className="text-on-surface font-medium">Retired/Other</span>
                    </div>
                    <span className="text-on-surface-variant font-medium">{retiredPct}% ({retiredCount})</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Recent Trips, Alerts, and Drivers */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">
          <div className="xl:col-span-2 bg-surface rounded-xl shadow-sm border border-outline-variant/30 overflow-hidden">
            <div className="p-5 border-b border-outline-variant/30 flex justify-between items-center">
              <h3 className="font-body-md font-semibold text-on-surface">Recent Trips</h3>
              <button onClick={() => navigate('/trips')} className="text-secondary text-sm font-semibold hover:underline">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-lowest text-on-surface-variant text-xs uppercase tracking-wider border-b border-outline-variant/30">
                    <th className="p-4 font-semibold">Trip ID</th>
                    <th className="p-4 font-semibold">Vehicle</th>
                    <th className="p-4 font-semibold">Driver</th>
                    <th className="p-4 font-semibold">Route</th>
                    <th className="p-4 font-semibold">Status</th>
                    <th className="p-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-sm font-medium">
                  {loading ? (
                    <tr>
                      <td colSpan="6" className="p-4 text-center text-on-surface-variant">Loading recent trips...</td>
                    </tr>
                  ) : trips.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="p-4 text-center text-on-surface-variant">No recent trips found</td>
                    </tr>
                  ) : (
                    trips.map(trip => (
                      <tr key={trip.trip_id} className="border-b border-outline-variant/20 hover-row-transition">
                        <td className="p-4 font-semibold text-on-surface">{trip.trip_reference}</td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-surface-variant rounded flex items-center justify-center">
                              <Truck size={16} className="text-on-surface-variant" />
                            </div>
                            <span className="text-on-surface">{trip.registration_number || 'Unassigned'}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="text-on-surface">{trip.driver_name || 'Unassigned'}</span>
                        </td>
                        <td className="p-4 text-on-surface-variant">
                          {trip.source_location} &rarr; {trip.destination_location}
                        </td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${
                            trip.status === 'Completed' ? 'bg-tertiary-container/20 text-tertiary border-tertiary-container/30' :
                            trip.status === 'Dispatched' ? 'bg-primary-container/20 text-primary-fixed-dim border-primary-container/30' :
                            'bg-surface-variant text-on-surface-variant border-outline-variant'
                          }`}>
                            {trip.status}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <button onClick={() => navigate('/trips')} className="text-on-surface-variant hover:text-secondary transition-colors">
                            <MoreHorizontal size={20} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-6">
            {/* Top Drivers */}
            <div className="bg-surface rounded-xl shadow-sm border border-outline-variant/30 p-5 flex flex-col h-80">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-body-md font-semibold text-on-surface flex items-center gap-2">
                  <Award size={16} className="text-primary-container" /> Top Drivers
                </h3>
              </div>
              <div className="flex-1 overflow-y-auto">
                <table className="w-full text-left border-collapse text-sm font-medium">
                  <thead>
                    <tr className="text-on-surface-variant text-xs border-b border-outline-variant/20">
                      <th className="pb-2 font-semibold">Driver</th>
                      <th className="pb-2 font-semibold text-center">Score</th>
                      <th className="pb-2 font-semibold text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan="3" className="py-4 text-center text-on-surface-variant">Loading top drivers...</td>
                      </tr>
                    ) : topDrivers.length === 0 ? (
                      <tr>
                        <td colSpan="3" className="py-4 text-center text-on-surface-variant">No drivers found</td>
                      </tr>
                    ) : (
                      topDrivers.map(driver => (
                        <tr key={driver.driver_id} className="border-b border-outline-variant/10 hover-row-transition">
                          <td className="py-3">
                            <span className="text-on-surface font-semibold text-xs">{driver.full_name}</span>
                          </td>
                          <td className="py-3 text-center text-tertiary font-bold">{Math.round(driver.safety_score || 90)}</td>
                          <td className="py-3 text-right text-on-surface-variant text-xs">{driver.status}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Upcoming Maintenance */}
            <div className="bg-surface rounded-xl shadow-sm border border-outline-variant/30 p-5 flex flex-col h-80">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-body-md font-semibold text-on-surface flex items-center gap-2">
                  <Tool size={16} className="text-secondary" /> Upcoming Maintenance
                </h3>
              </div>
              <div className="flex-1 overflow-y-auto">
                <table className="w-full text-left border-collapse text-sm font-medium">
                  <thead>
                    <tr className="text-on-surface-variant text-xs border-b border-outline-variant/20">
                      <th className="pb-2 font-semibold">Vehicle</th>
                      <th className="pb-2 font-semibold">Due Date</th>
                      <th className="pb-2 font-semibold text-right">Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan="3" className="py-4 text-center text-on-surface-variant">Loading maintenance...</td>
                      </tr>
                    ) : maintenance.length === 0 ? (
                      <tr>
                        <td colSpan="3" className="py-4 text-center text-on-surface-variant">No upcoming maintenance</td>
                      </tr>
                    ) : (
                      maintenance.map(maint => (
                        <tr key={maint.log_id} className="border-b border-outline-variant/10 hover-row-transition">
                          <td className="py-3 font-semibold text-on-surface text-xs">{maint.registration_number}</td>
                          <td className="py-3 text-on-surface-variant text-xs">{new Date(maint.scheduled_date).toLocaleDateString()}</td>
                          <td className="py-3 text-right">
                            <span className="px-2 py-0.5 bg-primary-container/20 text-primary-fixed-dim text-[10px] font-bold rounded uppercase tracking-wider">{maint.maintenance_type}</span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExecutiveDashboard;
