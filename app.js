// ====================== IndexedDB Setup ======================
const db = new Dexie('PharmacyDB');
db.version(1).stores({
    meds: '++id, name, expiry, type, category, company, scientificName, origin, image, barcode',
    deletedMeds: '++id, name, expiry',
    notifications: '++id, message, date, read',
    notificationLog: '++id, medId, lastNotified, count'
});

// ====================== Loading ======================
function showLoading() { document.getElementById('loadingOverlay').style.display = 'flex'; }
function hideLoading() { document.getElementById('loadingOverlay').style.display = 'none'; }

// ====================== Translations ======================
const translations = {
    ar: {
        home_title: 'إدارة صيدليتي',
        inbox_title: 'صندوق الوارد',
        explore_title: 'استكشف',
        settings_title: 'الإعدادات',
        about_app: 'حول التطبيق',
        language: 'اللغة',
        dark_mode: 'الوضع المظلم',
        backup_restore: 'النسخ الاحتياطي والاستعادة',
        export_db: 'تصدير JSON',
        import_db: 'استيراد JSON',
        export_csv: 'تصدير CSV',
        export_pdf: 'تصدير PDF',
        about_text: 'Pharmacy Manager Pro\nنسخة متطورة مع دعم قاعدة بيانات متقدمة، تصدير، إشعارات، وحذف مجمع.',
        save: 'حفظ',
        cancel: 'إلغاء',
        name: 'الاسم',
        search_placeholder: 'بحث...',
        filter_company: 'اسم الشركة',
        sort_by: 'ترتيب حسب',
        closest_expiry: 'الأقرب انتهاء أولاً',
        farthest_expiry: 'الأبعد انتهاء أولاً',
        name_asc: 'اسم (أ-ي)',
        name_desc: 'اسم (ي-أ)',
        type_all: 'الكل',
        type_pharmacy: 'صيدلية',
        batch_delete: 'حذف المحدد',
        add_med: '+ إضافة دواء',
        trade_name: 'الاسم التجاري *',
        scientific_name: 'الاسم العلمي',
        company: 'الشركة',
        origin: 'المنشأ',
        category: 'التصنيف',
        expiry_date: 'تاريخ الانتهاء *',
        save_med: 'حفظ',
        no_meds: 'لا توجد أدوية',
        total: 'إجمالي',
        pharmacy_count: 'صيدلية',
        expired: 'منتهية',
        expiring_30: 'تنتهي خلال 30 يوم',
        categories: 'التصنيفات',
        companies: 'الشركات',
        expiring_soon: 'القريبة',
        no_notifications: 'لا توجد إشعارات',
        no_categories: 'لا توجد تصنيفات',
        no_companies: 'لا توجد شركات',
        delete_confirm: 'تأكيد الحذف؟',
        batch_delete_confirm: n => `حذف ${n} دواء؟`,
        med_details: 'تفاصيل',
        edit_med: 'تعديل',
        delete_med: 'حذف',
        all_medicines: 'كل الأدوية',
        pharmacy_medicines: 'أدوية الصيدلية',
        therapeutic_categories: 'التصنيفات العلاجية',
        international_companies: 'شركات الأدوية',
        search_btn: 'بحث',
        company_search_btn: 'بحث',
        barcode_search: 'بحث بالباركود',
        scan_barcode: 'مسح باركود',
        companies_sort: 'ترتيب الشركات',
        alphabetical: 'أبجدي',
        by_med_count: 'حسب عدد الأدوية',
        popular: 'الأكثر شيوعاً',
        medicine_count: 'عدد الأدوية',
        barcode_label: 'الباركود (اختياري)',
        back_to_companies: 'العودة إلى الشركات'
    },
    en: {
        home_title: 'Pharmacy Manager',
        inbox_title: 'Inbox',
        explore_title: 'Explore',
        settings_title: 'Settings',
        about_app: 'About App',
        language: 'Language',
        dark_mode: 'Dark Mode',
        backup_restore: 'Backup & Restore',
        export_db: 'Export JSON',
        import_db: 'Import JSON',
        export_csv: 'Export CSV',
        export_pdf: 'Export PDF',
        about_text: 'Pharmacy Manager Pro\nAdvanced version with database support, export, notifications, and batch delete.',
        save: 'Save',
        cancel: 'Cancel',
        name: 'Name',
        search_placeholder: 'Search...',
        filter_company: 'Company Name',
        sort_by: 'Sort by',
        closest_expiry: 'Closest expiry',
        farthest_expiry: 'Farthest expiry',
        name_asc: 'Name A-Z',
        name_desc: 'Name Z-A',
        type_all: 'All',
        type_pharmacy: 'Pharmacy',
        batch_delete: 'Delete Selected',
        add_med: '+ Add Medicine',
        trade_name: 'Trade Name *',
        scientific_name: 'Scientific Name',
        company: 'Company',
        origin: 'Origin',
        category: 'Category',
        expiry_date: 'Expiry Date *',
        save_med: 'Save',
        no_meds: 'No medicines',
        total: 'Total',
        pharmacy_count: 'Pharmacy',
        expired: 'Expired',
        expiring_30: 'Expiring in 30d',
        categories: 'Categories',
        companies: 'Companies',
        expiring_soon: 'Expiring Soon',
        no_notifications: 'No notifications',
        no_categories: 'No categories',
        no_companies: 'No companies',
        delete_confirm: 'Delete?',
        batch_delete_confirm: n => `Delete ${n} medicine(s)?`,
        med_details: 'Details',
        edit_med: 'Edit',
        delete_med: 'Delete',
        all_medicines: 'All Medicines',
        pharmacy_medicines: 'Pharmacy Medicines',
        therapeutic_categories: 'Categories',
        international_companies: 'Companies',
        search_btn: 'Search',
        company_search_btn: 'Search',
        barcode_search: 'Search by Barcode',
        scan_barcode: 'Scan Barcode',
        companies_sort: 'Sort Companies',
        alphabetical: 'Alphabetical',
        by_med_count: 'By Medicine Count',
        popular: 'Popular',
        medicine_count: 'Medicine Count',
        barcode_label: 'Barcode (optional)',
        back_to_companies: 'Back to Companies'
    }
};

let currentLang = localStorage.getItem('appLang') || 'ar';
let currentPage = 'home';
let searchQuery = '';
let sortBy = 'expiry_asc';
let typeFilter = 'all';
let companyFilter = '';
let selectedMeds = new Set();
let chart = null;
let currentMed = null;
let isEditing = false;
let currentCompany = null;
let currentScanner = null;

function t(key, ...args) {
    let text = translations[currentLang][key] || key;
    if (args.length) {
        if (typeof text === 'function') text = text(...args);
        else text = text.replace(/\{(\d+)\}/g, (_, i) => args[parseInt(i)]);
    }
    return text;
}

function updateAllText() {
    document.querySelectorAll('.search-btn-text').forEach(el => el.innerText = t('search_btn'));
    document.querySelectorAll('.company-search-btn').forEach(el => el.innerText = t('company_search_btn'));
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.innerText = t(key);
    });
    let titleKey = '';
    if (currentPage === 'home') titleKey = 'home_title';
    else if (currentPage === 'all') titleKey = 'all_medicines';
    else if (currentPage === 'pharmacy') titleKey = 'pharmacy_medicines';
    else if (currentPage === 'categories') titleKey = 'therapeutic_categories';
    else if (currentPage === 'companies') titleKey = 'international_companies';
    else if (currentPage === 'expiring') titleKey = 'expiring_soon';
    else if (currentPage === 'inbox') titleKey = 'inbox_title';
    else if (currentPage === 'explore') titleKey = 'explore_title';
    document.getElementById('appTitle').innerHTML = `<span class="app-icon">💊</span> ${t(titleKey)}`;
    if (currentPage === 'home') renderHome();
    else if (currentPage === 'all') renderAllMedicines();
    else if (currentPage === 'pharmacy') renderPharmacyMedicines();
    else if (currentPage === 'categories') renderCategoriesPage();
    else if (currentPage === 'companies') renderCompaniesPage();
    else if (currentPage === 'expiring') renderExpiringSoonPage();
    else if (currentPage === 'inbox') renderInbox();
    else if (currentPage === 'explore') renderExplore();
}

function getDaysRemaining(expiryDateStr) {
    const today = new Date(); today.setHours(0,0,0,0);
    const expiry = new Date(expiryDateStr); expiry.setHours(0,0,0,0);
    return Math.ceil((expiry - today) / (1000*60*60*24));
}

function getExpiryClass(days) {
    if (days < 0) return 'expired';
    if (days <= 30) return 'expiry-red';
    if (days <= 60) return 'expiry-orange';
    if (days <= 90) return 'expiry-yellow';
    return '';
}

// ====================== Demo Data ======================
async function initDemoData() {
    const count = await db.meds.count();
    if (count === 0) {
        const demo = [
            { name: "GENTAGUT DROP", scientificName: "Gentamicin sulfate", company: "Billim", origin: "Turkey", type: "pharmacy", category: "مضادات حيوية", expiry: "2026-12-31", barcode: "6294015001234" },
            { name: "Paracetamol 500mg", company: "DemoPharma", origin: "Iraq", type: "pharmacy", category: "مسكنات", expiry: new Date(Date.now() + 2*86400000).toISOString().split('T')[0], barcode: "6294015005678" },
            { name: "Ibuprofen 400mg", company: "DemoPharma", origin: "Iraq", type: "pharmacy", category: "مسكنات", expiry: new Date(Date.now() + 5*86400000).toISOString().split('T')[0] },
            { name: "Amoxicillin 500mg", company: "DemoPharma", origin: "Iraq", type: "pharmacy", category: "مضادات حيوية", expiry: new Date(Date.now() + 7*86400000).toISOString().split('T')[0] },
            { name: "Augmentin 1g", company: "GlaxoSmithKline", origin: "UK", type: "pharmacy", category: "مضادات حيوية", expiry: new Date(Date.now() + 85*86400000).toISOString().split('T')[0] },
            { name: "Ciproxin 500mg", company: "Bayer", origin: "Germany", type: "pharmacy", category: "مضادات حيوية", expiry: new Date(Date.now() + 75*86400000).toISOString().split('T')[0] },
            { name: "Panadol Extra", company: "GSK", origin: "UK", type: "pharmacy", category: "مسكنات", expiry: new Date(Date.now() + 50*86400000).toISOString().split('T')[0] },
            { name: "Voltaren 50mg", company: "Novartis", origin: "Switzerland", type: "pharmacy", category: "مسكنات", expiry: new Date(Date.now() + 45*86400000).toISOString().split('T')[0] },
            { name: "Zithromax 250mg", company: "Pfizer", origin: "USA", type: "pharmacy", category: "مضادات حيوية", expiry: new Date(Date.now() + 25*86400000).toISOString().split('T')[0] },
            { name: "Ventolin Inhaler", company: "GSK", origin: "UK", type: "pharmacy", category: "جهاز تنفسي", expiry: new Date(Date.now() + 15*86400000).toISOString().split('T')[0] },
            { name: "Lantus Insulin", company: "Sanofi", origin: "France", type: "pharmacy", category: "سكري", expiry: new Date(Date.now() + 5*86400000).toISOString().split('T')[0] },
            { name: "Lipitor 20mg", company: "Pfizer", origin: "USA", type: "pharmacy", category: "ضغط وقلب", expiry: new Date(Date.now() + 95*86400000).toISOString().split('T')[0] },
            { name: "Omeprazole 20mg", company: "AstraZeneca", origin: "Sweden", type: "pharmacy", category: "جهاز هضمي", expiry: new Date(Date.now() + 110*86400000).toISOString().split('T')[0] },
            { name: "Centrum Multivitamin", company: "Pfizer", origin: "USA", type: "pharmacy", category: "فيتامينات", expiry: new Date(Date.now() + 200*86400000).toISOString().split('T')[0] }
        ];
        await db.meds.bulkAdd(demo);
    }
}

// ====================== Navigation ======================
function goHome() { switchPage('home'); }
function switchPage(page) {
    currentPage = page;
    const backBtn = document.getElementById('backBtn');
    const settingsBtn = document.getElementById('settingsHeaderBtn');
    if (page === 'home') {
        backBtn.style.display = 'none';
        settingsBtn.style.display = 'block';
    } else {
        backBtn.style.display = 'block';
        settingsBtn.style.display = 'none';
    }
    let titleKey = '';
    if (page === 'home') titleKey = 'home_title';
    else if (page === 'all') titleKey = 'all_medicines';
    else if (page === 'pharmacy') titleKey = 'pharmacy_medicines';
    else if (page === 'categories') titleKey = 'therapeutic_categories';
    else if (page === 'companies') titleKey = 'international_companies';
    else if (page === 'expiring') titleKey = 'expiring_soon';
    else if (page === 'inbox') titleKey = 'inbox_title';
    else if (page === 'explore') titleKey = 'explore_title';
    document.getElementById('appTitle').innerHTML = `<span class="app-icon">💊</span> ${t(titleKey)}`;
    if (page === 'home') renderHome();
    else if (page === 'all') renderAllMedicines();
    else if (page === 'pharmacy') renderPharmacyMedicines();
    else if (page === 'categories') renderCategoriesPage();
    else if (page === 'companies') renderCompaniesPage();
    else if (page === 'expiring') renderExpiringSoonPage();
    else if (page === 'inbox') renderInbox();
    else if (page === 'explore') renderExplore();
}

function syncFilterControls() {
    const searchInput = document.getElementById('search');
    if (searchInput) searchInput.value = searchQuery;
    const sortSelect = document.getElementById('sortBy');
    if (sortSelect) sortSelect.value = sortBy;
    const companyInput = document.getElementById('companyFilter');
    if (companyInput) companyInput.value = companyFilter;
}

// ====================== Home ======================
function renderHome() {
    const container = document.getElementById('pageContent');
    container.innerHTML = `
        <div class="dashboard-search">
            <input type="text" id="dashboardSearch" placeholder="${t('search_placeholder')}">
            <button onclick="performDashboardSearch()"><span class="search-btn-text">${t('search_btn')}</span></button>
        </div>
        <div class="chart-container" id="chartContainer">
            <canvas id="expiryBarChart" width="400" height="200"></canvas>
        </div>
        <div class="main-buttons">
            <button class="main-btn" data-page="all">${t('all_medicines')}</button>
            <button class="main-btn" data-page="pharmacy">${t('pharmacy_medicines')}</button>
            <button class="main-btn" data-page="categories">${t('therapeutic_categories')}</button>
            <button class="main-btn" data-page="companies">${t('international_companies')}</button>
            <button class="main-btn" data-page="expiring">${t('expiring_soon')}</button>
        </div>
        <div id="stats"></div>
    `;
    document.querySelectorAll('.main-btn').forEach(btn => {
        btn.addEventListener('click', () => switchPage(btn.dataset.page));
    });
    updateBarChart();
    showStats();
}
function performDashboardSearch() {
    const query = document.getElementById('dashboardSearch').value.trim();
    searchQuery = query;
    switchPage('all');
}
async function updateBarChart() {
    const ctx = document.getElementById('expiryBarChart')?.getContext('2d');
    if (!ctx) return;
    const medsArr = await db.meds.toArray();
    const expired = medsArr.filter(m => getDaysRemaining(m.expiry) < 0).length;
    const soon = medsArr.filter(m => { const d = getDaysRemaining(m.expiry); return d >= 0 && d <= 30; }).length;
    const later = medsArr.filter(m => getDaysRemaining(m.expiry) > 30).length;
    if (chart) chart.destroy();
    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [t('expired'), t('expiring_30'), (currentLang === 'ar' ? 'أكثر من 30 يوم' : 'More than 30 days')],
            datasets: [{
                label: t('total'),
                data: [expired, soon, later],
                backgroundColor: ['#e76f51', '#f4a261', '#2a9d8f'],
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { position: 'top' } },
            scales: { y: { beginAtZero: true, title: { display: true, text: t('total') } } }
        }
    });
}

// ====================== Medicine Rendering (only name + image) ======================
function renderMedications(list) {
    const container = document.getElementById('contentList');
    if (!container) return;
    container.innerHTML = '';
    if (!list.length) { container.innerHTML = `<div class="empty-state">${t('no_meds')}</div>`; return; }
    list.forEach(med => {
        const thumb = med.image ? `<img src="${med.image}" class="med-image-thumb">` : '<div class="med-image-thumb">💊</div>';
        const checked = selectedMeds.has(med.id) ? 'checked' : '';
        const card = document.createElement('div');
        card.className = `med-card ${selectedMeds.has(med.id) ? 'selected' : ''}`;
        card.innerHTML = `
            <div class="med-info">
                <input type="checkbox" class="med-select" data-id="${med.id}" ${checked} onclick="event.stopPropagation(); toggleSelectMed(${med.id})">
                ${thumb}
                <div class="med-text">
                    <div class="med-name">💊 ${escapeHtml(med.name)}</div>
                </div>
            </div>
            <button class="delete-btn" data-id="${med.id}" onclick="event.stopPropagation(); deleteSingleMed(${med.id})">🗑️</button>
        `;
        card.addEventListener('click', () => showMedDetails(med));
        container.appendChild(card);
    });
}
function renderMedicationsInList(list) {
    const container = document.getElementById('contentList');
    if (!container) return;
    container.innerHTML = '';
    if (!list.length) { container.innerHTML = `<div class="empty-state">${t('no_meds')}</div>`; return; }
    list.forEach(med => {
        const thumb = med.image ? `<img src="${med.image}" class="med-image-thumb">` : '<div class="med-image-thumb">💊</div>';
        const card = document.createElement('div');
        card.className = 'med-card';
        card.innerHTML = `
            <div class="med-info">
                ${thumb}
                <div class="med-text">
                    <div class="med-name">💊 ${escapeHtml(med.name)}</div>
                </div>
            </div>
        `;
        card.addEventListener('click', () => showMedDetails(med));
        container.appendChild(card);
    });
}
function renderMedicationsInExplore(list) {
    const container = document.querySelector('.tab-content.active .content-list');
    if (!container) return;
    if (!list.length) { container.innerHTML = `<div class="empty-state">${t('no_meds')}</div>`; return; }
    container.innerHTML = '';
    list.forEach(med => {
        const thumb = med.image ? `<img src="${med.image}" class="med-image-thumb">` : '<div class="med-image-thumb">💊</div>';
        const card = document.createElement('div');
        card.className = 'med-card';
        card.innerHTML = `
            <div class="med-info">
                ${thumb}
                <div class="med-text">
                    <div class="med-name">💊 ${escapeHtml(med.name)}</div>
                </div>
            </div>
        `;
        card.addEventListener('click', () => showMedDetails(med));
        container.appendChild(card);
    });
}

// ====================== All Medicines & Pharmacy ======================
async function renderAllMedicines() {
    const container = document.getElementById('pageContent');
    container.innerHTML = `
        <div class="search-bar">
            <input type="text" id="search" placeholder="${t('search_placeholder')}">
            <button onclick="performSearch()"><span class="search-btn-text">${t('search_btn')}</span></button>
            <button onclick="performBarcodeSearch()" class="small-btn" style="background: var(--primary);">🔍 ${t('barcode_search')}</button>
        </div>
        <div class="filters-bar">
            <select id="sortBy" onchange="applyFiltersAndSort()">
                <option value="expiry_asc">${t('closest_expiry')}</option>
                <option value="expiry_desc">${t('farthest_expiry')}</option>
                <option value="name_asc">${t('name_asc')}</option>
                <option value="name_desc">${t('name_desc')}</option>
            </select>
            <div style="display: flex; gap: 8px; flex: 1;">
                <input type="text" id="companyFilter" placeholder="${t('filter_company')}" style="flex: 1;">
                <button class="small-btn" onclick="applyCompanyFilter()" style="background: var(--primary);"><span class="company-search-btn">${t('company_search_btn')}</span></button>
            </div>
            <button class="batch-delete-btn" onclick="batchDelete()">${t('batch_delete')}</button>
        </div>
        <div class="content-list" id="contentList"></div>
        <div id="stats"></div>
    `;
    syncFilterControls();
    const list = await getFilteredAndSorted();
    renderMedications(list);
    showStats();
}
async function renderPharmacyMedicines() {
    const container = document.getElementById('pageContent');
    container.innerHTML = `
        <div class="search-bar">
            <input type="text" id="search" placeholder="${t('search_placeholder')}">
            <button onclick="performSearch()"><span class="search-btn-text">${t('search_btn')}</span></button>
            <button onclick="performBarcodeSearch()" class="small-btn" style="background: var(--primary);">🔍 ${t('barcode_search')}</button>
        </div>
        <div class="filters-bar">
            <select id="sortBy" onchange="applyFiltersAndSort()">
                <option value="expiry_asc">${t('closest_expiry')}</option>
                <option value="expiry_desc">${t('farthest_expiry')}</option>
                <option value="name_asc">${t('name_asc')}</option>
                <option value="name_desc">${t('name_desc')}</option>
            </select>
            <div style="display: flex; gap: 8px; flex: 1;">
                <input type="text" id="companyFilter" placeholder="${t('filter_company')}" style="flex: 1;">
                <button class="small-btn" onclick="applyCompanyFilter()" style="background: var(--primary);"><span class="company-search-btn">${t('company_search_btn')}</span></button>
            </div>
            <button class="batch-delete-btn" onclick="batchDelete()">${t('batch_delete')}</button>
            <button class="save-btn" onclick="showAddFormModal()">${t('add_med')}</button>
        </div>
        <div class="content-list" id="contentList"></div>
    `;
    typeFilter = 'pharmacy';
    syncFilterControls();
    const list = await getFilteredAndSorted();
    renderMedications(list);
}
function performSearch() {
    searchQuery = document.getElementById('search').value.trim();
    if (currentPage === 'all') renderAllMedicines();
    else if (currentPage === 'pharmacy') renderPharmacyMedicines();
    else if (currentPage === 'expiring') renderExpiringSoonPage();
}
function applyCompanyFilter() {
    companyFilter = document.getElementById('companyFilter').value.trim();
    if (currentPage === 'all') renderAllMedicines();
    else if (currentPage === 'pharmacy') renderPharmacyMedicines();
}

// ====================== Companies Page (horizontal layout) ======================
async function renderCompaniesPage() {
    const container = document.getElementById('pageContent');
    if (currentCompany) {
        await showMedicinesByCompany(currentCompany);
        return;
    }
    container.innerHTML = `
        <div class="search-bar">
            <input type="text" id="companySearch" placeholder="🔍 بحث عن شركة...">
            <button onclick="filterCompanies()"><span class="search-btn-text">${t('search_btn')}</span></button>
        </div>
        <div class="companies-sort-bar">
            <label>${t('companies_sort')}</label>
            <select id="companiesSort" onchange="filterCompanies()">
                <option value="alpha">${t('alphabetical')}</option>
                <option value="count_desc">${t('by_med_count')} (تنازلي)</option>
                <option value="count_asc">${t('by_med_count')} (تصاعدي)</option>
                <option value="popular">${t('popular')}</option>
            </select>
        </div>
        <div id="companiesList"></div>
    `;
    await displayCompanies('', 'alpha');
}
async function displayCompanies(searchTerm, sortType = 'alpha') {
    const medsArr = await db.meds.toArray();
    const companyMap = new Map();
    medsArr.forEach(med => {
        if (med.company && med.company.trim()) {
            if (!companyMap.has(med.company)) {
                companyMap.set(med.company, { origin: med.origin || 'غير معروف', count: 1 });
            } else {
                companyMap.get(med.company).count++;
            }
        }
    });
    let companies = Array.from(companyMap.entries()).map(([name, data]) => ({ name, origin: data.origin, count: data.count }));
    if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        companies = companies.filter(c => c.name.toLowerCase().includes(term));
    }
    if (sortType === 'alpha') companies.sort((a,b) => a.name.localeCompare(b.name));
    else if (sortType === 'count_desc') companies.sort((a,b) => b.count - a.count);
    else if (sortType === 'count_asc') companies.sort((a,b) => a.count - b.count);
    else if (sortType === 'popular') companies.sort((a,b) => b.count - a.count);
    const container = document.getElementById('companiesList');
    if (!companies.length) { container.innerHTML = `<div class="empty-state">${t('no_companies')}</div>`; return; }
    container.innerHTML = `
        <div class="companies-grid">
            ${companies.map(c => `
                <div class="company-card" onclick="showCompanyMedicines('${escapeHtml(c.name)}')">
                    <div>🏭 ${escapeHtml(c.name)}</div>
                    <div class="company-origin">📍 ${escapeHtml(c.origin)}</div>
                    <div class="medicine-count">📊 ${t('medicine_count')}: ${c.count}</div>
                </div>
            `).join('')}
        </div>
    `;
}
function filterCompanies() {
    const searchTerm = document.getElementById('companySearch').value;
    const sortType = document.getElementById('companiesSort').value;
    displayCompanies(searchTerm, sortType);
}
function showCompanyMedicines(companyName) {
    currentCompany = companyName;
    showMedicinesByCompany(companyName);
}
async function showMedicinesByCompany(companyName) {
    const container = document.getElementById('pageContent');
    const medsList = await db.meds.where('company').equals(companyName).toArray();
    container.innerHTML = `
        <div class="company-header">
            <button class="back-to-companies-btn" onclick="backToCompanies()">← ${t('back_to_companies')}</button>
            <h3 style="margin: 16px 0;">🏭 ${escapeHtml(companyName)}</h3>
        </div>
        <div class="content-list" id="companyMedsList"></div>
    `;
    const listContainer = document.getElementById('companyMedsList');
    if (!medsList.length) {
        listContainer.innerHTML = `<div class="empty-state">${t('no_meds')}</div>`;
        return;
    }
    medsList.forEach(med => {
        const thumb = med.image ? `<img src="${med.image}" class="med-image-thumb">` : '<div class="med-image-thumb">💊</div>';
        const card = document.createElement('div');
        card.className = 'med-card';
        card.innerHTML = `
            <div class="med-info">
                ${thumb}
                <div class="med-text">
                    <div class="med-name">💊 ${escapeHtml(med.name)}</div>
                </div>
            </div>
            <button class="delete-btn" data-id="${med.id}" onclick="event.stopPropagation(); deleteSingleMed(${med.id})">🗑️</button>
        `;
        card.addEventListener('click', () => showMedDetails(med));
        listContainer.appendChild(card);
    });
}
function backToCompanies() {
    currentCompany = null;
    switchPage('companies');
}

// ====================== Categories Page ======================
async function renderCategoriesPage() {
    const container = document.getElementById('pageContent');
    container.innerHTML = `<div id="contentList"></div>`;
    const medsArr = await db.meds.toArray();
    const cats = [...new Set(medsArr.map(m => m.category).filter(c => c))];
    const contentList = document.getElementById('contentList');
    if (!cats.length) { contentList.innerHTML = `<div class="empty-state">${t('no_categories')}</div>`; return; }
    contentList.innerHTML = `<div class="categories-grid">${cats.map(c => `<div class="category-card" data-category="${c}">${c}</div>`).join('')}</div>`;
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', async () => {
            const cat = card.getAttribute('data-category');
            const filtered = (await db.meds.toArray()).filter(m => m.category === cat);
            renderMedicationsInList(filtered);
        });
    });
}

// ====================== Expiring Soon ======================
async function renderExpiringSoonPage() {
    const container = document.getElementById('pageContent');
    container.innerHTML = `
        <div class="search-bar">
            <input type="text" id="search" placeholder="${t('search_placeholder')}">
            <button onclick="performSearch()"><span class="search-btn-text">${t('search_btn')}</span></button>
        </div>
        <div class="content-list" id="contentList"></div>
    `;
    syncFilterControls();
    const list = await db.meds.toArray();
    const soon = list.filter(m => { const d = getDaysRemaining(m.expiry); return d >= 0 && d <= 7; });
    renderMedications(soon);
}

// ====================== Inbox ======================
async function renderInbox() {
    const container = document.getElementById('pageContent');
    const notifs = await db.notifications.orderBy('date').reverse().toArray();
    if (notifs.length === 0) {
        container.innerHTML = `<div class="empty-state">${t('no_notifications')}</div>`;
        return;
    }
    container.innerHTML = notifs.map(n => `
        <div class="notification-item">
            <div>${escapeHtml(n.message)}</div>
            <div class="notification-date">${new Date(n.date).toLocaleString()}</div>
        </div>
    `).join('');
    await db.notifications.where('read').equals(false).modify({ read: true });
    updateNotifBadge();
}

// ====================== Explore ======================
async function renderExplore() {
    const container = document.getElementById('pageContent');
    container.innerHTML = `
        <div class="explore-tabs">
            <button class="tab-btn active" data-tab="categories">${t('categories')}</button>
            <button class="tab-btn" data-tab="companies">${t('companies')}</button>
            <button class="tab-btn" data-tab="expiring">${t('expiring_soon')}</button>
        </div>
        <div id="tab-categories" class="tab-content active"></div>
        <div id="tab-companies" class="tab-content"></div>
        <div id="tab-expiring" class="tab-content"></div>
    `;
    const cats = await db.meds.toArray().then(meds => [...new Set(meds.map(m => m.category).filter(c => c))]);
    const catsContainer = document.getElementById('tab-categories');
    catsContainer.innerHTML = cats.length ? `<div class="categories-grid">${cats.map(c => `<div class="category-card" data-category="${c}">${c}</div>`).join('')}</div>` : `<div class="empty-state">${t('no_categories')}</div>`;
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', async () => {
            const cat = card.getAttribute('data-category');
            const filtered = (await db.meds.toArray()).filter(m => m.category === cat);
            renderMedicationsInExplore(filtered);
        });
    });
    const comps = await db.meds.toArray().then(meds => [...new Set(meds.map(m => m.company).filter(c => c && c.trim()))]);
    const compsContainer = document.getElementById('tab-companies');
    compsContainer.innerHTML = comps.length ? `<div class="companies-grid">${comps.map(c => `<div class="company-card" data-company="${c}">${c}</div>`).join('')}</div>` : `<div class="empty-state">${t('no_companies')}</div>`;
    document.querySelectorAll('.company-card').forEach(card => {
        card.addEventListener('click', async () => {
            const comp = card.getAttribute('data-company');
            const filtered = (await db.meds.toArray()).filter(m => m.company === comp);
            renderMedicationsInExplore(filtered);
        });
    });
    const soon = (await db.meds.toArray()).filter(m => { const d = getDaysRemaining(m.expiry); return d >= 0 && d <= 7; });
    const soonContainer = document.getElementById('tab-expiring');
    soonContainer.innerHTML = soon.length ? `<div class="content-list"></div>` : `<div class="empty-state">${t('no_meds')}</div>`;
    if (soon.length) renderMedicationsInExplore(soon);
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
            document.getElementById(`tab-${btn.dataset.tab}`).classList.add('active');
        });
    });
}

// ====================== Common Functions ======================
async function getFilteredAndSorted() {
    let list = await db.meds.toArray();
    if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        list = list.filter(m => m.name.toLowerCase().includes(q) ||
                                 (m.scientificName && m.scientificName.toLowerCase().includes(q)) ||
                                 (m.barcode && m.barcode.toLowerCase().includes(q)));
    }
    if (typeFilter !== 'all') list = list.filter(m => m.type === typeFilter);
    if (companyFilter.trim()) list = list.filter(m => m.company && m.company.toLowerCase().includes(companyFilter.toLowerCase()));
    if (sortBy === 'expiry_asc') list.sort((a,b) => getDaysRemaining(a.expiry) - getDaysRemaining(b.expiry));
    else if (sortBy === 'expiry_desc') list.sort((a,b) => getDaysRemaining(b.expiry) - getDaysRemaining(a.expiry));
    else if (sortBy === 'name_asc') list.sort((a,b) => a.name.localeCompare(b.name));
    else if (sortBy === 'name_desc') list.sort((a,b) => b.name.localeCompare(a.name));
    return list;
}

function toggleSelectMed(id) {
    if (selectedMeds.has(id)) selectedMeds.delete(id);
    else selectedMeds.add(id);
    if (currentPage === 'all') renderAllMedicines();
    else if (currentPage === 'pharmacy') renderPharmacyMedicines();
}
async function deleteSingleMed(id) {
    if (confirm(t('delete_confirm'))) {
        showLoading();
        try {
            const med = await db.meds.get(id);
            if (med) {
                await db.deletedMeds.add(med);
                await db.meds.delete(id);
                selectedMeds.delete(id);
                if (currentPage === 'all') renderAllMedicines();
                else if (currentPage === 'pharmacy') renderPharmacyMedicines();
                else if (currentPage === 'expiring') renderExpiringSoonPage();
                else if (currentPage === 'companies' && currentCompany) {
                    await showMedicinesByCompany(currentCompany);
                }
                updateBarChart();
            }
        } finally { hideLoading(); }
    }
}
async function batchDelete() {
    if (selectedMeds.size === 0) return alert(t('batch_delete_confirm', 0));
    if (confirm(t('batch_delete_confirm', selectedMeds.size))) {
        showLoading();
        try {
            for (let id of selectedMeds) {
                const med = await db.meds.get(id);
                if (med) await db.deletedMeds.add(med);
                await db.meds.delete(id);
            }
            selectedMeds.clear();
            if (currentPage === 'all') renderAllMedicines();
            else if (currentPage === 'pharmacy') renderPharmacyMedicines();
            updateBarChart();
        } finally { hideLoading(); }
    }
}
async function showStats() {
    const medsArr = await db.meds.toArray();
    const total = medsArr.length;
    const expired = medsArr.filter(m => getDaysRemaining(m.expiry) < 0).length;
    const expiring30 = medsArr.filter(m => { const d = getDaysRemaining(m.expiry); return d >= 0 && d <= 30; }).length;
    const pharmacyCount = medsArr.filter(m => m.type === 'pharmacy').length;
    const statsDiv = document.getElementById('stats');
    if (statsDiv) {
        statsDiv.innerHTML = `
            <div class="stats-box">
                <div>${t('total')}: <strong>${total}</strong></div>
                <div>${t('pharmacy_count')}: <strong>${pharmacyCount}</strong></div>
                <div>${t('expired')}: <strong style="color:var(--danger)">${expired}</strong></div>
                <div>${t('expiring_30')}: <strong style="color:var(--warning)">${expiring30}</strong></div>
            </div>
        `;
    }
}

// ====================== Barcode Functions ======================
async function performBarcodeSearch() {
    const barcode = prompt('أدخل الباركود للبحث:');
    if (barcode && barcode.trim()) {
        const med = await db.meds.where('barcode').equals(barcode.trim()).first();
        if (med) {
            showMedDetails(med);
        } else {
            alert('لم يتم العثور على دواء بهذا الباركود');
        }
    }
}
async function startBarcodeScanner(targetInputId) {
    return new Promise((resolve, reject) => {
        const modal = document.getElementById('barcodeScannerModal');
        modal.style.display = 'flex';
        const video = document.getElementById('scannerVideo');
        const resultDiv = document.getElementById('scannerResult');
        resultDiv.innerHTML = '';
        Quagga.init({
            inputStream: {
                name: "Live",
                type: "LiveStream",
                target: video,
                constraints: { facingMode: "environment" }
            },
            decoder: { readers: ["ean_reader", "ean_8_reader", "code_128_reader"] }
        }, err => {
            if (err) { reject(err); return; }
            Quagga.start();
            currentScanner = Quagga;
            Quagga.onDetected(data => {
                const code = data.codeResult.code;
                resultDiv.innerHTML = `تم مسح: ${code}`;
                Quagga.stop();
                currentScanner = null;
                modal.style.display = 'none';
                document.getElementById(targetInputId).value = code;
                resolve(code);
            });
        });
    });
}
function stopScannerAndClose() {
    if (currentScanner) {
        currentScanner.stop();
        currentScanner = null;
    }
    document.getElementById('barcodeScannerModal').style.display = 'none';
}

// ====================== Add/Edit Form ======================
function showAddFormModal() {
    isEditing = false;
    document.getElementById('medFormTitle').innerText = t('add_med');
    document.getElementById('submitMedBtn').innerText = t('save_med');
    document.getElementById('medName').value = '';
    document.getElementById('scientificName').value = '';
    document.getElementById('company').value = '';
    document.getElementById('origin').value = '';
    document.getElementById('medType').value = 'pharmacy';
    document.getElementById('medCategory').value = '';
    document.getElementById('medExpiry').value = '';
    document.getElementById('medBarcode').value = '';
    document.getElementById('imagePreview').innerHTML = '';
    document.getElementById('medImage').value = '';
    openModal('medFormModal');
}
function showEditFormModal(med) {
    isEditing = true;
    currentMed = med;
    document.getElementById('medFormTitle').innerText = t('edit_med');
    document.getElementById('submitMedBtn').innerText = t('save_med');
    document.getElementById('medName').value = med.name;
    document.getElementById('scientificName').value = med.scientificName || '';
    document.getElementById('company').value = med.company || '';
    document.getElementById('origin').value = med.origin || '';
    document.getElementById('medType').value = med.type || 'pharmacy';
    document.getElementById('medCategory').value = med.category || '';
    document.getElementById('medExpiry').value = med.expiry;
    document.getElementById('medBarcode').value = med.barcode || '';
    const previewDiv = document.getElementById('imagePreview');
    if (med.image) previewDiv.innerHTML = `<img src="${med.image}" style="max-width:100%; max-height:100%;">`;
    else previewDiv.innerHTML = '';
    openModal('medFormModal');
}
async function saveMedFromForm() {
    showLoading();
    try {
        const name = document.getElementById('medName').value.trim();
        const expiry = document.getElementById('medExpiry').value;
        if (!name || !expiry) {
            alert(t('trade_name') + ' و ' + t('expiry_date') + ' ' + (currentLang === 'ar' ? 'مطلوبان' : 'required'));
            return;
        }
        const medData = {
            name, expiry,
            scientificName: document.getElementById('scientificName').value.trim(),
            company: document.getElementById('company').value.trim(),
            origin: document.getElementById('origin').value.trim(),
            type: document.getElementById('medType').value,
            category: document.getElementById('medCategory').value,
            barcode: document.getElementById('medBarcode').value.trim(),
            image: null
        };
        const imgFile = document.getElementById('medImage').files[0];
        const saveOrUpdate = async (data) => {
            if (isEditing) {
                data.id = currentMed.id;
                await db.meds.update(currentMed.id, data);
            } else {
                await db.meds.add(data);
            }
            closeMedFormModal();
            if (currentPage === 'all') renderAllMedicines();
            else if (currentPage === 'pharmacy') renderPharmacyMedicines();
            else if (currentPage === 'expiring') renderExpiringSoonPage();
            updateBarChart();
            alert(currentLang === 'ar' ? 'تم الحفظ بنجاح' : 'Saved successfully');
        };
        if (imgFile) {
            const reader = new FileReader();
            reader.onload = async (e) => {
                medData.image = e.target.result;
                await saveOrUpdate(medData);
            };
            reader.readAsDataURL(imgFile);
        } else {
            if (isEditing && currentMed.image) medData.image = currentMed.image;
            await saveOrUpdate(medData);
        }
    } catch (err) {
        console.error(err);
        alert('حدث خطأ');
    } finally {
        hideLoading();
    }
}
function closeMedFormModal() { closeModal('medFormModal'); }

// ====================== Settings ======================
function openSettingsModal() {
    const langSelect = document.getElementById('langSelect');
    if (langSelect) langSelect.value = currentLang;
    const darkModeBtn = document.getElementById('darkModeToggleBtn');
    if (darkModeBtn) {
        darkModeBtn.innerText = document.body.classList.contains('dark-mode') ? (currentLang === 'ar' ? 'إيقاف' : 'Disable') : (currentLang === 'ar' ? 'تشغيل' : 'Enable');
    }
    openModal('settingsModal');
}
function changeLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('appLang', lang);
    updateAllText();
    if (currentPage === 'home') updateBarChart();
}
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    const darkModeBtn = document.getElementById('darkModeToggleBtn');
    if (darkModeBtn) {
        darkModeBtn.innerText = document.body.classList.contains('dark-mode') ? (currentLang === 'ar' ? 'إيقاف' : 'Disable') : (currentLang === 'ar' ? 'تشغيل' : 'Enable');
    }
    if (currentPage === 'home') updateBarChart();
}
function showAbout() { alert(t('about_text')); }

// ====================== Import/Export ======================
async function exportDatabase() {
    showLoading();
    try {
        const meds = await db.meds.toArray();
        const notifications = await db.notifications.toArray();
        const deleted = await db.deletedMeds.toArray();
        const exportData = { meds, notifications, deleted };
        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        saveAs(blob, 'pharmacy_backup.json');
    } finally { hideLoading(); }
}
async function manualSave() {
    showLoading();
    try {
        const meds = await db.meds.toArray();
        const notifications = await db.notifications.toArray();
        const deleted = await db.deletedMeds.toArray();
        const exportData = { meds, notifications, deleted, exportedAt: new Date().toISOString() };
        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        saveAs(blob, `pharmacy_backup_${new Date().toISOString().slice(0,19).replace(/:/g, '-')}.json`);
        const toast = document.createElement('div');
        toast.className = 'offline-toast';
        toast.style.animation = 'none';
        toast.innerText = currentLang === 'ar' ? '✅ تم حفظ البيانات بنجاح' : '✅ Data saved successfully';
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 2000);
    } catch (err) {
        console.error(err);
        alert(currentLang === 'ar' ? 'حدث خطأ أثناء الحفظ' : 'Error while saving');
    } finally {
        hideLoading();
    }
}
async function importDatabase(file) {
    if (!file) return;
    showLoading();
    try {
        const reader = new FileReader();
        reader.onload = async (e) => {
            try {
                const data = JSON.parse(e.target.result);
                if (data.meds) await db.meds.bulkPut(data.meds);
                if (data.notifications) await db.notifications.bulkPut(data.notifications);
                if (data.deleted) await db.deletedMeds.bulkPut(data.deleted);
                alert(currentLang === 'ar' ? 'تم استيراد البيانات بنجاح' : 'Data imported successfully');
                if (currentPage === 'home') {
                    renderHome();
                    updateBarChart();
                } else if (currentPage === 'all') renderAllMedicines();
                else if (currentPage === 'pharmacy') renderPharmacyMedicines();
                else if (currentPage === 'inbox') renderInbox();
                else if (currentPage === 'explore') renderExplore();
            } catch (err) {
                alert(currentLang === 'ar' ? 'خطأ في الملف' : 'Invalid file');
            } finally { hideLoading(); }
        };
        reader.readAsText(file);
    } catch (err) { hideLoading(); }
}
async function exportCSV() {
    showLoading();
    try {
        const medsArr = await db.meds.toArray();
        const headers = ['الاسم', 'العلمي', 'الشركة', 'المنشأ', 'النوع', 'التصنيف', 'تاريخ الانتهاء', 'الباركود'];
        const rows = medsArr.map(m => [m.name, m.scientificName || '', m.company || '', m.origin || '', m.type === 'pharmacy' ? 'صيدلية' : '', m.category || '', m.expiry, m.barcode || '']);
        let csv = headers.join(',') + '\n' + rows.map(r => r.map(cell => `"${cell}"`).join(',')).join('\n');
        const blob = new Blob(["\uFEFF" + csv], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, 'pharmacy_export.csv');
    } finally { hideLoading(); }
}
async function exportPDF() {
    showLoading();
    try {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({ orientation: 'landscape' });
        const medsArr = await db.meds.toArray();
        const tableData = medsArr.map(m => [m.name, m.scientificName || '', m.company || '', m.expiry, m.barcode || '']);
        doc.autoTable({ head: [[t('name'), t('scientific_name'), t('company'), t('expiry_date'), t('barcode_label')]], body: tableData, styles: { font: 'helvetica', halign: 'right' }, startY: 20 });
        doc.save('pharmacy_export.pdf');
    } finally { hideLoading(); }
}

// ====================== Notifications ======================
async function checkAndSendExpiryNotifications() {
    const lastOverallCheck = localStorage.getItem('lastNotificationCheck');
    const now = new Date();
    const threeDays = 3 * 24 * 60 * 60 * 1000;
    if (lastOverallCheck && (now - new Date(lastOverallCheck)) < threeDays) return;
    const medsArr = await db.meds.toArray();
    const expiringSoon = medsArr.filter(m => { const days = getDaysRemaining(m.expiry); return days >= 0 && days <= 90; });
    if (!expiringSoon.length) return;
    const threeDaysAgo = new Date(now.getTime() - threeDays);
    const toSend = [];
    for (const med of expiringSoon) {
        const logs = await db.notificationLog.where('medId').equals(med.id).toArray();
        let count = 0;
        for (const log of logs) if (log.lastNotified && new Date(log.lastNotified) >= threeDaysAgo) count += log.count || 1;
        if (count < 2) toSend.push(med);
    }
    if (!toSend.length) return;
    if (Notification.permission === 'granted') {
        toSend.forEach(med => {
            const days = getDaysRemaining(med.expiry);
            new Notification(`⚠️ ${med.name}`, {
                body: currentLang === 'ar' ? `ينتهي خلال ${days} أيام` : `Expires in ${days} days`
            });
        });
    }
    for (const med of toSend) {
        const days = getDaysRemaining(med.expiry);
        await db.notifications.add({
            message: `${med.name} ${currentLang === 'ar' ? 'ينتهي خلال' : 'expires in'} ${days} ${currentLang === 'ar' ? 'أيام' : 'days'}`,
            date: new Date(),
            read: false
        });
        const existingLog = await db.notificationLog.where('medId').equals(med.id).first();
        if (existingLog) {
            const lastNotified = new Date(existingLog.lastNotified);
            if ((now - lastNotified) < threeDays) {
                await db.notificationLog.update(existingLog.id, { lastNotified: now, count: (existingLog.count || 1) + 1 });
            } else {
                await db.notificationLog.update(existingLog.id, { lastNotified: now, count: 1 });
            }
        } else {
            await db.notificationLog.add({ medId: med.id, lastNotified: now, count: 1 });
        }
    }
    localStorage.setItem('lastNotificationCheck', now.toISOString());
    updateNotifBadge();
}
async function updateNotifBadge() {
    const count = await db.notifications.where('read').equals(false).count();
    const badge = document.getElementById('notifBadge');
    if (badge) {
        if (count > 0) { badge.innerText = count; badge.style.display = 'flex'; }
        else badge.style.display = 'none';
    }
}

// ====================== Modals & Helpers ======================
function openModal(id) { const modal = document.getElementById(id); if (modal) modal.style.display = 'flex'; }
function closeModal(id) { const modal = document.getElementById(id); if (modal) modal.style.display = 'none'; }
async function showMedDetails(med) {
    currentMed = med;
    document.getElementById('medDetail').innerHTML = `
        <div class="med-detail-item"><div class="med-detail-label">${t('name')}:</div><div class="med-detail-value">${escapeHtml(med.name)}</div></div>
        <div class="med-detail-item"><div class="med-detail-label">${t('scientific_name')}:</div><div class="med-detail-value">${med.scientificName || '-'}</div></div>
        <div class="med-detail-item"><div class="med-detail-label">${t('company')}:</div><div class="med-detail-value">${med.company || '-'}</div></div>
        <div class="med-detail-item"><div class="med-detail-label">${t('origin')}:</div><div class="med-detail-value">${med.origin || '-'}</div></div>
        <div class="med-detail-item"><div class="med-detail-label">${t('category')}:</div><div class="med-detail-value">${med.category || '-'}</div></div>
        <div class="med-detail-item"><div class="med-detail-label">${t('expiry_date')}:</div><div class="med-detail-value">${med.expiry}</div></div>
        <div class="med-detail-item"><div class="med-detail-label">${t('barcode_label')}:</div><div class="med-detail-value">${med.barcode || '-'}</div></div>
        ${med.image ? `<img src="${med.image}" class="med-image">` : ''}
    `;
    openModal('medModal');
}
function editCurrentMed() { closeModal('medModal'); showEditFormModal(currentMed); }
async function deleteCurrentMed() { await deleteSingleMed(currentMed.id); closeModal('medModal'); }
function escapeHtml(str) { if (!str) return ''; return str.replace(/[&<>]/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;'}[m])); }
function applyFiltersAndSort() {
    sortBy = document.getElementById('sortBy').value;
    if (currentPage === 'all') renderAllMedicines();
    else if (currentPage === 'pharmacy') renderPharmacyMedicines();
}

// ====================== Initialization ======================
document.addEventListener('DOMContentLoaded', async () => {
    await initDemoData();
    if (localStorage.getItem('darkMode') === 'true') document.body.classList.add('dark-mode');
    if (localStorage.getItem('appLang')) currentLang = localStorage.getItem('appLang');
    else currentLang = 'ar';
    updateAllText();
    if (Notification.permission !== 'granted' && Notification.permission !== 'denied') Notification.requestPermission();
    // Header buttons
    document.getElementById('notifBtn').addEventListener('click', () => switchPage('inbox'));
    document.getElementById('settingsHeaderBtn').addEventListener('click', () => openSettingsModal());
    document.getElementById('backBtn').addEventListener('click', () => goHome());
    document.getElementById('saveBtn').addEventListener('click', manualSave);
    // Form buttons
    document.getElementById('submitMedBtn').addEventListener('click', saveMedFromForm);
    document.getElementById('scanBarcodeBtn').addEventListener('click', () => startBarcodeScanner('medBarcode'));
    document.getElementById('medImage').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                document.getElementById('imagePreview').innerHTML = `<img src="${ev.target.result}" style="max-width:100%; max-height:100%;">`;
            };
            reader.readAsDataURL(file);
        }
    });
    // Settings buttons
    document.getElementById('applyLangBtn').addEventListener('click', () => changeLanguage(document.getElementById('langSelect').value));
    document.getElementById('darkModeToggleBtn').addEventListener('click', toggleDarkMode);
    document.getElementById('exportDbBtn').addEventListener('click', exportDatabase);
    document.getElementById('importFileInput').addEventListener('change', e => importDatabase(e.target.files[0]));
    document.getElementById('exportCsvBtn').addEventListener('click', exportCSV);
    document.getElementById('exportPdfBtn').addEventListener('click', exportPDF);
    document.getElementById('aboutBtn').addEventListener('click', showAbout);
    switchPage('home');
    checkAndSendExpiryNotifications();
});