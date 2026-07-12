document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetchWithAuth('/drivers');
        if (response && response.success) {
            const drivers = response.data;
            const tbody = document.getElementById('drivers-table-body');
            tbody.innerHTML = '';
            
            let available = 0;
            let onTrip = 0;
            let expiring = 0;
            let suspended = 0;

            drivers.forEach((driver, index) => {
                if (driver.status === 'Available') available++;
                else if (driver.status === 'On Trip') onTrip++;
                else if (driver.status === 'Suspended') suspended++;
                
                // Check for expiring licenses (within 90 days)
                if (driver.license_expiry_date) {
                    const expiryDate = new Date(driver.license_expiry_date);
                    const now = new Date();
                    const diffDays = (expiryDate - now) / (1000 * 60 * 60 * 24);
                    if (diffDays <= 90 && diffDays > 0) expiring++;
                }
                
                // DB has full_name as single column, parse initials from it
                const nameParts = (driver.full_name || 'Unknown').split(' ');
                const firstName = nameParts[0] || '';
                const lastName = nameParts.slice(1).join(' ') || '';
                const initials = firstName.charAt(0) + (lastName ? lastName.charAt(0) : '');

                const tr = document.createElement('tr');
                tr.className = `hover:bg-surface-container-low transition-colors group border-b border-[#E5E7EB]/50 ${index % 2 !== 0 ? 'bg-[#F9FAFB]' : 'bg-[#FFFFFF]'}`;

                let statusClass = '';
                if (driver.status === 'Available') {
                    statusClass = 'bg-[#3B82F6]/10 text-[#3B82F6]';
                } else if (driver.status === 'On Trip') {
                    statusClass = 'bg-tertiary-container/10 text-tertiary-container';
                } else if (driver.status === 'Suspended') {
                    statusClass = 'bg-error/10 text-error';
                } else {
                    statusClass = 'bg-surface-variant text-on-surface-variant';
                }

                let dotClass = 'bg-outline-variant';
                if (driver.status === 'Available') dotClass = 'bg-[#3B82F6]';
                else if (driver.status === 'On Trip') dotClass = 'bg-tertiary-container';
                else if (driver.status === 'Suspended') dotClass = 'bg-error';

                tr.innerHTML = `
                    <td class="px-6 py-4">
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center text-on-surface-variant font-bold">
                                ${initials}
                            </div>
                            <div>
                                <div class="font-body-md text-body-md text-on-surface font-semibold">${driver.full_name}</div>
                                <div class="text-on-surface-variant text-xs mt-0.5">ID: DRV-${driver.driver_id}</div>
                            </div>
                        </div>
                    </td>
                    <td class="px-6 py-4">
                        <div class="font-medium">${driver.license_number}</div>
                        <div class="text-on-surface-variant mt-0.5">${driver.contact_number || 'N/A'}</div>
                    </td>
                    <td class="px-6 py-4">
                        <div class="flex items-center gap-4">
                            <div>
                                <div class="text-on-surface-variant text-[11px] uppercase tracking-wider">Safety</div>
                                <div class="font-medium text-tertiary-container">${driver.safety_score || 0}/100</div>
                            </div>
                        </div>
                    </td>
                    <td class="px-6 py-4">
                        <div class="font-medium text-secondary">${driver.license_category || 'N/A'}</div>
                        <div class="text-on-surface-variant mt-0.5">${driver.license_expiry_date ? new Date(driver.license_expiry_date).toLocaleDateString() : 'N/A'}</div>
                    </td>
                    <td class="px-6 py-4">
                        <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${statusClass}">
                            <span class="w-1.5 h-1.5 rounded-full ${dotClass} mr-1.5"></span> ${driver.status}
                        </span>
                    </td>
                    <td class="px-6 py-4 text-right">
                        <button class="text-on-surface-variant hover:text-primary transition-colors p-1" onclick="openDriverDrawer(this)" data-driver='${JSON.stringify(driver).replace(/'/g, "&apos;")}'>
                            <span class="material-symbols-outlined text-[20px]">visibility</span>
                        </button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
            
            document.getElementById('kpi-total-drivers').innerText = drivers.length;
            document.getElementById('kpi-available').innerText = available;
            document.getElementById('kpi-on-trip').innerText = onTrip;
            document.getElementById('kpi-suspended').innerText = suspended;
            document.getElementById('kpi-expiring').innerText = expiring;
            
            document.getElementById('total-drivers').innerText = drivers.length;
            document.getElementById('showing-start').innerText = drivers.length > 0 ? 1 : 0;
            document.getElementById('showing-end').innerText = drivers.length;
        }
    } catch (error) {
        console.error('Error fetching drivers:', error);
    }
});

function openDriverDrawer(btn) {
    const driver = JSON.parse(btn.dataset.driver);
    
    const title = document.querySelector('#driver-drawer h2');
    if (title) title.innerText = driver.full_name;
    
    const sub = document.querySelector('#driver-drawer p.font-body-sm');
    if (sub) sub.innerText = `ID: DRV-${driver.driver_id} • Status: ${driver.status}`;
    
    const score = document.querySelector('#driver-drawer .font-kpi-display');
    if (score) score.innerText = `${driver.safety_score || 0}`;

    const editBtn = document.getElementById('edit-driver-btn-drawer');
    if (editBtn) {
        editBtn.onclick = () => {
            // Close view drawer
            document.getElementById('driver-drawer').classList.add('translate-x-full');
            document.getElementById('drawer-backdrop').classList.add('hidden');
            // Open edit drawer
            openEditDriverModal(driver);
        };
    }

    const drawer = document.getElementById('driver-drawer');
    const backdrop = document.getElementById('drawer-backdrop');
    if (drawer && backdrop) {
        drawer.classList.remove('translate-x-full');
        backdrop.classList.remove('hidden');
    }
}

window.openAddDriverModal = function() {
    const form = document.getElementById('driver-form');
    if (form) form.reset();
    document.getElementById('d-id').value = '';
    document.getElementById('d-license').disabled = false;
    document.getElementById('add-driver-drawer-title').innerText = 'Add New Driver';
    document.getElementById('add-driver-drawer-subtitle').innerText = 'Register a new driver with a valid CDL license.';
    
    // Set default hire date to today
    document.getElementById('d-hire').value = new Date().toISOString().split('T')[0];
    // Set default expiry date to 1 year from now
    const oneYearLater = new Date();
    oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);
    document.getElementById('d-expiry').value = oneYearLater.toISOString().split('T')[0];
    
    toggleAddDriverDrawer();
};

window.openEditDriverModal = function(driver) {
    document.getElementById('d-id').value = driver.driver_id;
    document.getElementById('d-name').value = driver.full_name;
    document.getElementById('d-license').value = driver.license_number;
    document.getElementById('d-license').disabled = true; // Disable license editing
    document.getElementById('d-category').value = driver.license_category || '';
    document.getElementById('d-expiry').value = driver.license_expiry_date ? new Date(driver.license_expiry_date).toISOString().split('T')[0] : '';
    document.getElementById('d-phone').value = driver.contact_number || '';
    document.getElementById('d-safety').value = driver.safety_score || 0;
    document.getElementById('d-hire').value = driver.hire_date ? new Date(driver.hire_date).toISOString().split('T')[0] : '';
    document.getElementById('d-status').value = driver.status;
    
    document.getElementById('add-driver-drawer-title').innerText = 'Edit Driver';
    document.getElementById('add-driver-drawer-subtitle').innerText = 'Update details of driver: ' + driver.full_name;
    toggleAddDriverDrawer();
};

document.addEventListener('DOMContentLoaded', () => {
    const driverForm = document.getElementById('driver-form');
    if (driverForm) {
        driverForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const id = document.getElementById('d-id').value;
            const full_name = document.getElementById('d-name').value;
            const license_number = document.getElementById('d-license').value;
            const license_category = document.getElementById('d-category').value;
            const license_expiry_date = document.getElementById('d-expiry').value;
            const contact_number = document.getElementById('d-phone').value;
            const safety_score = parseFloat(document.getElementById('d-safety').value);
            const hire_date = document.getElementById('d-hire').value;
            const status = document.getElementById('d-status').value;

            const payload = {
                full_name,
                license_category,
                license_expiry_date,
                contact_number,
                safety_score,
                hire_date,
                status
            };

            let response;
            try {
                if (id) {
                    // Update
                    response = await fetchWithAuth(`/drivers/${id}`, {
                        method: 'PUT',
                        body: JSON.stringify(payload)
                    });
                } else {
                    // Create (needs license_number)
                    payload.license_number = license_number;
                    response = await fetchWithAuth('/drivers', {
                        method: 'POST',
                        body: JSON.stringify(payload)
                    });
                }

                if (response && response.success) {
                    toggleAddDriverDrawer();
                    // Reload the page list
                    window.location.reload();
                } else {
                    alert(response?.message || 'Failed to save driver');
                }
            } catch (error) {
                console.error(error);
                alert('An error occurred while saving the driver');
            }
        });
    }
});
