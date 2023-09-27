import sqlite3

def connect_to_database():
    return sqlite3.connect("my_book_database.db")

def initialize_tables():
    connection = connect_to_database()
    cursor = connection.cursor()

    # Create a books table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS books (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            status TEXT
        )
    ''')

    connection.commit()
    connection.close()
