let vehicles = [];
let drivers = [];
let activeTrip = null;

document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Fetch vehicles for dropdown and caching
        const vehiclesResponse = await fetchWithAuth('/vehicles');
        if (vehiclesResponse && vehiclesResponse.success) {
            vehicles = vehiclesResponse.data;
            const select = document.getElementById('vehicle-select');
            vehicles.filter(v => v.status === 'Available').forEach(v => {
                const opt = document.createElement('option');
                opt.value = v.vehicle_id;
                opt.textContent = `${v.registration_number} (${v.vehicle_name || v.model || 'Unknown'})`;
                select.appendChild(opt);
            });
        }

        // Fetch drivers for dropdown and caching
        const driversResponse = await fetchWithAuth('/drivers');
        if (driversResponse && driversResponse.success) {
            drivers = driversResponse.data;
            const select = document.getElementById('driver-select');
            drivers.filter(d => d.status === 'Available').forEach(d => {
                const opt = document.createElement('option');
                opt.value = d.driver_id;
                opt.textContent = d.full_name;
                select.appendChild(opt);
            });
        }

        // Fetch trips for Live Board
        const tripsResponse = await fetchWithAuth('/trips');
        if (tripsResponse && tripsResponse.success) {
            const board = document.getElementById('live-board');
            board.innerHTML = '';
            
            tripsResponse.data.forEach(trip => {
                let borderClass = 'border-l-surface-variant';
                let tagClass = 'bg-surface-variant text-on-surface-variant';
                
                if (trip.status === 'Dispatched') {
                    borderClass = 'border-l-secondary';
                    tagClass = 'bg-secondary/10 text-secondary';
                } else if (trip.status === 'Scheduled' || trip.status === 'Pending' || trip.status === 'Draft') {
                    borderClass = 'border-l-tertiary-container';
                    tagClass = 'bg-tertiary-container/10 text-tertiary-container';
                } else if (trip.status === 'Cancelled') {
                    borderClass = 'border-l-error';
                    tagClass = 'bg-error/10 text-error';
                } else if (trip.status === 'Completed') {
                    borderClass = 'border-l-primary-container';
                    tagClass = 'bg-primary-container/10 text-primary-container';
                }

                const div = document.createElement('div');
                div.className = `bg-surface-container-lowest border-l-4 ${borderClass} border-y border-r border-outline-variant rounded-r-lg p-4 shadow-sm hover:shadow-md transition-all cursor-pointer mb-4`;
                
                div.innerHTML = `
                    <div class="flex justify-between items-start mb-2">
                        <span class="${tagClass} px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">${trip.status}</span>
                        <span class="font-label-caps text-label-caps text-on-surface-variant">TRP-${trip.trip_id}</span>
                    </div>
                    <h3 class="font-body-md text-body-md text-on-surface mb-1 ${trip.status === 'Cancelled' ? 'line-through' : ''}">${trip.source_location} ➔ ${trip.destination_location}</h3>
                    <div class="flex items-center gap-2 text-on-surface-variant font-body-sm text-body-sm mb-3">
                        <span class="material-symbols-outlined text-[16px]">person</span> ${trip.driver_name || 'Unassigned'} • ${trip.registration_number || 'No Vehicle'}
                    </div>
                `;
                
                div.addEventListener('click', () => {
                    openTripDetails(trip.trip_id);
                });
                
                board.appendChild(div);
            });
        }

        // Attach listeners for dynamic form validation indicators
        const weightInput = document.getElementById('trip-cargo-weight');
        const vehicleSelect = document.getElementById('vehicle-select');
        const driverSelect = document.getElementById('driver-select');

        if (weightInput) weightInput.addEventListener('input', updateValidations);
        if (vehicleSelect) vehicleSelect.addEventListener('change', updateValidations);
        if (driverSelect) driverSelect.addEventListener('change', updateValidations);

        // Form Submit for Creating & Dispatching Trip
        const tripForm = document.getElementById('trip-form');
        if (tripForm) {
            tripForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                await handleCreateAndMaybeDispatch(true); // true means dispatch immediately
            });
        }
        
        const saveDraftBtn = document.getElementById('btn-save-draft');
        if (saveDraftBtn) {
            saveDraftBtn.addEventListener('click', async () => {
                await handleCreateAndMaybeDispatch(false); // false means create draft (scheduled)
            });
        }

        // Complete Trip Form Submit
        const completeTripForm = document.getElementById('complete-trip-form');
        if (completeTripForm) {
            completeTripForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                if (!activeTrip) return;
                
                const end_odometer = parseFloat(document.getElementById('ct-end-odometer').value);
                const fuel_consumed = parseFloat(document.getElementById('ct-fuel-consumed').value);
                const actual_distance = parseFloat(document.getElementById('ct-actual-distance').value);
                
                const payload = {
                    end_odometer,
                    fuel_consumed,
                    actual_distance
                };
                
                try {
                    const res = await fetchWithAuth(`/trips/${activeTrip.trip_id}/complete`, {
                        method: 'PATCH',
                        body: JSON.stringify(payload)
                    });
                    
                    if (res && res.success) {
                        toggleTripDrawer();
                        window.location.reload();
                    } else {
                        alert(res?.message || 'Failed to complete trip');
                    }
                } catch (error) {
                    console.error(error);
                    alert(error.message || 'An error occurred while completing the trip');
                }
            });
        }

    } catch (error) {
        console.error('Error in initialization:', error);
    }
});

function updateValidations() {
    const weightVal = parseFloat(document.getElementById('trip-cargo-weight').value) || 0;
    const vehicleId = document.getElementById('vehicle-select').value;
    const driverId = document.getElementById('driver-select').value;

    // Capacity Check
    const capIcon = document.getElementById('val-icon-capacity');
    const capLabel = document.getElementById('val-label-capacity');
    if (vehicleId) {
        const vehicle = vehicles.find(v => v.vehicle_id == vehicleId);
        if (vehicle) {
            const maxCap = parseFloat(vehicle.max_load_capacity || 0);
            if (weightVal > 0 && weightVal <= maxCap) {
                capIcon.innerText = 'check_circle';
                capIcon.className = 'material-symbols-outlined text-[#10B981]';
                capLabel.innerText = `Capacity OK (${maxCap} kg max)`;
                capLabel.className = 'font-label-caps text-label-caps text-[#10B981]';
            } else if (weightVal > maxCap) {
                capIcon.innerText = 'error';
                capIcon.className = 'material-symbols-outlined text-[#EF4444]';
                capLabel.innerText = `Overweight (${maxCap} kg max)`;
                capLabel.className = 'font-label-caps text-label-caps text-[#EF4444]';
            } else {
                capIcon.innerText = 'info';
                capIcon.className = 'material-symbols-outlined text-[#3B82F6]';
                capLabel.innerText = `Max: ${maxCap} kg`;
                capLabel.className = 'font-label-caps text-label-caps text-[#3B82F6]';
            }
            
            // Maintenance check
            const maintIcon = document.getElementById('val-icon-maint');
            const maintLabel = document.getElementById('val-label-maint');
            maintIcon.innerText = 'check_circle';
            maintIcon.className = 'material-symbols-outlined text-[#10B981]';
            maintLabel.innerText = 'Maint. Clear';
            maintLabel.className = 'font-label-caps text-label-caps text-[#10B981]';
        }
    } else {
        capIcon.innerText = 'check_circle';
        capIcon.className = 'material-symbols-outlined text-outline-variant';
        capLabel.innerText = 'Capacity check';
        capLabel.className = 'font-label-caps text-label-caps text-on-surface-variant';
        
        const maintIcon = document.getElementById('val-icon-maint');
        const maintLabel = document.getElementById('val-label-maint');
        maintIcon.innerText = 'build_circle';
        maintIcon.className = 'material-symbols-outlined text-outline-variant';
        maintLabel.innerText = 'Maint. check';
        maintLabel.className = 'font-label-caps text-label-caps text-on-surface-variant';
    }

    // Driver & License Check
    const licIcon = document.getElementById('val-icon-license');
    const licLabel = document.getElementById('val-label-license');
    const hrsIcon = document.getElementById('val-icon-hours');
    const hrsLabel = document.getElementById('val-label-hours');
    
    if (driverId) {
        const driver = drivers.find(d => d.driver_id == driverId);
        if (driver) {
            const expiry = new Date(driver.license_expiry_date);
            const today = new Date();
            if (expiry > today) {
                licIcon.innerText = 'check_circle';
                licIcon.className = 'material-symbols-outlined text-[#10B981]';
                licLabel.innerText = 'License Valid';
                licLabel.className = 'font-label-caps text-label-caps text-[#10B981]';
            } else {
                licIcon.innerText = 'error';
                licIcon.className = 'material-symbols-outlined text-[#EF4444]';
                licLabel.innerText = 'License Expired';
                licLabel.className = 'font-label-caps text-label-caps text-[#EF4444]';
            }
            
            hrsIcon.innerText = 'check_circle';
            hrsIcon.className = 'material-symbols-outlined text-[#10B981]';
            hrsLabel.innerText = 'Hours OK';
            hrsLabel.className = 'font-label-caps text-label-caps text-[#10B981]';
        }
    } else {
        licIcon.innerText = 'fact_check';
        licIcon.className = 'material-symbols-outlined text-outline-variant';
        licLabel.innerText = 'License check';
        licLabel.className = 'font-label-caps text-label-caps text-on-surface-variant';
        
        hrsIcon.innerText = 'warning';
        hrsIcon.className = 'material-symbols-outlined text-outline-variant';
        hrsLabel.innerText = 'Hours check';
        hrsLabel.className = 'font-label-caps text-label-caps text-on-surface-variant';
    }
}

async function handleCreateAndMaybeDispatch(shouldDispatch) {
    const source_location = document.getElementById('trip-source').value;
    const destination_location = document.getElementById('trip-destination').value;
    const cargo_weight = parseFloat(document.getElementById('trip-cargo-weight').value);
    const planned_distance = parseFloat(document.getElementById('trip-distance').value);
    const vehicle_id = parseInt(document.getElementById('vehicle-select').value);
    const driver_id = parseInt(document.getElementById('driver-select').value);
    const planned_departure = document.getElementById('trip-departure').value;

    if (!source_location || !destination_location || isNaN(cargo_weight) || isNaN(planned_distance) || !vehicle_id || !driver_id || !planned_departure) {
        alert('Please fill out all required fields');
        return;
    }

    // Custom Capacity check validation
    const vehicle = vehicles.find(v => v.vehicle_id == vehicle_id);
    if (vehicle && cargo_weight > parseFloat(vehicle.max_load_capacity)) {
        alert(`Cannot dispatch: Cargo weight (${cargo_weight} kg) exceeds vehicle's max capacity (${vehicle.max_load_capacity} kg)`);
        return;
    }

    const payload = {
        source_location,
        destination_location,
        cargo_weight,
        planned_distance,
        vehicle_id,
        driver_id,
        planned_departure
    };

    try {
        const createRes = await fetchWithAuth('/trips', {
            method: 'POST',
            body: JSON.stringify(payload)
        });

        if (createRes && createRes.success) {
            const trip = createRes.data;
            if (shouldDispatch) {
                // Instantly call dispatch
                const dispatchRes = await fetchWithAuth(`/trips/${trip.trip_id}/dispatch`, {
                    method: 'PATCH'
                });
                if (dispatchRes && dispatchRes.success) {
                    window.location.reload();
                } else {
                    alert(`Trip created but dispatch failed: ${dispatchRes?.message || 'Unknown error'}`);
                    window.location.reload();
                }
            } else {
                window.location.reload();
            }
        } else {
            alert(createRes?.message || 'Failed to create trip');
        }
    } catch (error) {
        console.error(error);
        alert(error.message || 'An error occurred while creating the trip');
    }
}

window.openTripDetails = async function(tripId) {
    try {
        const response = await fetchWithAuth(`/trips/${tripId}`);
        if (response && response.success) {
            const trip = response.data;
            activeTrip = trip;
            
            document.getElementById('td-status').innerText = trip.status;
            document.getElementById('td-weight').innerText = `${trip.cargo_weight} kg`;
            document.getElementById('td-route').innerText = `${trip.source_location} ➔ ${trip.destination_location}`;
            document.getElementById('td-vehicle').innerText = trip.registration_number ? `${trip.registration_number} (${trip.vehicle_name || ''})` : 'Unassigned';
            document.getElementById('td-driver').innerText = trip.driver_name || 'Unassigned';
            
            const depDate = trip.planned_departure ? new Date(trip.planned_departure).toLocaleString() : 'N/A';
            document.getElementById('td-distance-time').innerText = `${trip.planned_distance} mi • Departs: ${depDate}`;
            
            // Reset actions
            document.getElementById('complete-trip-section').classList.add('hidden');
            document.getElementById('complete-trip-form').reset();
            
            const btnDispatch = document.getElementById('btn-action-dispatch');
            const btnCompleteToggle = document.getElementById('btn-action-complete-toggle');
            const btnCancel = document.getElementById('btn-action-cancel');
            
            btnDispatch.classList.add('hidden');
            btnCompleteToggle.classList.add('hidden');
            btnCancel.classList.add('hidden');
            
            if (trip.status === 'Draft') {
                btnDispatch.classList.remove('hidden');
                btnCancel.classList.remove('hidden');
            } else if (trip.status === 'Dispatched') {
                btnCompleteToggle.classList.remove('hidden');
                btnCancel.classList.remove('hidden');
            }
            
            // Set up button event listeners
            btnDispatch.onclick = async () => {
                const res = await fetchWithAuth(`/trips/${trip.trip_id}/dispatch`, { method: 'PATCH' });
                if (res && res.success) {
                    window.location.reload();
                } else {
                    alert(res?.message || 'Failed to dispatch trip');
                }
            };
            
            btnCancel.onclick = async () => {
                if (confirm('Are you sure you want to cancel this trip?')) {
                    const res = await fetchWithAuth(`/trips/${trip.trip_id}/cancel`, { method: 'PATCH' });
                    if (res && res.success) {
                        window.location.reload();
                    } else {
                        alert(res?.message || 'Failed to cancel trip');
                    }
                }
            };
            
            btnCompleteToggle.onclick = () => {
                const sect = document.getElementById('complete-trip-section');
                sect.classList.toggle('hidden');
                if (!sect.classList.contains('hidden')) {
                    // Populate default/suggested values
                    document.getElementById('ct-actual-distance').value = trip.planned_distance;
                    // Try to guess end odometer
                    if (trip.vehicle_id) {
                        const v = vehicles.find(veh => veh.vehicle_id == trip.vehicle_id);
                        if (v) {
                            document.getElementById('ct-end-odometer').value = Number(v.odometer || 0) + Number(trip.planned_distance || 0);
                        }
                    }
                }
            };
            
            toggleTripDrawer();
        }
    } catch (error) {
        console.error(error);
        alert('Failed to load trip details');
    }
};
