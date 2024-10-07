from flask import Blueprint, request
from flask_jwt_extended import jwt_required
from controllers.stock_controller import StockController

stock_bp = Blueprint('stock', __name__)

@stock_bp.route('/getstocks', methods=['POST'])  # Changed to POST to receive a list in the body
@jwt_required()  # Protect this route
def get_stocks():
    data = request.get_json()  # Expecting a JSON body
    print(data)
    tickers = data.get('tickers')  # Retrieve the tickers list
    if not tickers or not isinstance(tickers, list):
        return {"msg": "No valid tickers provided"}, 400  # Validate the input
    return StockController.get_stock_data(tickers)

@stock_bp.route('/tickers', methods=['GET'])
@jwt_required()  # Protect this route
def get_tickers():
    return StockController.get_tickers()