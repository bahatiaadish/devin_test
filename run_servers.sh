#!/bin/bash

echo "Starting backend server..."
cd backend
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000 &
BACKEND_PID=$!

echo "Starting frontend server..."
cd ../frontend/essential_energy_hub
python -m http.server 8080 &
FRONTEND_PID=$!

echo "Servers started! Frontend: http://localhost:8080, Backend: http://localhost:8000"
echo "Press Ctrl+C to stop both servers"

trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait
