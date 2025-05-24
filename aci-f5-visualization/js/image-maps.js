document.addEventListener('DOMContentLoaded', function() {
    createEastWestImageMap();
    createServiceChainImageMap();
    createL4L7ImageMap();
    createMultisiteImageMap();
    
    setupFlowButtonListeners();
});

function createEastWestImageMap() {
    const container = document.getElementById('east-west-diagram');
    if (!container) return;
    
    const img = container.querySelector('img');
    const width = img.naturalWidth;
    const height = img.naturalHeight;
    
    const map = document.createElement('map');
    map.name = 'east-west-map';
    img.useMap = '#east-west-map';
    
    const flows = {
        'web-to-app-request': [
            {shape: 'poly', coords: '150,400, 200,400, 250,350, 300,350, 350,300, 400,300', title: 'Web to App Request'},
        ],
        'app-to-web-response': [
            {shape: 'poly', coords: '400,320, 350,320, 300,370, 250,370, 200,420, 150,420', title: 'App to Web Response'},
        ],
        'app-to-db-request': [
            {shape: 'poly', coords: '450,300, 500,300, 550,250, 600,250, 650,200, 700,200', title: 'App to DB Request'},
        ],
        'db-to-app-response': [
            {shape: 'poly', coords: '700,220, 650,220, 600,270, 550,270, 500,320, 450,320', title: 'DB to App Response'},
        ]
    };
    
    for (const [flowId, areas] of Object.entries(flows)) {
        areas.forEach(area => {
            const areaEl = document.createElement('area');
            areaEl.shape = area.shape;
            areaEl.coords = area.coords;
            areaEl.title = area.title;
            areaEl.href = '#';
            areaEl.dataset.flow = flowId;
            areaEl.addEventListener('click', function(e) {
                e.preventDefault();
                highlightFlow('east-west-diagram', flowId);
            });
            map.appendChild(areaEl);
        });
    }
    
    container.appendChild(map);
    
    createFlowOverlays('east-west-diagram', flows);
}

function createServiceChainImageMap() {
    const container = document.getElementById('service-chain-diagram');
    if (!container) return;
    
    const img = container.querySelector('img');
    const width = img.naturalWidth;
    const height = img.naturalHeight;
    
    const map = document.createElement('map');
    map.name = 'service-chain-map';
    img.useMap = '#service-chain-map';
    
    const flows = {
        'client-to-firewall': [
            {shape: 'poly', coords: '100,200, 150,200, 200,250, 250,250', title: 'Client to Firewall'},
        ],
        'firewall-to-waf': [
            {shape: 'poly', coords: '300,250, 350,250, 400,300, 450,300', title: 'Firewall to WAF'},
        ],
        'waf-to-lb': [
            {shape: 'poly', coords: '500,300, 550,300, 600,350, 650,350', title: 'WAF to Load Balancer'},
        ],
        'lb-to-server': [
            {shape: 'poly', coords: '700,350, 750,350, 800,400, 850,400', title: 'Load Balancer to Server'},
        ],
        'return-path': [
            {shape: 'poly', coords: '850,420, 800,420, 700,370, 500,320, 300,270, 100,220', title: 'Return Path'},
        ]
    };
    
    for (const [flowId, areas] of Object.entries(flows)) {
        areas.forEach(area => {
            const areaEl = document.createElement('area');
            areaEl.shape = area.shape;
            areaEl.coords = area.coords;
            areaEl.title = area.title;
            areaEl.href = '#';
            areaEl.dataset.flow = flowId;
            areaEl.addEventListener('click', function(e) {
                e.preventDefault();
                highlightFlow('service-chain-diagram', flowId);
            });
            map.appendChild(areaEl);
        });
    }
    
    container.appendChild(map);
    
    createFlowOverlays('service-chain-diagram', flows);
}

function createL4L7ImageMap() {
    const container = document.getElementById('l4-l7-diagram');
    if (!container) return;
    
    const img = container.querySelector('img');
    const width = img.naturalWidth;
    const height = img.naturalHeight;
    
    const map = document.createElement('map');
    map.name = 'l4-l7-map';
    img.useMap = '#l4-l7-map';
    
    const flows = {
        'client-to-ssl': [
            {shape: 'poly', coords: '100,200, 150,200, 200,250, 250,250, 300,300', title: 'Client to SSL Module'},
        ],
        'ssl-to-ips': [
            {shape: 'poly', coords: '300,320, 350,320, 400,350', title: 'SSL to IPS Module'},
        ],
        'ips-to-lb': [
            {shape: 'poly', coords: '400,370, 450,370, 500,400', title: 'IPS to Load Balancer'},
        ],
        'lb-to-server': [
            {shape: 'poly', coords: '500,420, 550,420, 600,450, 650,450, 700,500, 750,500', title: 'Load Balancer to Server'},
        ],
        'return-path': [
            {shape: 'poly', coords: '750,520, 700,520, 650,470, 600,470, 500,440, 400,390, 300,340, 100,220', title: 'Return Path'},
        ]
    };
    
    for (const [flowId, areas] of Object.entries(flows)) {
        areas.forEach(area => {
            const areaEl = document.createElement('area');
            areaEl.shape = area.shape;
            areaEl.coords = area.coords;
            areaEl.title = area.title;
            areaEl.href = '#';
            areaEl.dataset.flow = flowId;
            areaEl.addEventListener('click', function(e) {
                e.preventDefault();
                highlightFlow('l4-l7-diagram', flowId);
            });
            map.appendChild(areaEl);
        });
    }
    
    container.appendChild(map);
    
    createFlowOverlays('l4-l7-diagram', flows);
}

function createMultisiteImageMap() {
    const container = document.getElementById('multisite-diagram');
    if (!container) return;
    
    const img = container.querySelector('img');
    const width = img.naturalWidth;
    const height = img.naturalHeight;
    
    const map = document.createElement('map');
    map.name = 'multisite-map';
    img.useMap = '#multisite-map';
    
    const flows = {
        'site1-forward': [
            {shape: 'poly', coords: '100,300, 150,300, 200,350, 250,350, 300,400', title: 'Site 1 Forward Path'},
        ],
        'site1-return': [
            {shape: 'poly', coords: '300,420, 250,370, 200,370, 150,320, 100,320', title: 'Site 1 Return Path'},
        ],
        'site2-forward': [
            {shape: 'poly', coords: '600,300, 650,300, 700,350, 750,350, 800,400', title: 'Site 2 Forward Path'},
        ],
        'site2-return': [
            {shape: 'poly', coords: '800,420, 750,370, 700,370, 650,320, 600,320', title: 'Site 2 Return Path'},
        ],
        'cross-site': [
            {shape: 'poly', coords: '350,200, 400,200, 450,200, 500,200, 550,200', title: 'Cross-Site Connections'},
        ]
    };
    
    for (const [flowId, areas] of Object.entries(flows)) {
        areas.forEach(area => {
            const areaEl = document.createElement('area');
            areaEl.shape = area.shape;
            areaEl.coords = area.coords;
            areaEl.title = area.title;
            areaEl.href = '#';
            areaEl.dataset.flow = flowId;
            areaEl.addEventListener('click', function(e) {
                e.preventDefault();
                highlightFlow('multisite-diagram', flowId);
            });
            map.appendChild(areaEl);
        });
    }
    
    container.appendChild(map);
    
    createFlowOverlays('multisite-diagram', flows);
}

function createFlowOverlays(diagramId, flows) {
    const container = document.getElementById(diagramId);
    if (!container) {
        console.log(`Container not found for diagram ID: ${diagramId}`);
        return;
    }
    
    const img = container.querySelector('img');
    const width = img.naturalWidth;
    const height = img.naturalHeight;
    
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.style.position = 'absolute';
    svg.style.top = '0';
    svg.style.left = '0';
    svg.style.pointerEvents = 'none';
    
    for (const [flowId, areas] of Object.entries(flows)) {
        areas.forEach(area => {
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            
            const coords = area.coords.split(',').map(Number);
            let pathData = '';
            
            if (area.shape === 'poly') {
                pathData = `M${coords[0]},${coords[1]}`;
                for (let i = 2; i < coords.length; i += 2) {
                    pathData += ` L${coords[i]},${coords[i+1]}`;
                }
                pathData += ' Z';
            } else if (area.shape === 'rect') {
                pathData = `M${coords[0]},${coords[1]} L${coords[2]},${coords[1]} L${coords[2]},${coords[3]} L${coords[0]},${coords[3]} Z`;
            } else if (area.shape === 'circle') {
                pathData = `M${coords[0]},${coords[1]} m-${coords[2]},0 a${coords[2]},${coords[2]} 0 1,0 ${coords[2]*2},0 a${coords[2]},${coords[2]} 0 1,0 -${coords[2]*2},0`;
            }
            
            path.setAttribute('d', pathData);
            path.setAttribute('stroke', getFlowColor(flowId));
            path.setAttribute('stroke-width', '5');
            path.setAttribute('fill', 'none');
            path.setAttribute('data-flow', flowId);
            path.style.opacity = '0';
            path.classList.add('flow-path');
            
            svg.appendChild(path);
        });
    }
    
    container.appendChild(svg);
}

function getFlowColor(flowId) {
    const colors = {
        'web-to-app-request': '#0000FF',
        'app-to-web-response': '#FF0000',
        'app-to-db-request': '#00CC00',
        'db-to-app-response': '#FF6600',
        'client-to-firewall': '#0000FF',
        'firewall-to-waf': '#9900CC',
        'waf-to-lb': '#00CCCC',
        'lb-to-server': '#00CC00',
        'return-path': '#FF0000',
        'client-to-ssl': '#0000FF',
        'ssl-to-ips': '#9900CC',
        'ips-to-lb': '#00CCCC',
        'site1-forward': '#0000FF',
        'site1-return': '#FF0000',
        'site2-forward': '#00CC00',
        'site2-return': '#FF6600',
        'cross-site': '#9900CC'
    };
    
    return colors[flowId] || '#000000';
}

function setupFlowButtonListeners() {
    const flowButtons = document.querySelectorAll('.flow-button');
    
    flowButtons.forEach(button => {
        button.addEventListener('click', function() {
            const diagramId = button.getAttribute('data-diagram');
            const flowType = button.getAttribute('data-flow');
            
            if (flowType === 'all') {
                showAllFlows(diagramId);
            } else if (flowType === 'none') {
                hideAllFlows(diagramId);
            } else {
                toggleFlow(diagramId, flowType, button);
            }
            
            updateFlowDescription(diagramId, flowType);
        });
    });
}

function highlightFlow(diagramId, flowId) {
    console.log(`Highlighting flow: ${flowId} in diagram: ${diagramId}`);
    const button = document.querySelector(`.flow-button[data-diagram="${diagramId}"][data-flow="${flowId}"]`);
    if (button) {
        toggleFlow(diagramId, flowId, button);
        updateFlowDescription(diagramId, flowId);
    } else {
        console.log(`Button not found for diagram: ${diagramId}, flow: ${flowId}`);
    }
}

function toggleFlow(diagramId, flowType, button) {
    console.log(`Toggling flow: ${flowType} in diagram: ${diagramId}`);
    button.classList.toggle('active');
    
    const container = document.getElementById(diagramId);
    if (container) {
        const paths = container.querySelectorAll(`.flow-path[data-flow="${flowType}"]`);
        console.log(`Found ${paths.length} paths for flow: ${flowType}`);
        paths.forEach(path => {
            path.style.opacity = button.classList.contains('active') ? '1' : '0';
        });
    } else {
        console.log(`Container not found for diagram ID: ${diagramId}`);
    }
    
    const activeButtons = document.querySelectorAll(`#${diagramId.replace('-diagram', '')}-controls .flow-button.active:not(.all):not(.none)`);
    if (activeButtons.length === 0) {
        const img = document.querySelector(`#${diagramId} img`);
        if (img) {
            img.style.opacity = '1';
        }
    } else {
        const img = document.querySelector(`#${diagramId} img`);
        if (img) {
            img.style.opacity = '0.3';
        }
    }
}

function showAllFlows(diagramId) {
    console.log(`Showing all flows for diagram: ${diagramId}`);
    const controlId = diagramId.replace('-diagram', '');
    const buttons = document.querySelectorAll(`#${controlId}-controls .flow-button:not(.all):not(.none)`);
    console.log(`Found ${buttons.length} flow buttons`);
    buttons.forEach(button => {
        button.classList.add('active');
    });
    
    const container = document.getElementById(diagramId);
    if (container) {
        const paths = container.querySelectorAll('.flow-path');
        console.log(`Found ${paths.length} flow paths`);
        paths.forEach(path => {
            path.style.opacity = '1';
        });
        
        const img = container.querySelector('img');
        if (img) {
            img.style.opacity = '0.3';
        }
    } else {
        console.log(`Container not found for diagram ID: ${diagramId}`);
    }
}

function hideAllFlows(diagramId) {
    console.log(`Hiding all flows for diagram: ${diagramId}`);
    const controlId = diagramId.replace('-diagram', '');
    const buttons = document.querySelectorAll(`#${controlId}-controls .flow-button:not(.all):not(.none)`);
    console.log(`Found ${buttons.length} flow buttons to deactivate`);
    buttons.forEach(button => {
        button.classList.remove('active');
    });
    
    const container = document.getElementById(diagramId);
    if (container) {
        const paths = container.querySelectorAll('.flow-path');
        console.log(`Found ${paths.length} flow paths to hide`);
        paths.forEach(path => {
            path.style.opacity = '0';
        });
        
        const img = container.querySelector('img');
        if (img) {
            img.style.opacity = '1';
        }
    } else {
        console.log(`Container not found for diagram ID: ${diagramId}`);
    }
}

function updateFlowDescription(diagramId, flowType) {
    console.log(`Updating flow description for diagram: ${diagramId}, flow: ${flowType}`);
    const descId = diagramId.replace('-diagram', '');
    const descriptions = document.querySelectorAll(`#${descId}-descriptions .flow-description`);
    console.log(`Found ${descriptions.length} descriptions`);
    descriptions.forEach(desc => {
        desc.classList.remove('active');
    });
    
    if (flowType !== 'all' && flowType !== 'none') {
        const description = document.querySelector(`#${descId}-descriptions .flow-description[data-flow="${flowType}"]`);
        if (description) {
            description.classList.add('active');
            console.log(`Activated description for flow: ${flowType}`);
        } else {
            console.log(`Description not found for flow: ${flowType}`);
        }
    } else if (flowType === 'all') {
        const allDescription = document.querySelector(`#${descId}-descriptions .flow-description[data-flow="all"]`);
        if (allDescription) {
            allDescription.classList.add('active');
            console.log('Activated "all flows" description');
        }
    } else if (flowType === 'none') {
        const noneDescription = document.querySelector(`#${descId}-descriptions .flow-description[data-flow="none"]`);
        if (noneDescription) {
            noneDescription.classList.add('active');
            console.log('Activated "no flows" description');
        }
    }
}
