// State System Variables Configuration
let moviesCollectionDataArray = [];
let consecutiveClickCounter = 0;
let isUserAuthenticatedAdmin = false;
let targetedFilterTabCategory = 'all';

// Boot Init Pipeline Loader Execution
window.addEventListener('DOMContentLoaded', () => {
    initializeLocalDatabaseContext();
    registerGlobalLayoutEvents();
});

// Sync data on startup
function initializeLocalDatabaseContext() {
    const backupCachePayload = localStorage.getItem('legend_ali_movies_payload');
    if (backupCachePayload) {
        moviesCollectionDataArray = JSON.parse(backupCachePayload);
        renderTargetFrontendGrid();
    } else {
        // Fallback reading external default dynamic JSON backup mapping template structure
        fetch('movies.json')
            .then(res => res.json())
            .then(fallbackJSONData => {
                moviesCollectionDataArray = fallbackJSONData;
                localStorage.setItem('legend_ali_movies_payload', JSON.stringify(moviesCollectionDataArray));
                renderTargetFrontendGrid();
            })
            .catch(() => {
                // Raw blank state setup fallback
                moviesCollectionDataArray = [];
                renderTargetFrontendGrid();
            });
    }
}

// Interface Binding Listener configurations Safely
function registerGlobalLayoutEvents() {
    const hiddenTriggerTitleNode = document.getElementById('secretTitleTrigger');
    const systemThreeDotsBtnNode = document.getElementById('threeDotsBtn');
    const infoDropdownPaneNode = document.getElementById('infoDropdownPane');

    // 5 Clicks Secret Stealth Event Logic mapping loop
    hiddenTriggerTitleNode.addEventListener('click', () => {
        consecutiveClickCounter++;
        if (consecutiveClickCounter === 5) {
            consecutiveClickCounter = 0;
            launchSecretAdminAuthenticationModal();
        }
    });

    // Reset loop pattern on timer delays so normal scattered clicks don't randomly trip it
    setInterval(() => { consecutiveClickCounter = 0; }, 4000);

    // Three dots toggling dropdown positioning system loop 
    systemThreeDotsBtnNode.addEventListener('click', (e) => {
        e.stopPropagation();
        infoDropdownPaneNode.classList.toggle('hidden');
    });

    document.addEventListener('click', (e) => {
        if (!infoDropdownPaneNode.contains(e.target) && e.target !== systemThreeDotsBtnNode) {
            infoDropdownPaneNode.classList.add('hidden');
        }
    });
}

// Interface Filter switching controls
function switchCategoryTab(assignedFilter) {
    targetedFilterTabCategory = assignedFilter;
    document.querySelectorAll('.tab-element').forEach(btn => btn.classList.remove('active-tab'));
    document.getElementById(`tab-${assignedFilter}`).classList.add('active-tab');
    renderTargetFrontendGrid();
}

// Render dynamic user facing cards compilation loop
function renderTargetFrontendGrid() {
    const mainShowcaseGrid = document.getElementById('portalMoviesGrid');
    const emptyUIOverlayNode = document.getElementById('emptyPortalState');
    mainShowcaseGrid.innerHTML = '';

    const streamlinedFilteredDataSet = targetedFilterTabCategory === 'all'
        ? moviesCollectionDataArray
        : moviesCollectionDataArray.filter(entry => entry.category === targetedFilterTabCategory);

    if (streamlinedFilteredDataSet.length === 0) {
        emptyUIOverlayNode.classList.remove('hidden');
        return;
    }
    emptyUIOverlayNode.classList.add('hidden');

    streamlinedFilteredDataSet.forEach(item => {
        const structuralLayoutCardElement = document.createElement('div');
        structuralLayoutCardElement.className = "glass-card rounded-2xl overflow-hidden flex flex-col group hover:border-indigo-500/40 transition-all duration-300 hover:-translate-y-1 shadow-2xl";
        structuralLayoutCardElement.innerHTML = `
            <div class="relative aspect-[3/4] overflow-hidden bg-slate-950">
                <img src="${item.poster}" alt="${item.title}" onerror="this.src='https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=600'" class="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" loading="lazy">
                <div class="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-indigo-400 font-bold text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-md border border-white/5">
                    ${item.category}
                </div>
            </div>
            
            <div class="p-4 flex flex-col flex-grow">
                <h3 class="text-sm font-bold text-white tracking-wide line-clamp-1 group-hover:text-indigo-400 transition-colors mb-2">${item.title}</h3>
                
                <!-- Extra Information Tags Badges -->
                <div class="flex flex-wrap gap-1 mb-3 text-[10px] font-medium text-slate-400">
                    <span class="bg-white/5 border border-white/5 px-2 py-0.5 rounded">${item.genre}</span>
                    <span class="bg-white/5 border border-white/5 px-2 py-0.5 rounded">${item.language}</span>
                    <span class="bg-white/5 border border-white/5 px-2 py-0.5 rounded">${item.runtime}</span>
                </div>

                <p class="text-slate-400 text-xs line-clamp-2 mb-4 leading-relaxed flex-grow">${item.desc}</p>
                
                <!-- Inline Screenshots Viewport Layout Engine -->
                <div class="grid grid-cols-3 gap-1 mb-4 rounded-lg overflow-hidden border border-white/5 bg-slate-950/40 p-1">
                    <img src="${item.screenshots[0]}" onerror="this.style.display='none'" class="h-10 w-full object-cover rounded opacity-60 hover:opacity-100 transition-opacity">
                    <img src="${item.screenshots[1]}" onerror="this.style.display='none'" class="h-10 w-full object-cover rounded opacity-60 hover:opacity-100 transition-opacity">
                    <img src="${item.screenshots[2]}" onerror="this.style.display='none'" class="h-10 w-full object-cover rounded opacity-60 hover:opacity-100 transition-opacity">
                </div>

                <!-- Three Download Quality Options with Target Routing Elements -->
                <div class="space-y-1.5 mt-auto">
                    <a href="${item.links.p480}" target="_blank" rel="noopener noreferrer" class="download-server-action-btn bg-slate-900/60 text-slate-300 border border-white/5 hover:bg-white/5">
                        <i class="fa-solid fa-cloud text-slate-500"></i> Download Server 480p Link
                    </a>
                    <a href="${item.links.p720}" target="_blank" rel="noopener noreferrer" class="download-server-action-btn bg-indigo-950/40 text-indigo-300 border border-indigo-500/10 hover:bg-indigo-900/40">
                        <i class="fa-solid fa-bolt text-indigo-400"></i> Download Server 720p HD
                    </a>
                    <a href="${item.links.p1080}" target="_blank" rel="noopener noreferrer" class="download-server-action-btn bg-gradient-to-r from-indigo-600/20 to-purple-600/20 text-purple-300 border border-purple-500/20 hover:from-indigo-600 hover:to-purple-600 hover:text-white hover:border-transparent">
                        <i class="fa-solid fa-circle-check text-purple-400"></i> Download Server 1080p FullHD
                    </a>
                </div>
            </div>
        `;
        // Inject Custom Inline CSS element utilities for standard functional anchor encapsulation
        const specificLinkBlocks = structuralLayoutCardElement.querySelectorAll('.download-server-action-btn');
        specificLinkBlocks.forEach(btn => {
            btn.className += " w-full text-center py-2 rounded-xl text-[11px] font-bold tracking-wide transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer shadow-sm";
        });

        mainShowcaseGrid.appendChild(structuralLayoutCardElement);
    });
}

// Admin Infrastructure Functional Controllers
function launchSecretAdminAuthenticationModal() {
    document.getElementById('stealthAdminModal').classList.remove('hidden');
    if (isUserAuthenticatedAdmin) {
        exposeAdminDashboardConsole();
    } else {
        document.getElementById('adminAuthPassCard').classList.remove('hidden');
        document.getElementById('adminMasterConsolePanel').classList.add('hidden');
    }
}

function dismissAdminModal() {
    document.getElementById('stealthAdminModal').classList.add('hidden');
    document.getElementById('adminSecurityKeyInput').value = '';
    document.getElementById('authFailureNotice').classList.add('hidden');
}

function processAdminKeyVerification() {
    const injectedKeyVal = document.getElementById('adminSecurityKeyInput').value;
    if (injectedKeyVal === 'adminlegend12345') {
        isUserAuthenticatedAdmin = true;
        document.getElementById('authFailureNotice').classList.add('hidden');
        exposeAdminDashboardConsole();
    } else {
        document.getElementById('authFailureNotice').classList.remove('hidden');
    }
}

function exposeAdminDashboardConsole() {
    document.getElementById('adminAuthPassCard').classList.add('hidden');
    document.getElementById('adminMasterConsolePanel').classList.remove('hidden');
    renderAdminDataRowsArrayModifier();
}

function lockConsoleSession() {
    isUserAuthenticatedAdmin = false;
    dismissAdminModal();
}

// Commit Forms payload inputs processing
function commitNewMovieRecord(e) {
    e.preventDefault();

    const preparedPayloadObject = {
        id: Date.now(),
        title: document.getElementById('inTitle').value,
        category: document.getElementById('inCategory').value,
        genre: document.getElementById('inGenre').value,
        language: document.getElementById('inLanguage').value,
        runtime: document.getElementById('inRuntime').value,
        poster: document.getElementById('inPoster').value,
        screenshots: [
            document.getElementById('inScreen1').value,
            document.getElementById('inScreen2').value,
            document.getElementById('inScreen3').value
        ],
        links: {
            p480: document.getElementById('inLink480').value,
            p720: document.getElementById('inLink720').value,
            p1080: document.getElementById('inLink1080').value
        },
        desc: document.getElementById('inDesc').value
    };

    moviesCollectionDataArray.unshift(preparedPayloadObject);
    localStorage.setItem('legend_ali_movies_payload', JSON.stringify(moviesCollectionDataArray));
    
    document.getElementById('mediaDataPayloadForm').reset();
    renderTargetFrontendGrid();
    renderAdminDataRowsArrayModifier();
    
    alert('Database record synced and compiled to system state arrays successfully.');
}

// Eliminate specific index mapping record row
function removeTargetMovieAssetItem(idPointer) {
    if (confirm("Are you absolutely certain you want to purge this media context record entry from live indices?")) {
        moviesCollectionDataArray = moviesCollectionDataArray.filter(obj => obj.id !== idPointer);
        localStorage.setItem('legend_ali_movies_payload', JSON.stringify(moviesCollectionDataArray));
        renderTargetFrontendGrid();
        renderAdminDataRowsArrayModifier();
    }
}

// Admin Rows modifier tracking loops
function renderAdminDataRowsArrayModifier() {
    const listRowContainer = document.getElementById('adminDataRowsList');
    listRowContainer.innerHTML = '';

    if (moviesCollectionDataArray.length === 0) {
        listRowContainer.innerHTML = '<p class="text-xs text-slate-500 py-3 text-center">No structural array tracking paths recorded inside current environment contexts.</p>';
        return;
    }

    moviesCollectionDataArray.forEach(movie => {
        const itemRowDivElement = document.createElement('div');
        itemRowDivElement.className = "flex justify-between items-center bg-slate-950/50 border border-white/5 p-2 rounded-xl text-xs hover:bg-slate-900 transition-all";
        itemRowDivElement.innerHTML = `
            <div class="flex items-center gap-2 truncate pr-3">
                <span class="text-[9px] font-mono font-bold bg-indigo-950 text-indigo-400 px-2 py-0.5 rounded border border-indigo-900/30 uppercase tracking-wider">${movie.category}</span>
                <span class="text-slate-300 font-medium truncate">${movie.title}</span>
            </div>
            <button onclick="removeTargetMovieAssetItem(${movie.id})" type="button" class="text-slate-500 hover:text-red-400 p-2 transition-colors cursor-pointer" title="Purge Mapping Pointer">
                <i class="fa-solid fa-trash-can"></i>
            </button>
        `;
        listRowContainer.appendChild(itemRowDivElement);
    });
}
