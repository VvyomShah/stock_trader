from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from controllers.transaction_controller import TransactionController

transaction_bp = Blueprint('transaction', __name__)

@transaction_bp.route('/buy', methods=['POST'])
@jwt_required()
def buy_stock():
    user_id = get_jwt_identity()
    data = request.get_json()
    stock_ticker = data.get('stock_ticker')
    quantity = data.get('quantity')

    if not stock_ticker or not quantity:
        return jsonify({"msg": "Stock ticker and number of shares are required"}), 400

    return TransactionController.buy_stock(user_id, stock_ticker, quantity)

@transaction_bp.route('/sell', methods=['POST'])
@jwt_required()
def sell_stock():
    user_id = get_jwt_identity()
    data = request.get_json()
    stock_ticker = data.get('stock_ticker')
    quantity = data.get('quantity')

    if not stock_ticker or not quantity:
        return jsonify({"msg": "Stock ticker and number of shares are required"}), 400

    return TransactionController.sell_stock(user_id, stock_ticker, quantity)

@transaction_bp.route('/history', methods=['GET'])
@jwt_required()
def fetch_history():
    user_id = get_jwt_identity()
    return TransactionController.fetch_history(user_id)