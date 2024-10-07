# db_util.py

from contextlib import contextmanager
from database import db  # Replace 'your_database_file' with the actual file name where db is defined

@contextmanager
def db_connection():
    conn = db.connect()
    try:
        yield conn
    finally:
        conn.close()

def execute_query(query, params=None, fetch=False):
    """
    Executes a query on the database.

    :param query: SQL query to execute.
    :param params: Parameters to bind to the query.
    :param fetch: Whether to fetch results (for SELECT queries).
    :return: Fetched results if fetch is True, else None.
    """
    with db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute(query, params or ())

        if fetch:
            result = cursor.fetchall()
            cursor.close()
            return result

        conn.commit()
        cursor.close()
