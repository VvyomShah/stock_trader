# backend/controllers/user_controller.py

from flask import jsonify
from models.user import User
from flask_jwt_extended import create_access_token

class UserController:
    @staticmethod
    def register_user(username, password):
        # Check if the user already exists
        existing_user = User.find_by_username(username)
        if existing_user:
            return {"msg": "User already exists"}, 400

        # Create and save the new user
        new_user = User.save(username, password)
        
        return {"msg": "User registered successfully"}, 201
    
    @staticmethod
    def login_user(username, password):
        # Find the user by username
        user = User.find_by_username(username)
        if user is None:
            return {"msg": "User does not exist"}, 404

        # Verify the password
        if not User.verify_password(user, password):
            return {"msg": "Invalid password"}, 401

        # Create a JWT token
        access_token = create_access_token(identity=user[0])  # Assuming user is a tuple and ID is the first element
        return {"access_token": access_token}, 200

    @staticmethod
    def add_balance(user_id, amount):
        try:
            # Check if the amount is valid
            if amount is None or amount <= 0:
                return jsonify({"error": "Invalid amount"}), 400

            # Get the current balance
            current_balance = User.get_balance(user_id)
            current_balance = float(current_balance[0][0]) # Database query returns a nested tuple, need to unpack and covert to float
            if current_balance is None:
                return jsonify({"error": "User not found"}), 404

            # Calculate the new balance
            new_balance = current_balance + amount

            # Update the balance in the database
            User.update_balance(user_id, new_balance)

            # Return success message with updated balance
            return jsonify({"message": "Balance updated successfully", "new_balance": new_balance}), 200

        except Exception as e:
            # Handle any exceptions and return error
            return jsonify({"error": str(e)}), 500

    @staticmethod
    def get_balance(user_id):
        try:
            # Get the current balance
            current_balance = User.get_balance(user_id)
            current_balance = float(current_balance[0][0]) # Database query returns a nested tuple, need to unpack and covert to float
            if current_balance is None:
                return jsonify({"error": "User not found"}), 400
            
            # Return success message with updated balance
            return jsonify({"balance": current_balance}), 200

        except Exception as e:
            # Handle any exceptions and return error
            return jsonify({"error": str(e)}), 500