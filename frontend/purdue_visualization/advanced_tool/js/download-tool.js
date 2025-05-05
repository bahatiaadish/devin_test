
async function createToolZip() {
    try {
        const zip = new JSZip();
        
        const indexResponse = await fetch('index.html');
        const indexContent = await indexResponse.text();
        zip.file('index.html', indexContent);
        
        const jsFolder = zip.folder('js');
        
        const dataLoaderResponse = await fetch('js/data-loader.js');
        const dataLoaderContent = await dataLoaderResponse.text();
        jsFolder.file('data-loader.js', dataLoaderContent);
        
        const smartRecsResponse = await fetch('js/smart-recommendations.js');
        const smartRecsContent = await smartRecsResponse.text();
        jsFolder.file('smart-recommendations.js', smartRecsContent);
        
        const downloadToolResponse = await fetch('js/download-tool.js');
        const downloadToolContent = await downloadToolResponse.text();
        jsFolder.file('download-tool.js', downloadToolContent);
        
        const dataFolder = zip.folder('data');
        
        const appDataResponse = await fetch('data/comprehensive_application_classification.csv');
        const appDataContent = await appDataResponse.text();
        dataFolder.file('comprehensive_application_classification.csv', appDataContent);
        
        const purdueDataResponse = await fetch('data/purdue_levels.csv');
        const purdueDataContent = await purdueDataResponse.text();
        dataFolder.file('purdue_levels.csv', purdueDataContent);
        
        const networkDataResponse = await fetch('data/network_zone_assessment.csv');
        const networkDataContent = await networkDataResponse.text();
        dataFolder.file('network_zone_assessment.csv', networkDataContent);
        
        const siteDataResponse = await fetch('data/Site+Type+Classification+Decision.txt');
        const siteDataContent = await siteDataResponse.text();
        dataFolder.file('Site+Type+Classification+Decision.txt', siteDataContent);
        
        const dcDataResponse = await fetch('data/DC+classification.txt');
        const dcDataContent = await dcDataResponse.text();
        dataFolder.file('DC+classification.txt', dcDataContent);
        
        const content = await zip.generateAsync({type: 'blob'});
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(content);
        link.download = 'application-classification-tool.zip';
        
        document.body.appendChild(link);
        link.click();
        
        document.body.removeChild(link);
        
        return true;
    } catch (error) {
        console.error('Error creating zip file:', error);
        alert('Failed to create download. Please try again.');
        return false;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const downloadButton = document.getElementById('download-tool-btn');
    if (downloadButton) {
        downloadButton.addEventListener('click', createToolZip);
    }
});
