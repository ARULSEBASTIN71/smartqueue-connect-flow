
from flask import Flask, request, jsonify, send_from_directory
import os
import sqlite3
import json
import random
from datetime import datetime, timedelta
import jwt
from functools import wraps
import hashlib

# Initialize Flask app
app = Flask(__name__, static_folder='.', static_url_path='')

# Configuration
DATABASE = 'smart_queue.db'
SECRET_KEY = 'your_secret_key_here'  # In production, use a proper secret key
TOKEN_EXPIRATION = 24 * 60 * 60  # 24 hours in seconds

# Initialize database
def init_db():
    with sqlite3.connect(DATABASE) as conn:
        cursor = conn.cursor()
        
        # Create users table
        cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        ''')
        
        # Create businesses table
        cursor.execute('''
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
        )
        ''')
        
        # Create services table
        cursor.execute('''
        CREATE TABLE IF NOT EXISTS services (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            business_id INTEGER,
            name TEXT NOT NULL,
            FOREIGN KEY (business_id) REFERENCES businesses (id)
        )
        ''')
        
        # Create reviews table
        cursor.execute('''
        CREATE TABLE IF NOT EXISTS reviews (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            business_id INTEGER,
            user_id INTEGER,
            rating INTEGER NOT NULL,
            text TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (business_id) REFERENCES businesses (id),
            FOREIGN KEY (user_id) REFERENCES users (id)
        )
        ''')
        
        # Create tokens table
        cursor.execute('''
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
        )
        ''')
        
        # Create appointments table
        cursor.execute('''
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
        )
        ''')
        
        # Insert sample data if tables are empty
        if cursor.execute('SELECT COUNT(*) FROM businesses').fetchone()[0] == 0:
            insert_sample_data(cursor)
        
        conn.commit()

# Insert sample data
def insert_sample_data(cursor):
    # Insert sample businesses
    businesses = [
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
         '101 Shopping Lane, Consumer City', 'Consumer City', 'https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?auto=format&fit=crop&w=800', 4.4, 210)
    ]
    
    cursor.executemany('''
    INSERT INTO businesses (name, category, description, full_description, address, location, image, rating, review_count)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', businesses)
    
    # Insert sample services
    services = [
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
        (4, 'Membership Services')
    ]
    
    cursor.executemany('''
    INSERT INTO services (business_id, name)
    VALUES (?, ?)
    ''', services)
    
    # Insert sample users
    users = [
        ('John Doe', 'john@example.com', hash_password('password123')),
        ('Jane Smith', 'jane@example.com', hash_password('password456'))
    ]
    
    cursor.executemany('''
    INSERT INTO users (name, email, password)
    VALUES (?, ?, ?)
    ''', users)
    
    # Insert sample reviews
    reviews = [
        (1, 1, 5, 'Excellent service, very professional staff.'),
        (1, 2, 4, 'Good care but had to wait a bit longer than expected.'),
        (2, 1, 4, 'Helpful staff and quick service.'),
        (2, 2, 5, 'Great experience, would recommend to anyone.'),
        (3, 1, 4, 'Efficient service, but the office was crowded.'),
        (3, 2, 3, 'Got what I needed but the process could be more streamlined.'),
        (4, 1, 5, 'Amazing selection and friendly staff!'),
        (4, 2, 4, 'Good prices and clean store.')
    ]
    
    cursor.executemany('''
    INSERT INTO reviews (business_id, user_id, rating, text)
    VALUES (?, ?, ?, ?)
    ''', reviews)

# Hash password
def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

# JWT token functions
def generate_token(user_id):
    payload = {
        'exp': datetime.utcnow() + timedelta(seconds=TOKEN_EXPIRATION),
        'iat': datetime.utcnow(),
        'sub': user_id
    }
    return jwt.encode(payload, SECRET_KEY, algorithm='HS256')

def decode_token(token):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        return payload['sub']
    except jwt.ExpiredSignatureError:
        return 'Token expired. Please log in again.'
    except jwt.InvalidTokenError:
        return 'Invalid token. Please log in again.'

# Authentication decorator
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].split(' ')[1]
        
        if not token:
            return jsonify({'message': 'Token is missing'}), 401
        
        user_id = decode_token(token)
        if isinstance(user_id, str):
            return jsonify({'message': user_id}), 401
        
        return f(user_id, *args, **kwargs)
    
    return decorated

# Helper function to convert row to dict
def row_to_dict(cursor, row):
    return {cursor.description[i][0]: value for i, value in enumerate(row)}

# Routes
@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

# API routes
@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    
    if not email or not password:
        return jsonify({'message': 'Missing email or password'}), 400
    
    with sqlite3.connect(DATABASE) as conn:
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        
        user = cursor.execute(
            'SELECT * FROM users WHERE email = ? AND password = ?',
            (email, hash_password(password))
        ).fetchone()
        
        if user:
            token = generate_token(user['id'])
            return jsonify({
                'message': 'Login successful',
                'token': token,
                'user': {
                    'id': user['id'],
                    'name': user['name'],
                    'email': user['email']
                }
            })
        else:
            return jsonify({'message': 'Invalid email or password'}), 401

@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    
    if not name or not email or not password:
        return jsonify({'message': 'Missing required fields'}), 400
    
    with sqlite3.connect(DATABASE) as conn:
        cursor = conn.cursor()
        
        try:
            cursor.execute(
                'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
                (name, email, hash_password(password))
            )
            conn.commit()
            return jsonify({'message': 'Registration successful'})
        except sqlite3.IntegrityError:
            return jsonify({'message': 'Email already exists'}), 409

@app.route('/api/businesses', methods=['GET'])
def get_businesses():
    category = request.args.get('category')
    search = request.args.get('search')
    
    query = 'SELECT * FROM businesses'
    params = []
    
    if category:
        query += ' WHERE category = ?'
        params.append(category)
        
        if search:
            query += ' AND (name LIKE ? OR description LIKE ?)'
            params.append(f'%{search}%')
            params.append(f'%{search}%')
    elif search:
        query += ' WHERE name LIKE ? OR description LIKE ?'
        params.append(f'%{search}%')
        params.append(f'%{search}%')
    
    with sqlite3.connect(DATABASE) as conn:
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        
        businesses = cursor.execute(query, params).fetchall()
        
        # For each business, get the queue length
        result = []
        for business in businesses:
            business_dict = row_to_dict(cursor, business)
            
            # Get queue length
            queue_length = cursor.execute(
                'SELECT COUNT(*) FROM tokens WHERE business_id = ? AND status = "waiting"',
                (business_dict['id'],)
            ).fetchone()[0]
            
            business_dict['queueLength'] = queue_length
            business_dict['estimatedWaitTime'] = queue_length * 15  # 15 minutes per person
            
            result.append(business_dict)
        
        return jsonify(result)

@app.route('/api/business/<int:business_id>', methods=['GET'])
def get_business(business_id):
    with sqlite3.connect(DATABASE) as conn:
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        
        business = cursor.execute(
            'SELECT * FROM businesses WHERE id = ?',
            (business_id,)
        ).fetchone()
        
        if not business:
            return jsonify({'message': 'Business not found'}), 404
        
        business_dict = row_to_dict(cursor, business)
        
        # Get services
        services = cursor.execute(
            'SELECT name FROM services WHERE business_id = ?',
            (business_id,)
        ).fetchall()
        business_dict['services'] = [service['name'] for service in services]
        
        # Get reviews
        reviews = cursor.execute(
            '''
            SELECT r.id, r.rating, r.text, r.created_at, u.name as author
            FROM reviews r
            JOIN users u ON r.user_id = u.id
            WHERE r.business_id = ?
            ORDER BY r.created_at DESC
            ''',
            (business_id,)
        ).fetchall()
        business_dict['reviews'] = [row_to_dict(cursor, review) for review in reviews]
        
        # Get queue length
        queue_length = cursor.execute(
            'SELECT COUNT(*) FROM tokens WHERE business_id = ? AND status = "waiting"',
            (business_id,)
        ).fetchone()[0]
        
        business_dict['queueLength'] = queue_length
        business_dict['estimatedWaitTime'] = queue_length * 15  # 15 minutes per person
        
        return jsonify(business_dict)

@app.route('/api/token', methods=['POST'])
@token_required
def create_token(user_id):
    data = request.json
    business_id = data.get('businessId')
    
    if not business_id:
        return jsonify({'message': 'Missing business ID'}), 400
    
    with sqlite3.connect(DATABASE) as conn:
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        
        # Check if business exists
        business = cursor.execute(
            'SELECT * FROM businesses WHERE id = ?',
            (business_id,)
        ).fetchone()
        
        if not business:
            return jsonify({'message': 'Business not found'}), 404
        
        # Check if user already has a waiting token for this business
        existing_token = cursor.execute(
            'SELECT * FROM tokens WHERE business_id = ? AND user_id = ? AND status = "waiting"',
            (business_id, user_id)
        ).fetchone()
        
        if existing_token:
            return jsonify({
                'message': 'You already have a token for this business',
                'tokenId': existing_token['id']
            }), 409
        
        # Get current queue length
        queue_length = cursor.execute(
            'SELECT COUNT(*) FROM tokens WHERE business_id = ? AND status = "waiting"',
            (business_id,)
        ).fetchone()[0]
        
        # Generate token number
        token_number = f"{business['name'][0:3].upper()}{datetime.now().strftime('%Y%m%d')}-{queue_length + 1:03d}"
        
        # Calculate estimated time (15 min per person)
        estimated_time = queue_length * 15
        
        # Create token
        cursor.execute(
            'INSERT INTO tokens (business_id, user_id, token_number, estimated_time) VALUES (?, ?, ?, ?)',
            (business_id, user_id, token_number, estimated_time)
        )
        conn.commit()
        
        token_id = cursor.lastrowid
        
        return jsonify({
            'message': 'Token created successfully',
            'tokenId': token_id,
            'tokenNumber': token_number,
            'estimatedWaitTime': estimated_time
        })

@app.route('/api/token/<int:token_id>', methods=['GET'])
@token_required
def get_token(user_id, token_id):
    with sqlite3.connect(DATABASE) as conn:
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        
        token = cursor.execute(
            '''
            SELECT t.*, b.name as business_name, b.category, b.image
            FROM tokens t
            JOIN businesses b ON t.business_id = b.id
            WHERE t.id = ?
            ''',
            (token_id,)
        ).fetchone()
        
        if not token:
            return jsonify({'message': 'Token not found'}), 404
        
        if token['user_id'] != user_id:
            return jsonify({'message': 'Unauthorized access to this token'}), 403
        
        # Get position in queue
        position = cursor.execute(
            '''
            SELECT COUNT(*) FROM tokens 
            WHERE business_id = ? AND status = "waiting" AND created_at < ?
            ''',
            (token['business_id'], token['created_at'])
        ).fetchone()[0] + 1
        
        token_dict = row_to_dict(cursor, token)
        token_dict['position'] = position
        
        return jsonify(token_dict)

@app.route('/api/appointment', methods=['POST'])
@token_required
def create_appointment(user_id):
    data = request.json
    business_id = data.get('businessId')
    service_id = data.get('serviceId')
    appointment_time = data.get('appointmentTime')
    
    if not business_id or not service_id or not appointment_time:
        return jsonify({'message': 'Missing required fields'}), 400
    
    # Convert appointment_time string to datetime
    try:
        appointment_datetime = datetime.fromisoformat(appointment_time)
    except ValueError:
        return jsonify({'message': 'Invalid appointment time format'}), 400
    
    with sqlite3.connect(DATABASE) as conn:
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        
        # Check if business and service exist
        business = cursor.execute(
            'SELECT * FROM businesses WHERE id = ?',
            (business_id,)
        ).fetchone()
        
        if not business:
            return jsonify({'message': 'Business not found'}), 404
        
        service = cursor.execute(
            'SELECT * FROM services WHERE id = ? AND business_id = ?',
            (service_id, business_id)
        ).fetchone()
        
        if not service:
            return jsonify({'message': 'Service not found for this business'}), 404
        
        # Check if time slot is available
        existing_appointment = cursor.execute(
            '''
            SELECT COUNT(*) FROM appointments 
            WHERE business_id = ? AND service_id = ? AND appointment_time = ?
            ''',
            (business_id, service_id, appointment_datetime)
        ).fetchone()[0]
        
        if existing_appointment > 0:
            return jsonify({'message': 'This time slot is already booked'}), 409
        
        # Create appointment
        cursor.execute(
            '''
            INSERT INTO appointments (business_id, user_id, service_id, appointment_time)
            VALUES (?, ?, ?, ?)
            ''',
            (business_id, user_id, service_id, appointment_datetime)
        )
        conn.commit()
        
        appointment_id = cursor.lastrowid
        
        return jsonify({
            'message': 'Appointment scheduled successfully',
            'appointmentId': appointment_id
        })

@app.route('/api/appointment/<int:appointment_id>', methods=['GET'])
@token_required
def get_appointment(user_id, appointment_id):
    with sqlite3.connect(DATABASE) as conn:
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        
        appointment = cursor.execute(
            '''
            SELECT a.*, b.name as business_name, b.image, s.name as service_name
            FROM appointments a
            JOIN businesses b ON a.business_id = b.id
            JOIN services s ON a.service_id = s.id
            WHERE a.id = ?
            ''',
            (appointment_id,)
        ).fetchone()
        
        if not appointment:
            return jsonify({'message': 'Appointment not found'}), 404
        
        if appointment['user_id'] != user_id:
            return jsonify({'message': 'Unauthorized access to this appointment'}), 403
        
        appointment_dict = row_to_dict(cursor, appointment)
        
        return jsonify(appointment_dict)

# Serve static files
@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('.', path)

# Initialize database when app starts
init_db()

if __name__ == '__main__':
    app.run(debug=True)
