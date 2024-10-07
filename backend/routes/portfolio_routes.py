# routes/portfolio_routes.py

from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from controllers.portfolio_controller import Portfolio

portfolio_bp = Blueprint('portfolio', __name__)

@portfolio_bp.route('/add', methods=['POST'])
@jwt_required()
def add_stock_route():
    data = request.get_json()
    user_id = get_jwt_identity()  # Fetch user ID from token
    stock_ticker = data.get('stock_ticker')
    quantity = data.get('quantity')

    if not stock_ticker or quantity is None:
        return jsonify({"msg": "Stock ticker and quantity are required"}), 400

    Portfolio.add_stock(user_id, stock_ticker, quantity)
    return jsonify({"msg": "Stock added to portfolio"}), 201

@portfolio_bp.route('/remove', methods=['POST'])
@jwt_required()
def remove_stock_route():
    data = request.get_json()
    user_id = get_jwt_identity()  # Fetch user ID from token
    stock_ticker = data.get('stock_ticker')
    quantity = data.get('quantity')

    if not stock_ticker or quantity is None:
        return jsonify({"msg": "Stock ticker and quantity are required"}), 400

    Portfolio.remove_stock(user_id, stock_ticker, quantity)
    return jsonify({"msg": "Stock removed from portfolio"}), 200

@portfolio_bp.route('/fetchall', methods=['GET'])
@jwt_required()
def fetch_all_route():
    user_id = get_jwt_identity()  # Fetch user ID from token
    stocks = Portfolio.fetch_all(user_id)
    return jsonify(stocks), 200

@portfolio_bp.route('/fetch', methods=['GET'])
@jwt_required()
def fetch_single_stock_route():
    stock_ticker = request.args.get('stock_ticker')
    user_id = get_jwt_identity()  # Fetch user ID from token

    if not stock_ticker:
        return jsonify({"msg": "Stock ticker is required"}), 400

    return Portfolio.fetch_stock(user_id, stock_ticker)
