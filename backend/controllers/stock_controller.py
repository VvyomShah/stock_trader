from flask import jsonify
from models.stock import Stock

class StockController:
    @staticmethod
    def get_stock_data(tickers):
        stock_data = Stock.fetch_stock_data(tickers)
        return jsonify(stock_data), 200

    @staticmethod
    def get_tickers():
        tickers_list = Stock.fetch_tickers()  # You will implement this in the Stock model
        return jsonify(tickers_list), 200  # Assuming the tickers are in a simple list format
