# models/user.py
from utilities.db_util import execute_query
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt()

class User:
    @staticmethod
    def get_all_users():
        return execute_query("SELECT * FROM users", fetch=True)  # Correctly fetching results

    @staticmethod
    def get_user_by_id(user_id):
        return execute_query("SELECT * FROM users WHERE id = %s", (user_id,), fetch=True)  # Correctly fetching results

    @staticmethod
    def save(username, password, balance=0):
        # Hash the password before saving
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        execute_query("INSERT INTO users (username, password, balance) VALUES (%s, %s, %s)",
                    (username, hashed_password, balance))

    @staticmethod
    def update_balance(user_id, amount):
        execute_query("UPDATE users SET balance = %s WHERE id = %s", (amount, user_id))  # No fetch needed

    @staticmethod
    def get_balance(user_id):
        return execute_query("SELECT balance from users WHERE id = %s", (user_id), fetch=True)

    @staticmethod
    def delete_user(user_id):
        execute_query("DELETE FROM users WHERE id = %s", (user_id,))  # No fetch needed

    @staticmethod
    def register(username, password):
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        query = "INSERT INTO users (username, password, balance) VALUES (%s, %s, 10000.00)"
        return execute_query(query, (username, hashed_password))  # No fetch needed

    @staticmethod
    def find_by_username(username):
        query = "SELECT * FROM users WHERE username = %s"
        result = execute_query(query, (username,), fetch=True)  # Correctly fetching results
        return result[0] if result else None

    @staticmethod
    def verify_password(user, password):
        return bcrypt.check_password_hash(user[2], password)  # Assuming password is in the third column