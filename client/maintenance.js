let vehicles = [];
let maintenanceLogs = [];
let activeLog = null;

document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Fetch vehicles for dropdown selection
        const vehiclesRes = await fetchWithAuth('/vehicles');
        if (vehiclesRes && vehiclesRes.success) {
            vehicles = vehiclesRes.data;
            const select = document.getElementById('am-vehicle-select');
            vehicles.forEach(v => {
                const opt = document.createElement('option');
                opt.value = v.vehicle_id;
                opt.textContent = `${v.registration_number} (${v.vehicle_name || v.model || 'Unknown'})`;
                select.appendChild(opt);
            });
        }

        // Fetch maintenance logs
        await loadMaintenanceLogs();

        // Bind form submission
        const form = document.getElementById('add-maint-form');
        if (form) {
            form.addEventListener('submit', handleAddMaintenance);
        }

    } catch (err) {
        console.error('Error initializing maintenance page:', err);
    }
});

async function loadMaintenanceLogs() {
    try {
        const res = await fetchWithAuth('/maintenance');
        if (res && res.success) {
            maintenanceLogs = res.data;
            renderMaintenanceTable();
            renderKPIs();
        }
    } catch (err) {
        console.error(err);
    }
}

function renderMaintenanceTable() {
    const tbody = document.getElementById('maintenance-table-body');
    tbody.innerHTML = '';

    if (maintenanceLogs.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" class="py-6 text-center text-on-surface-variant font-body-sm">No maintenance records found.</td></tr>`;
        return;
    }

    maintenanceLogs.forEach((log, index) => {
        const isOdd = index % 2 === 0;
        const rowBg = isOdd ? 'bg-surface-bright' : 'bg-surface-container-lowest';
        
        let statusClass = 'bg-tertiary/10 text-tertiary border border-tertiary/20';
        if (log.status === 'Scheduled') {
            statusClass = 'bg-secondary/10 text-secondary border border-secondary/20';
        } else if (log.status === 'In Progress') {
            statusClass = 'bg-[#F59E0B]/10 text-[#D97706] border border-[#F59E0B]/20';
        } else if (log.status === 'Cancelled') {
            statusClass = 'bg-error/10 text-error border border-error/20';
        }

        const tr = document.createElement('tr');
        tr.className = `${rowBg} border-b border-outline-variant hover:bg-surface-container-low transition-colors group`;
        
        const vehicle = vehicles.find(v => v.vehicle_id === log.vehicle_id) || {};
        const regNum = vehicle.registration_number || log.registration_number || `ID: ${log.vehicle_id}`;
        const vehName = vehicle.vehicle_name || vehicle.model || 'Unknown Vehicle';

        tr.innerHTML = `
            <td class="py-3 px-4 flex items-center gap-3">
                <div class="w-10 h-10 rounded bg-surface-variant flex items-center justify-center overflow-hidden border border-outline-variant">
                    <span class="material-symbols-outlined text-on-surface-variant">build</span>
                </div>
                <div>
                    <div class="font-medium text-on-surface">${vehName}</div>
                    <div class="text-on-surface-variant text-xs">${regNum}</div>
                </div>
            </td>
            <td class="py-3 px-4 text-on-surface">${log.maintenance_type}</td>
            <td class="py-3 px-4 text-on-surface-variant">${log.description || '-'}</td>
            <td class="py-3 px-4 text-on-surface text-right font-medium">${log.cost ? `$${parseFloat(log.cost).toFixed(2)}` : '-'}</td>
            <td class="py-3 px-4 text-on-surface-variant">${new Date(log.scheduled_date).toLocaleDateString()}</td>
            <td class="py-3 px-4">
                <span class="inline-flex items-center px-2 py-1 rounded text-xs font-medium ${statusClass}">
                    ${log.status}
                </span>
            </td>
            <td class="py-3 px-4 text-right">
                <button class="text-secondary hover:text-secondary-container transition-colors font-medium" onclick="viewLogDetails(${log.maintenance_id})">View Details</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function renderKPIs() {
    // 1. Vehicles In Shop count: check active logs whose status is NOT Completed/Cancelled
    const inShop = maintenanceLogs.filter(log => log.is_active && log.status !== 'Completed' && log.status !== 'Cancelled').length;
    document.getElementById('kpi-in-shop').textContent = inShop;

    // 2. Upcoming Services: Scheduled status
    const upcoming = maintenanceLogs.filter(log => log.status === 'Scheduled').length;
    document.getElementById('kpi-upcoming').textContent = upcoming;

    // 3. Completed Services: Completed status
    const completed = maintenanceLogs.filter(log => log.status === 'Completed').length;
    document.getElementById('kpi-completed').textContent = completed;

    // 4. Total Cost: sum of completed costs
    const totalCost = maintenanceLogs
        .filter(log => log.status === 'Completed' && log.cost)
        .reduce((sum, log) => sum + parseFloat(log.cost), 0);
    
    document.getElementById('kpi-cost').textContent = `$${(totalCost / 1000).toFixed(1)}k`;
}

// Global functions for HTML hookups
window.openAddMaintDrawer = function(isLogCompleted) {
    const isCompletedCheckbox = document.getElementById('am-is-completed');
    if (isCompletedCheckbox) {
        isCompletedCheckbox.checked = isLogCompleted;
        // Trigger event listener manually to update fields
        isCompletedCheckbox.dispatchEvent(new Event('change'));
    }
    // Set default scheduled date to today
    document.getElementById('am-scheduled-date').value = new Date().toISOString().split('T')[0];
    toggleAddMaintDrawer();
};

async function handleAddMaintenance(e) {
    e.preventDefault();

    const vehicle_id = parseInt(document.getElementById('am-vehicle-select').value);
    const maintenance_type = document.getElementById('am-type').value;
    const description = document.getElementById('am-description').value;
    const scheduled_date = document.getElementById('am-scheduled-date').value;

    const payload = {
        vehicle_id,
        maintenance_type,
        description,
        scheduled_date
    };

    try {
        const res = await fetchWithAuth('/maintenance', {
            method: 'POST',
            body: JSON.stringify(payload)
        });

        if (res && res.success) {
            const newLog = res.data;
            const isCompleted = document.getElementById('am-is-completed').checked;

            if (isCompleted) {
                const actual_date = document.getElementById('am-actual-date').value;
                const cost = parseFloat(document.getElementById('am-cost').value);

                const closeRes = await fetchWithAuth(`/maintenance/${newLog.maintenance_id}/close`, {
                    method: 'PUT',
                    body: JSON.stringify({ actual_date, cost })
                });

                if (!closeRes || !closeRes.success) {
                    alert(`Maintenance record created but could not be completed: ${closeRes?.message || 'Unknown error'}`);
                }
            }

            toggleAddMaintDrawer();
            document.getElementById('add-maint-form').reset();
            await loadMaintenanceLogs();
        } else {
            alert(res?.message || 'Failed to add maintenance record');
        }

    } catch (err) {
        console.error(err);
        alert('An error occurred while creating maintenance record');
    }
}

window.viewLogDetails = async function(id) {
    try {
        const res = await fetchWithAuth(`/maintenance/${id}`);
        if (res && res.success) {
            const log = res.data;
            activeLog = log;
            
            // Render drawer header
            const vehicle = vehicles.find(v => v.vehicle_id === log.vehicle_id) || {};
            const regNum = vehicle.registration_number || log.registration_number || '';
            const vehModel = vehicle.vehicle_name || vehicle.model || 'Unknown';
            
            // Locate drawer elements or create them dynamically inside body
            const drawer = document.getElementById('maintenance-drawer');
            
            // Header content
            drawer.querySelector('h2').textContent = 'Service Details';
            drawer.querySelector('.text-on-surface-variant').textContent = `${regNum} • ${vehModel}`;

            // Body content: Let's completely render the body inside the scrollable container!
            const bodyContainer = drawer.querySelector('.flex-1.overflow-y-auto');
            
            let statusBadgeClass = 'bg-tertiary/10 text-tertiary border border-tertiary/20';
            if (log.status === 'Scheduled') statusBadgeClass = 'bg-secondary/10 text-secondary border border-secondary/20';
            if (log.status === 'In Progress') statusBadgeClass = 'bg-[#F59E0B]/10 text-[#D97706] border border-[#F59E0B]/20';
            if (log.status === 'Cancelled') statusBadgeClass = 'bg-error/10 text-error border border-error/20';

            let completionSectionHtml = '';
            if (log.status !== 'Completed' && log.status !== 'Cancelled') {
                completionSectionHtml = `
                    <div id="close-maint-section" class="p-4 border border-[#E5E7EB] rounded-xl bg-surface-container-low space-y-3 mt-6">
                        <h4 class="font-semibold text-on-surface text-sm">Close / Complete Service</h4>
                        <form id="close-maint-form" class="space-y-3">
                            <div>
                                <label class="block text-xs font-semibold text-on-surface-variant mb-1">Actual Completion Date *</label>
                                <input required id="cm-actual-date" class="w-full bg-surface-container-lowest border border-[#E5E7EB] rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary" type="date">
                            </div>
                            <div>
                                <label class="block text-xs font-semibold text-on-surface-variant mb-1">Total Service Cost ($) *</label>
                                <input required id="cm-cost" class="w-full bg-surface-container-lowest border border-[#E5E7EB] rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary" placeholder="0.00" type="number" step="any">
                            </div>
                            <button type="submit" class="w-full bg-secondary text-on-primary py-2 rounded-lg text-xs font-semibold hover:opacity-90 transition-opacity">Submit &amp; Restore Vehicle</button>
                        </form>
                    </div>
                `;
            }

            bodyContainer.innerHTML = `
                <div class="space-y-6">
                    <!-- Summary Info -->
                    <div class="grid grid-cols-2 gap-4 bg-surface-bright p-4 rounded-lg border border-outline-variant">
                        <div>
                            <div class="text-xs text-on-surface-variant uppercase font-semibold mb-1">Service Type</div>
                            <div class="font-medium text-on-surface">${log.maintenance_type}</div>
                        </div>
                        <div>
                            <div class="text-xs text-on-surface-variant uppercase font-semibold mb-1">Status</div>
                            <span class="inline-flex items-center px-2 py-1 rounded text-xs font-medium ${statusBadgeClass}">${log.status}</span>
                        </div>
                        <div>
                            <div class="text-xs text-on-surface-variant uppercase font-semibold mb-1">Scheduled Date</div>
                            <div class="text-on-surface">${new Date(log.scheduled_date).toLocaleDateString()}</div>
                        </div>
                        <div>
                            <div class="text-xs text-on-surface-variant uppercase font-semibold mb-1">Cost</div>
                            <div class="font-medium text-on-surface">${log.cost ? `$${parseFloat(log.cost).toFixed(2)}` : 'Not Completed'}</div>
                        </div>
                    </div>

                    <!-- Description -->
                    <div>
                        <h3 class="font-body-md text-body-md font-semibold text-on-surface mb-2">Description / Notes</h3>
                        <div class="text-sm text-on-surface bg-surface-container-low p-3 rounded-md border border-outline-variant">
                            ${log.description || 'No notes provided.'}
                        </div>
                    </div>

                    ${completionSectionHtml}
                </div>
            `;

            // Bind closing form event listener
            if (log.status !== 'Completed' && log.status !== 'Cancelled') {
                document.getElementById('cm-actual-date').value = new Date().toISOString().split('T')[0];
                const closeForm = document.getElementById('close-maint-form');
                closeForm.addEventListener('submit', async (e) => {
                    e.preventDefault();
                    const actual_date = document.getElementById('cm-actual-date').value;
                    const cost = parseFloat(document.getElementById('cm-cost').value);

                    try {
                        const closeRes = await fetchWithAuth(`/maintenance/${log.maintenance_id}/close`, {
                            method: 'PUT',
                            body: JSON.stringify({ actual_date, cost })
                        });

                        if (closeRes && closeRes.success) {
                            toggleDrawer();
                            await loadMaintenanceLogs();
                        } else {
                            alert(closeRes?.message || 'Failed to complete maintenance');
                        }
                    } catch (err) {
                        console.error(err);
                        alert('An error occurred while completing maintenance');
                    }
                });
            }

            toggleDrawer();
        }
    } catch (err) {
        console.error(err);
        alert('Failed to load maintenance details');
    }
};
