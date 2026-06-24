# Dish Management API

FastAPI and SQLite backend for the Dish Management Dashboard.

## Setup

From the `backend` directory:

```powershell
python -m venv .venv
.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
```

## Initialize and seed the database

```powershell
python seed.py
```

The seed command is idempotent: rerunning it only inserts missing dishes. The
SQLite database is created at `backend/dish_management.db`.

## Run the API

```powershell
python -m uvicorn app.main:app --reload
```

Useful endpoints:

- Health check: <http://127.0.0.1:8000/health>
- Dishes: <http://127.0.0.1:8000/api/dishes>
- Dashboard statistics: <http://127.0.0.1:8000/api/stats>
- Recent activity: <http://127.0.0.1:8000/api/activity>
- Toggle a dish: `PATCH http://127.0.0.1:8000/api/dishes/{id}/toggle`
- Realtime updates: `ws://127.0.0.1:8000/ws`
- OpenAPI documentation: <http://127.0.0.1:8000/docs>
