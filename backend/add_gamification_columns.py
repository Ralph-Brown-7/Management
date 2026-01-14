import sqlite3

def migrate_db():
    conn = sqlite3.connect('sql_app.db')
    cursor = conn.cursor()
    
    try:
        cursor.execute("ALTER TABLE users ADD COLUMN level INTEGER DEFAULT 1")
        print("Added 'level' column.")
    except sqlite3.OperationalError as e:
        print(f"Skipping 'level' (might exist): {e}")

    try:
        cursor.execute("ALTER TABLE users ADD COLUMN xp INTEGER DEFAULT 0")
        print("Added 'xp' column.")
    except sqlite3.OperationalError as e:
        print(f"Skipping 'xp' (might exist): {e}")
        
    conn.commit()
    conn.close()

if __name__ == "__main__":
    migrate_db()
