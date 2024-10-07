import os
from flask import Flask
from flaskext.mysql import MySQL
from dotenv import load_dotenv

load_dotenv()

db = MySQL()

def init_db(app: Flask):
    app.config['MYSQL_DATABASE_HOST'] = os.getenv('MYSQL_DATABASE_HOST')
    app.config['MYSQL_DATABASE_PORT'] = int(os.getenv('MYSQL_DATABASE_PORT'))
    app.config['MYSQL_DATABASE_USER'] = os.getenv('MYSQL_DATABASE_USER')
    app.config['MYSQL_DATABASE_PASSWORD'] = os.getenv('MYSQL_DATABASE_PASSWORD')
    app.config['MYSQL_DATABASE_DB'] = os.getenv('MYSQL_DATABASE_DB')

    db.init_app(app)

    # Test connection
    with app.app_context():
        try:
            connection = db.connect()
            print(f"Connected to the database: {connection}")
            connection.close()  # Close the connection after testing
        except Exception as e:
            print(f"Error establishing connection: {e}")
