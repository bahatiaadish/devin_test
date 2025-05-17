# Essential Energy Automation Hub Backend

This is the backend API for the Essential Energy Automation Hub. It provides a file-based database solution using FastAPI and SQLite.

## Requirements

- Python 3.8 or higher
- FastAPI
- SQLAlchemy
- Uvicorn

## Installation

1. Install the required packages:

```bash
pip install -r requirements.txt
```

## Running the Server

1. Start the server:

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

2. The API will be available at http://localhost:8000

## API Documentation

Once the server is running, you can access the API documentation at:

- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc
