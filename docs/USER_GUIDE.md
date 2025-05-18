# Essential Energy Automation Hub - User Guide

This guide provides detailed instructions for using the Essential Energy Automation Hub and its tools.

## Table of Contents

- [Landing Page](#landing-page)
- [Comprehensive Name Generator](#comprehensive-name-generator)
  - [Host Naming](#host-naming)
  - [VLAN Naming](#vlan-naming)
  - [Interface Description](#interface-description)
  - [SNMP Location](#snmp-location)
- [Datacenter Inventory](#datacenter-inventory)
- [Access Policy Generator](#access-policy-generator)
- [Database Features](#database-features)

## Landing Page

The landing page serves as the central hub for accessing all tools:

![Landing Page](https://github.com/bahatiaadish/devin_test/raw/main/docs/images/landing_page.png)

### Admin Panel

The admin panel at the top of the landing page allows you to add new tools:

1. **Tool Name**: Enter a descriptive name for the tool
2. **Icon**: Select an appropriate icon from the dropdown
3. **Tool URL**: Enter the HTML filename in the same directory (e.g., `tool_name.html`)
4. **Description**: Enter a brief description of the tool's purpose
5. Click "Add New Tool" to add it to the hub

### Tool Cards

Each tool is displayed as a card with:
- Icon representing the tool's function
- Tool name
- Brief description
- "Open Tool" button to launch the tool
- Delete button to remove the tool from the hub

## Comprehensive Name Generator

The Comprehensive Name Generator supports all Essential Energy naming conventions:

![Name Generator](https://github.com/bahatiaadish/devin_test/raw/main/docs/images/name_generator.png)

### Host Naming

The Host Naming tab follows the `LLLLLSSDDDD####` convention:

- **Site Location**: Select from the dropdown or enter a custom 5-letter code
- **Site Type**: Select from options like DC (Data Center), FS (Field Site), etc.
- **Device Type**: Select from options like RTRW (Router), SWIA (Switch), etc.
- **Starting ID**: Enter a 4-digit starting ID number
- **Quantity**: Specify how many sequential names to generate
- **Description**: Optional field for notes about this name

Click "Generate" to create the name(s) according to the convention.

### VLAN Naming

The VLAN Naming tab supports various VLAN naming conventions:

- **VLAN Type**: Select from options like CORP, SCADA, BYOD_GUEST, etc.
- **Site Location**: Enter the site location code
- **Site Type**: Select the site type
- **Description**: Enter a description for the VLAN
- **VLAN ID**: Enter the VLAN ID number

Click "Generate" to create the VLAN name.

### Interface Description

The Interface Description tab supports physical, logical, and virtual interface naming:

- **Interface Type**: Select from WAN, Physical, Logical, L3, or Virtual
- **Connection Type**: Select the appropriate connection type based on interface type
- **Remote Hostname**: Enter the hostname of the remote device
- **Interface**: Enter the interface identifier
- **Description**: Enter additional description if needed
- **Extension**: Optional field for additional information

Click "Generate" to create the interface description.

### SNMP Location

The SNMP Location tab follows the site-based convention:

- **Site**: Enter the 5-letter site code
- **Site Type**: Select the 2-letter site type code
- **Room**: Enter the communications room description
- **Rack**: Enter the rack identifier
- **RU**: Enter the range of RU numbers
- **Class**: Select the device classification
- **Category**: Select the incident response category (1-5)

Click "Generate" to create the SNMP location string.

## Datacenter Inventory

The Datacenter Inventory tool helps track and manage datacenter components:

![Datacenter Inventory](https://github.com/bahatiaadish/devin_test/raw/main/docs/images/datacenter_inventory.png)

### Features

- **Filtering**: Filter inventory by site location or component role
- **Search**: Search for specific components by name or attribute
- **Sorting**: Sort the inventory table by any column
- **Statistics**: View device distribution by site and role
- **Export/Import**: Download or upload inventory data

### Adding Components

Components are automatically added from the Comprehensive Name Generator when you create host names. You can also manually add components:

1. Click "Add Component" button
2. Fill in the required fields:
   - Hostname
   - Site Location
   - Device Type
   - Role
   - Rack Location
   - Installation Date
3. Click "Save" to add the component to the inventory

## Access Policy Generator

The Access Policy Generator creates standardized access policies:

![Access Policy Generator](https://github.com/bahatiaadish/devin_test/raw/main/docs/images/access_policy.png)

### Creating Policies

1. Select the policy type from the dropdown
2. Enter the source and destination information
3. Select the required access level
4. Add any specific ports or protocols needed
5. Enter a description for the policy
6. Click "Generate Policy" to create the standardized policy

## Database Features

All tools in the Essential Energy Automation Hub share a common database:

### Cross-Browser Synchronization

Data is automatically synchronized between browsers and devices:

- Changes made in one browser are reflected in others
- Data persists even after closing the browser
- Offline changes are synchronized when connection is restored

### Data Management

Each tool provides options for managing its data:

- **Export**: Download data as JSON for backup or sharing
- **Import**: Upload previously exported data
- **Delete**: Remove unwanted entries from the database
- **Edit**: Modify existing entries as needed

### Summary Tab

The Summary tab in each tool shows all generated items:

- View all items in a sortable, filterable table
- Edit items by clicking the edit button
- Delete items by clicking the delete button
- Add descriptions to provide context for each item
