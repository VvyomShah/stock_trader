# controllers/portfolio_controller.py

from flask import jsonify
from models.portfolio import Portfolio

class PortfolioController:
    @staticmethod
    def add_stock(user_id, stock_ticker, quantity):
        if quantity <= 0:
            return jsonify({"error": "Quantity must be greater than 0"}), 400
        
        Portfolio.add_stock(user_id, stock_ticker, quantity)
        return jsonify({"message": "Stock added to portfolio"}), 200

    @staticmethod
    def remove_stock(user_id, stock_ticker, quantity):
        if quantity <= 0:
            return jsonify({"error": "Quantity must be greater than 0"}), 400
        
        Portfolio.remove_stock(user_id, stock_ticker, quantity)
        return jsonify({"message": "Stock removed from portfolio"}), 200

    @staticmethod
    def fetch_all(user_id):
        portfolio = Portfolio.fetch_all(user_id)
        return jsonify(portfolio), 200
    
    @staticmethod
    def fetch_stock(user_id, stock_ticker):
        stock_data = Portfolio.fetch_stock(user_id, stock_ticker)
        if stock_data:
            return jsonify({"stock_ticker": stock_ticker, "quantity": stock_data[0][0]}), 200  # Return the quantity
        else:
            return jsonify({"error": "Stock ticker not found in portfolio"}), 404

