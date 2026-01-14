# LearnFlow Project Setup Instructions

This guide provides step-by-step instructions to set up and run the LearnFlow platform locally. The project consists of a **React Frontend** and a **FastAPI Backend**.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js**: [Download Here](https://nodejs.org/) (Version 16+ recommended).
- **Python**: [Download Here](https://www.python.org/) (Version 3.8+ recommended).
- **Git**: [Download Here](https://git-scm.com/).

---

## Part 1: Backend Setup (Python)

The backend handles the database, authentication, and API logic.

### 1. Navigate to the Backend Directory

Open your terminal (Command Prompt, PowerShell, or VS Code Terminal) and move into the backend folder:

```bash
cd backend
```

### 2. Create a Virtual Environment (Optional but Recommended)

It's best practice to use a virtual environment to isolate dependencies.

```bash
# Windows
python -m venv venv
.\venv\Scripts\activate

# Mac/Linux
python3 -m venv venv
source venv/bin/activate
```

_Note: If you skip this, just ensure you have permissions to install packages globally._

### 3. Install Dependencies

Install the required Python libraries listed in `requirements.txt`:

```bash
pip install -r requirements.txt
```

### 4. Initialize the Database

Run the migration script to set up the SQLite database (`sql_app.db`) with the correct tables and columns (including the new `role` column):

```bash
python migrate_db.py
```

_(Optionally, you can populate it with seed data if available, but migration is critical)._

### 5. Start the Backend Server

Run the local server using `uvicorn`. We bind to `127.0.0.1` to ensure stability on Windows.

```bash
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

- The server will be running at: `http://127.0.0.1:8000`
- API Documentation is available at: `http://127.0.0.1:8000/docs`

---

## Part 2: Frontend Setup (React)

The frontend is the user interface of the application.

### 1. Open a New Terminal

Keep the backend running in the first terminal. Open a **new** terminal window for the frontend.

### 2. Navigate to the Frontend Directory

```bash
cd frontend
```

### 3. Install Node Modules

Install the project dependencies defined in `package.json`:

```bash
npm install
```

### 4. Start the Development Server

Run the local development server:

```bash
npm run dev
```

### 5. Access the Application

Open your browser and navigate to the URL shown in the terminal (usually):

- **http://localhost:5173**

---

## Part 3: Using the Application

### Roles

The application supports two user roles:

1.  **Student**: Can browse courses, enroll, and view their dashboard.
2.  **Instructor**: Can manage courses, view analytics, and access the instructor dashboard.

### Registration & Login

1.  Go to `http://localhost:5173/signup`.
2.  Fill in your details.
3.  Select your role: **"Learn (student)"** or **"Teach (instructor)"**.
4.  Click **Create Account**.
5.  You will be redirected to the Login page.
6.  Sign in with your new credentials. You will be automatically redirected to the correct Dashboard based on your role.

---

## Troubleshooting common issues

### "Network Error" during Login/Register

This usually happens if the frontend cannot reach the backend.

- **Fix**: Ensure the backend server is running on port `8000`.
- **Fix**: Ensure your browser isn't blocking `http://127.0.0.1`.
- **Note**: The code is configured to allow Cross-Origin (CORS) requests from `localhost` and `127.0.0.1`.

### "Internal Server Error"

- **Fix**: Make sure you ran `python migrate_db.py` to update the database schema.
- **Fix**: Check the backend terminal for specific error messages (e.g., "no such column").

### "Port already in use"

- **Fix**: If `uvicorn` fails to start, another process might be using port 8000. Kill it using Task Manager or `taskkill /F /IM python.exe` in the terminal, then try again.
