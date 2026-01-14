import sqlite3

try:
    conn = sqlite3.connect('sql_app.db')
    cursor = conn.cursor()
    cursor.execute("SELECT id, email, full_name, role FROM users")
    rows = cursor.fetchall()
    print("ID | Email | Name | Role")
    for row in rows:
        print(f"{row[0]} | {row[1]} | {row[2]} | {row[3]}")
    conn.close()
except Exception as e:
    print(e)
