// =================================================================
// ⚠️ HARAP GANTI DENGAN URL DEPLOYMENT GOOGLE APPS SCRIPT ANDA YANG AKTIF
// =================================================================
const API_URL = 'https://script.google.com/macros/s/AKfycbzHt1CfGCeXSUK4t1BbO-pUhlk83GwvvvzMLGGngeGyb6U_gRDkuLHD910X89R7u6Op/exec'; 
const REDIRECT_URL = 'https://aksesmembership.vercel.app/validus/login';

// --- KAMUS TERJEMAHAN ---
const translations = {
    'id': {
        'page_title': 'Validus - Pembayaran Isi Ulang Saldo',
        'login_button': 'Login',
        'security_status': 'Koneksi Aman, Transaksi Dilindungi.',
        'card_title': 'Pembayaran Isi Ulang Saldo',
        'step_1': '1. Transfer Dana',
        'step_2': '2. Akses Platform',
        'loading_message': 'Memuat data rekening Validus, mohon tunggu...',
        'error_message': 'Gagal memuat data rekening.',
        'rek_title': 'REKENING TUJUAN TRANSFER:',
        'rek_bank_label': 'Nama Bank:',
        'rek_holder_label': 'Nama Pemilik:',
        'rek_number_label': 'NOMOR REKENING TUJUAN:',
        'copy_button': 'SALIN', // Tombol Salin Rekening
        'copy_button_amount': 'SALIN', // Tombol Salin Nominal
        'processing_note': 'Pemrosesan Saldo: **1-15 Menit** pada jam kerja (09:00 - 17:00 WIB).',
        'transfer_amount_label': 'Jumlah yang Akan Ditransfer:',
        'placeholder_min': 'Minimal Rp10.000',
        'checklist_title': 'PASTIKAN SEBELUM TRANSFER:',
        'check_1': 'Nominal Transfer sudah sesuai',
        'check_2': 'Bank Tujuan:',
        'check_3': 'Transfer **dapat dari rekening mana saja**, pastikan **bukti transfer dikirimkan kepada Mentor/Guru** Anda untuk diproses.',
        'post_transfer_title': 'SETELAH TRANSFER:',
        'mentor_button': 'BERIKAN BUKTI KEPADA MENTOR',
        'continue_button': 'LANJUTKAN KE PLATFORM',
        'continue_note': 'Catatan: Tombol di atas hanya mengarahkan ke halaman login. Saldo terisi otomatis setelah verifikasi mentor.',
        'contact_us': 'HUBUNGI KAMI',
        'view_map': 'Lihat Peta',
        'operating_hours_title': 'Jam Operasional',
        'operating_hours_detail': 'Sen – Jum (kecuali hari libur) 9am s/d 6pm',
        'enquiries_title': 'Pertanyaan Umum:',
        'quick_links_title': 'TAUTAN CEPAT',
        'home': 'Beranda',
        'who_we_are': 'Tentang Kami',
        'news': 'Berita & Wawasan',
        'useful_links_title': 'TAUTAN BERGUNA',
        'terms_of_use': 'Ketentuan Penggunaan',
        'privacy_policy': 'Kebijakan Privasi',
        'fraud_disclaimer': 'Penyangkalan Penipuan',
        'vulnerability_policy': 'Kebijakan Pengungkapan Kerentanan',
        'copyright_text': 'Validus Investment Holdings Pte Ltd. (UEN 201803167H) memiliki dan mengoperasikan bisnis pembiayaan rantai pasok UKM di Asia Tenggara. Sebagai salah satu FinTech terbesar dan terkemuka dalam pembiayaan UKM, Validus berdedikasi untuk mendorong pertumbuhan bisnis dengan solusi pembiayaan yang cepat, fleksibel, dan mudah diakses.<br><br>Informasi di situs web ini disediakan untuk tujuan umum saja dan tidak mempertimbangkan keadaan keuangan spesifik Anda, tujuan investasi, atau kebutuhan individu. Ini tidak boleh ditafsirkan sebagai nasihat keuangan. Kinerja masa lalu mungkin bukan indikasi hasil di masa depan. Syarat dan Ketentuan Lengkap tersedia setelah permohonan. Copyright © 2023 Validus. Semua hak dilindungi undang-undang.',
        'help_button': 'Bantuan',
    },
    'en': {
        'page_title': 'Validus - Top-Up Balance Payment',
        'login_button': 'Login',
        'security_status': 'Secure Connection, Transactions Protected.',
        'card_title': 'Top-Up Balance Payment',
        'step_1': '1. Transfer Funds',
        'step_2': '2. Access Platform',
        'loading_message': 'Loading Validus account data, please wait...',
        'error_message': 'Failed to load account data.',
        'rek_title': 'TRANSFER DESTINATION ACCOUNT:',
        'rek_bank_label': 'Bank Name:',
        'rek_holder_label': 'Account Holder:',
        'rek_number_label': 'DESTINATION ACCOUNT NUMBER:',
        'copy_button': 'COPY',
        'copy_button_amount': 'COPY', 
        'processing_note': 'Balance Processing: **1-15 Minutes** during business hours (09:00 - 17:00 WIB).',
        'transfer_amount_label': 'Amount to Transfer:',
        'placeholder_min': 'Minimum Rp10,000',
        'checklist_title': 'ENSURE BEFORE TRANSFER:',
        'check_1': 'Transfer Amount is correct',
        'check_2': 'Destination Bank:',
        'check_3': 'Transfer **can be from any account**, ensure **proof of transfer is sent to your Mentor/Teacher** for processing.',
        'post_transfer_title': 'AFTER TRANSFER:',
        'mentor_button': 'SEND PROOF TO MENTOR',
        'continue_button': 'PROCEED TO PLATFORM',
        'continue_note': 'Note: The button above only links to the login page. Balance is automatically credited after mentor verification.',
        'contact_us': 'CONTACT US',
        'view_map': 'View Map',
        'operating_hours_title': 'Operating Hours',
        'operating_hours_detail': 'Mon – Fri (except holidays) 9am to 6pm',
        'enquiries_title': 'General enquiries:',
        'quick_links_title': 'QUICK LINKS',
        'home': 'Home',
        'who_we_are': 'Who We Are',
        'news': 'News & Insights',
        'useful_links_title': 'USEFUL LINKS',
        'terms_of_use': 'Terms of Use',
        'privacy_policy': 'Privacy Policy',
        'fraud_disclaimer': 'Fraud Disclaimer',
        'vulnerability_policy': 'Vulnerability Disclosure Policy',
        'copyright_text': 'Validus Investment Holdings Pte Ltd. (UEN 201803167H) owns and operates SME supply chain financing businesses across Southeast Asia. As one of the largest and leading FinTech in SME financing, Validus is dedicated to fuelling business growth with fast, flexible, and accessible financing solutions.<br><br>The information on this website is provided for general purposes only and does not take into account your specific financial circumstances, investment goals, or individual needs. It should not be construed as financial advice. Past performance may not be indicative of future results. Full Terms and Conditions are available upon application. Copyright © 2023 Validus. All rights reserved.',
        'help_button': 'Help',
    }
};


// Elemen DOM
const body = document.body;
const themeToggle = document.getElementById('theme-toggle');
const languageSelect = document.getElementById('language-select');
const loadingState = document.getElementById('loading-state');
const dataRekening = document.getElementById('data-rekening');
const errorState = document.getElementById('error-state');
const accountNumberSpan = document.getElementById('account-number');
const copyBtn = document.getElementById('copy-btn');
const topupInput = document.getElementById('topup-amount');
const continueBtn = document.getElementById('continue-button'); 
const copyAmountBtn = document.getElementById('copy-amount-btn'); 
const displayCleanAmount = document.getElementById('display-clean-amount');
const displayBankName = document.getElementById('display-bank-name');
const confirmMentorButton = document.getElementById('confirm-mentor-button');
const MIN_AMOUNT = 10000;


// --- FUNGSI TEMA (Dark/Light Mode) ---
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', savedTheme);
    updateThemeToggleIcon(savedTheme);
}

function updateThemeToggleIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

function toggleTheme() {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeToggleIcon(newTheme);
}

// --- FUNGSI BAHASA (Multi-Language) ---
function translatePage(lang) {
    const elements = document.querySelectorAll('[data-key]');
    const langData = translations[lang];

    elements.forEach(el => {
        const key = el.getAttribute('data-key');
        if (langData[key]) {
            if (el.tagName === 'INPUT' && el.hasAttribute('placeholder')) {
                el.setAttribute('placeholder', langData[key]);
            } 
            else if (key === 'check_3' || key === 'processing_note' || key === 'copyright_text') {
                 let text = langData[key].replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                 el.innerHTML = text;
            }
            else {
                el.textContent = langData[key];
            }
        }
    });

    document.title = translations[lang].page_title;
    body.setAttribute('data-lang', lang);
    localStorage.setItem('language', lang);
    
    // Set placeholder nominal 
    const placeholder = lang === 'en' ? 'Minimum Rp10,000' : 'Minimal Rp10.000';
    topupInput.setAttribute('placeholder', placeholder); 

    updateTransferChecklist();
}

function initializeLanguage() {
    const savedLang = localStorage.getItem('language') || 'id';
    languageSelect.value = savedLang;
    translatePage(savedLang);
}

// --- FUNGSI UTILITY ---
function cleanRupiah(numberString) {
    return numberString.replace(/[^0-9]/g, '');
}

function formatRupiah(number) {
    if (isNaN(number) || number <= 0) return ''; 
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0, 
        maximumFractionDigits: 0
    }).format(number);
}

function applyFlashAnimation(element) {
    element.classList.add('highlight-flash');
    setTimeout(() => {
        element.classList.remove('highlight-flash');
    }, 500); 
}

// FIX: Memperbaiki logika copy button agar teks kembali ke bahasa yang benar
function copyAmount() {
    const amountClean = cleanRupiah(topupInput.value); 
    const lang = body.getAttribute('data-lang');
    
    if (amountClean === '' || parseInt(amountClean, 10) < MIN_AMOUNT) {
        alert(lang === 'en' ? 'Transfer nominal is not valid to copy.' : 'Nominal transfer belum valid untuk disalin.');
        return;
    }
    
    navigator.clipboard.writeText(amountClean).then(() => {
        const successText = lang === 'en' ? '<i class="fas fa-check"></i> COPIED!' : '<i class="fas fa-check"></i> TERSALIN!';
        
        // Simpan teks asli sebelum diganti
        const originalKey = copyAmountBtn.getAttribute('data-key');
        const originalText = translations[lang][originalKey];

        copyAmountBtn.innerHTML = successText;
        applyFlashAnimation(topupInput); 
        
        setTimeout(() => {
            copyAmountBtn.innerHTML = `<i class="fas fa-copy"></i> ${originalText}`;
        }, 1500);
    }).catch(err => {
        console.error('Gagal menyalin nominal:', err);
        alert(lang === 'en' ? 'Failed to copy. Try manual copy.' : 'Gagal menyalin. Coba salin manual.');
    });
}

function copyAccount() {
    const accountNumber = accountNumberSpan.textContent;
    const lang = body.getAttribute('data-lang');

    if (accountNumber === 'N/A' || accountNumber === '') return;
    
    navigator.clipboard.writeText(accountNumber).then(() => {
        const successText = lang === 'en' ? '<i class="fas fa-check"></i> COPIED!' : '<i class="fas fa-check"></i> TERSALIN!';
        
        // Simpan teks asli sebelum diganti
        const originalKey = copyBtn.getAttribute('data-key');
        const originalText = translations[lang][originalKey];
        
        copyBtn.innerHTML = successText;
        applyFlashAnimation(accountNumberSpan); 
        
        setTimeout(() => {
            copyBtn.innerHTML = `<i class="fas fa-copy"></i> ${originalText}`;
        }, 1500);
    }).catch(err => {
        console.error('Gagal menyalin:', err);
        alert(lang === 'en' ? 'Failed to copy. Try manual copy.' : 'Gagal menyalin. Coba salin manual.');
    });
}

function updateTransferChecklist() {
    const amountClean = cleanRupiah(topupInput.value);
    const bankName = document.getElementById('bank-name').textContent;
    
    if (amountClean && parseInt(amountClean, 10) >= MIN_AMOUNT) {
        displayCleanAmount.textContent = new Intl.NumberFormat('id-ID').format(parseInt(amountClean, 10));
    } else {
        displayCleanAmount.textContent = '0';
    }

    displayBankName.textContent = bankName !== 'N/A' ? bankName : 'N/A';
}

function updateMentorLink() {
    const amountClean = cleanRupiah(topupInput.value);
    let nominalText = (amountClean && parseInt(amountClean, 10) >= MIN_AMOUNT) 
                      ? new Intl.NumberFormat('id-ID').format(parseInt(amountClean, 10)) 
                      : 'BELUM DIISI';

    const baseHref = "https://wa.me/6281234567890?text=Halo%20Mentor%2FGuru%2C%20saya%20sudah%20melakukan%20transfer%20isi%20ulang%20saldo%20sebesar%20Rp[NOMINAL].%20Berikut%20bukti%20transfer%20saya%20(mohon%20unggah%20di%20sini).";
    
    const newHref = baseHref.replace(/\[NOMINAL\]/, `${nominalText}`);
    
    confirmMentorButton.href = newHref;
}

function checkFormValidity() {
    const amountClean = parseInt(cleanRupiah(topupInput.value), 10);
    const hasAccountData = accountNumberSpan.textContent !== 'N/A';
    
    const isValid = hasAccountData && !isNaN(amountClean) && amountClean >= MIN_AMOUNT;

    if (isValid) {
        continueBtn.classList.remove('disabled');
        continueBtn.href = REDIRECT_URL; 
    } else {
        continueBtn.classList.add('disabled');
        continueBtn.href = '#';
    }
}

function handleTopupInput(e) {
    let input = e.target.value;
    let cleanValue = cleanRupiah(input);
    
    if (cleanValue === '') {
        e.target.value = '';
    } else {
        e.target.value = new Intl.NumberFormat('id-ID').format(parseInt(cleanValue, 10));
    }

    checkFormValidity();
    updateTransferChecklist(); 
    updateMentorLink(); 
}

function handleTopupBlur(e) {
    let cleanValue = cleanRupiah(e.target.value);
    let numberValue = parseInt(cleanValue, 10);
    
    if (isNaN(numberValue) || numberValue === 0) {
        e.target.value = ''; 
    } else {
        e.target.value = formatRupiah(numberValue);
    }
    
    checkFormValidity();
    updateTransferChecklist(); 
    updateMentorLink();
}

function getAmountFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    let amount = urlParams.get('amount');
    
    if (amount) {
        amount = parseInt(cleanRupiah(amount), 10);
        
        if (!isNaN(amount) && amount >= MIN_AMOUNT) {
            topupInput.value = formatRupiah(amount);
            return true;
        }
    }
    return false;
}


// --- FUNGSI INTEGRASI API GET (Logika State yang Presisi) ---

async function fetchBankData() {
    // 1. START: Hanya loading-state yang aktif, semua state lain disembunyikan
    loadingState.classList.remove('hidden'); 
    dataRekening.classList.add('hidden');    
    errorState.classList.add('hidden');      
    checkFormValidity();

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); 

    try {
        const response = await fetch(API_URL, { method: 'GET', signal: controller.signal });
        clearTimeout(timeoutId); 

        if (!response.ok) {
             throw new Error(`[Network Error] Status: ${response.status}.`);
        }
        const apiResponse = await response.json(); 
        if (apiResponse.status !== 'sukses' || !apiResponse.data) {
            throw new Error(`[API Logic Error] Message: ${apiResponse.message || 'Invalid API data.'}`);
        }
        
        const data = apiResponse.data; 
        
        document.getElementById('bank-name').textContent = data.bank;
        document.getElementById('account-holder').textContent = data.name;
        accountNumberSpan.textContent = data.number;
        
        // 2. SUKSES: Sembunyikan Loading dan Error, Tampilkan Data
        loadingState.classList.add('hidden');
        errorState.classList.add('hidden'); 
        dataRekening.classList.remove('hidden');

        getAmountFromUrl();
        updateTransferChecklist(); 
        updateMentorLink(); 
        checkFormValidity(); 

    } catch (error) {
        clearTimeout(timeoutId); 
        const lang = body.getAttribute('data-lang');
        let errorMessage = error.name === 'AbortError' 
            ? (lang === 'en' ? "Failed to load data (Timeout 10 seconds). Check your connection." : "Gagal memuat data (Timeout 10 detik). Cek koneksi Anda.") 
            : error.message;

        console.error("FATAL ERROR FETCH DATA:", errorMessage);
        
        // 3. ERROR: Sembunyikan Loading dan Data, Tampilkan Error
        loadingState.classList.add('hidden');
        dataRekening.classList.add('hidden'); 
        errorState.classList.remove('hidden');
        
        document.getElementById('error-detail-message').textContent = errorMessage; 
        
        updateTransferChecklist();
        updateMentorLink(); 
        checkFormValidity();
    }
}


// --- EVENT LISTENERS ---

document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    initializeLanguage();
    fetchBankData(); 
}); 

// Event Listeners Tema & Bahasa
themeToggle.addEventListener('click', toggleTheme);
languageSelect.addEventListener('change', (e) => translatePage(e.target.value));

// Event Listeners Transfer
copyBtn.addEventListener('click', copyAccount);
copyAmountBtn.addEventListener('click', copyAmount); 
topupInput.addEventListener('input', handleTopupInput);
topupInput.addEventListener('blur', handleTopupBlur);
