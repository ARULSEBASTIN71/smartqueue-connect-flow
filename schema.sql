
-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Businesses table
CREATE TABLE IF NOT EXISTS businesses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    full_description TEXT,
    address TEXT NOT NULL,
    location TEXT NOT NULL,
    image TEXT,
    rating REAL DEFAULT 0,
    review_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Services table
CREATE TABLE IF NOT EXISTS services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    business_id INTEGER,
    name TEXT NOT NULL,
    FOREIGN KEY (business_id) REFERENCES businesses (id)
);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    business_id INTEGER,
    user_id INTEGER,
    rating INTEGER NOT NULL,
    text TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (business_id) REFERENCES businesses (id),
    FOREIGN KEY (user_id) REFERENCES users (id)
);

-- Tokens table
CREATE TABLE IF NOT EXISTS tokens (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    business_id INTEGER,
    user_id INTEGER,
    token_number TEXT NOT NULL,
    status TEXT DEFAULT 'waiting',
    estimated_time INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (business_id) REFERENCES businesses (id),
    FOREIGN KEY (user_id) REFERENCES users (id)
);

-- Appointments table
CREATE TABLE IF NOT EXISTS appointments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    business_id INTEGER,
    user_id INTEGER,
    service_id INTEGER,
    appointment_time TIMESTAMP NOT NULL,
    status TEXT DEFAULT 'scheduled',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (business_id) REFERENCES businesses (id),
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (service_id) REFERENCES services (id)
);

-- Sample data for businesses
INSERT INTO businesses (name, category, description, full_description, address, location, image, rating, review_count)
VALUES
    ('City Hospital', 'healthcare', 'Comprehensive healthcare services for all your needs', 
     'City Hospital offers state-of-the-art medical facilities and expert healthcare professionals. Our mission is to provide accessible, high-quality healthcare services to all our patients.',
     '123 Main Street, Cityville', 'Cityville', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=800', 4.7, 128),
    ('First National Bank', 'banking', 'Secure and reliable banking services', 
     'First National Bank has been serving the community for over 50 years with trustworthy financial services. We offer personal and business banking solutions to meet all your financial needs.',
     '456 Finance Ave, Moneytown', 'Moneytown', 'https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?auto=format&fit=crop&w=800', 4.5, 95),
    ('City Hall', 'government', 'Municipal services and information', 
     'City Hall serves as the center for local government operations and public services. Our staff is dedicated to addressing the needs of our community and ensuring efficient service delivery.',
     '789 Government Blvd, Metropolis', 'Metropolis', 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800', 4.2, 76),
    ('MegaMart', 'retail', 'One-stop shop for all your shopping needs', 
     'MegaMart offers a wide range of products from groceries to electronics, clothing, and household items. Our large selection and competitive prices make us the preferred shopping destination in the area.',
     '101 Shopping Lane, Consumer City', 'Consumer City', 'https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?auto=format&fit=crop&w=800', 4.4, 210);

-- Sample services
INSERT INTO services (business_id, name)
VALUES
    (1, 'General Checkup'),
    (1, 'Emergency Care'),
    (1, 'Laboratory Tests'),
    (1, 'Vaccination'),
    (2, 'Account Opening'),
    (2, 'Loan Application'),
    (2, 'Credit Card Services'),
    (2, 'Foreign Exchange'),
    (3, 'ID Registration'),
    (3, 'Business Permits'),
    (3, 'Property Tax Payment'),
    (3, 'Municipal Services'),
    (4, 'Customer Service'),
    (4, 'Returns and Exchanges'),
    (4, 'Special Order Pickup'),
    (4, 'Membership Services');
