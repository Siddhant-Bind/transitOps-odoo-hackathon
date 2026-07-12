const API_BASE_URL = 'http://localhost:8000/api';

async function fetchWithAuth(endpoint, options = {}) {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...options.headers
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers
    });

    if (response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = 'login.html';
        return;
    }

    return response.json();
}

document.addEventListener('DOMContentLoaded', () => {
    // Dynamically update sidebar profile information
    const userStr = localStorage.getItem('user');
    if (userStr) {
        try {
            const user = JSON.parse(userStr);
            const profileContainer = document.querySelector('nav div.mt-auto, nav .mt-auto, nav .border-t');
            if (profileContainer) {
                const paragraphs = profileContainer.querySelectorAll('p');
                if (paragraphs.length >= 2) {
                    paragraphs[0].textContent = user.full_name || 'User';
                    paragraphs[1].textContent = `${user.email} (${user.role || ''})`;
                    paragraphs[0].title = user.full_name;
                    paragraphs[1].title = `${user.email} (${user.role || ''})`;
                }
                // Add click event to log out
                profileContainer.style.cursor = 'pointer';
                profileContainer.title = 'Click to log out';
                profileContainer.addEventListener('click', () => {
                    if (confirm('Are you sure you want to log out?')) {
                        localStorage.removeItem('token');
                        localStorage.removeItem('user');
                        window.location.href = 'login.html';
                    }
                });
            }
        } catch (e) {
            console.error('Error parsing user profile from localStorage:', e);
        }
    }

    // Add global navigation mapping
    const navLinks = document.querySelectorAll('nav a');
    const pageMap = {
        'Dashboard': 'dashboard.html',
        'Fleet': 'fleet.html',
        'Drivers': 'drivers.html',
        'Trips': 'trips.html',
        'Maintenance': 'maintenance.html',
        'Fuel & Expenses': 'fuel.html',
        'Reports & Analytics': 'reports.html',
        'Settings': 'settings.html'
    };

    navLinks.forEach(link => {
        const textSpan = Array.from(link.querySelectorAll('span')).find(s => !s.classList.contains('material-symbols-outlined'));
        const text = textSpan ? textSpan.textContent.trim() : link.textContent.trim();
        
        // Find matching key
        for (const [key, url] of Object.entries(pageMap)) {
            if (text.includes(key)) {
                link.href = url;
                break;
            }
        }
    });
});
