-- ============================================
-- DATABASE: transitops
-- ============================================
DROP DATABASE IF EXISTS transitops;
CREATE DATABASE transitops;
USE transitops;

-- ============================================
-- 1. USERS & ROLES (Authentication & RBAC)
-- ============================================

CREATE TABLE roles (
    role_id INT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO roles (role_name, description) VALUES
('Fleet Manager', 'Manages fleet assets and operations'),
('Driver', 'Creates and manages trips'),
('Safety Officer', 'Monitors driver compliance and safety'),
('Financial Analyst', 'Reviews expenses and profitability');

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    role_id INT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES roles(role_id)
);

-- ============================================
-- 2. VEHICLES (Based on your existing table)
-- ============================================

CREATE TABLE vehicles (
    vehicle_id INT AUTO_INCREMENT PRIMARY KEY,
    registration_number VARCHAR(20) NOT NULL UNIQUE,
    vehicle_name VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    vehicle_type VARCHAR(15) NOT NULL,
    max_load_capacity DECIMAL(8,2) NOT NULL,
    odometer DECIMAL(10,2) NOT NULL DEFAULT 0,
    acquisition_cost DECIMAL(12,2) NOT NULL,
    status ENUM('Available', 'On Trip', 'In Shop', 'Retired') NOT NULL DEFAULT 'Available',
    region VARCHAR(50) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_status (status),
    INDEX idx_registration (registration_number)
);

-- ============================================
-- 3. DRIVERS
-- ============================================

CREATE TABLE drivers (
    driver_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    license_number VARCHAR(50) NOT NULL UNIQUE,
    license_category VARCHAR(20) NOT NULL,
    license_expiry_date DATE NOT NULL,
    contact_number VARCHAR(20) NOT NULL,
    safety_score DECIMAL(5,2) DEFAULT 100.00,
    status ENUM('Available', 'On Trip', 'Off Duty', 'Suspended') NOT NULL DEFAULT 'Available',
    hire_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_status (status),
    INDEX idx_license_expiry (license_expiry_date)
);

-- ============================================
-- 4. TRIPS
-- ============================================

CREATE TABLE trips (
    trip_id INT AUTO_INCREMENT PRIMARY KEY,
    trip_reference VARCHAR(50) NOT NULL UNIQUE,
    source_location VARCHAR(100) NOT NULL,
    destination_location VARCHAR(100) NOT NULL,
    cargo_weight DECIMAL(8,2) NOT NULL,
    planned_distance DECIMAL(8,2) NOT NULL,
    actual_distance DECIMAL(8,2) NULL,
    vehicle_id INT NOT NULL,
    driver_id INT NOT NULL,
    created_by INT NOT NULL,
    status ENUM('Draft', 'Dispatched', 'Completed', 'Cancelled') NOT NULL DEFAULT 'Draft',
    dispatch_time TIMESTAMP NULL,
    completion_time TIMESTAMP NULL,
    start_odometer DECIMAL(10,2) NULL,
    end_odometer DECIMAL(10,2) NULL,
    fuel_consumed DECIMAL(8,2) NULL,
    revenue DECIMAL(12,2) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(vehicle_id),
    FOREIGN KEY (driver_id) REFERENCES drivers(driver_id),
    FOREIGN KEY (created_by) REFERENCES users(user_id),
    INDEX idx_status (status),
    INDEX idx_vehicle (vehicle_id),
    INDEX idx_driver (driver_id)
);

-- ============================================
-- 5. MAINTENANCE LOGS
-- ============================================

CREATE TABLE maintenance_logs (
    maintenance_id INT AUTO_INCREMENT PRIMARY KEY,
    vehicle_id INT NOT NULL,
    maintenance_type VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    scheduled_date DATE NOT NULL,
    actual_date DATE NULL,
    cost DECIMAL(12,2) NULL,
    status ENUM('Scheduled', 'In Progress', 'Completed', 'Cancelled') NOT NULL DEFAULT 'Scheduled',
    is_active BOOLEAN DEFAULT TRUE,
    created_by INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(vehicle_id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES users(user_id),
    INDEX idx_vehicle (vehicle_id),
    INDEX idx_is_active (is_active)
);

-- ============================================
-- 6. FUEL LOGS
-- ============================================

CREATE TABLE fuel_logs (
    fuel_log_id INT AUTO_INCREMENT PRIMARY KEY,
    vehicle_id INT NOT NULL,
    trip_id INT NULL,
    fuel_date DATE NOT NULL,
    fuel_liters DECIMAL(8,2) NOT NULL,
    fuel_cost DECIMAL(10,2) NOT NULL,
    odometer_reading DECIMAL(10,2) NOT NULL,
    created_by INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(vehicle_id),
    FOREIGN KEY (trip_id) REFERENCES trips(trip_id) ON DELETE SET NULL,
    FOREIGN KEY (created_by) REFERENCES users(user_id),
    INDEX idx_vehicle (vehicle_id),
    INDEX idx_trip (trip_id)
);

-- ============================================
-- 7. EXPENSES
-- ============================================

CREATE TABLE expenses (
    expense_id INT AUTO_INCREMENT PRIMARY KEY,
    vehicle_id INT NOT NULL,
    trip_id INT NULL,
    expense_type VARCHAR(50) NOT NULL,
    description TEXT NULL,
    amount DECIMAL(12,2) NOT NULL,
    expense_date DATE NOT NULL,
    created_by INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(vehicle_id),
    FOREIGN KEY (trip_id) REFERENCES trips(trip_id) ON DELETE SET NULL,
    FOREIGN KEY (created_by) REFERENCES users(user_id),
    INDEX idx_vehicle (vehicle_id),
    INDEX idx_trip (trip_id)
);

-- ============================================
-- 8. SAMPLE DATA
-- ============================================
-- (Users skipped here, handled in seed.js to properly hash passwords)

-- Insert sample vehicles
INSERT INTO vehicles (registration_number, vehicle_name, model, vehicle_type, max_load_capacity, odometer, acquisition_cost, status, region) VALUES
('VAN-001', 'Van-05', 'Ford Transit', 'Van', 500.00, 12500.00, 35000.00, 'Available', 'North'),
('TRK-001', 'Truck-10', 'Volvo FH', 'Truck', 2500.00, 45000.00, 85000.00, 'Available', 'South'),
('VAN-002', 'Van-12', 'Mercedes Sprinter', 'Van', 800.00, 22000.00, 42000.00, 'On Trip', 'East'),
('TRK-002', 'Truck-15', 'Scania R', 'Truck', 3000.00, 67000.00, 95000.00, 'In Shop', 'West'),
('VAN-003', 'Van-08', 'Nissan NV', 'Van', 600.00, 8900.00, 28000.00, 'Available', 'North');

-- Insert sample drivers
INSERT INTO drivers (full_name, license_number, license_category, license_expiry_date, contact_number, status, safety_score, hire_date) VALUES
('Alex Johnson', 'LIC-2024-001', 'Class B', '2027-12-31', '+1-555-0101', 'Available', 95.00, '2023-01-15'),
('Maria Garcia', 'LIC-2024-002', 'Class A', '2026-06-30', '+1-555-0102', 'Available', 88.00, '2022-03-20'),
('James Smith', 'LIC-2024-003', 'Class C', '2024-12-31', '+1-555-0103', 'Available', 92.00, '2023-06-10');

-- ============================================
-- 9. USEFUL VIEWS FOR DASHBOARD
-- ============================================

CREATE VIEW v_dashboard_kpis AS
SELECT 
    (SELECT COUNT(*) FROM vehicles WHERE status IN ('Available', 'On Trip')) as active_vehicles,
    (SELECT COUNT(*) FROM vehicles WHERE status = 'Available') as available_vehicles,
    (SELECT COUNT(*) FROM vehicles WHERE status = 'In Shop') as vehicles_in_maintenance,
    (SELECT COUNT(*) FROM trips WHERE status = 'Dispatched') as active_trips,
    (SELECT COUNT(*) FROM trips WHERE status = 'Draft') as pending_trips,
    (SELECT COUNT(*) FROM drivers WHERE status IN ('Available', 'On Trip')) as drivers_on_duty,
    ROUND(
        (SELECT COUNT(*) FROM vehicles WHERE status = 'On Trip') * 100.0 / 
        GREATEST((SELECT COUNT(*) FROM vehicles WHERE status != 'Retired'), 1), 2
    ) as fleet_utilization_percentage;

CREATE VIEW v_vehicle_status_summary AS
SELECT 
    status,
    COUNT(*) as count,
    ROUND(AVG(max_load_capacity), 2) as avg_capacity,
    ROUND(AVG(odometer), 2) as avg_odometer,
    SUM(acquisition_cost) as total_cost
FROM vehicles
GROUP BY status;

CREATE VIEW v_trip_performance AS
SELECT 
    t.trip_id,
    t.trip_reference,
    t.source_location,
    t.destination_location,
    t.cargo_weight,
    t.planned_distance,
    t.actual_distance,
    t.fuel_consumed,
    CASE 
        WHEN t.actual_distance > 0 AND t.fuel_consumed > 0 
        THEN ROUND(t.actual_distance / t.fuel_consumed, 2)
        ELSE NULL 
    END as fuel_efficiency_km_per_liter,
    t.revenue,
    t.status,
    t.dispatch_time,
    t.completion_time,
    v.registration_number as vehicle_reg,
    d.full_name as driver_name
FROM trips t
LEFT JOIN vehicles v ON t.vehicle_id = v.vehicle_id
LEFT JOIN drivers d ON t.driver_id = d.driver_id;

CREATE VIEW v_operational_costs AS
SELECT 
    v.vehicle_id,
    v.registration_number,
    v.vehicle_name,
    v.vehicle_type,
    v.acquisition_cost,
    COALESCE((
        SELECT SUM(fuel_cost) 
        FROM fuel_logs 
        WHERE vehicle_id = v.vehicle_id 
        AND fuel_date >= DATE_SUB(CURRENT_DATE, INTERVAL 30 DAY)
    ), 0) as fuel_cost_last_30d,
    COALESCE((
        SELECT SUM(cost) 
        FROM maintenance_logs 
        WHERE vehicle_id = v.vehicle_id 
        AND actual_date >= DATE_SUB(CURRENT_DATE, INTERVAL 30 DAY)
    ), 0) as maintenance_cost_last_30d,
    COALESCE((
        SELECT SUM(amount) 
        FROM expenses 
        WHERE vehicle_id = v.vehicle_id 
        AND expense_date >= DATE_SUB(CURRENT_DATE, INTERVAL 30 DAY)
    ), 0) as other_expenses_last_30d,
    COALESCE((
        SELECT SUM(revenue) 
        FROM trips 
        WHERE vehicle_id = v.vehicle_id 
        AND completion_time >= DATE_SUB(CURRENT_DATE, INTERVAL 30 DAY)
    ), 0) as revenue_last_30d,
    v.status as vehicle_status,
    COALESCE((
        SELECT SUM(fuel_cost) 
        FROM fuel_logs 
        WHERE vehicle_id = v.vehicle_id 
        AND fuel_date >= DATE_SUB(CURRENT_DATE, INTERVAL 30 DAY)
    ), 0) + COALESCE((
        SELECT SUM(cost) 
        FROM maintenance_logs 
        WHERE vehicle_id = v.vehicle_id 
        AND actual_date >= DATE_SUB(CURRENT_DATE, INTERVAL 30 DAY)
    ), 0) + COALESCE((
        SELECT SUM(amount) 
        FROM expenses 
        WHERE vehicle_id = v.vehicle_id 
        AND expense_date >= DATE_SUB(CURRENT_DATE, INTERVAL 30 DAY)
    ), 0) as total_operating_cost
FROM vehicles v;

-- ============================================
-- 10. INDEXES FOR PERFORMANCE
-- ============================================

CREATE INDEX idx_vehicles_status_type ON vehicles(status, vehicle_type);
CREATE INDEX idx_drivers_status_license ON drivers(status, license_expiry_date);
CREATE INDEX idx_trips_vehicle_status ON trips(vehicle_id, status);
CREATE INDEX idx_trips_driver_status ON trips(driver_id, status);
CREATE INDEX idx_maintenance_vehicle_active ON maintenance_logs(vehicle_id, is_active);
CREATE INDEX idx_fuel_vehicle_date ON fuel_logs(vehicle_id, fuel_date);
CREATE INDEX idx_expenses_vehicle_date ON expenses(vehicle_id, expense_date);
