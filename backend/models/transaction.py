from utilities.db_util import execute_query

class Transaction:
    @staticmethod
    def save(user_id, stock_ticker, quantity, price, transaction_type):
        query = """
            INSERT INTO transactions (user_id, stock_ticker, quantity, price, transaction_type)
            VALUES (%s, %s, %s, %s, %s)
        """
        execute_query(query, (user_id, stock_ticker, quantity, price, transaction_type))

    @staticmethod
    def get_transactions_by_user(user_id):
        query = "SELECT * FROM transactions WHERE user_id = %s"
        return execute_query(query, (user_id,), fetch=True)
    
    @staticmethod
    def fetch_history(user_id):
        query = """
            SELECT stock_ticker, quantity, price, transaction_type, transaction_date 
            FROM transactions 
            WHERE user_id = %s 
            ORDER BY transaction_date DESC 
            LIMIT 5
        """
        result = execute_query(query, (user_id,), fetch=True)
        return result  # Return the list of last 5 transactions