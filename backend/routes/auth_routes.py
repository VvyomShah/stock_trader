from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from controllers.user_controller import UserController
user_bp = Blueprint('user', __name__)

@user_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"msg": "Username and password are required"}), 400

    return jsonify(UserController.register_user(username, password))  # Call the controller function

@user_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"msg": "Username and password are required"}), 400

    return jsonify(UserController.login_user(username, password))  # Call the controller function

@user_bp.route('/addbalance', methods=['POST'])
@jwt_required()  # Protect this route
def add_balance_route():
    data = request.get_json()
    amount = data.get('amount')

    if amount is None:
        return jsonify({"msg": "Amount is required"}), 400

    user_id = get_jwt_identity()  # Fetch the user ID from the token

    return UserController.add_balance(user_id, amount)  # Call the controller function

@user_bp.route('/balance', methods=['GET'])
@jwt_required()  # Protect this route
def get_balance_route():
    user_id = get_jwt_identity()  # Fetch the user ID from the token
    return UserController.get_balance(user_id)  # Call the controller function