import os
import database

print(f"Current Working Directory: {os.getcwd()}")
print(f"Database URL in code: {database.SQLALCHEMY_DATABASE_URL}")
print(f"Absolute path to 'sql_app.db' in CWD: {os.path.abspath('sql_app.db')}")

# Check where the actual file is
if os.path.exists("sql_app.db"):
    print("sql_app.db FOUND in CWD")
else:
    print("sql_app.db NOT FOUND in CWD")
