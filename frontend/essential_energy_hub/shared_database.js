/**
 * Essential Energy Automation Hub - Shared Database Library
 * This library provides shared database functionality for all Essential Energy Automation Hub tools.
 */

const DB_CONFIG = {
    VERSION: 1,
    API_URL: 'http://localhost:8001/api',
    KEY_PREFIX: 'essential_energy_db_',
    TOOLS: {
        COMPREHENSIVE_GENERATOR: 'comprehensive_generator',
        DEVICES_GENERATOR: 'devices_generator',
        TENANT_GENERATOR: 'tenant_generator',
        ACCESS_POLICIES: 'access_policies',
        L3OUT: 'l3out'
    }
};

/**
 * Initialize the database for a specific tool
 * @param {string} toolId - The ID of the tool using the database
 * @returns {Promise} - Resolves when the database is initialized
 */
function initDatabase(toolId) {
    if (!DB_CONFIG.TOOLS[toolId.toUpperCase()]) {
        console.error(`Invalid tool ID: ${toolId}`);
        return Promise.reject(`Invalid tool ID: ${toolId}`);
    }
    
    return fetch(`${DB_CONFIG.API_URL}/init/${toolId}`, {
        method: 'POST'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Failed to initialize database: ${response.statusText}`);
        }
        return response.json();
    })
    .catch(error => {
        console.error(`Error initializing database via API: ${error}`);
        console.warn('Falling back to localStorage');
        
        const toolDbKey = `${DB_CONFIG.KEY_PREFIX}${toolId}`;
        
        if (!localStorage.getItem(toolDbKey)) {
            localStorage.setItem(toolDbKey, JSON.stringify({
                version: DB_CONFIG.VERSION,
                records: [],
                lastUpdated: new Date().toISOString()
            }));
        }
        
        return Promise.resolve();
    });
}

/**
 * Save a record to the database for a specific tool
 * @param {string} toolId - The ID of the tool using the database
 * @param {object} record - The record to save
 * @returns {Promise} - Resolves with the ID of the saved record
 */
function saveRecord(toolId, record) {
    if (!DB_CONFIG.TOOLS[toolId.toUpperCase()]) {
        console.error(`Invalid tool ID: ${toolId}`);
        return Promise.reject(`Invalid tool ID: ${toolId}`);
    }
    
    return fetch(`${DB_CONFIG.API_URL}/records/${toolId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(record)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Failed to save record: ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        return data.id;
    })
    .catch(error => {
        console.error(`Error saving record via API: ${error}`);
        console.warn('Falling back to localStorage');
        
        const toolDbKey = `${DB_CONFIG.KEY_PREFIX}${toolId}`;
        
        try {
            const db = JSON.parse(localStorage.getItem(toolDbKey));
            
            const newRecord = {
                ...record,
                id: Date.now() + Math.floor(Math.random() * 1000), // Generate unique ID
                dateCreated: new Date().toISOString()
            };
            
            db.records.push(newRecord);
            db.lastUpdated = new Date().toISOString();
            
            localStorage.setItem(toolDbKey, JSON.stringify(db));
            
            return Promise.resolve(newRecord.id);
        } catch (error) {
            console.error(`Error saving record to localStorage: ${error}`);
            return Promise.reject(`Error saving record: ${error}`);
        }
    });
}

/**
 * Load all records for a specific tool
 * @param {string} toolId - The ID of the tool using the database
 * @returns {Promise} - Resolves with an array of records
 */
function loadRecords(toolId) {
    if (!DB_CONFIG.TOOLS[toolId.toUpperCase()]) {
        console.error(`Invalid tool ID: ${toolId}`);
        return Promise.reject(`Invalid tool ID: ${toolId}`);
    }
    
    return fetch(`${DB_CONFIG.API_URL}/records/${toolId}`)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Failed to load records: ${response.statusText}`);
        }
        return response.json();
    })
    .catch(error => {
        console.error(`Error loading records from API: ${error}`);
        console.warn('Falling back to localStorage');
        
        const toolDbKey = `${DB_CONFIG.KEY_PREFIX}${toolId}`;
        
        try {
            const db = JSON.parse(localStorage.getItem(toolDbKey));
            return Promise.resolve(db.records);
        } catch (error) {
            console.error(`Error loading records from localStorage: ${error}`);
            return Promise.reject(`Error loading records: ${error}`);
        }
    });
}

/**
 * Update a record in the database for a specific tool
 * @param {string} toolId - The ID of the tool using the database
 * @param {number} id - The ID of the record to update
 * @param {object} updates - The updates to apply to the record
 * @returns {Promise} - Resolves when the record is updated
 */
function updateRecord(toolId, id, updates) {
    if (!DB_CONFIG.TOOLS[toolId.toUpperCase()]) {
        console.error(`Invalid tool ID: ${toolId}`);
        return Promise.reject(`Invalid tool ID: ${toolId}`);
    }
    
    return fetch(`${DB_CONFIG.API_URL}/records/${toolId}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updates)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Failed to update record: ${response.statusText}`);
        }
        return response.json();
    })
    .catch(error => {
        console.error(`Error updating record via API: ${error}`);
        console.warn('Falling back to localStorage');
        
        const toolDbKey = `${DB_CONFIG.KEY_PREFIX}${toolId}`;
        
        try {
            const db = JSON.parse(localStorage.getItem(toolDbKey));
            const recordIndex = db.records.findIndex(record => record.id === id);
            
            if (recordIndex === -1) {
                return Promise.reject(`Record with ID ${id} not found`);
            }
            
            db.records[recordIndex] = {
                ...db.records[recordIndex],
                ...updates,
                lastUpdated: new Date().toISOString()
            };
            
            db.lastUpdated = new Date().toISOString();
            localStorage.setItem(toolDbKey, JSON.stringify(db));
            
            return Promise.resolve();
        } catch (error) {
            console.error(`Error updating record in localStorage: ${error}`);
            return Promise.reject(`Error updating record: ${error}`);
        }
    });
}

/**
 * Delete a record from the database for a specific tool
 * @param {string} toolId - The ID of the tool using the database
 * @param {number} id - The ID of the record to delete
 * @returns {Promise} - Resolves when the record is deleted
 */
function deleteRecord(toolId, id) {
    if (!DB_CONFIG.TOOLS[toolId.toUpperCase()]) {
        console.error(`Invalid tool ID: ${toolId}`);
        return Promise.reject(`Invalid tool ID: ${toolId}`);
    }
    
    return fetch(`${DB_CONFIG.API_URL}/records/${toolId}/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Failed to delete record: ${response.statusText}`);
        }
        return response.json();
    })
    .catch(error => {
        console.error(`Error deleting record via API: ${error}`);
        console.warn('Falling back to localStorage');
        
        const toolDbKey = `${DB_CONFIG.KEY_PREFIX}${toolId}`;
        
        try {
            const db = JSON.parse(localStorage.getItem(toolDbKey));
            const recordIndex = db.records.findIndex(record => record.id === id);
            
            if (recordIndex === -1) {
                return Promise.reject(`Record with ID ${id} not found`);
            }
            
            db.records = db.records.filter(record => record.id !== id);
            
            db.lastUpdated = new Date().toISOString();
            localStorage.setItem(toolDbKey, JSON.stringify(db));
            
            return Promise.resolve();
        } catch (error) {
            console.error(`Error deleting record from localStorage: ${error}`);
            return Promise.reject(`Error deleting record: ${error}`);
        }
    });
}

/**
 * Download the entire database as a JSON file
 * @returns {Promise} - Resolves with true if download was initiated successfully
 */
function downloadDatabase() {
    return fetch(`${DB_CONFIG.API_URL}/database/download`)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Failed to download database: ${response.statusText}`);
        }
        return response.json();
    })
    .then(completeDb => {
        const dataStr = JSON.stringify(completeDb, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        
        const exportFileDefaultName = `essential_energy_db_${new Date().toISOString().slice(0, 10)}.json`;
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
        
        return true;
    })
    .catch(error => {
        console.error(`Error downloading database from API: ${error}`);
        console.warn('Falling back to localStorage');
        
        try {
            const completeDb = {};
            
            for (const toolKey in DB_CONFIG.TOOLS) {
                const toolId = DB_CONFIG.TOOLS[toolKey];
                const toolDbKey = `${DB_CONFIG.KEY_PREFIX}${toolId}`;
                
                if (localStorage.getItem(toolDbKey)) {
                    completeDb[toolId] = JSON.parse(localStorage.getItem(toolDbKey));
                }
            }
            
            const dataStr = JSON.stringify(completeDb, null, 2);
            const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
            
            const exportFileDefaultName = `essential_energy_db_${new Date().toISOString().slice(0, 10)}.json`;
            
            const linkElement = document.createElement('a');
            linkElement.setAttribute('href', dataUri);
            linkElement.setAttribute('download', exportFileDefaultName);
            linkElement.click();
            
            return Promise.resolve(true);
        } catch (error) {
            console.error(`Error downloading database from localStorage: ${error}`);
            alert(`Error downloading database: ${error}`);
            return Promise.resolve(false);
        }
    });
}

/**
 * Upload a database JSON file
 * @param {File} file - The JSON file to upload
 * @returns {Promise} - Resolves when the database is uploaded and processed
 */
function uploadDatabase(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onload = function(event) {
            try {
                const jsonData = JSON.parse(event.target.result);
                const uploadPromises = [];
                
                for (const toolId in jsonData) {
                    const toolDbKey = `${DB_CONFIG.KEY_PREFIX}${toolId}`;
                    
                    if (Object.values(DB_CONFIG.TOOLS).includes(toolId)) {
                        localStorage.setItem(toolDbKey, JSON.stringify(jsonData[toolId]));
                        
                        if (jsonData[toolId] && jsonData[toolId].records && jsonData[toolId].records.length > 0) {
                            uploadPromises.push(
                                fetch(`${DB_CONFIG.API_URL}/records/${toolId}`)
                                .then(response => {
                                    if (!response.ok) {
                                        throw new Error(`Failed to get records: ${response.statusText}`);
                                    }
                                    return response.json();
                                })
                                .then(existingRecords => {
                                    const deletePromises = existingRecords.map(record => 
                                        fetch(`${DB_CONFIG.API_URL}/records/${toolId}/${record.id}`, {
                                            method: 'DELETE'
                                        })
                                    );
                                    
                                    return Promise.all(deletePromises);
                                })
                                .then(() => {
                                    const addPromises = jsonData[toolId].records.map(record => {
                                        const recordData = {
                                            name: record.name,
                                            conventionType: record.conventionType,
                                            details: record.details,
                                            userDescription: record.userDescription
                                        };
                                        
                                        return fetch(`${DB_CONFIG.API_URL}/records/${toolId}`, {
                                            method: 'POST',
                                            headers: {
                                                'Content-Type': 'application/json'
                                            },
                                            body: JSON.stringify(recordData)
                                        });
                                    });
                                    
                                    return Promise.all(addPromises);
                                })
                                .catch(error => {
                                    console.error(`Error syncing tool ${toolId} with backend: ${error}`);
                                    console.warn('Data saved to localStorage only');
                                })
                            );
                        }
                    }
                }
                
                Promise.all(uploadPromises)
                    .then(() => {
                        console.log('Database uploaded and synced with backend server');
                        resolve();
                    })
                    .catch(error => {
                        console.error(`Error during database sync: ${error}`);
                        console.warn('Data may be partially synced');
                        resolve(); // Still resolve since localStorage was updated
                    });
                
            } catch (error) {
                console.error(`Error uploading database: ${error}`);
                reject(`Error uploading database: ${error}`);
            }
        };
        
        reader.onerror = function() {
            reject('Error reading file');
        };
        
        reader.readAsText(file);
    });
}

/**
 * Get the last updated timestamp for a specific tool
 * @param {string} toolId - The ID of the tool
 * @returns {Promise} - Resolves with the last updated timestamp
 */
function getLastUpdatedTimestamp(toolId) {
    if (!DB_CONFIG.TOOLS[toolId.toUpperCase()]) {
        console.error(`Invalid tool ID: ${toolId}`);
        return Promise.reject(`Invalid tool ID: ${toolId}`);
    }
    
    return fetch(`${DB_CONFIG.API_URL}/last-updated/${toolId}`)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Failed to get timestamp: ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        return data.lastUpdated;
    })
    .catch(error => {
        console.error(`Error getting timestamp from API: ${error}`);
        console.warn('Falling back to localStorage');
        
        const toolDbKey = `${DB_CONFIG.KEY_PREFIX}${toolId}`;
        
        try {
            const db = JSON.parse(localStorage.getItem(toolDbKey));
            return Promise.resolve(db.lastUpdated);
        } catch (error) {
            console.error(`Error getting timestamp from localStorage: ${error}`);
            return Promise.reject(`Error getting timestamp: ${error}`);
        }
    });
}
