document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetchWithAuth('/vehicles');
        if (response && response.success) {
            const vehicles = response.data;
            const tbody = document.getElementById('fleet-table-body');
            tbody.innerHTML = '';
            
            vehicles.forEach((vehicle, index) => {
                const tr = document.createElement('tr');
                tr.className = `border-b border-outline-variant hover:bg-surface-container-low transition-colors group cursor-pointer ${index % 2 !== 0 ? 'bg-surface-bright' : ''}`;
                tr.onclick = () => openVehicleDrawer(vehicle);

                let statusClass = '';
                let statusLabel = vehicle.status;
                if (vehicle.status === 'Available') {
                    statusClass = 'bg-tertiary-container/10 text-tertiary-container border-tertiary-container/20';
                } else if (vehicle.status === 'On Trip') {
                    statusClass = 'bg-primary-container/10 text-primary-container border-primary-container/20';
                } else if (vehicle.status === 'In Shop') {
                    statusClass = 'bg-error/10 text-error border-error/20';
                    statusLabel = 'Maintenance';
                } else {
                    statusClass = 'bg-surface-variant text-on-surface border-outline-variant';
                }

                let dotClass = 'bg-outline-variant';
                if (vehicle.status === 'Available') dotClass = 'bg-tertiary-container';
                else if (vehicle.status === 'On Trip') dotClass = 'bg-primary-container';
                else if (vehicle.status === 'In Shop') dotClass = 'bg-error';

                tr.innerHTML = `
                    <td class="py-3 px-4">
                        <div class="flex items-center gap-3">
                            <div class="w-12 h-10 rounded bg-surface-container border border-outline-variant flex items-center justify-center overflow-hidden">
                                <span class="material-symbols-outlined text-on-surface-variant">directions_car</span>
                            </div>
                            <div>
                                <div class="font-medium text-on-surface">${vehicle.vehicle_name} ${vehicle.model}</div>
                                <div class="text-on-surface-variant text-xs mt-0.5">${vehicle.vehicle_type || 'Vehicle'}</div>
                            </div>
                        </div>
                    </td>
                    <td class="py-3 px-4 text-on-surface font-medium">${vehicle.registration_number}</td>
                    <td class="py-3 px-4 text-on-surface-variant">${vehicle.max_load_capacity || 'N/A'} kg</td>
                    <td class="py-3 px-4">
                        <div class="text-on-surface-variant italic text-xs">Unassigned</div>
                    </td>
                    <td class="py-3 px-4 text-on-surface-variant">${Number(vehicle.odometer || 0).toLocaleString()} mi</td>
                    <td class="py-3 px-4">
                        <span class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${statusClass}">
                            <span class="w-1.5 h-1.5 rounded-full ${dotClass} mr-1.5"></span>
                            ${statusLabel}
                        </span>
                    </td>
                    <td class="py-3 px-4 text-right">
                        <button class="p-1.5 text-on-surface-variant hover:text-primary hover:bg-primary-fixed/20 rounded-md transition-colors btn-view-details" title="View Details">
                            <span class="material-symbols-outlined" style="font-size: 20px;">visibility</span>
                        </button>
                        <button class="p-1.5 text-on-surface-variant hover:text-secondary hover:bg-secondary-fixed/20 rounded-md transition-colors btn-edit-vehicle" title="Edit">
                            <span class="material-symbols-outlined" style="font-size: 20px;">edit</span>
                        </button>
                    </td>
                `;
                
                // Add event listeners with stopPropagation to handle row clicking properly
                tr.querySelector('.btn-view-details').addEventListener('click', (e) => {
                    e.stopPropagation();
                    openVehicleDrawer(vehicle);
                });
                tr.querySelector('.btn-edit-vehicle').addEventListener('click', (e) => {
                    e.stopPropagation();
                    openEditVehicleModal(vehicle);
                });

                tbody.appendChild(tr);
            });
            
            document.getElementById('total-vehicles').innerText = vehicles.length;
            document.getElementById('showing-start').innerText = vehicles.length > 0 ? 1 : 0;
            document.getElementById('showing-end').innerText = vehicles.length;
        }
    } catch (error) {
        console.error('Error fetching vehicles:', error);
    }
});

function openVehicleDrawer(vehicle) {
    const title = document.getElementById('slide-over-title');
    if (title) title.innerText = `${vehicle.vehicle_name} ${vehicle.model} (${vehicle.registration_number})`;
    
    const sub = document.querySelector('#drawerPanel p.font-body-sm');
    if (sub) sub.innerText = `${vehicle.vehicle_type || 'Vehicle'} • ${vehicle.max_load_capacity || 'N/A'} kg`;
    
    // Update Odometer in drawer
    const odometerEls = document.querySelectorAll('#drawerPanel .font-kpi-display');
    if (odometerEls[0]) odometerEls[0].innerHTML = `${Number(vehicle.odometer || 0).toLocaleString()} <span class="text-lg text-on-surface-variant font-normal">mi</span>`;
    
    const editBtn = document.getElementById('edit-vehicle-btn-drawer');
    if (editBtn) {
        editBtn.onclick = () => {
            toggleDrawer(); // Close details drawer
            openEditVehicleModal(vehicle); // Open edit drawer
        };
    }
    
    toggleDrawer();
}

window.openAddVehicleModal = function() {
    const form = document.getElementById('vehicle-form');
    if (form) form.reset();
    document.getElementById('v-id').value = '';
    document.getElementById('v-reg-number').disabled = false;
    document.getElementById('add-vehicle-drawer-title').innerText = 'Add New Vehicle';
    document.getElementById('add-vehicle-drawer-subtitle').innerText = 'Register a new vehicle in the fleet registry.';
    toggleAddVehicleDrawer();
};

window.openEditVehicleModal = function(vehicle) {
    document.getElementById('v-id').value = vehicle.id;
    document.getElementById('v-reg-number').value = vehicle.registration_number;
    document.getElementById('v-reg-number').disabled = true; // Disable registration number editing
    document.getElementById('v-name').value = vehicle.vehicle_name;
    document.getElementById('v-model').value = vehicle.model;
    document.getElementById('v-type').value = vehicle.vehicle_type;
    document.getElementById('v-capacity').value = vehicle.max_load_capacity;
    document.getElementById('v-odometer').value = vehicle.odometer;
    document.getElementById('v-cost').value = vehicle.acquisition_cost || 0;
    document.getElementById('v-status').value = vehicle.status;
    document.getElementById('v-region').value = vehicle.region || '';
    
    document.getElementById('add-vehicle-drawer-title').innerText = 'Edit Vehicle';
    document.getElementById('add-vehicle-drawer-subtitle').innerText = 'Update details of vehicle: ' + vehicle.registration_number;
    toggleAddVehicleDrawer();
};

document.addEventListener('DOMContentLoaded', () => {
    const vehicleForm = document.getElementById('vehicle-form');
    if (vehicleForm) {
        vehicleForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const id = document.getElementById('v-id').value;
            const registration_number = document.getElementById('v-reg-number').value;
            const vehicle_name = document.getElementById('v-name').value;
            const model = document.getElementById('v-model').value;
            const vehicle_type = document.getElementById('v-type').value;
            const max_load_capacity = parseFloat(document.getElementById('v-capacity').value);
            const odometer = parseFloat(document.getElementById('v-odometer').value);
            const acquisition_cost = parseFloat(document.getElementById('v-cost').value);
            const status = document.getElementById('v-status').value;
            const region = document.getElementById('v-region').value;

            const payload = {
                vehicle_name,
                model,
                vehicle_type,
                max_load_capacity,
                odometer,
                acquisition_cost,
                status,
                region
            };

            let response;
            try {
                if (id) {
                    // Update
                    response = await fetchWithAuth(`/vehicles/${id}`, {
                        method: 'PUT',
                        body: JSON.stringify(payload)
                    });
                } else {
                    // Create (needs registration_number)
                    payload.registration_number = registration_number;
                    response = await fetchWithAuth('/vehicles', {
                        method: 'POST',
                        body: JSON.stringify(payload)
                    });
                }

                if (response && response.success) {
                    toggleAddVehicleDrawer();
                    // Reload the page list
                    window.location.reload();
                } else {
                    alert(response?.message || 'Failed to save vehicle');
                }
            } catch (error) {
                console.error(error);
                alert('An error occurred while saving the vehicle');
            }
        });
    }
});
