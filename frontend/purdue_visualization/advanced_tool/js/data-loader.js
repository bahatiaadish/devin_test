
let applicationData = [];
let purdueData = [];
let networkZoneData = [];
let siteTypeData = [];
let dcTypeData = [];

async function loadAllData() {
    try {
        await Promise.all([
            loadApplicationData(),
            loadPurdueData(),
            loadNetworkZoneData(),
            loadSiteTypeData(),
            loadDCTypeData()
        ]);
        console.log('All data loaded successfully');
        return true;
    } catch (error) {
        console.error('Error loading data:', error);
        return false;
    }
}

async function loadApplicationData() {
    try {
        const response = await fetch('data/comprehensive_application_classification.csv');
        const csvText = await response.text();
        applicationData = parseCSV(csvText);
        console.log(`Loaded ${applicationData.length} application records`);
    } catch (error) {
        console.error('Error loading application data:', error);
        throw error;
    }
}

async function loadPurdueData() {
    try {
        const response = await fetch('data/purdue_levels.csv');
        const csvText = await response.text();
        purdueData = parseCSV(csvText);
        console.log(`Loaded ${purdueData.length} Purdue level records`);
    } catch (error) {
        console.error('Error loading Purdue data:', error);
        throw error;
    }
}

async function loadNetworkZoneData() {
    try {
        const response = await fetch('data/network_zone_assessment.csv');
        const csvText = await response.text();
        networkZoneData = parseCSV(csvText);
        console.log(`Loaded ${networkZoneData.length} network zone records`);
    } catch (error) {
        console.error('Error loading network zone data:', error);
        throw error;
    }
}

async function loadSiteTypeData() {
    try {
        const response = await fetch('data/Site+Type+Classification+Decision.txt');
        const text = await response.text();
        siteTypeData = parseTxtFile(text);
        console.log('Loaded site type data');
    } catch (error) {
        console.error('Error loading site type data:', error);
        throw error;
    }
}

async function loadDCTypeData() {
    try {
        const response = await fetch('data/DC+classification.txt');
        const text = await response.text();
        dcTypeData = parseTxtFile(text);
        console.log('Loaded DC type data');
    } catch (error) {
        console.error('Error loading DC type data:', error);
        throw error;
    }
}

function parseCSV(csvText) {
    const lines = csvText.split('\n');
    const headers = lines[0].split(',').map(header => header.trim());
    
    return lines.slice(1).filter(line => line.trim() !== '').map(line => {
        const values = line.split(',').map(value => value.trim());
        const record = {};
        
        headers.forEach((header, index) => {
            record[header] = values[index] || '';
        });
        
        return record;
    });
}

function parseTxtFile(text) {
    return text;
}

function findSimilarApplications(appName, appDescription) {
    if (!applicationData.length) return [];
    
    const searchTerms = (appName + ' ' + (appDescription || '')).toLowerCase();
    
    return applicationData
        .filter(app => {
            const appText = (app.Name + ' ' + app.Description).toLowerCase();
            return appText.includes(searchTerms) || searchTerms.includes(appText);
        })
        .slice(0, 5); // Return top 5 matches
}

function getPurdueLevelDetails(level) {
    if (!purdueData.length) return null;
    
    return purdueData.find(item => item.Level === level.toString());
}

function getNetworkZoneRecommendations(characteristics) {
    if (!networkZoneData.length) return [];
    
    const scores = {};
    
    networkZoneData.forEach(zone => {
        scores[zone.Zone] = 0;
        
        if (characteristics.function === 'control' && zone.Zone === 'OT Zone') {
            scores[zone.Zone] += 3;
        } else if (characteristics.function === 'business' && zone.Zone === 'Enterprise Zone') {
            scores[zone.Zone] += 3;
        } else if (characteristics.function === 'security' && zone.Zone === 'Security Zone') {
            scores[zone.Zone] += 3;
        } else if (characteristics.function === 'operations' && zone.Zone === 'Operations Zone') {
            scores[zone.Zone] += 3;
        } else if (characteristics.users === 'it' && zone.Zone === 'Management Zone') {
            scores[zone.Zone] += 3;
        }
    });
    
    return Object.entries(scores)
        .sort((a, b) => b[1] - a[1])
        .map(([zone, score]) => ({ zone, score }));
}

window.dataLoader = {
    loadAllData,
    findSimilarApplications,
    getPurdueLevelDetails,
    getNetworkZoneRecommendations,
    getApplicationData: () => applicationData,
    getPurdueData: () => purdueData,
    getNetworkZoneData: () => networkZoneData,
    getSiteTypeData: () => siteTypeData,
    getDCTypeData: () => dcTypeData
};

console.log('dataLoader initialized and ready for use');
