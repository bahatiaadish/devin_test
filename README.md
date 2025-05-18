# Essential Energy Automation Hub

A centralized platform for Essential Energy's automation tools and name generators with persistent cross-browser storage.

## Overview

The Essential Energy Automation Hub provides a unified interface for accessing various network automation tools and name generators. It features a professional design with a blue-green gradient header, dynamic tool management, and persistent storage across browsers using a file-based database solution.

## Features

- **Professional Landing Page**: Clean, modern interface with blue-green gradient styling
- **Dynamic Tool Management**: Add new tools through the admin panel as they become available
- **Comprehensive Name Generator**: Generate standardized names using all Essential Energy naming conventions
- **Datacenter Inventory Tool**: Track and manage datacenter inventory with automatic hardware detection
- **File-Based Database**: Persistent storage across browsers using SQLite and FastAPI
- **Cross-Browser Synchronization**: Seamless data sharing between different browsers and devices
- **Offline Support**: Fallback to localStorage when backend is unavailable

## Tools Included

1. **Comprehensive Name Generator**
   - Supports all Essential Energy naming conventions
   - Generates host names, VLAN names, interface descriptions, and more
   - Includes quantity option for generating multiple sequential names
   - Saves generated names to the shared database

2. **Datacenter Inventory**
   - Maps hostnames to hardware details
   - Provides filtering by site location and component role
   - Displays statistics on device distribution
   - Supports importing and exporting inventory data

3. **Access Policy Generator**
   - Creates standardized access policies for network security
   - Follows Essential Energy security guidelines
   - Saves policies to the shared database

## Requirements

- Python 3.8 or higher
- Modern web browser (Chrome, Firefox, Edge, or Safari)
- 50MB of disk space for the database

## Quick Start

1. Clone the repository:
   ```
   git clone https://github.com/bahatiaadish/devin_test.git
   cd devin_test
   ```

2. Install backend requirements:
   ```
   cd backend
   pip install -r requirements.txt
   cd ..
   ```

3. Run both servers:
   ```
   ./run_servers.sh
   ```

4. Access the hub at http://localhost:8080

## Documentation

For detailed setup instructions and usage guides, see the [Setup Guide](docs/SETUP.md) and [User Guide](docs/USER_GUIDE.md).

## License

Copyright © 2025 Essential Energy. All rights reserved.
