import sqlite3

def update_role(email):
    try:
        conn = sqlite3.connect('sql_app.db')
        cursor = conn.cursor()
        cursor.execute("UPDATE users SET role = 'instructor' WHERE email = ?", (email,))
        if cursor.rowcount > 0:
            print(f"Updated {email} to instructor")
        else:
            print(f"User {email} not found")
        conn.commit()
        conn.close()
    except Exception as e:
        print(f"Error: {e}")

update_role('reed@gmail.com')
update_role('ralph@gmail.com')
