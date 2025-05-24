document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    const zoomLevels = {
        'east-west-diagram': 100,
        'service-chain-diagram': 100,
        'l4-l7-diagram': 100,
        'multisite-diagram': 100
    };
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            tab.classList.add('active');
            const tabId = tab.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
            
            resetFlowButtons();
        });
    });
    
    const flowButtons = document.querySelectorAll('.flow-button');
    
    flowButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = document.querySelector('.tab-content.active').id;
            const flowType = button.getAttribute('data-flow');
            const diagramId = button.getAttribute('data-diagram');
            
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
    
    const zoomInButtons = document.querySelectorAll('.zoom-button.zoom-in');
    const zoomOutButtons = document.querySelectorAll('.zoom-button.zoom-out');
    const zoomResetButtons = document.querySelectorAll('.zoom-button.zoom-reset');
    
    zoomInButtons.forEach(button => {
        button.addEventListener('click', () => {
            const diagramId = button.getAttribute('data-diagram');
            zoomIn(diagramId);
        });
    });
    
    zoomOutButtons.forEach(button => {
        button.addEventListener('click', () => {
            const diagramId = button.getAttribute('data-diagram');
            zoomOut(diagramId);
        });
    });
    
    zoomResetButtons.forEach(button => {
        button.addEventListener('click', () => {
            const diagramId = button.getAttribute('data-diagram');
            resetZoom(diagramId);
        });
    });
    
    if (tabs.length > 0) {
        tabs[0].click();
    }
    
    function toggleFlow(diagramId, flowType, button) {
        const overlays = document.querySelectorAll(`#${diagramId} .flow-overlay`);
        
        if (flowType !== 'all' && flowType !== 'none') {
            button.classList.toggle('active');
            
            const overlay = document.querySelector(`#${diagramId} .flow-overlay[data-flow="${flowType}"]`);
            if (overlay) {
                overlay.classList.toggle('active');
            }
            
            const activeOverlays = document.querySelectorAll(`#${diagramId} .flow-overlay.active`);
            if (activeOverlays.length === 0) {
                document.querySelector(`#${diagramId} .diagram-image`).style.opacity = '1';
            } else {
                document.querySelector(`#${diagramId} .diagram-image`).style.opacity = '0.3';
            }
        }
    }
    
    function showAllFlows(diagramId) {
        const buttons = document.querySelectorAll(`#${diagramId}-controls .flow-button:not(.all):not(.none)`);
        buttons.forEach(button => {
            button.classList.add('active');
        });
        
        const overlays = document.querySelectorAll(`#${diagramId} .flow-overlay`);
        overlays.forEach(overlay => {
            overlay.classList.add('active');
        });
        
        document.querySelector(`#${diagramId} .diagram-image`).style.opacity = '0.3';
    }
    
    function hideAllFlows(diagramId) {
        const buttons = document.querySelectorAll(`#${diagramId}-controls .flow-button:not(.all):not(.none)`);
        buttons.forEach(button => {
            button.classList.remove('active');
        });
        
        const overlays = document.querySelectorAll(`#${diagramId} .flow-overlay`);
        overlays.forEach(overlay => {
            overlay.classList.remove('active');
        });
        
        document.querySelector(`#${diagramId} .diagram-image`).style.opacity = '1';
    }
    
    function resetFlowButtons() {
        const activeTabId = document.querySelector('.tab-content.active').id;
        hideAllFlows(activeTabId);
        
        const descriptions = document.querySelectorAll('.flow-description');
        descriptions.forEach(desc => {
            desc.classList.remove('active');
        });
    }
    
    function updateFlowDescription(diagramId, flowType) {
        const descriptions = document.querySelectorAll(`#${diagramId}-descriptions .flow-description`);
        descriptions.forEach(desc => {
            desc.classList.remove('active');
        });
        
        if (flowType !== 'all' && flowType !== 'none') {
            const description = document.querySelector(`#${diagramId}-descriptions .flow-description[data-flow="${flowType}"]`);
            if (description) {
                description.classList.add('active');
            }
        } else if (flowType === 'all') {
            const allDescription = document.querySelector(`#${diagramId}-descriptions .flow-description[data-flow="all"]`);
            if (allDescription) {
                allDescription.classList.add('active');
            }
        } else if (flowType === 'none') {
            const noneDescription = document.querySelector(`#${diagramId}-descriptions .flow-description[data-flow="none"]`);
            if (noneDescription) {
                noneDescription.classList.add('active');
            }
        }
    }
    
    function zoomIn(diagramId) {
        if (zoomLevels[diagramId] < 200) {
            zoomLevels[diagramId] += 20;
            applyZoom(diagramId);
        }
    }
    
    function zoomOut(diagramId) {
        if (zoomLevels[diagramId] > 40) {
            zoomLevels[diagramId] -= 20;
            applyZoom(diagramId);
        }
    }
    
    function resetZoom(diagramId) {
        zoomLevels[diagramId] = 100;
        applyZoom(diagramId);
    }
    
    function applyZoom(diagramId) {
        const image = document.querySelector(`#${diagramId} .diagram-image`);
        const overlays = document.querySelectorAll(`#${diagramId} .flow-overlay`);
        const zoomLevel = zoomLevels[diagramId];
        
        const zoomLevelDisplay = document.querySelector(`.zoom-level[data-diagram="${diagramId}"]`);
        if (zoomLevelDisplay) {
            zoomLevelDisplay.textContent = `${zoomLevel}%`;
        }
        
        image.style.width = `${zoomLevel}%`;
        
        overlays.forEach(overlay => {
            overlay.style.width = `${zoomLevel}%`;
            overlay.style.height = 'auto';
        });
        
        const container = document.getElementById(diagramId);
        if (container) {
            container.style.height = 'auto';
            if (zoomLevel > 100) {
                container.style.minWidth = `${zoomLevel}%`;
            } else {
                container.style.minWidth = '100%';
            }
        }
    }
});
