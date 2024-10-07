import yfinance as yf
import pandas as pd

class Stock:
    popular_tickers = [
        'AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA', 'FB', 'BRK.B', 'JNJ', 'V', 'JPM'
    ]

    @staticmethod
    def fetch_stock_data(tickers):
        # Fetch the data using yfinance
        data = yf.download(tickers, period='1d', group_by='ticker')
        return data.iloc[0].to_dict()

    @staticmethod
    def fetch_tickers():
        return Stock.popular_tickers
