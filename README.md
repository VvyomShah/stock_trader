
# Stock Trading Application

This is a stock trading application built with a React frontend and a Flask backend. Users can register, log in, view stock details, and buy or sell stocks. 

## Table of Contents

- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)

## Technologies Used

- **Frontend**: React, Material-UI
- **Backend**: Flask, Flask-Bcrypt, Flask-MySQL
- **Database**: MySQL
- **API**: yfinance for stock data

## Prerequisites

Before setting up the project, ensure you have the following installed:

- Node.js (v14 or higher)
- npm (Node Package Manager)
- Python (v3.7 or higher)
- pip (Python package installer)
- MySQL server

## Setup Instructions

### Backend Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/VvyomShah/stock_trader
   cd stock-trading/backend
   ```

2. **Create a virtual environment**:
   ```bash
   python -m venv venv
   ```

3. **Activate the virtual environment**:
   - On Windows:
     ```bash
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

4. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

5. **Configure your MySQL database**:
   - Create a new MySQL database and user with the necessary privileges.
   - Update the database connection settings in `app.py` or your configuration file to reflect your MySQL settings.

6. **Run database migrations**:
   - Ensure your database tables are created based on your models using the `database_setup.sql`

7. **Start the backend server**:
   ```bash
   flask run -h localhost -p 8000  
   ```
   - The server should start on `http://localhost:8000` by default.

### Frontend Setup

1. **Change directory**:
   ```bash
   cd stock-trading/frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   - Create a `.env` file in the root of the frontend project directory.
   - Add the following variables (update the values as necessary):
     ```plaintext
     REACT_APP_API_URL=http://localhost:8000
     ```

4. **Start the frontend server**:
   ```bash
   npm start
   ```
   - The frontend application should open in your default browser at `http://localhost:3000`.

## Environment Variables

The backend requires the following environment variables to be set in your configuration:

- MYSQL_DATABASE_HOST=localhost
- MYSQL_DATABASE_PORT=3306
- MYSQL_DATABASE_USER=root
- MYSQL_DATABASE_PASSWORD=
- MYSQL_DATABASE_DB=stock_trader

## Running the Application

Once both the frontend and backend servers are running, you can access the application through your browser at:

```
http://localhost:3000
```

You should be able to register, log in, view stock details, and perform buy/sell transactions.
