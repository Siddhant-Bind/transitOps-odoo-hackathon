let vehicles = [];
let trips = [];
let fuelLogs = [];
let expenses = [];
let maintenanceLogs = [];

document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Fetch vehicles
        const vehiclesRes = await fetchWithAuth('/vehicles');
        if (vehiclesRes && vehiclesRes.success) {
            vehicles = vehiclesRes.data;
            populateVehicleSelects();
        }

        // Fetch trips
        const tripsRes = await fetchWithAuth('/trips');
        if (tripsRes && tripsRes.success) {
            trips = tripsRes.data;
            populateTripSelects();
        }

        // Load logs and metrics
        await loadAllData();

        // Bind form submissions
        document.getElementById('add-fuel-form').addEventListener('submit', handleAddFuel);
        document.getElementById('add-expense-form').addEventListener('submit', handleAddExpense);

    } catch (err) {
        console.error('Error initializing fuel & expense page:', err);
    }
});

function populateVehicleSelects() {
    const fSelect = document.getElementById('af-vehicle-select');
    const eSelect = document.getElementById('ae-vehicle-select');
    
    // Clear
    fSelect.innerHTML = '<option value="">Choose a vehicle</option>';
    eSelect.innerHTML = '<option value="">Choose a vehicle</option>';

    vehicles.forEach(v => {
        const text = `${v.registration_number} (${v.vehicle_name || v.model || 'Unknown'})`;
        
        const opt1 = document.createElement('option');
        opt1.value = v.vehicle_id;
        opt1.textContent = text;
        fSelect.appendChild(opt1);

        const opt2 = document.createElement('option');
        opt2.value = v.vehicle_id;
        opt2.textContent = text;
        eSelect.appendChild(opt2);
    });
}

function populateTripSelects() {
    const fSelect = document.getElementById('af-trip-select');
    const eSelect = document.getElementById('ae-trip-select');

    fSelect.innerHTML = '<option value="">None</option>';
    eSelect.innerHTML = '<option value="">None</option>';

    trips.forEach(t => {
        const text = `Trip #${t.trip_id} (Vehicle: ${t.registration_number || t.vehicle_id})`;
        
        const opt1 = document.createElement('option');
        opt1.value = t.trip_id;
        opt1.textContent = text;
        fSelect.appendChild(opt1);

        const opt2 = document.createElement('option');
        opt2.value = t.trip_id;
        opt2.textContent = text;
        eSelect.appendChild(opt2);
    });
}

async function loadAllData() {
    try {
        // Fetch fuel logs
        const fuelRes = await fetchWithAuth('/fuel');
        if (fuelRes && fuelRes.success) {
            fuelLogs = fuelRes.data;
        }

        // Fetch expenses
        const expenseRes = await fetchWithAuth('/expenses');
        if (expenseRes && expenseRes.success) {
            expenses = expenseRes.data;
        }

        // Fetch maintenance logs for KPI total cost calculation
        const maintRes = await fetchWithAuth('/maintenance');
        if (maintRes && maintRes.success) {
            maintenanceLogs = maintRes.data;
        }

        renderFuelTable();
        renderExpenseTable();
        renderKPIs();
        renderBreakdown();

    } catch (err) {
        console.error('Error fetching logs:', err);
    }
}

function renderFuelTable() {
    const tbody = document.getElementById('fuel-table-body');
    tbody.innerHTML = '';

    if (fuelLogs.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="px-stack-lg py-4 text-center text-on-surface-variant">No fuel logs recorded.</td></tr>`;
        return;
    }

    // Limit to latest 10
    const displayLogs = fuelLogs.slice(0, 10);

    displayLogs.forEach(log => {
        const vehicle = vehicles.find(v => v.vehicle_id === log.vehicle_id) || {};
        const regNum = vehicle.registration_number || log.registration_number || `VH-${log.vehicle_id}`;
        
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="px-stack-lg py-3 font-medium text-on-surface">${regNum}</td>
            <td class="px-stack-lg py-3 text-on-surface-variant">${new Date(log.fuel_date).toLocaleDateString()}</td>
            <td class="px-stack-lg py-3">${parseFloat(log.fuel_liters).toFixed(1)} L</td>
            <td class="px-stack-lg py-3 font-medium">$${parseFloat(log.fuel_cost).toFixed(2)}</td>
            <td class="px-stack-lg py-3 text-on-surface-variant">${log.odometer_reading ? parseFloat(log.odometer_reading).toLocaleString() + ' km' : '-'}</td>
            <td class="px-stack-lg py-3 text-on-surface-variant">${log.station_name || 'Generic Station'}</td>
        `;
        tbody.appendChild(tr);
    });
}

function renderExpenseTable() {
    const tbody = document.getElementById('expenses-table-body');
    tbody.innerHTML = '';

    if (expenses.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" class="px-stack-lg py-4 text-center text-on-surface-variant">No expenses logged.</td></tr>`;
        return;
    }

    expenses.forEach(exp => {
        const vehicle = vehicles.find(v => v.vehicle_id === exp.vehicle_id) || {};
        const regNum = vehicle.registration_number || exp.registration_number || `VH-${exp.vehicle_id}`;

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="px-stack-lg py-3 font-medium text-on-surface">${exp.trip_id ? `#TR-${exp.trip_id}` : '-'}</td>
            <td class="px-stack-lg py-3 text-on-surface-variant">${regNum}</td>
            <td class="px-stack-lg py-3">${exp.expense_type}</td>
            <td class="px-stack-lg py-3 text-on-surface-variant">${exp.description || '-'}</td>
            <td class="px-stack-lg py-3 font-medium">$${parseFloat(exp.amount).toFixed(2)}</td>
            <td class="px-stack-lg py-3">
                <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-tertiary-container/10 text-tertiary">Approved</span>
            </td>
            <td class="px-stack-lg py-3 text-right">
                <button onclick="deleteExpenseRecord(${exp.expense_id})" class="text-error hover:text-red-700 transition-colors font-medium">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function renderKPIs() {
    // 1. Total Fuel Consumed
    const totalLiters = fuelLogs.reduce((sum, log) => sum + parseFloat(log.fuel_liters), 0);
    document.getElementById('kpi-fuel-liters').innerHTML = `${totalLiters.toLocaleString(undefined, {maximumFractionDigits: 1})} <span class="text-body-md text-on-surface-variant font-medium">L</span>`;

    // 2. Total Fuel Cost
    const totalFuelCost = fuelLogs.reduce((sum, log) => sum + parseFloat(log.fuel_cost), 0);
    document.getElementById('kpi-fuel-cost').textContent = `$${totalFuelCost.toLocaleString(undefined, {maximumFractionDigits: 2})}`;

    // 3. Operational Cost (Fuel + Other Expenses + Completed Maintenance)
    const totalOtherExpenses = expenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0);
    const totalMaintCost = maintenanceLogs
        .filter(log => log.status === 'Completed' && log.cost)
        .reduce((sum, log) => sum + parseFloat(log.cost), 0);
    
    const operationalCost = totalFuelCost + totalOtherExpenses + totalMaintCost;
    document.getElementById('kpi-total-expenses').textContent = `$${operationalCost.toLocaleString(undefined, {maximumFractionDigits: 2})}`;

    // 4. Avg Cost / KM
    // Let's sum up total distance from completed trips
    const totalDistance = trips
        .filter(t => t.status === 'Completed' && t.distance)
        .reduce((sum, t) => sum + parseFloat(t.distance), 0);

    let avgCostPerKm = 0.42; // default fallback if no distance
    if (totalDistance > 0) {
        avgCostPerKm = (totalFuelCost + totalOtherExpenses) / totalDistance;
    }
    document.getElementById('kpi-cost-per-mile').textContent = `$${avgCostPerKm.toFixed(2)}`;
}

function renderBreakdown() {
    const totalFuelCost = fuelLogs.reduce((sum, log) => sum + parseFloat(log.fuel_cost), 0);
    const totalOtherExpenses = expenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0);
    const totalMaintCost = maintenanceLogs
        .filter(log => log.status === 'Completed' && log.cost)
        .reduce((sum, log) => sum + parseFloat(log.cost), 0);

    const grandTotal = totalFuelCost + totalOtherExpenses + totalMaintCost;

    if (grandTotal === 0) return;

    const fuelPct = ((totalFuelCost / grandTotal) * 100).toFixed(0);
    const maintPct = ((totalMaintCost / grandTotal) * 100).toFixed(0);
    const otherPct = ((totalOtherExpenses / grandTotal) * 100).toFixed(0);

    // Find and update breakdown items
    const parent = document.querySelector('.bg-surface-container-lowest.border.border-outline-variant.rounded-xl.shadow-\\[0_4px_6px_-1px_rgba\\(0\\,0\\,0\\,0\\.05\\)\\,0_2px_4px_-1px_rgba\\(0\\,0\\,0\\,0\\.03\\)\\]\\ p-stack-lg');
    if (parent) {
        parent.innerHTML = `
            <h3 class="font-section-title text-section-title text-on-surface mb-6">Cost Breakdown</h3>
            <div class="space-y-6">
                <!-- Fuel Item -->
                <div>
                    <div class="flex justify-between items-center mb-2">
                        <div class="flex items-center gap-2">
                            <div class="w-3 h-3 rounded-full bg-secondary"></div>
                            <span class="font-body-md text-on-surface">Fuel Cost</span>
                        </div>
                        <span class="font-medium">$${totalFuelCost.toLocaleString(undefined, {maximumFractionDigits: 2})}</span>
                    </div>
                    <div class="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                        <div class="bg-secondary h-full rounded-full" style="width: ${fuelPct}%"></div>
                    </div>
                </div>
                <!-- Maintenance Item -->
                <div>
                    <div class="flex justify-between items-center mb-2">
                        <div class="flex items-center gap-2">
                            <div class="w-3 h-3 rounded-full bg-primary-container"></div>
                            <span class="font-body-md text-on-surface">Maintenance</span>
                        </div>
                        <span class="font-medium">$${totalMaintCost.toLocaleString(undefined, {maximumFractionDigits: 2})}</span>
                    </div>
                    <div class="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                        <div class="bg-primary-container h-full rounded-full" style="width: ${maintPct}%"></div>
                    </div>
                </div>
                <!-- Tolls/Other Item -->
                <div>
                    <div class="flex justify-between items-center mb-2">
                        <div class="flex items-center gap-2">
                            <div class="w-3 h-3 rounded-full bg-tertiary-container"></div>
                            <span class="font-body-md text-on-surface">Tolls &amp; Other</span>
                        </div>
                        <span class="font-medium">$${totalOtherExpenses.toLocaleString(undefined, {maximumFractionDigits: 2})}</span>
                    </div>
                    <div class="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                        <div class="bg-tertiary-container h-full rounded-full" style="width: ${otherPct}%"></div>
                    </div>
                </div>
            </div>
        `;
    }
}

async function handleAddFuel(e) {
    e.preventDefault();

    const vehicle_id = parseInt(document.getElementById('af-vehicle-select').value);
    const tripVal = document.getElementById('af-trip-select').value;
    const trip_id = tripVal ? parseInt(tripVal) : null;
    const fuel_date = document.getElementById('af-date').value;
    const fuel_liters = parseFloat(document.getElementById('af-liters').value);
    const fuel_cost = parseFloat(document.getElementById('af-cost').value);
    const odometer_reading = parseFloat(document.getElementById('af-odometer').value);

    const payload = {
        vehicle_id,
        trip_id,
        fuel_date,
        fuel_liters,
        fuel_cost,
        odometer_reading
    };

    try {
        const res = await fetchWithAuth('/fuel', {
            method: 'POST',
            body: JSON.stringify(payload)
        });

        if (res && res.success) {
            toggleAddFuelDrawer(false);
            document.getElementById('add-fuel-form').reset();
            await loadAllData();
        } else {
            alert(res?.message || 'Failed to record fuel log');
        }
    } catch (err) {
        console.error(err);
        alert('An error occurred while logging fuel');
    }
}

async function handleAddExpense(e) {
    e.preventDefault();

    const vehicle_id = parseInt(document.getElementById('ae-vehicle-select').value);
    const tripVal = document.getElementById('ae-trip-select').value;
    const trip_id = tripVal ? parseInt(tripVal) : null;
    const expense_type = document.getElementById('ae-type').value;
    const expense_date = document.getElementById('ae-date').value;
    const amount = parseFloat(document.getElementById('ae-amount').value);
    const description = document.getElementById('ae-description').value;

    const payload = {
        vehicle_id,
        trip_id,
        expense_type,
        expense_date,
        amount,
        description
    };

    try {
        const res = await fetchWithAuth('/expenses', {
            method: 'POST',
            body: JSON.stringify(payload)
        });

        if (res && res.success) {
            toggleAddExpenseDrawer(false);
            document.getElementById('add-expense-form').reset();
            await loadAllData();
        } else {
            alert(res?.message || 'Failed to save expense');
        }
    } catch (err) {
        console.error(err);
        alert('An error occurred while logging expense');
    }
}

window.deleteExpenseRecord = async function(id) {
    if (!confirm('Are you sure you want to delete this expense?')) return;
    try {
        const res = await fetchWithAuth(`/expenses/${id}`, {
            method: 'DELETE'
        });
        if (res && res.success) {
            await loadAllData();
        } else {
            alert(res?.message || 'Failed to delete expense');
        }
    } catch (err) {
        console.error(err);
        alert('An error occurred while deleting expense');
    }
};
