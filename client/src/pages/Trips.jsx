import React, { useEffect, useState } from 'react';
import { fetchWithAuth, apiRequest } from '../utils/api';
import { useAppContext } from '../context/AppContext';

const Trips = () => {
  const { refreshAll } = useAppContext();
  const [tripsData, setTripsData] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTrip, setSelectedTrip] = useState(null);

  // Form for new trips
  const [formData, setFormData] = useState({
    source: '',
    destination: '',
    cargoWeight: '',
    distance: '',
    vehicleId: '',
    driverId: ''
  });

  // Form for completing trips
  const [completionForm, setCompletionForm] = useState({
    endOdometer: '',
    fuelConsumed: '',
    actualDistance: ''
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const loadData = async () => {
    try {
      setLoading(true);
      const [tripsRes, vehiclesRes, driversRes] = await Promise.all([
        fetchWithAuth('/trips'),
        fetchWithAuth('/vehicles'),
        fetchWithAuth('/drivers')
      ]);

      if (tripsRes?.success && tripsRes.data) {
        setTripsData(tripsRes.data);
      }
      if (vehiclesRes?.success && vehiclesRes.data) {
        // filter available vehicles
        setVehicles(vehiclesRes.data);
      }
      if (driversRes?.success && driversRes.data) {
        // filter available drivers
        setDrivers(driversRes.data);
      }
    } catch (err) {
      console.error('Error fetching trips screen data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateTrip = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    if (!formData.source || !formData.destination || !formData.cargoWeight || !formData.distance || !formData.vehicleId || !formData.driverId) {
      setErrorMessage("All fields are required to create a trip!");
      return;
    }

    try {
      const payload = {
        trip_reference: `TRIP-${Date.now()}`,
        source_location: formData.source,
        destination_location: formData.destination,
        cargo_weight: Number(formData.cargoWeight),
        planned_distance: Number(formData.distance),
        vehicle_id: Number(formData.vehicleId),
        driver_id: Number(formData.driverId)
      };

      const res = await apiRequest('/trips', 'POST', payload);
      if (res?.success) {
        setSuccessMessage('Draft trip created successfully!');
        setFormData({
          source: '',
          destination: '',
          cargoWeight: '',
          distance: '',
          vehicleId: '',
          driverId: ''
        });
        await loadData();
        await refreshAll();
      }
    } catch (err) {
      setErrorMessage(err.message || 'Failed to create trip');
    }
  };

  const handleDispatch = async (tripId) => {
    setErrorMessage('');
    setSuccessMessage('');
    try {
      const res = await apiRequest(`/trips/${tripId}/dispatch`, 'POST');
      if (res?.success) {
        setSuccessMessage('Trip dispatched successfully!');
        setSelectedTrip(null);
        await loadData();
        await refreshAll();
      }
    } catch (err) {
      setErrorMessage(err.message || 'Failed to dispatch trip');
    }
  };

  const handleComplete = async (tripId) => {
    setErrorMessage('');
    setSuccessMessage('');
    try {
      const payload = {
        end_odometer: Number(completionForm.endOdometer),
        fuel_consumed: Number(completionForm.fuelConsumed),
        actual_distance: Number(completionForm.actualDistance || selectedTrip.planned_distance)
      };

      const res = await apiRequest(`/trips/${tripId}/complete`, 'POST', payload);
      if (res?.success) {
        setSuccessMessage('Trip completed successfully!');
        setSelectedTrip(null);
        setCompletionForm({ endOdometer: '', fuelConsumed: '', actualDistance: '' });
        await loadData();
        await refreshAll();
      }
    } catch (err) {
      setErrorMessage(err.message || 'Failed to complete trip');
    }
  };

  const handleCancel = async (tripId) => {
    setErrorMessage('');
    setSuccessMessage('');
    try {
      const res = await apiRequest(`/trips/${tripId}/cancel`, 'POST');
      if (res?.success) {
        setSuccessMessage('Trip cancelled successfully!');
        setSelectedTrip(null);
        await loadData();
        await refreshAll();
      }
    } catch (err) {
      setErrorMessage(err.message || 'Failed to cancel trip');
    }
  };

  // Filter available items for creation
  const availableVehicles = vehicles.filter(v => v.status === 'Available');
  const availableDrivers = drivers.filter(d => d.status === 'Available');

  return (
    <>
      <div className="flex justify-between items-end mb-4">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface">Trip Dispatch</h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 font-medium">Create, dispatch, and complete delivery routes dynamically.</p>
        </div>
      </div>

      {errorMessage && (
        <div className="bg-error/10 border border-error/20 text-error p-3 rounded-lg font-body-sm mb-4">
          {errorMessage}
        </div>
      )}
      {successMessage && (
        <div className="bg-tertiary-container/10 border border-tertiary-container/20 text-tertiary-container p-3 rounded-lg font-body-sm mb-4">
          {successMessage}
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-gutter">
        {/* Left Side: Create Trip Form */}
        <div className="xl:col-span-7 flex flex-col gap-gutter">
          <div className="bg-surface-container-lowest rounded-xl p-stack-lg border border-outline-variant shadow-sm flex-1">
            <h2 className="font-section-title text-section-title text-on-surface mb-6 border-b border-outline-variant pb-2">New Trip Details</h2>
            <form onSubmit={handleCreateTrip} className="grid grid-cols-2 gap-4">
              <div className="col-span-2 md:col-span-1">
                <label className="block font-label-caps text-label-caps text-on-surface-variant mb-1">Source Location</label>
                <input required name="source" value={formData.source} onChange={handleInputChange} className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-3 py-2 text-body-sm font-body-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-shadow" placeholder="e.g., Warehouse A, Chicago" type="text" />
              </div>
              <div className="col-span-2 md:col-span-1">
                <label className="block font-label-caps text-label-caps text-on-surface-variant mb-1">Destination</label>
                <input required name="destination" value={formData.destination} onChange={handleInputChange} className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-3 py-2 text-body-sm font-body-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-shadow" placeholder="e.g., Distribution Center B, Detroit" type="text" />
              </div>
              <div className="col-span-2 border-t border-outline-variant my-2 pt-4"></div>
              <div className="col-span-2 md:col-span-1">
                <label className="block font-label-caps text-label-caps text-on-surface-variant mb-1">Cargo Weight (kg)</label>
                <input required name="cargoWeight" value={formData.cargoWeight} onChange={handleInputChange} className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-3 py-2 text-body-sm font-body-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-shadow" placeholder="e.g., 450" type="number" />
              </div>
              <div className="col-span-2 md:col-span-1">
                <label className="block font-label-caps text-label-caps text-on-surface-variant mb-1">Estimated Distance (km)</label>
                <input required name="distance" value={formData.distance} onChange={handleInputChange} className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-3 py-2 text-body-sm font-body-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-shadow" placeholder="e.g., 285" type="number" />
              </div>
              <div className="col-span-2 border-t border-outline-variant my-2 pt-4"></div>
              <div className="col-span-2 md:col-span-1">
                <label className="block font-label-caps text-label-caps text-on-surface-variant mb-1">Assign Available Vehicle</label>
                <select required name="vehicleId" value={formData.vehicleId} onChange={handleInputChange} className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-3 py-2 text-body-sm font-body-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary">
                  <option value="">Select a Vehicle</option>
                  {availableVehicles.map(v => (
                    <option key={v.vehicle_id} value={v.vehicle_id}>{v.vehicle_name} ({v.registration_number}) - Cap: {v.max_load_capacity} kg</option>
                  ))}
                </select>
              </div>
              <div className="col-span-2 md:col-span-1">
                <label className="block font-label-caps text-label-caps text-on-surface-variant mb-1">Assign Available Driver</label>
                <select required name="driverId" value={formData.driverId} onChange={handleInputChange} className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-3 py-2 text-body-sm font-body-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary">
                  <option value="">Select a Driver</option>
                  {availableDrivers.map(d => (
                    <option key={d.driver_id} value={d.driver_id}>{d.full_name} (DL: {d.license_category})</option>
                  ))}
                </select>
              </div>
              <div className="col-span-2 flex justify-end gap-3 mt-4">
                <button type="submit" className="px-6 py-2 bg-primary-container text-on-primary-container rounded-lg text-body-sm font-body-sm font-medium hover:opacity-90 transition-opacity">
                  Create Draft Trip
                </button>
              </div>
            </form>
          </div>

          {/* Verification Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-surface/60 backdrop-blur-sm border border-outline-variant rounded-lg p-3 flex flex-col items-center justify-center text-center gap-1 shadow-sm">
              <span className="material-symbols-outlined text-tertiary-container">check_circle</span>
              <span className="font-label-caps text-label-caps text-on-surface-variant">Capacity check</span>
            </div>
            <div className="bg-surface/60 backdrop-blur-sm border border-outline-variant rounded-lg p-3 flex flex-col items-center justify-center text-center gap-1 shadow-sm">
              <span className="material-symbols-outlined text-tertiary-container">build_circle</span>
              <span className="font-label-caps text-label-caps text-on-surface-variant">Maint. Clear</span>
            </div>
            <div className="bg-surface/60 backdrop-blur-sm border border-outline-variant rounded-lg p-3 flex flex-col items-center justify-center text-center gap-1 shadow-sm">
              <span className="material-symbols-outlined text-tertiary-container">check_circle</span>
              <span className="font-label-caps text-label-caps text-on-surface-variant">Status check</span>
            </div>
            <div className="bg-surface/60 backdrop-blur-sm border border-outline-variant rounded-lg p-3 flex flex-col items-center justify-center text-center gap-1 shadow-sm">
              <span className="material-symbols-outlined text-tertiary-container">fact_check</span>
              <span className="font-label-caps text-label-caps text-on-surface-variant">License check</span>
            </div>
          </div>
        </div>

        {/* Right Side: Live Board / Selected Details */}
        <div className="xl:col-span-5 flex flex-col h-[700px]">
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm flex flex-col h-full overflow-hidden">
            <div className="p-4 border-b border-outline-variant bg-surface-container-low flex justify-between items-center">
              <h2 className="font-section-title text-section-title text-on-surface">Live Board</h2>
              <span className="text-xs text-on-surface-variant font-medium">Click a card to manage</span>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background">
              {loading ? (
                <div className="text-center py-8 text-on-surface-variant">Loading trips board...</div>
              ) : tripsData.length === 0 ? (
                <div className="text-center py-8 text-on-surface-variant">No trips recorded. Create one above!</div>
              ) : (
                tripsData.map((trip) => {
                  const isSelected = selectedTrip?.trip_id === trip.trip_id;
                  return (
                    <div 
                      key={trip.trip_id} 
                      onClick={() => setSelectedTrip(trip)}
                      className={`bg-surface-container-lowest border-l-4 ${
                        trip.status === 'Dispatched' ? 'border-l-secondary' : 
                        trip.status === 'Completed' ? 'border-l-tertiary-container' : 
                        trip.status === 'Draft' ? 'border-l-surface-variant opacity-70 hover:opacity-100' : 'border-l-error opacity-60'
                      } ${isSelected ? 'ring-2 ring-primary bg-primary/5' : ''} border-y border-r border-outline-variant rounded-r-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className={`${
                          trip.status === 'Dispatched' ? 'bg-secondary/10 text-secondary' : 
                          trip.status === 'Completed' ? 'bg-tertiary-container/10 text-tertiary-container' : 
                          trip.status === 'Draft' ? 'bg-surface-variant text-on-surface-variant' : 'bg-error/10 text-error'
                        } px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider`}>
                          {trip.status}
                        </span>
                        <span className="font-label-caps text-label-caps text-on-surface-variant">#{trip.trip_reference}</span>
                      </div>
                      <h3 className={`font-body-md text-body-md text-on-surface mb-1 ${trip.status === 'Cancelled' ? 'line-through' : ''}`}>
                        {trip.source_location} ➔ {trip.destination_location}
                      </h3>
                      <div className="flex flex-col gap-1 text-on-surface-variant font-body-sm text-body-sm">
                        <div>Driver: {trip.driver_name || `Driver ID: ${trip.driver_id}`}</div>
                        <div>Vehicle: {trip.registration_number || `Vehicle ID: ${trip.vehicle_id}`}</div>
                        <div>Cargo Weight: {trip.cargo_weight} kg</div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Selected Trip Actions Modal */}
      {selectedTrip && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-surface-dim/50 backdrop-blur-sm" onClick={() => setSelectedTrip(null)}></div>
          <div className="relative bg-surface-container-lowest rounded-xl shadow-lg border border-outline-variant w-full max-w-md p-6 z-10 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-section-title text-xl font-semibold text-on-surface">Manage Trip</h3>
              <button className="text-on-surface-variant hover:text-on-surface" onClick={() => setSelectedTrip(null)}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="bg-surface p-4 rounded-lg border border-outline-variant space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-on-surface-variant">Route</span>
                  <span className="font-semibold">{selectedTrip.source_location} ➔ {selectedTrip.destination_location}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-on-surface-variant">Cargo weight</span>
                  <span className="font-semibold">{selectedTrip.cargo_weight} kg</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-on-surface-variant">Status</span>
                  <span className="font-semibold uppercase text-secondary">{selectedTrip.status}</span>
                </div>
              </div>

              {selectedTrip.status === 'Draft' && (
                <div className="flex flex-col gap-2 pt-2">
                  <button 
                    onClick={() => handleDispatch(selectedTrip.trip_id)}
                    className="w-full py-2 bg-primary text-on-primary rounded-lg font-semibold shadow hover:bg-opacity-95"
                  >
                    Dispatch Now
                  </button>
                  <button 
                    onClick={() => handleCancel(selectedTrip.trip_id)}
                    className="w-full py-2 border border-error text-error rounded-lg font-semibold hover:bg-error/5"
                  >
                    Cancel Trip
                  </button>
                </div>
              )}

              {selectedTrip.status === 'Dispatched' && (
                <div className="space-y-3 pt-2">
                  <div className="text-sm font-semibold text-on-surface">Complete Route Details</div>
                  <div>
                    <label className="block text-xs font-medium text-on-surface-variant mb-1">Final Odometer Reading</label>
                    <input 
                      required 
                      type="number" 
                      value={completionForm.endOdometer} 
                      onChange={e => setCompletionForm({...completionForm, endOdometer: e.target.value})} 
                      className="w-full px-3 py-2 bg-surface border border-outline-variant rounded-lg"
                      placeholder="e.g., 12950" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-on-surface-variant mb-1">Fuel Consumed (Liters)</label>
                    <input 
                      required 
                      type="number" 
                      value={completionForm.fuelConsumed} 
                      onChange={e => setCompletionForm({...completionForm, fuelConsumed: e.target.value})} 
                      className="w-full px-3 py-2 bg-surface border border-outline-variant rounded-lg"
                      placeholder="e.g., 40" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-on-surface-variant mb-1">Actual Distance Covered (km)</label>
                    <input 
                      type="number" 
                      value={completionForm.actualDistance} 
                      onChange={e => setCompletionForm({...completionForm, actualDistance: e.target.value})} 
                      className="w-full px-3 py-2 bg-surface border border-outline-variant rounded-lg"
                      placeholder={selectedTrip.planned_distance} 
                    />
                  </div>
                  
                  <div className="flex flex-col gap-2 pt-2">
                    <button 
                      onClick={() => handleComplete(selectedTrip.trip_id)}
                      className="w-full py-2 bg-primary text-on-primary rounded-lg font-semibold shadow hover:bg-opacity-95"
                    >
                      Complete Route
                    </button>
                    <button 
                      onClick={() => handleCancel(selectedTrip.trip_id)}
                      className="w-full py-2 border border-error text-error rounded-lg font-semibold hover:bg-error/5"
                    >
                      Cancel Trip
                    </button>
                  </div>
                </div>
              )}

              {selectedTrip.status === 'Completed' && (
                <div className="text-center py-4 text-sm text-on-surface-variant">
                  This trip has been completed successfully and cannot be altered.
                </div>
              )}

              {selectedTrip.status === 'Cancelled' && (
                <div className="text-center py-4 text-sm text-error">
                  This trip was cancelled.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Trips;
