import sqlite3

def migrate():
    conn = sqlite3.connect('sql_app.db')
    cursor = conn.cursor()
    
    # helper to add column if not exists
    def add_column(table, column, type_def):
        try:
            cursor.execute(f"ALTER TABLE {table} ADD COLUMN {column} {type_def}")
            print(f"Added column {column} to {table}")
        except sqlite3.OperationalError as e:
            if "duplicate column name" in str(e).lower():
                print(f"Column {column} already exists in {table}")
            else:
                raise e

    add_column("users", "daily_goal_completed", "INTEGER DEFAULT 0")
    add_column("users", "daily_goal_date", "DATE")
    add_column("enrollments", "last_lesson", "TEXT")
    add_column("users", "role", "TEXT DEFAULT 'student'")
    
    conn.commit()
    conn.close()
    print("Migration complete")

if __name__ == "__main__":
    migrate()
