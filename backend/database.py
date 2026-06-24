import sqlite3

conn = sqlite3.connect("users.db")

cursor = conn.cursor()

# Users Table

cursor.execute("""
CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    password TEXT
)
""")

# Projects Table

cursor.execute("""
CREATE TABLE IF NOT EXISTS projects(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    client_name TEXT,
    email TEXT,
    project_type TEXT,
    budget TEXT,
    description TEXT,
    status TEXT DEFAULT 'Pending',
    file_name TEXT,
    progress INTEGER DEFAULT 0
)
""")

# Notifications Table

cursor.execute("""
CREATE TABLE IF NOT EXISTS notifications(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT,
    message TEXT
)
""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS chats(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sender TEXT,
    receiver TEXT,
    message TEXT
)
""")

conn.commit()

conn.close()

print("Database Created Successfully")