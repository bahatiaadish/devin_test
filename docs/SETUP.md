# Essential Energy Automation Hub - Setup Guide

This document provides detailed instructions for setting up and using the Essential Energy Automation Hub.

## Table of Contents

- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Running the Application](#running-the-application)
- [Tool Usage](#tool-usage)
  - [Adding New Tools](#adding-new-tools)
  - [Using the Comprehensive Name Generator](#using-the-comprehensive-name-generator)
  - [Using the Datacenter Inventory Tool](#using-the-datacenter-inventory-tool)
- [Database Management](#database-management)
- [Troubleshooting](#troubleshooting)

## Installation

### Prerequisites

Before installing the Essential Energy Automation Hub, ensure you have the following:

- Python 3.8 or higher
- pip (Python package manager)
- Git (for cloning the repository)
- Modern web browser (Chrome, Firefox, Edge, or Safari)

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/bahatiaadish/devin_test.git
   cd devin_test
   ```

2. Install backend dependencies:
   ```bash
   cd backend
   pip install -r requirements.txt
   cd ..
   ```

   This will install:
   - FastAPI
   - Uvicorn
   - SQLAlchemy
   - Pydantic
   - Python-multipart

### Frontend Setup

The frontend is HTML/CSS/JavaScript based and doesn't require any additional installation steps. All necessary files are included in the repository.

## Running the Application

The easiest way to run both the backend and frontend servers is using the provided script:

```bash
./run_servers.sh
```

This will start:
- The backend server at http://localhost:8001
- The frontend server at http://localhost:8080

You can then access the Essential Energy Automation Hub by opening http://localhost:8080 in your web browser.

To stop both servers, press `Ctrl+C` in the terminal where you started them.

### Manual Startup

If you prefer to start the servers manually:

1. Start the backend server:
   ```bash
   cd backend
   python -m uvicorn main:app --reload --host 0.0.0.0 --port 8001
   ```

2. In a separate terminal, start the frontend server:
   ```bash
   cd frontend/essential_energy_hub
   python -m http.server 8080
   ```

## Tool Usage

### Adding New Tools

To add a new tool to the hub:

1. Access the admin panel at the top of the landing page
2. Fill in the required fields:
   - **Tool Name**: A descriptive name for the tool
   - **Icon**: Select an appropriate icon from the dropdown
   - **Tool URL**: Enter the HTML filename in the same directory (e.g., `tool_name.html`)
   - **Description**: A brief description of the tool's purpose
3. Click "Add New Tool"

The new tool will appear in the tools section below.

### Using the Comprehensive Name Generator

The Comprehensive Name Generator supports all Essential Energy naming conventions:

1. Click "Open Tool" on the Comprehensive Generator card
2. Select the naming convention tab you want to use
3. Fill in the required fields for that convention
4. For Host Naming, you can set a quantity to generate multiple names with sequential IDs
5. Click "Generate"
6. View your generated names in the history table
7. Use the copy button to copy names to clipboard

### Using the Datacenter Inventory Tool

The Datacenter Inventory tool helps track and manage datacenter components:

1. Click "Open Tool" on the Datacenter Inventory card
2. Use the filters to narrow down the inventory by site location or component role
3. View the inventory table showing all components
4. Click on a component to see detailed information
5. Use the "Download Database" button to export the inventory
6. Use the "Upload Database" button to import inventory data

## Database Management

The Essential Energy Automation Hub uses a file-based SQLite database for persistent storage:

- Database file location: `backend/energy_hub.db`
- API endpoints are available at http://localhost:8001/docs

### Backup and Restore

To backup the database:

1. Stop the servers if they're running
2. Copy the `backend/energy_hub.db` file to a safe location
3. Restart the servers

To restore from a backup:

1. Stop the servers if they're running
2. Replace the `backend/energy_hub.db` file with your backup
3. Restart the servers

## Troubleshooting

### Common Issues

**Issue**: The frontend can't connect to the backend
- **Solution**: Ensure the backend server is running at http://localhost:8001
- **Check**: Open http://localhost:8001/docs in your browser to verify the API is accessible

**Issue**: Changes aren't being saved to the database
- **Solution**: Check that the database file is writable
- **Check**: Look for error messages in the backend server console

**Issue**: Tools aren't appearing on the landing page
- **Solution**: Clear your browser cache and reload the page
- **Check**: Verify that the tool HTML files exist in the frontend directory

**Issue**: Database synchronization issues
- **Solution**: Restart both servers to reset the connection
- **Check**: Verify that the database file isn't corrupted

### Getting Help

If you encounter issues not covered in this guide, please contact the Essential Energy IT support team or open an issue on the GitHub repository.
