document.addEventListener('DOMContentLoaded', function() {
    const apiKey = localStorage.getItem('openai_api_key');
    
    if (!apiKey) {
        const apiKeyModal = new bootstrap.Modal(document.getElementById('apiKeyModal'));
        apiKeyModal.show();
    }
    
    document.getElementById('save-api-key-btn').addEventListener('click', function() {
        const apiKeyInput = document.getElementById('openai-api-key').value.trim();
        
        if (apiKeyInput) {
            localStorage.setItem('openai_api_key', apiKeyInput);
            const apiKeyModal = bootstrap.Modal.getInstance(document.getElementById('apiKeyModal'));
            apiKeyModal.hide();
            
            document.getElementById('perform-smart-analysis-btn').style.display = 'inline-block';
        } else {
            alert('Please enter a valid API key or click "Skip" to disable smart analysis.');
        }
    });
    
    document.getElementById('skip-api-key-btn').addEventListener('click', function() {
        const apiKeyModal = bootstrap.Modal.getInstance(document.getElementById('apiKeyModal'));
        apiKeyModal.hide();
        
        document.getElementById('perform-smart-analysis-btn').style.display = 'none';
    });
    
    if (apiKey) {
        document.getElementById('perform-smart-analysis-btn').style.display = 'inline-block';
    }
    
    document.getElementById('perform-smart-analysis-btn').addEventListener('click', performSmartAnalysis);
});

async function performSmartAnalysis() {
    try {
        const apiKey = localStorage.getItem('openai_api_key');
        
        if (!apiKey) {
            alert('API key not found. Please provide your OpenAI API key to use this feature.');
            const apiKeyModal = new bootstrap.Modal(document.getElementById('apiKeyModal'));
            apiKeyModal.show();
            return;
        }
        
        document.getElementById('chatgpt-analysis-card').style.display = 'block';
        document.getElementById('chatgpt-analysis-content').style.display = 'none';
        document.getElementById('chatgpt-analysis-loading').style.display = 'block';
        
        const appName = document.getElementById('app-name').value || 'Not specified';
        const interfaceName = document.getElementById('interface-name').value || 'Not specified';
        const appDescription = document.getElementById('app-description').value || 'Not specified';
        const primaryFunction = document.getElementById('primary-function').value || 'Not specified';
        const primaryUsers = document.getElementById('primary-users').value || 'Not specified';
        
        const securityRequirements = document.getElementById('security-requirements').value || 'Not specified';
        const dataSensitivity = document.getElementById('data-sensitivity').value || 'Not specified';
        const performanceRequirements = document.getElementById('performance-requirements').value || 'Not specified';
        const availabilityRequirements = document.getElementById('availability-requirements').value || 'Not specified';
        
        const complianceNeeds = Array.from(document.getElementById('compliance-needs').selectedOptions).map(option => option.text).join(', ') || 'None';
        const integrationRequirements = Array.from(document.getElementById('integration-requirements').selectedOptions).map(option => option.text).join(', ') || 'None';
        
        const purdueResult = document.getElementById('purdue-result').innerText || 'Not available';
        const zoneResult = document.getElementById('zone-result').innerText || 'Not available';
        const datacenterResult = document.getElementById('datacenter-result').innerText || 'Not available';
        const siteResult = document.getElementById('site-result').innerText || 'Not available';
        
        const prompt = `
We would like to get detailed recommendations for the below results users have provided based on the input values below:
Application name: ${appName}
Application interface: ${interfaceName}
Description provided: ${appDescription}
Primary function: ${primaryFunction}
Primary users: ${primaryUsers}
Security Requirements: ${securityRequirements}
Compliance Needs: ${complianceNeeds}
Data Sensitivity: ${dataSensitivity}
Integration Requirements: ${integrationRequirements}
Performance Requirements: ${performanceRequirements}
Availability Requirements: ${availabilityRequirements}

Classification Results:
Purdue Level: ${purdueResult}
Network Zone: ${zoneResult}
Datacenter Type: ${datacenterResult}
Site Type: ${siteResult}

Based on the above information, please provide your validation and make best practice recommendations.
`;
        
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: 'You are an expert in industrial control systems, network security, and application classification. Provide detailed analysis and best practice recommendations for application placement in industrial environments.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: 0.7
            })
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`API Error: ${errorData.error?.message || 'Unknown error'}`);
        }
        
        const data = await response.json();
        const analysisText = data.choices[0].message.content;
        
        const formattedAnalysis = formatMarkdown(analysisText);
        
        document.getElementById('chatgpt-analysis-content').innerHTML = formattedAnalysis;
        document.getElementById('chatgpt-analysis-content').style.display = 'block';
        document.getElementById('chatgpt-analysis-loading').style.display = 'none';
        
    } catch (error) {
        console.error('Error performing smart analysis:', error);
        
        document.getElementById('chatgpt-analysis-content').innerHTML = `
            <div class="alert alert-danger">
                <h5>Error performing analysis</h5>
                <p>${error.message}</p>
                <p>Please check your API key and try again.</p>
            </div>
        `;
        document.getElementById('chatgpt-analysis-content').style.display = 'block';
        document.getElementById('chatgpt-analysis-loading').style.display = 'none';
    }
}

function formatMarkdown(text) {
    let formatted = text
        .replace(/^### (.*$)/gim, '<h5>$1</h5>')
        .replace(/^## (.*$)/gim, '<h4>$1</h4>')
        .replace(/^# (.*$)/gim, '<h3>$1</h3>')
        
        .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
        
        .replace(/\*(.*?)\*/gim, '<em>$1</em>')
        
        .replace(/^\s*\d+\.\s+(.*$)/gim, '<li>$1</li>')
        .replace(/^\s*[\-\*]\s+(.*$)/gim, '<li>$1</li>')
        
        .replace(/`(.*?)`/gim, '<code>$1</code>')
        
        .replace(/\n/gim, '<br>');
    
    formatted = formatted
        .replace(/<li>.*?<\/li>/gim, match => {
            if (match.startsWith('<li>1.') || match.startsWith('<li>2.')) {
                return `<ol>${match}</ol>`;
            } else {
                return `<ul>${match}</ul>`;
            }
        });
    
    return formatted;
}
