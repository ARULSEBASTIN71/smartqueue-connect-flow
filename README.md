
# SmartQueue Application

SmartQueue is a web application that helps users avoid long waiting lines by providing digital queue management and appointment scheduling for various businesses.

## Technology Stack

- **Frontend**: HTML, CSS, JavaScript (Vanilla)
- **Backend**: Python (Flask)
- **Database**: SQLite

## Features

- Browse businesses by category
- Search for specific businesses
- View business details including services and reviews
- Get a virtual queue token for a business
- Schedule appointments for specific services
- User authentication and profile management

## Setup Instructions

### Prerequisites

- Python 3.7 or higher
- pip (Python package installer)

### Installation

1. Clone this repository:
   ```
   git clone https://github.com/yourusername/smartqueue.git
   cd smartqueue
   ```

2. Create a virtual environment (optional but recommended):
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install the required dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Initialize the database (this happens automatically when you run the app for the first time)

5. Run the application:
   ```
   python app.py
   ```

6. Open your browser and navigate to:
   ```
   http://localhost:5000
   ```

## Project Structure

- `app.py` - Main Flask application
- `index.html` - Homepage
- `businesses.html` - Businesses listing page
- `business-detail.html` - Business details page
- `login.html` - Login page
- `styles.css` - Global CSS styles
- `script.js` - Global JavaScript functionality
- `business-detail.js` - Business detail page functionality
- `auth.js` - Authentication functionality
- `schema.sql` - Database schema
- `smart_queue.db` - SQLite database file (generated when app runs)

## API Endpoints

- `POST /api/login` - User login
- `POST /api/register` - User registration
- `GET /api/businesses` - Get all businesses
- `GET /api/business/:id` - Get business details
- `POST /api/token` - Create a queue token
- `GET /api/token/:id` - Get token details
- `POST /api/appointment` - Schedule an appointment
- `GET /api/appointment/:id` - Get appointment details

## License

This project is licensed under the MIT License.
