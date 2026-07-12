document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Fetch Operational Costs
        const opCostRes = await fetchWithAuth('/reports/operational-cost');
        let totalCost = 0;
        let totalRev = 0;
        if (opCostRes && opCostRes.success) {
            opCostRes.data.forEach(item => {
                totalCost += parseFloat(item.total_operating_cost || 0);
                totalRev += parseFloat(item.revenue_last_30d || 0);
            });
            document.getElementById('kpi-op-cost').textContent = '$' + (totalCost / 1000).toFixed(1) + 'K';
            document.getElementById('kpi-revenue').textContent = '$' + (totalRev / 1000).toFixed(1) + 'K';
            document.getElementById('kpi-net-profit').textContent = '$' + ((totalRev - totalCost) / 1000).toFixed(1) + 'K';
        }

        // Fetch Fleet Utilization for Total Trips
        const fleetRes = await fetchWithAuth('/reports/fleet-utilization');
        let totalTrips = 0;
        if (fleetRes && fleetRes.success) {
            fleetRes.data.forEach(item => {
                totalTrips += parseInt(item.total_trips || 0);
            });
            document.getElementById('kpi-total-trips').textContent = totalTrips.toLocaleString();
            
            // Calculate Cost per Trip
            const costPerTrip = totalTrips > 0 ? totalCost / totalTrips : 0;
            const avgCostEl = document.getElementById('kpi-avg-cost');
            if (avgCostEl) avgCostEl.textContent = '$' + costPerTrip.toFixed(0);
        }

        // Fetch Fuel Efficiency
        const fuelRes = await fetchWithAuth('/reports/fuel-efficiency');
        if (fuelRes && fuelRes.success) {
            let totalKmPerLiter = 0;
            let validVehicles = 0;
            fuelRes.data.forEach(item => {
                if (item.km_per_liter) {
                    totalKmPerLiter += parseFloat(item.km_per_liter);
                    validVehicles++;
                }
            });
            const avgKpl = validVehicles > 0 ? totalKmPerLiter / validVehicles : 0;
            // Convert km/l to mpg approx (km/l * 2.35215)
            const avgMpg = avgKpl * 2.35215;
            document.getElementById('kpi-fuel-efficiency').innerHTML = `${avgMpg.toFixed(1)} <span class="text-lg text-on-surface-variant">MPG</span>`;
        }
        
        // Fetch Dashboard KPIs for Fleet Utilization percentage
        const dashboardKpiRes = await fetchWithAuth('/dashboard/kpis');
        if (dashboardKpiRes && dashboardKpiRes.success && dashboardKpiRes.data) {
            const utilization = dashboardKpiRes.data.fleet_utilization_percentage || 0;
            document.getElementById('kpi-utilization').textContent = `${utilization}%`;
        }

        // Fetch ROI
        const roiRes = await fetchWithAuth('/reports/roi');
        if (roiRes && roiRes.success) {
            let totalInvestment = 0;
            roiRes.data.forEach(item => {
                totalInvestment += parseFloat(item.total_cost_of_ownership || item.total_investment || 0);
            });
            const roiPercent = totalInvestment > 0 ? ((totalRev - totalCost) / totalInvestment) * 100 : 0;
            document.getElementById('kpi-roi').textContent = `${roiPercent.toFixed(1)}%`;
        }

        async function downloadReport(reportType) {
            const token = localStorage.getItem('token');
            if (!token) return;
            try {
                const response = await fetch(`http://localhost:8000/api/reports/export?report=${reportType}`, {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                });
                if (!response.ok) throw new Error('Failed to export');
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${reportType}_report_${new Date().toISOString().split('T')[0]}.csv`;
                document.body.appendChild(a);
                a.click();
                a.remove();
                window.URL.revokeObjectURL(url);
            } catch (err) {
                console.error(err);
                alert('Failed to download report');
            }
        }

        const btnExportCsv = document.getElementById('btn-export-csv');
        if (btnExportCsv) {
            btnExportCsv.addEventListener('click', () => downloadReport('costs'));
        }

        const btnExportPdf = document.querySelector('button[title="Export PDF"]');
        if (btnExportPdf) {
            btnExportPdf.addEventListener('click', () => downloadReport('roi'));
        }

        const btnExportExcel = document.querySelector('button[title="Export Excel"]');
        if (btnExportExcel) {
            btnExportExcel.addEventListener('click', () => downloadReport('fuel'));
        }

        // Initialize Charts with dynamic data
        await initCharts(opCostRes?.data || []);

    } catch (error) {
        console.error('Error fetching reports data:', error);
    }
});

async function initCharts(opCostData) {
    if (typeof Chart === 'undefined') return;

    // Common Chart Defaults
    Chart.defaults.font.family = 'Inter, sans-serif';
    Chart.defaults.color = '#534434'; // text-on-surface-variant
    Chart.defaults.scale.grid.color = '#e5e7eb'; // subtle grid
    const primaryColor = '#855300';
    const primaryContainerColor = '#f59e0b';
    const secondaryColor = '#0058be';
    const tertiaryColor = '#006e2f';
    const errorColor = '#ba1a1a';
    const surfaceColor = '#f9f9ff';

    // Fetch Trips Data for Status Chart
    const tripsRes = await fetchWithAuth('/trips');
    let completedTrips = 0;
    let cancelledTrips = 0;
    if (tripsRes && tripsRes.success) {
        tripsRes.data.forEach(t => {
            if (t.status === 'Completed') completedTrips++;
            if (t.status === 'Cancelled') cancelledTrips++;
        });
    }

    // 1. Monthly Revenue (Line)
    const ctxRev = document.getElementById('revenueChart');
    if (ctxRev) {
        new Chart(ctxRev.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['Previous', 'Current'],
                datasets: [{
                    label: 'Revenue ($K)',
                    data: [0, opCostData.reduce((acc, curr) => acc + parseFloat(curr.revenue_last_30d || 0), 0) / 1000],
                    borderColor: primaryContainerColor,
                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true,
                    pointBackgroundColor: surfaceColor,
                    pointBorderColor: primaryContainerColor,
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: { beginAtZero: true, border: {display: false} },
                    x: { border: {display: false}, grid: {display: false} }
                }
            }
        });
    }

    // 2. Trip Status (Stacked Bar)
    const ctxTrip = document.getElementById('tripChart');
    if (ctxTrip) {
        new Chart(ctxTrip.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Current Period'],
                datasets: [
                    {
                        label: 'Completed',
                        data: [completedTrips || 10], // Fallback if 0 for visual
                        backgroundColor: tertiaryColor,
                        borderRadius: {topLeft: 4, topRight: 4, bottomLeft: 4, bottomRight: 4},
                        borderSkipped: false
                    },
                    {
                        label: 'Cancelled/Delayed',
                        data: [cancelledTrips || 2],
                        backgroundColor: errorColor,
                        borderRadius: {topLeft: 4, topRight: 4, bottomLeft: 4, bottomRight: 4},
                        borderSkipped: false
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom', labels: { usePointStyle: true, boxWidth: 8 } } },
                scales: {
                    x: { stacked: true, grid: {display: false}, border: {display: false} },
                    y: { stacked: true, beginAtZero: true, border: {display: false} }
                }
            }
        });
    }

    // 3. Rev vs Cost (Dual Line)
    const ctxRevCost = document.getElementById('revCostChart');
    if (ctxRevCost) {
        const totalRev = opCostData.reduce((acc, curr) => acc + parseFloat(curr.revenue_last_30d || 0), 0) / 1000;
        const totalCost = opCostData.reduce((acc, curr) => acc + parseFloat(curr.total_operating_cost || 0), 0) / 1000;
        
        new Chart(ctxRevCost.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Total'],
                datasets: [
                    {
                        label: 'Revenue',
                        data: [totalRev],
                        backgroundColor: primaryContainerColor,
                        borderRadius: 4
                    },
                    {
                        label: 'Cost',
                        data: [totalCost],
                        backgroundColor: errorColor,
                        borderRadius: 4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom', labels: { usePointStyle: true, boxWidth: 8 } } },
                scales: {
                    y: { beginAtZero: true, border: {display: false} },
                    x: { border: {display: false}, grid: {display: false} }
                }
            }
        });
    }

    // 4. Maint Breakdown (Donut)
    const ctxMaint = document.getElementById('maintChart');
    if (ctxMaint) {
        let totalMaintCost = 0;
        opCostData.forEach(c => totalMaintCost += parseFloat(c.maintenance_cost_last_30d || 0));
        const el = document.getElementById('kpi-maint-total');
        if (el) el.textContent = '$' + (totalMaintCost / 1000).toFixed(1) + 'K';
        
        new Chart(ctxMaint.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Engine', 'Tyres', 'Brakes', 'Electrical', 'Other'],
                datasets: [{
                    data: [45, 25, 15, 10, 5],
                    backgroundColor: [primaryContainerColor, secondaryColor, errorColor, tertiaryColor, '#d3daef'],
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

    // 5. Driver Performance (Radar)
    const ctxDriver = document.getElementById('driverChart');
    if (ctxDriver) {
        new Chart(ctxDriver.getContext('2d'), {
            type: 'radar',
            data: {
                labels: ['Safety', 'Punctuality', 'Fuel Eff.', 'Compliance', 'Feedback'],
                datasets: [{
                    label: 'Fleet Average',
                    data: [85, 90, 75, 95, 88],
                    backgroundColor: 'rgba(0, 88, 190, 0.2)',
                    borderColor: secondaryColor,
                    pointBackgroundColor: secondaryColor,
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: secondaryColor
                }]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    r: {
                        angleLines: { color: '#e5e7eb' },
                        grid: { color: '#e5e7eb' },
                        pointLabels: { font: { family: 'Inter', size: 10 } },
                        ticks: { display: false, min: 0, max: 100 }
                    }
                }
            }
        });
    }
}
