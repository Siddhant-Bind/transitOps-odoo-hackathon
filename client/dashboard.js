document.addEventListener('DOMContentLoaded', async () => {
    try {
        const kpiResponse = await fetchWithAuth('/dashboard/kpis');
        if (kpiResponse && kpiResponse.success) {
            const data = kpiResponse.data;
            document.getElementById('kpi-active-vehicles').innerText = data.total_vehicles || data.active_vehicles || 0;
            document.getElementById('kpi-available-vehicles').innerText = data.available_vehicles || 0;
            document.getElementById('kpi-maintenance-vehicles').innerText = data.vehicles_in_maintenance || 0;
            document.getElementById('kpi-active-trips').innerText = data.active_trips || 0;
            document.getElementById('kpi-pending-trips').innerText = data.pending_trips || 0;
            document.getElementById('kpi-drivers-on-duty').innerText = data.drivers_on_duty || 0;
            document.getElementById('kpi-fleet-utilization').innerText = (data.fleet_utilization_percentage || 0) + '%';
        }

        // Fetch Costs for Revenue
        const costsResponse = await fetchWithAuth('/dashboard/costs');
        if (costsResponse && costsResponse.success) {
            const totalRevenue = costsResponse.data.reduce((sum, cost) => sum + Number(cost.revenue_last_30d || 0), 0);
            const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
            document.getElementById('kpi-revenue').innerText = formatter.format(totalRevenue);
        }

        // Fetch Vehicle Status Summary
        const summaryResponse = await fetchWithAuth('/dashboard/vehicle-summary');
        if (summaryResponse && summaryResponse.success) {
            const statuses = summaryResponse.data;
            const total = statuses.reduce((sum, s) => sum + s.count, 0) || 1;
            const colors = {
                'Available': 'bg-tertiary-container',
                'On Trip': 'bg-primary-container',
                'In Shop': 'bg-error',
                'Retired': 'bg-surface-variant'
            };
            
            let barHtml = '';
            let legendHtml = '';
            
            statuses.forEach(s => {
                const percent = Math.round((s.count / total) * 100);
                const colorClass = colors[s.status] || 'bg-surface-variant';
                barHtml += `<div class="${colorClass} h-full" style="width: ${percent}%" title="${s.status}"></div>`;
                
                legendHtml += `
                <div class="flex justify-between items-center text-sm hover-row-transition p-2 rounded -mx-2">
                    <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full ${colorClass}"></div>
                        <span class="text-on-surface font-medium">${s.status}</span>
                    </div>
                    <span class="text-on-surface-variant">${percent}% (${s.count})</span>
                </div>`;
            });
            
            document.getElementById('fleet-status-bar').innerHTML = barHtml;
            document.getElementById('fleet-status-legend').innerHTML = legendHtml;
        }

        // Fetch Trips
        const tripsResponse = await fetchWithAuth('/trips');
        if (tripsResponse && tripsResponse.success) {
            const trips = tripsResponse.data.slice(0, 5); // Just show top 5 recent
            const tbody = document.getElementById('recent-trips-body');
            tbody.innerHTML = ''; // Clear mock data
            
            trips.forEach(trip => {
                let statusClass = 'bg-surface-variant text-on-surface-variant border-outline-variant'; // Pending
                if (trip.status === 'Dispatched') statusClass = 'bg-primary-container/20 text-primary-fixed-dim border-primary-container/30';
                if (trip.status === 'Completed') statusClass = 'bg-tertiary-container/20 text-tertiary border-tertiary-container/30';

                const tr = document.createElement('tr');
                tr.className = 'border-b border-outline-variant/20 hover-row-transition';
                tr.innerHTML = `
                    <td class="p-4 font-medium text-on-surface">#TRP-${trip.trip_id}</td>
                    <td class="p-4">
                        <div class="flex items-center gap-2">
                            <div class="w-8 h-8 bg-surface-variant rounded flex items-center justify-center">
                                <i class="w-4 h-4 text-on-surface-variant" data-lucide="truck"></i>
                            </div>
                            <span class="text-on-surface">${trip.registration_number || 'Unassigned'}</span>
                        </div>
                    </td>
                    <td class="p-4">
                        <div class="flex items-center gap-2">
                            <span class="text-on-surface">${trip.driver_name || 'Unassigned'}</span>
                        </div>
                    </td>
                    <td class="p-4 text-on-surface-variant">${trip.source_location} &rarr; ${trip.destination_location}</td>
                    <td class="p-4">
                        <span class="px-2.5 py-1 ${statusClass} text-xs font-semibold rounded-full border">${trip.status}</span>
                    </td>
                    <td class="p-4 text-right">
                        <button class="text-on-surface-variant hover:text-secondary transition-colors"><i class="w-5 h-5" data-lucide="more-horizontal"></i></button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        }

        // Fetch Top Drivers
        const driversResponse = await fetchWithAuth('/drivers');
        if (driversResponse && driversResponse.success) {
            const drivers = driversResponse.data
                .sort((a, b) => b.safety_score - a.safety_score)
                .slice(0, 3);
                
            const tbody = document.getElementById('top-drivers-body');
            tbody.innerHTML = '';
            
            drivers.forEach(driver => {
                const tr = document.createElement('tr');
                tr.className = 'border-b border-outline-variant/10 hover-row-transition';
                tr.innerHTML = `
                    <td class="py-3">
                        <div class="flex items-center gap-2">
                            <div class="w-6 h-6 rounded-full bg-secondary-container text-on-primary flex items-center justify-center text-[10px] font-bold">
                                ${driver.full_name.charAt(0)}
                            </div>
                            <span class="text-on-surface font-medium text-xs">${driver.full_name}</span>
                        </div>
                    </td>
                    <td class="py-3 text-center text-tertiary font-semibold">${Number(driver.safety_score).toFixed(0)}</td>
                    <td class="py-3 text-right text-on-surface-variant">Available</td>
                `;
                tbody.appendChild(tr);
            });
        }

        // Fetch Upcoming Maintenance & Live Alerts
        const maintenanceResponse = await fetchWithAuth('/maintenance');
        if (maintenanceResponse && maintenanceResponse.success) {
            const upcoming = maintenanceResponse.data
                .filter(m => m.status === 'Scheduled')
                .sort((a, b) => new Date(a.scheduled_date) - new Date(b.scheduled_date))
                .slice(0, 3);
                
            const tbody = document.getElementById('upcoming-maintenance-body');
            tbody.innerHTML = '';
            
            upcoming.forEach(m => {
                const priorityClass = m.cost > 1000 ? 'bg-error-container text-error' : 'bg-primary-container/20 text-primary-fixed-dim';
                const priorityText = m.cost > 1000 ? 'High' : 'Med';
                const tr = document.createElement('tr');
                tr.className = 'border-b border-outline-variant/10 hover-row-transition';
                tr.innerHTML = `
                    <td class="py-3 font-medium text-on-surface text-xs">${m.registration_number || ('Unit #' + m.vehicle_id)}</td>
                    <td class="py-3 text-on-surface-variant text-xs">${new Date(m.scheduled_date).toLocaleDateString()}</td>
                    <td class="py-3 text-right">
                        <span class="px-2 py-0.5 ${priorityClass} text-[10px] font-bold rounded uppercase tracking-wider">${priorityText}</span>
                    </td>
                `;
                tbody.appendChild(tr);
            });

            // Live alerts from active maintenance
            const activeAlerts = maintenanceResponse.data
                .filter(m => m.is_active === 1 && m.status !== 'Completed')
                .slice(0, 3);
            
            const alertsList = document.getElementById('live-alerts-list');
            if (activeAlerts.length > 0) {
                alertsList.innerHTML = '';
                activeAlerts.forEach(m => {
                    alertsList.innerHTML += `
                    <div class="flex gap-3 items-start hover-row-transition p-2 rounded -mx-2">
                        <div class="mt-0.5 w-2 h-2 rounded-full bg-error shrink-0"></div>
                        <div>
                            <p class="text-sm font-medium text-on-surface">${m.maintenance_type}: ${m.registration_number}</p>
                            <p class="text-xs text-on-surface-variant">${m.description}</p>
                            <span class="text-[10px] text-on-surface-variant mt-1 block">Vehicle In Shop</span>
                        </div>
                    </div>`;
                });
            } else {
                alertsList.innerHTML = `<p class="text-sm text-on-surface-variant p-2">No active alerts.</p>`;
            }
        }
        
        lucide.createIcons();

        // --- Init Dashboard Charts ---
        if (typeof Chart !== 'undefined') {
            Chart.defaults.font.family = 'Inter, sans-serif';
            Chart.defaults.color = '#534434';
            Chart.defaults.scale.grid.color = '#e5e7eb';
            const primaryColor = '#855300';
            const primaryContainerColor = '#f59e0b';
            const secondaryColor = '#0058be';
            const tertiaryColor = '#006e2f';
            const errorColor = '#ba1a1a';
            const surfaceColor = '#f9f9ff';

            // 1. Fleet Utilization Trend (Line)
            const ctxFleetTrend = document.getElementById('fleetTrendChart');
            if (ctxFleetTrend) {
                new Chart(ctxFleetTrend.getContext('2d'), {
                    type: 'line',
                    data: {
                        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                        datasets: [{
                            label: 'Utilization %',
                            data: [82, 85, 84, 88, 87, 90, 87], // Mock dynamic trend
                            borderColor: secondaryColor,
                            backgroundColor: 'rgba(0, 88, 190, 0.1)',
                            borderWidth: 2,
                            tension: 0.4,
                            fill: true,
                            pointRadius: 0,
                            pointHoverRadius: 4
                        }]
                    },
                    options: {
                        responsive: true, maintainAspectRatio: false,
                        plugins: { legend: { display: false } },
                        scales: { y: { display: false, min: 50 }, x: { display: false } }
                    }
                });
            }

            // 2. Daily Trips (Bar)
            const ctxDailyTrips = document.getElementById('dailyTripsChart');
            if (ctxDailyTrips) {
                const tripsData = tripsResponse?.success ? tripsResponse.data : [];
                const completed = tripsData.filter(t => t.status === 'Completed').length;
                new Chart(ctxDailyTrips.getContext('2d'), {
                    type: 'bar',
                    data: {
                        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                        datasets: [{
                            label: 'Trips',
                            data: [12, 18, 15, 24, 21, 28, Math.max(completed, 5)], // Last day uses actual
                            backgroundColor: primaryContainerColor,
                            borderRadius: 4
                        }]
                    },
                    options: {
                        responsive: true, maintainAspectRatio: false,
                        plugins: { legend: { display: false } },
                        scales: { y: { display: false }, x: { display: false } }
                    }
                });
            }

            // 3. Fuel Consumption (Line/Area)
            const ctxFuel = document.getElementById('fuelConsumptionChart');
            if (ctxFuel) {
                new Chart(ctxFuel.getContext('2d'), {
                    type: 'line',
                    data: {
                        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                        datasets: [{
                            label: 'Fuel Cost',
                            data: [420, 380, 450, 410],
                            borderColor: primaryContainerColor,
                            backgroundColor: 'rgba(245, 158, 11, 0.1)',
                            borderWidth: 2,
                            tension: 0.4,
                            fill: true,
                            pointRadius: 0
                        }]
                    },
                    options: {
                        responsive: true, maintainAspectRatio: false,
                        plugins: { legend: { display: false } },
                        scales: { y: { display: false }, x: { display: false } }
                    }
                });
            }

            // 4. Maint Distribution (Donut)
            const ctxMaintDist = document.getElementById('maintDistributionChart');
            if (ctxMaintDist) {
                let maintTotal = 0;
                if (maintenanceResponse?.success) {
                    maintenanceResponse.data.forEach(m => maintTotal += parseFloat(m.cost || 0));
                }
                const distTotalEl = document.getElementById('kpi-maint-dist-total');
                if (distTotalEl) distTotalEl.textContent = '$' + (maintTotal > 0 ? (maintTotal / 1000).toFixed(1) + 'K' : '0');

                new Chart(ctxMaintDist.getContext('2d'), {
                    type: 'doughnut',
                    data: {
                        labels: ['Scheduled', 'Active', 'Completed'],
                        datasets: [{
                            data: [40, 25, 35],
                            backgroundColor: [secondaryColor, primaryContainerColor, tertiaryColor],
                            borderWidth: 0,
                            hoverOffset: 4
                        }]
                    },
                    options: {
                        responsive: true, maintainAspectRatio: false, cutout: '75%',
                        plugins: { legend: { display: false } }
                    }
                });
            }
        }

    } catch (error) {
        console.error('Error fetching dashboard data:', error);
    }
});
