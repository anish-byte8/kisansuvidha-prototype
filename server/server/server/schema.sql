-- KisanSuvidha Database Schema (MySQL Version)

-- 1. Users (Authentication)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    phone VARCHAR(15) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Farmer Profiles
CREATE TABLE IF NOT EXISTS farmer_profiles (
    user_id INT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    district VARCHAR(100),
    state VARCHAR(100),
    preferred_lang VARCHAR(10) DEFAULT 'en',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 3. Procurement Centres
CREATE TABLE IF NOT EXISTS procurement_centres (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location TEXT,
    district VARCHAR(100),
    state VARCHAR(100),
    opening_hours VARCHAR(100),
    daily_capacity INT DEFAULT 100,
    current_queue_length INT DEFAULT 0,
    status VARCHAR(20) DEFAULT 'active', -- active, inactive
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Crops
CREATE TABLE IF NOT EXISTS crops (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL
);

-- 5. Centre Crops (Which centre accepts which crop)
CREATE TABLE IF NOT EXISTS centre_crops (
    centre_id INT,
    crop_id INT,
    PRIMARY KEY (centre_id, crop_id),
    FOREIGN KEY (centre_id) REFERENCES procurement_centres(id) ON DELETE CASCADE,
    FOREIGN KEY (crop_id) REFERENCES crops(id) ON DELETE CASCADE
);

-- 6. Slots
CREATE TABLE IF NOT EXISTS slots (
    id INT AUTO_INCREMENT PRIMARY KEY,
    centre_id INT,
    date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    capacity INT NOT NULL,
    booked_count INT DEFAULT 0,
    UNIQUE(centre_id, date, start_time),
    FOREIGN KEY (centre_id) REFERENCES procurement_centres(id) ON DELETE CASCADE
);

-- 7. Bookings
CREATE TABLE IF NOT EXISTS bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    centre_id INT,
    slot_id INT,
    crop_id INT,
    expected_quantity DECIMAL(10, 2),
    token_number VARCHAR(20),
    status VARCHAR(30) DEFAULT 'booked', -- booked, checked_in, waiting, procurement_started, completed, cancelled
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (centre_id) REFERENCES procurement_centres(id),
    FOREIGN KEY (slot_id) REFERENCES slots(id),
    FOREIGN KEY (crop_id) REFERENCES crops(id)
);

-- 8. Procurement Records (Tracking stages)
CREATE TABLE IF NOT EXISTS procurement_records (
    id INT AUTO_INCREMENT PRIMARY KEY,
    booking_id INT,
    current_stage VARCHAR(50) DEFAULT 'token_verified', -- token_verified, quality_check, weighing, approved, completed
    started_at TIMESTAMP NULL,
    completed_at TIMESTAMP NULL,
    FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE
);

-- 9. Payments
CREATE TABLE IF NOT EXISTS payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    booking_id INT,
    amount DECIMAL(15, 2),
    status VARCHAR(20) DEFAULT 'pending', -- pending, processing, completed
    reference_id VARCHAR(100),
    expected_date DATE,
    completed_date TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE
);

-- 10. Notifications
CREATE TABLE IF NOT EXISTS notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    message TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'unread', -- unread, read
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
