
document.addEventListener('DOMContentLoaded', function() {
    if (window.dataLoader) {
        initializeRecommendationEngine();
    } else {
        const checkInterval = setInterval(function() {
            if (window.dataLoader) {
                clearInterval(checkInterval);
                initializeRecommendationEngine();
            }
        }, 100);
        
        setTimeout(function() {
            clearInterval(checkInterval);
            console.error('Timed out waiting for dataLoader to be defined');
        }, 10000);
    }
});

function initializeRecommendationEngine() {
    window.dataLoader.loadAllData().then(success => {
        if (success) {
            console.log('Data loaded successfully, recommendation engine ready');
            enhanceRecommendationEngine();
        } else {
            console.error('Failed to load data, using fallback recommendation engine');
        }
    });
}

function enhanceRecommendationEngine() {
    const originalGenerateSuggestions = typeof window.generateSmartSuggestions === 'function' ? 
        window.generateSmartSuggestions : 
        function() { console.log('Original function not available'); };
    
    window.generateSmartSuggestions = function() {
        try {
            console.log('Starting generateSmartSuggestions function');
            
            const appNameElement = document.getElementById('app-name');
            const interfaceNameElement = document.getElementById('interface-name');
            const appDescriptionElement = document.getElementById('app-description');
            const primaryFunctionElement = document.getElementById('primary-function');
            const primaryUsersElement = document.getElementById('primary-users');
            
            const securityRequirementsElement = document.getElementById('security-requirements');
            const complianceNeedsElement = document.getElementById('compliance-needs');
            const dataSensitivityElement = document.getElementById('data-sensitivity');
            const integrationRequirementsElement = document.getElementById('integration-requirements');
            const performanceRequirementsElement = document.getElementById('performance-requirements');
            const availabilityRequirementsElement = document.getElementById('availability-requirements');
            
            console.log('Elements found:', {
                appNameElement: !!appNameElement,
                interfaceNameElement: !!interfaceNameElement,
                appDescriptionElement: !!appDescriptionElement,
                primaryFunctionElement: !!primaryFunctionElement,
                primaryUsersElement: !!primaryUsersElement,
                securityRequirementsElement: !!securityRequirementsElement,
                complianceNeedsElement: !!complianceNeedsElement,
                dataSensitivityElement: !!dataSensitivityElement,
                integrationRequirementsElement: !!integrationRequirementsElement,
                performanceRequirementsElement: !!performanceRequirementsElement,
                availabilityRequirementsElement: !!availabilityRequirementsElement
            });
            
            const appName = appNameElement ? appNameElement.value : '';
            const interfaceName = interfaceNameElement ? interfaceNameElement.value : '';
            const appDescription = appDescriptionElement ? appDescriptionElement.value : '';
            const primaryFunction = primaryFunctionElement ? primaryFunctionElement.value : '';
            const primaryUsers = primaryUsersElement ? primaryUsersElement.value : '';
            
            const securityRequirements = securityRequirementsElement ? securityRequirementsElement.value : '';
            
            const complianceNeeds = complianceNeedsElement ? 
                Array.from(complianceNeedsElement.selectedOptions).map(option => option.value) : [];
            
            const dataSensitivity = dataSensitivityElement ? dataSensitivityElement.value : '';
            
            const integrationRequirements = integrationRequirementsElement ? 
                Array.from(integrationRequirementsElement.selectedOptions).map(option => option.value) : [];
            
            const performanceRequirements = performanceRequirementsElement ? performanceRequirementsElement.value : '';
            const availabilityRequirements = availabilityRequirementsElement ? availabilityRequirementsElement.value : '';
            
            if (!appName || !interfaceName) {
                alert('Please enter application and interface names');
                return;
            }
            
            console.log('Input values:', {
                appName,
                interfaceName,
                appDescription,
                primaryFunction,
                primaryUsers,
                securityRequirements,
                complianceNeeds,
                dataSensitivity,
                integrationRequirements,
                performanceRequirements,
                availabilityRequirements
            });
            
            const similarApps = window.dataLoader.findSimilarApplications(appName, appDescription);
            console.log('Similar apps found:', similarApps.length);
            
            if (similarApps.length > 0) {
                generateDataDrivenSuggestions(
                    appName, 
                    interfaceName, 
                    appDescription, 
                    primaryFunction, 
                    primaryUsers, 
                    similarApps,
                    securityRequirements,
                    complianceNeeds,
                    dataSensitivity,
                    integrationRequirements,
                    performanceRequirements,
                    availabilityRequirements
                );
            } else {
                console.log('No similar applications found, using original algorithm');
                originalGenerateSuggestions();
            }
        } catch (error) {
            console.error('Error in enhanced recommendation engine:', error);
            originalGenerateSuggestions();
        }
    };
}

function generateDataDrivenSuggestions(
    appName, 
    interfaceName, 
    appDescription, 
    primaryFunction, 
    primaryUsers, 
    similarApps,
    securityRequirements = '',
    complianceNeeds = [],
    dataSensitivity = '',
    integrationRequirements = [],
    performanceRequirements = '',
    availabilityRequirements = ''
) {
    let suggestions = '';
    let purdueLevel = '';
    let zones = [];
    let datacenterType = '';
    let siteType = '';
    
    const purdueScores = {};
    const zoneScores = {};
    
    similarApps.forEach(app => {
        const appPurdueLevel = app['Purdue Level'];
        if (appPurdueLevel) {
            purdueScores[appPurdueLevel] = (purdueScores[appPurdueLevel] || 0) + 1;
        }
        
        const appZones = app['Network Zone'];
        if (appZones) {
            appZones.split(',').forEach(zone => {
                const trimmedZone = zone.trim();
                zoneScores[trimmedZone] = (zoneScores[trimmedZone] || 0) + 1;
            });
        }
    });
    
    if (Object.keys(purdueScores).length > 0) {
        purdueLevel = Object.entries(purdueScores)
            .sort((a, b) => b[1] - a[1])[0][0];
            
        suggestions += `<p><strong>Purdue Level:</strong> Based on similar applications, this application likely belongs to <span class="badge badge-level-${purdueLevel.replace('-', '-')}">Level ${purdueLevel}</span>.</p>`;
        
        const purdueDetails = window.dataLoader.getPurdueLevelDetails(purdueLevel);
        if (purdueDetails) {
            suggestions += `<p><em>${purdueDetails.Definition}</em></p>`;
        }
    } else {
        if (primaryFunction === 'control') {
            purdueLevel = '0-1';
            suggestions += `<p><strong>Purdue Level:</strong> Based on the control function, this application likely belongs to <span class="badge badge-level-1">Level 0-1</span> (Process/Basic Control).</p>`;
        } else if (primaryFunction === 'monitor') {
            purdueLevel = '2';
            suggestions += `<p><strong>Purdue Level:</strong> Based on the monitoring function, this application likely belongs to <span class="badge badge-level-2">Level 2</span> (Area Control).</p>`;
        } else if (primaryFunction === 'operations') {
            purdueLevel = '3';
            suggestions += `<p><strong>Purdue Level:</strong> Based on the operations management function, this application likely belongs to <span class="badge badge-level-3">Level 3</span> (Site Operations).</p>`;
        } else if (primaryFunction === 'business') {
            purdueLevel = '4';
            suggestions += `<p><strong>Purdue Level:</strong> Based on the business function, this application likely belongs to <span class="badge badge-level-4">Level 4</span> (Business Planning).</p>`;
        } else if (primaryFunction === 'security') {
            purdueLevel = '3-3.5';
            suggestions += `<p><strong>Purdue Level:</strong> Based on the security function, this application likely belongs to <span class="badge badge-level-3">Level 3</span> or <span class="badge badge-level-3-5">Level 3.5</span> (Site Operations/DMZ).</p>`;
        } else if (primaryFunction === 'external') {
            purdueLevel = '5';
            suggestions += `<p><strong>Purdue Level:</strong> Based on the external connectivity function, this application likely belongs to <span class="badge badge-level-5">Level 5</span> (Enterprise).</p>`;
        }
    }
    
    if (Object.keys(zoneScores).length > 0) {
        const topZones = Object.entries(zoneScores)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 2)
            .map(entry => entry[0]);
            
        zones = topZones;
        
        suggestions += `<p><strong>Network Zone:</strong> Based on similar applications, this application likely belongs to `;
        
        zones.forEach((zone, index) => {
            let badgeClass = '';
            let zoneName = zone;
            
            if (zone.toLowerCase().includes('management') || zone.toLowerCase() === 'mgmt') {
                badgeClass = 'badge-zone-mgmt';
                zoneName = 'Management Zone';
            } else if (zone.toLowerCase().includes('enterprise')) {
                badgeClass = 'badge-zone-enterprise';
                zoneName = 'Enterprise Zone';
            } else if (zone.toLowerCase() === 'ot') {
                badgeClass = 'badge-zone-ot';
                zoneName = 'OT Zone';
            } else if (zone.toLowerCase().includes('operations')) {
                badgeClass = 'badge-zone-operations';
                zoneName = 'Operations Zone';
            } else if (zone.toLowerCase().includes('security')) {
                badgeClass = 'badge-zone-security';
                zoneName = 'Security Zone';
            } else if (zone.toLowerCase().includes('dmz')) {
                badgeClass = 'badge-zone-app-dmz';
                zoneName = 'App DMZ';
            } else if (zone.toLowerCase().includes('field')) {
                badgeClass = 'badge-zone-field';
                zoneName = 'Field Zone';
            }
            
            suggestions += `<span class="badge ${badgeClass}">${zoneName}</span>`;
            
            if (index < zones.length - 1) {
                suggestions += ' or ';
            }
        });
        
        suggestions += `.</p>`;
    } else {
        if (primaryUsers === 'operators') {
            zones.push('ot');
            suggestions += `<p><strong>Network Zone:</strong> Based on operator users, this application likely belongs to the <span class="badge badge-zone-ot">OT Zone</span>.</p>`;
        } else if (primaryUsers === 'engineers') {
            zones.push('management', 'ot');
            suggestions += `<p><strong>Network Zone:</strong> Based on engineer/technician users, this application likely belongs to the <span class="badge badge-zone-mgmt">Management Zone</span> or <span class="badge badge-zone-ot">OT Zone</span>.</p>`;
        } else if (primaryUsers === 'supervisors') {
            zones.push('operations');
            suggestions += `<p><strong>Network Zone:</strong> Based on supervisor/manager users, this application likely belongs to the <span class="badge badge-zone-operations">Operations Zone</span>.</p>`;
        } else if (primaryUsers === 'business') {
            zones.push('enterprise');
            suggestions += `<p><strong>Network Zone:</strong> Based on business staff users, this application likely belongs to the <span class="badge badge-zone-enterprise">Enterprise Zone</span>.</p>`;
        } else if (primaryUsers === 'it') {
            zones.push('management');
            suggestions += `<p><strong>Network Zone:</strong> Based on IT administrator users, this application likely belongs to the <span class="badge badge-zone-mgmt">Management Zone</span>.</p>`;
        } else if (primaryUsers === 'security') {
            zones.push('security');
            suggestions += `<p><strong>Network Zone:</strong> Based on security personnel users, this application likely belongs to the <span class="badge badge-zone-security">Security Zone</span>.</p>`;
        }
    }
    
    if (similarApps.length > 0) {
        suggestions += `<p><strong>Similar Applications:</strong></p>`;
        suggestions += `<ul class="list-group">`;
        
        similarApps.forEach(app => {
            suggestions += `<li class="list-group-item">
                <strong>${app.Application || 'Unknown'}</strong> - ${app.Purpose || 'No description'}
                <div>
                    <span class="badge badge-level-${(app['Purdue Level'] || '').replace('-', '-')}">Level ${app['Purdue Level'] || 'Unknown'}</span>
                    ${(app['Network Zone'] || '').split(',').map(zone => {
                        let badgeClass = '';
                        let zoneName = zone.trim();
                        
                        if (zoneName.toLowerCase().includes('management') || zoneName.toLowerCase() === 'mgmt') {
                            badgeClass = 'badge-zone-mgmt';
                            zoneName = 'Management Zone';
                        } else if (zoneName.toLowerCase().includes('enterprise')) {
                            badgeClass = 'badge-zone-enterprise';
                            zoneName = 'Enterprise Zone';
                        } else if (zoneName.toLowerCase() === 'ot') {
                            badgeClass = 'badge-zone-ot';
                            zoneName = 'OT Zone';
                        } else if (zoneName.toLowerCase().includes('operations')) {
                            badgeClass = 'badge-zone-operations';
                            zoneName = 'Operations Zone';
                        } else if (zoneName.toLowerCase().includes('security')) {
                            badgeClass = 'badge-zone-security';
                            zoneName = 'Security Zone';
                        } else if (zoneName.toLowerCase().includes('dmz')) {
                            badgeClass = 'badge-zone-app-dmz';
                            zoneName = 'App DMZ';
                        } else if (zoneName.toLowerCase().includes('field')) {
                            badgeClass = 'badge-zone-field';
                            zoneName = 'Field Zone';
                        }
                        
                        return `<span class="badge ${badgeClass}">${zoneName}</span>`;
                    }).join(' ')}
                </div>
            </li>`;
        });
        
        suggestions += `</ul>`;
    }
    
    suggestions += `<p><strong>Security Considerations:</strong> `;
    
    // Consider security requirements
    if (securityRequirements === 'critical' || securityRequirements === 'high') {
        suggestions += `This application requires ${securityRequirements} security controls. `;
        
        if (zones.some(z => z.toLowerCase().includes('ot') || z.toLowerCase().includes('field'))) {
            suggestions += `As it handles critical operational data in an OT environment, implement strict access controls, network segmentation, and continuous monitoring. `;
        } else if (zones.some(z => z.toLowerCase().includes('enterprise') || z.toLowerCase().includes('dmz'))) {
            suggestions += `As it may be exposed to external threats, implement defense-in-depth strategies with multiple security layers. `;
        }
        
        if (complianceNeeds.includes('nerc-cip')) {
            suggestions += `Ensure NERC CIP compliance with appropriate documentation and controls. `;
        }
        if (complianceNeeds.includes('iec-62443')) {
            suggestions += `Follow IEC 62443 security standards for industrial automation. `;
        }
    } else {
        if (zones.some(z => z.toLowerCase().includes('ot') || z.toLowerCase().includes('field'))) {
            suggestions += `This application may handle critical operational data. Consider strict access controls and network segmentation. `;
        } else if (zones.some(z => z.toLowerCase().includes('enterprise') || z.toLowerCase().includes('dmz'))) {
            suggestions += `This application may be exposed to external threats. Consider implementing defense-in-depth strategies. `;
        } else if (zones.some(z => z.toLowerCase().includes('security'))) {
            suggestions += `This application handles sensitive security functions. Ensure proper authentication and authorization mechanisms. `;
        } else {
            suggestions += `Implement appropriate access controls and monitoring based on the sensitivity of the data handled. `;
        }
    }
    
    if (dataSensitivity === 'restricted' || dataSensitivity === 'confidential') {
        suggestions += `Handle ${dataSensitivity} data with appropriate encryption, access controls, and audit logging. `;
    }
    
    if (performanceRequirements === 'real-time' || performanceRequirements === 'high') {
        suggestions += `Ensure network architecture supports ${performanceRequirements} performance requirements. `;
    }
    
    if (availabilityRequirements === 'critical' || availabilityRequirements === 'high') {
        suggestions += `Implement redundancy and failover mechanisms to meet ${availabilityRequirements} availability requirements. `;
    }
    
    suggestions += `</p>`;
    
    const suggestionContent = document.querySelector('#suggestion-content');
    if (suggestionContent) {
        suggestionContent.innerHTML = suggestions;
        document.querySelector('#smart-suggestions').style.display = 'block';
    } else {
        console.error('Error: Could not find suggestion-content element');
        alert('Could not display suggestions. Please try again or contact support.');
    }
    
    if (typeof window.updateResults === 'function') {
        window.updateResults(purdueLevel, zones, datacenterType, siteType);
    } else {
        console.log('updateResults function not found, skipping results update');
        const purdueResult = document.getElementById('purdue-result');
        const zoneResult = document.getElementById('zone-result');
        
        if (purdueResult) {
            let purdueContent = `<div class="d-flex align-items-center">`;
            purdueContent += `<div class="level-indicator bg-primary"></div>
                            <div>
                                <strong>Level ${purdueLevel}</strong>
                                <p>Based on application characteristics</p>
                            </div>`;
            purdueContent += `</div>`;
            purdueResult.innerHTML = purdueContent;
        }
        
        if (zoneResult) {
            let zoneContent = `<div>`;
            zones.forEach(zone => {
                if (zone === 'management' || zone === 'mgmt') {
                    zoneContent += `<span class="badge badge-zone-mgmt mb-2">Management Zone</span><br>`;
                } else if (zone === 'enterprise') {
                    zoneContent += `<span class="badge badge-zone-enterprise mb-2">Enterprise Zone</span><br>`;
                } else if (zone === 'ot') {
                    zoneContent += `<span class="badge badge-zone-ot mb-2">OT Zone</span><br>`;
                } else if (zone === 'operations') {
                    zoneContent += `<span class="badge badge-zone-operations mb-2">Operations Zone</span><br>`;
                } else if (zone === 'security') {
                    zoneContent += `<span class="badge badge-zone-security mb-2">Security Zone</span><br>`;
                } else if (zone === 'app-dmz') {
                    zoneContent += `<span class="badge badge-zone-app-dmz mb-2">App DMZ</span><br>`;
                } else if (zone === 'field') {
                    zoneContent += `<span class="badge badge-zone-field mb-2">Field Zone</span><br>`;
                }
            });
            zoneContent += `</div>`;
            zoneResult.innerHTML = zoneContent;
        }
    }
}
