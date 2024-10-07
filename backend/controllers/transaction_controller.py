from flask import jsonify
from models.transaction import Transaction
from models.user import User
from models.stock import Stock
from models.portfolio import Portfolio
from datetime import datetime

class TransactionController:
    @staticmethod
    def buy_stock(user_id, stock_ticker, quantity):
        # Fetch stock data and ensure it's in the correct format
        valid_tickers = Stock.fetch_tickers()
        stock_data = Stock.fetch_stock_data(stock_ticker)

        # Check if stock data is returned correctly
        if stock_ticker not in valid_tickers:
            return jsonify({"msg": "Stock data not found"}), 404
        

        try:
            # Access the 'Close' price using the stock ticker and the first timestamp
            current_price = stock_data['Close']
        except KeyError:
            return jsonify({"error": f"Ticker {stock_ticker} not found"}), 404
        
        total_price = current_price * quantity  # Total cost for the purchase
        user = User.get_user_by_id(user_id)  # Get the user's current information
        current_balance = int(user[0][3])

        # Check if the user has enough balance to buy the stock
        if current_balance < total_price:  # Assuming balance is in the fourth column of user data
            return jsonify({"msg": "Insufficient balance"}), 400

        # Update the user's balance after the purchase
        new_balance = current_balance - total_price
        User.update_balance(user_id, new_balance)  # Update the balance in the database

        # Record the buy transaction
        Transaction.save(user_id, stock_ticker, quantity, current_price, 'buy')

        # Add stock to portfolio after successful purchase
        Portfolio.add_stock(user_id, stock_ticker, quantity)  # Add the stock to the portfolio

        return jsonify({"msg": "Stock bought successfully", "new_balance": new_balance}), 200

    @staticmethod
    def sell_stock(user_id, stock_ticker, quantity):
        # Check the user's portfolio for the stock quantity
        portfolio = Portfolio.fetch_all(user_id)  # Get all stocks in the portfolio
        stock_in_portfolio = next((item for item in portfolio if item[0] == stock_ticker), None)

        if stock_in_portfolio is None or stock_in_portfolio[1] < quantity:
            return jsonify({"msg": "Insufficient stock quantity to sell"}), 400

        stock_data = Stock.fetch_stock_data(stock_ticker)
        try:
            # Access the 'Close' price using the stock ticker and the first timestamp
            current_price = stock_data['Close']
        except KeyError:
            return jsonify({"error": f"Ticker {stock_ticker} not found"}), 404

        total_sale_price = current_price * quantity  # Total value of the stocks to be sold
        user = User.get_user_by_id(user_id)  # Get the user's current information

        # Update the user's balance after the sale
        current_balance = int(user[0][3])
        new_balance = current_balance + total_sale_price
        User.update_balance(user_id, new_balance)  # Update the balance in the database

        # Record the sell transaction
        Transaction.save(user_id, stock_ticker, quantity, current_price, 'sell')

        # Subtract the sold quantity from the portfolio
        Portfolio.remove_stock(user_id, stock_ticker, quantity)  # Remove quantity from the portfolio

        return jsonify({"msg": "Stock sold successfully", "new_balance": new_balance}), 200
    
    @staticmethod
    def fetch_history(user_id):
        # Fetch the last 5 transactions for the user
        transactions = Transaction.fetch_history(user_id)
        if transactions:
            return jsonify({"transactions": transactions}), 200
        else:
            return jsonify({"msg": "No transactions found"}), 404