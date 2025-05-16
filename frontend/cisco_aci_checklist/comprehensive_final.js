let subChecklistItems = [];
let savedSubchecklists = {};

document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    
    loadCheckboxStates();
    
    loadSavedSubchecklists();
    
    updateLocalSubchecklistsList();
    
    createSections(sectionsData);
    
    toggleSection('section1');
});

function createSections(sectionsData) {
    const sectionsContainer = document.querySelector('body');
    const downloadedSubchecklists = document.querySelector('.downloaded-subchecklists');
    
    if (!sectionsContainer || !downloadedSubchecklists) {
        console.error('Required containers not found');
        return;
    }
    
    sectionsData.forEach((section, sectionIndex) => {
        const sectionDiv = document.createElement('div');
        sectionDiv.className = 'section';
        
        const sectionHeader = document.createElement('div');
        sectionHeader.className = 'section-header';
        sectionHeader.setAttribute('onclick', `toggleSection('${section.id}')`);
        
        const sectionTitle = document.createElement('h2');
        sectionTitle.textContent = section.title;
        
        const toggleIcon = document.createElement('span');
        toggleIcon.className = 'toggle-icon';
        toggleIcon.textContent = '▼';
        
        sectionHeader.appendChild(sectionTitle);
        sectionHeader.appendChild(toggleIcon);
        
        const sectionContent = document.createElement('div');
        sectionContent.id = section.id;
        sectionContent.className = 'section-content';
        
        section.subsections.forEach((subsection, subsectionIndex) => {
            const subsectionTitle = document.createElement('h3');
            subsectionTitle.textContent = subsection.title;
            sectionContent.appendChild(subsectionTitle);
            
            subsection.tasks.forEach((task, taskIndex) => {
                const taskId = `task-${sectionIndex}-${subsectionIndex}-${taskIndex}`;
                
                const taskItem = document.createElement('div');
                taskItem.className = 'task-item';
                
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.id = taskId;
                checkbox.className = 'task-checkbox';
                checkbox.addEventListener('change', saveCheckboxStates);
                
                const label = document.createElement('label');
                label.setAttribute('for', taskId);
                label.textContent = task;
                
                const addButton = document.createElement('button');
                addButton.className = 'add-to-subchecklist-btn';
                addButton.textContent = 'Add to Sub-Checklist';
                addButton.addEventListener('click', function() {
                    addToSubChecklist(taskId, task);
                    
                    const subchecklistPanel = document.getElementById('subchecklistPanel');
                    if (subchecklistPanel && subchecklistPanel.style.display !== 'block') {
                        openSubChecklistPanel();
                    }
                });
                
                taskItem.appendChild(checkbox);
                taskItem.appendChild(label);
                taskItem.appendChild(addButton);
                
                sectionContent.appendChild(taskItem);
            });
        });
        
        sectionDiv.appendChild(sectionHeader);
        sectionDiv.appendChild(sectionContent);
        
        sectionsContainer.insertBefore(sectionDiv, downloadedSubchecklists);
    });
}

function toggleSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;
    
    const header = section.previousElementSibling;
    const icon = header.querySelector('.toggle-icon');
    
    if (section.style.display === 'block') {
        section.style.display = 'none';
        icon.classList.remove('active');
    } else {
        section.style.display = 'block';
        icon.classList.add('active');
    }
}

function initializeEventListeners() {
    document.getElementById('printBtn')?.addEventListener('click', printChecklist);
    document.getElementById('searchInput')?.addEventListener('input', filterTasks);
    document.getElementById('createSubChecklistBtn')?.addEventListener('click', openSubChecklistPanel);
    document.querySelector('.close-panel')?.addEventListener('click', closeSubChecklistPanel);
    document.getElementById('downloadSubchecklistBtn')?.addEventListener('click', downloadSubChecklist);
    document.getElementById('exportSubchecklistBtn')?.addEventListener('click', exportSubChecklist);
    document.getElementById('clearSubchecklistBtn')?.addEventListener('click', clearSubChecklist);
    document.getElementById('importSubchecklistBtn')?.addEventListener('click', importSubChecklist);
    document.getElementById('deleteAllSubchecklistsBtn')?.addEventListener('click', deleteAllSubchecklists);
    document.getElementById('saveAllDataBtn')?.addEventListener('click', saveAllData);
    document.getElementById('loadDataBtn')?.addEventListener('click', function() {
        document.getElementById('importSubchecklistHiddenInput').click();
    });
    document.getElementById('importSubchecklistHiddenInput')?.addEventListener('change', loadData);
    document.getElementById('resetAllBtn')?.addEventListener('click', resetAll);
}

function printChecklist() {
    window.print();
}

function filterTasks() {
    const searchText = document.getElementById('searchInput').value.toLowerCase();
    const taskItems = document.querySelectorAll('.task-item');
    
    taskItems.forEach(item => {
        const label = item.querySelector('label');
        if (label) {
            const text = label.textContent.toLowerCase();
            if (text.includes(searchText)) {
                item.style.display = '';
                
                let parent = item.parentElement;
                while (parent && !parent.classList.contains('section-content')) {
                    parent = parent.parentElement;
                }
                
                if (parent) {
                    parent.style.display = 'block';
                    const header = parent.previousElementSibling;
                    if (header) {
                        const icon = header.querySelector('.toggle-icon');
                        if (icon) {
                            icon.classList.add('active');
                        }
                    }
                }
            } else {
                item.style.display = 'none';
            }
        }
    });
    
    if (searchText === '') {
        document.querySelectorAll('.section-content').forEach((section, index) => {
            if (index === 0) {
                section.style.display = 'block';
                const header = section.previousElementSibling;
                if (header) {
                    const icon = header.querySelector('.toggle-icon');
                    if (icon) {
                        icon.classList.add('active');
                    }
                }
            } else {
                section.style.display = 'none';
                const header = section.previousElementSibling;
                if (header) {
                    const icon = header.querySelector('.toggle-icon');
                    if (icon) {
                        icon.classList.remove('active');
                    }
                }
            }
        });
    }
}

function openSubChecklistPanel() {
    const subchecklistPanel = document.getElementById('subchecklistPanel');
    if (subchecklistPanel) {
        subchecklistPanel.style.display = 'block';
        document.getElementById('subchecklistName')?.focus();
        updateSubChecklistItems();
    }
}

function closeSubChecklistPanel() {
    const subchecklistPanel = document.getElementById('subchecklistPanel');
    if (subchecklistPanel) {
        subchecklistPanel.style.display = 'none';
    }
}

function addToSubChecklist(id, text) {
    const existingIndex = subChecklistItems.findIndex(item => item.id === id);
    
    if (existingIndex === -1) {
        subChecklistItems.push({
            id: id,
            text: text,
            checked: false,
            notes: ''
        });
        
        updateSubChecklistItems();
        showNotification('Task added to sub-checklist');
    } else {
        showNotification('Task already in sub-checklist');
    }
}

function updateSubChecklistItems() {
    const selectedTasksList = document.getElementById('selectedTasksList');
    
    if (!selectedTasksList) return;
    
    selectedTasksList.innerHTML = '';
    
    if (subChecklistItems.length === 0) {
        selectedTasksList.innerHTML = '<li>No tasks selected yet</li>';
        return;
    }
    
    subChecklistItems.forEach((item, index) => {
        const li = document.createElement('li');
        
        li.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                <span>${item.text}</span>
                <button class="delete-subchecklist" data-index="${index}">Remove</button>
            </div>
        `;
        
        selectedTasksList.appendChild(li);
    });
    
    document.querySelectorAll('.delete-subchecklist[data-index]').forEach(button => {
        button.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            subChecklistItems.splice(index, 1);
            updateSubChecklistItems();
        });
    });
}

function clearSubChecklist() {
    subChecklistItems = [];
    updateSubChecklistItems();
    showNotification('Sub-checklist cleared');
}

function downloadSubChecklist() {
    const subchecklistName = document.getElementById('subchecklistName').value.trim();
    
    if (!subchecklistName) {
        showNotification('Please enter a name for your sub-checklist');
        document.getElementById('subchecklistName').focus();
        return;
    }
    
    if (subChecklistItems.length === 0) {
        showNotification('Please add at least one task to your sub-checklist');
        return;
    }
    
    const htmlContent = generateSubChecklistHTML(subchecklistName);
    const filename = `${subchecklistName.replace(/\s+/g, '-')}.html`;
    
    if ('showSaveFilePicker' in window) {
        const saveFile = async () => {
            try {
                const options = {
                    suggestedName: filename,
                    types: [{
                        description: 'HTML Files',
                        accept: {'text/html': ['.html']},
                    }],
                };
                
                const fileHandle = await window.showSaveFilePicker(options);
                const writable = await fileHandle.createWritable();
                await writable.write(htmlContent);
                await writable.close();
                
                saveSubChecklist(subchecklistName, htmlContent, filename);
                showNotification('Sub-checklist saved to selected location');
            } catch (err) {
                console.error('Error saving file:', err);
                defaultDownload();
            }
        };
        
        saveFile();
    } else {
        defaultDownload();
    }
    
    function defaultDownload() {
        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        saveSubChecklist(subchecklistName, htmlContent, filename);
        showNotification('Sub-checklist downloaded (Please save to the same folder as this checklist for proper linking)');
    }
}

function generateSubChecklistHTML(subchecklistName) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${subchecklistName} - Cisco ACI Sub-Checklist</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        h1 {
            color: #0D6EFD;
            text-align: center;
            border-bottom: 2px solid #0D6EFD;
            padding-bottom: 10px;
            margin-bottom: 30px;
        }
        .button-container {
            display: flex;
            justify-content: center;
            gap: 10px;
            margin-bottom: 20px;
        }
        button {
            background-color: #0D6EFD;
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 5px;
            cursor: pointer;
        }
        button:hover {
            background-color: #0b5ed7;
        }
        .task-item {
            margin-bottom: 15px;
            border-bottom: 1px solid #eee;
            padding-bottom: 15px;
        }
        .task-item:last-child {
            border-bottom: none;
        }
        .task-header {
            display: flex;
            align-items: flex-start;
        }
        .task-header input[type="checkbox"] {
            margin-top: 3px;
            margin-right: 10px;
        }
        .task-header label {
            flex: 1;
            font-weight: bold;
        }
        .task-notes {
            margin-top: 5px;
            margin-left: 25px;
        }
        .task-notes textarea {
            width: 100%;
            padding: 5px;
            border: 1px solid #ddd;
            border-radius: 4px;
            min-height: 60px;
        }
        .back-link {
            display: block;
            margin-top: 30px;
            text-align: center;
            color: #0D6EFD;
            text-decoration: none;
        }
        .back-link:hover {
            text-decoration: underline;
        }
        @media print {
            .button-container, .back-link {
                display: none;
            }
            body {
                font-size: 12pt;
            }
            .task-item {
                page-break-inside: avoid;
            }
        }
    </style>
</head>
<body>
    <h1>${subchecklistName}</h1>
    
    <div class="button-container">
        <button onclick="window.print()">Print Checklist</button>
        <button onclick="saveProgress()">Save Progress</button>
        <button onclick="loadProgress()">Load Progress</button>
        <button onclick="resetAll()">Reset All</button>
    </div>
    
    <div id="taskList">
        ${subChecklistItems.map((item, index) => `
        <div class="task-item" data-id="${item.id}">
            <div class="task-header">
                <input type="checkbox" id="sub-${index}" ${item.checked ? 'checked' : ''}>
                <label for="sub-${index}">${item.text}</label>
            </div>
            <div class="task-notes">
                <textarea placeholder="Add notes here...">${item.notes}</textarea>
            </div>
        </div>
        `).join('')}
    </div>
    
    <a href="index.html" class="back-link">Back to Main Checklist</a>
    
    <script>
        function saveProgress() {
            const taskItems = document.querySelectorAll('.task-item');
            const data = {};
            
            taskItems.forEach(item => {
                const id = item.getAttribute('data-id');
                const checkbox = item.querySelector('input[type="checkbox"]');
                const textarea = item.querySelector('textarea');
                
                data[id] = {
                    checked: checkbox.checked,
                    notes: textarea.value
                };
            });
            
            localStorage.setItem('${subchecklistName.replace(/\s+/g, '-')}_progress', JSON.stringify(data));
            alert('Progress saved');
        }
        
        function loadProgress() {
            const savedData = localStorage.getItem('${subchecklistName.replace(/\s+/g, '-')}_progress');
            
            if (savedData) {
                const data = JSON.parse(savedData);
                
                Object.keys(data).forEach(id => {
                    const item = document.querySelector(\`.task-item[data-id="\${id}"]\`);
                    
                    if (item) {
                        const checkbox = item.querySelector('input[type="checkbox"]');
                        const textarea = item.querySelector('textarea');
                        
                        checkbox.checked = data[id].checked;
                        textarea.value = data[id].notes;
                    }
                });
                
                alert('Progress loaded');
            } else {
                alert('No saved progress found');
            }
        }
        
        function resetAll() {
            if (confirm('Are you sure you want to reset all progress?')) {
                const taskItems = document.querySelectorAll('.task-item');
                
                taskItems.forEach(item => {
                    const checkbox = item.querySelector('input[type="checkbox"]');
                    const textarea = item.querySelector('textarea');
                    
                    checkbox.checked = false;
                    textarea.value = '';
                });
                
                localStorage.removeItem('${subchecklistName.replace(/\s+/g, '-')}_progress');
                alert('All progress reset');
            }
        }
        
        document.querySelectorAll('input[type="checkbox"], textarea').forEach(element => {
            element.addEventListener('change', saveProgress);
        });
        
        document.addEventListener('DOMContentLoaded', loadProgress);
    </script>
</body>
</html>`;
}

function saveSubChecklist(name, htmlContent, filename) {
    savedSubchecklists[name] = {
        name: name,
        filename: filename,
        date: new Date().toISOString()
    };
    
    localStorage.setItem('savedSubchecklists', JSON.stringify(savedSubchecklists));
    
    updateSavedSubchecklistsList();
    updateLocalSubchecklistsList();
}

function loadSavedSubchecklists() {
    const saved = localStorage.getItem('savedSubchecklists');
    
    if (saved) {
        savedSubchecklists = JSON.parse(saved);
    }
    
    updateSavedSubchecklistsList();
    updateLocalSubchecklistsList();
}

function updateSavedSubchecklistsList() {
    const savedSubchecklistsList = document.getElementById('savedSubchecklistsList');
    
    if (!savedSubchecklistsList) return;
    
    savedSubchecklistsList.innerHTML = '';
    
    if (Object.keys(savedSubchecklists).length === 0) {
        savedSubchecklistsList.innerHTML = '<li>No saved sub-checklists</li>';
        return;
    }
    
    Object.keys(savedSubchecklists).forEach(key => {
        const item = savedSubchecklists[key];
        const li = document.createElement('li');
        
        li.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
                <span>${item.name}</span>
                <button class="delete-subchecklist" data-name="${item.name}">Delete</button>
            </div>
        `;
        
        savedSubchecklistsList.appendChild(li);
    });
    
    document.querySelectorAll('.delete-subchecklist[data-name]').forEach(button => {
        button.addEventListener('click', function() {
            const name = this.getAttribute('data-name');
            deleteSubChecklist(name);
        });
    });
}

function updateLocalSubchecklistsList() {
    const localSubchecklistsList = document.getElementById('localSubchecklistsList');
    
    if (!localSubchecklistsList) return;
    
    localSubchecklistsList.innerHTML = '';
    
    if (Object.keys(savedSubchecklists).length === 0) {
        localSubchecklistsList.innerHTML = '<li>No downloaded sub-checklists</li>';
        return;
    }
    
    Object.keys(savedSubchecklists).forEach(key => {
        const item = savedSubchecklists[key];
        const li = document.createElement('li');
        
        li.innerHTML = `
            <a href="./${item.filename}" target="_blank">${item.name}</a>
        `;
        
        localSubchecklistsList.appendChild(li);
    });
}

function deleteSubChecklist(name) {
    if (confirm(`Are you sure you want to delete the "${name}" sub-checklist?`)) {
        delete savedSubchecklists[name];
        
        localStorage.setItem('savedSubchecklists', JSON.stringify(savedSubchecklists));
        
        updateSavedSubchecklistsList();
        updateLocalSubchecklistsList();
        
        showNotification(`Sub-checklist "${name}" deleted`);
    }
}

function deleteAllSubchecklists() {
    if (confirm('Are you sure you want to delete all saved sub-checklists?')) {
        savedSubchecklists = {};
        
        localStorage.setItem('savedSubchecklists', JSON.stringify(savedSubchecklists));
        
        updateSavedSubchecklistsList();
        updateLocalSubchecklistsList();
        
        showNotification('All sub-checklists deleted');
    }
}

function saveCheckboxStates() {
    const checkboxes = document.querySelectorAll('.task-checkbox');
    const states = {};
    
    checkboxes.forEach(checkbox => {
        states[checkbox.id] = checkbox.checked;
    });
    
    localStorage.setItem('checkboxStates', JSON.stringify(states));
}

function loadCheckboxStates() {
    const saved = localStorage.getItem('checkboxStates');
    
    if (saved) {
        const states = JSON.parse(saved);
        
        document.querySelectorAll('.task-checkbox').forEach(checkbox => {
            if (states[checkbox.id] !== undefined) {
                checkbox.checked = states[checkbox.id];
            }
        });
    }
}

function saveAllData() {
    const checkboxes = document.querySelectorAll('.task-checkbox');
    const states = {};
    
    checkboxes.forEach(checkbox => {
        states[checkbox.id] = checkbox.checked;
    });
    
    const data = {
        checkboxStates: states,
        savedSubchecklists: savedSubchecklists,
        subChecklistItems: subChecklistItems
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cisco_aci_checklist_data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    showNotification('All data saved to file');
}

function loadData(event) {
    const file = event.target.files[0];
    
    if (!file) return;
    
    const reader = new FileReader();
    
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            
            if (data.checkboxStates) {
                localStorage.setItem('checkboxStates', JSON.stringify(data.checkboxStates));
                loadCheckboxStates();
            }
            
            if (data.savedSubchecklists) {
                savedSubchecklists = data.savedSubchecklists;
                localStorage.setItem('savedSubchecklists', JSON.stringify(savedSubchecklists));
                updateSavedSubchecklistsList();
                updateLocalSubchecklistsList();
            }
            
            if (data.subChecklistItems) {
                subChecklistItems = data.subChecklistItems;
                updateSubChecklistItems();
            }
            
            showNotification('Data loaded successfully');
        } catch (error) {
            console.error('Error loading data:', error);
            showNotification('Error loading data: ' + error.message);
        }
    };
    
    reader.readAsText(file);
}

function exportSubChecklist() {
    const subchecklistName = document.getElementById('subchecklistName').value.trim();
    
    if (!subchecklistName) {
        showNotification('Please enter a name for your sub-checklist');
        document.getElementById('subchecklistName').focus();
        return;
    }
    
    if (subChecklistItems.length === 0) {
        showNotification('Please add at least one task to your sub-checklist');
        return;
    }
    
    const data = {
        name: subchecklistName,
        items: subChecklistItems
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `${subchecklistName.replace(/\s+/g, '-')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    showNotification('Sub-checklist exported as JSON');
}

function importSubChecklist() {
    const fileInput = document.getElementById('importSubchecklistInput');
    const file = fileInput.files[0];
    
    if (!file) {
        showNotification('Please select a file to import');
        return;
    }
    
    const reader = new FileReader();
    
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            
            if (data.name && Array.isArray(data.items)) {
                document.getElementById('subchecklistName').value = data.name;
                subChecklistItems = data.items;
                updateSubChecklistItems();
                
                showNotification('Sub-checklist imported successfully');
            } else {
                showNotification('Invalid sub-checklist file format');
            }
        } catch (error) {
            console.error('Error importing sub-checklist:', error);
            showNotification('Error importing sub-checklist: ' + error.message);
        }
    };
    
    reader.readAsText(file);
    
    fileInput.value = '';
}

function resetAll() {
    if (confirm('Are you sure you want to reset all progress? This will clear all checked items.')) {
        document.querySelectorAll('.task-checkbox').forEach(checkbox => {
            checkbox.checked = false;
        });
        
        localStorage.removeItem('checkboxStates');
        
        showNotification('All progress reset');
    }
}

function showNotification(message) {
    const container = document.createElement('div');
    container.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
    `;
    
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        background-color: #333;
        color: white;
        padding: 12px 20px;
        border-radius: 4px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        margin-bottom: 10px;
        opacity: 0;
        transform: translateY(-20px);
        transition: opacity 0.3s, transform 0.3s;
    `;
    
    container.appendChild(notification);
    document.body.appendChild(container);
    
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 10);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            document.body.removeChild(container);
        }, 300);
    }, 3000);
}
