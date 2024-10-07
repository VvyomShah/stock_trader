import os
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt  # Import Flask-Bcrypt
from database import init_db
from dotenv import load_dotenv
from datetime import timedelta  # Import timedelta
from routes.auth_routes import user_bp
from routes.stock_routes import stock_bp
from routes.transaction_routes import transaction_bp
from routes.portfolio_routes import portfolio_bp
load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*", "methods": ["GET", "POST", "OPTIONS", "PUT", "DELETE"], "allow_headers": ["Content-Type", "Authorization"]}})

# JWT configuration
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
app.config['JWT_ACCESS_LIFETIME'] = timedelta(hours=30000)  # Set the token lifetime to 6 hours


# Initialize the database
init_db(app)  # Ensure this is called before accessing `db`

# Initialize JWT Manager
jwt = JWTManager(app)

# Initialize Bcrypt
bcrypt = Bcrypt(app)  # Initialize Bcrypt

@app.route('/')
def index():
    return "Welcome to the Stock Trading App!"

# Register authentication routes
app.register_blueprint(user_bp, url_prefix='/user')
app.register_blueprint(stock_bp, url_prefix='/stocks')  # Add the stock routes
app.register_blueprint(transaction_bp, url_prefix='/transaction')  # Add the stock routes
app.register_blueprint(portfolio_bp, url_prefix='/portfolio')  # Add the stock routes


if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True)
