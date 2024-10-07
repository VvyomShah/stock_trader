# models/portfolio.py

from utilities.db_util import execute_query

class Portfolio:
    @staticmethod
    def add_stock(user_id, stock_ticker, quantity):
        query = """
            INSERT INTO portfolio (user_id, stock_ticker, quantity)
            VALUES (%s, %s, %s)
            ON DUPLICATE KEY UPDATE quantity = quantity + %s
        """
        execute_query(query, (user_id, stock_ticker, quantity, quantity))

    @staticmethod
    def remove_stock(user_id, stock_ticker, quantity):
        query = """
            UPDATE portfolio
            SET quantity = quantity - %s
            WHERE user_id = %s AND stock_ticker = %s
        """
        execute_query(query, (quantity, user_id, stock_ticker))

        # Remove stock from portfolio if quantity is 0
        execute_query("""
            DELETE FROM portfolio WHERE user_id = %s AND stock_ticker = %s AND quantity <= 0
        """, (user_id, stock_ticker))

    @staticmethod
    def fetch_all(user_id):
        query = "SELECT stock_ticker, quantity FROM portfolio WHERE user_id = %s"
        result = execute_query(query, (user_id,), fetch=True)
        return result

    @staticmethod
    def fetch_stock(user_id, stock_ticker):
        query = "SELECT quantity FROM portfolio WHERE user_id = %s AND stock_ticker = %s"
        result = execute_query(query, (user_id, stock_ticker), fetch=True)
        return result  # Return the quantity of the specific stock ticker