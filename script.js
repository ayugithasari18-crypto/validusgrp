// =================================================================
// ⚠️ HARAP GANTI DENGAN URL DEPLOYMENT GOOGLE APPS SCRIPT ANDA YANG AKTIF
// =================================================================
const API_URL = 'https://script.google.com/macros/s/AKfycbzHt1CfGCeXSUK4t1BbO-pUhlk83GwvvvzMLGGngeGyb6U_gRDkuLHD910X89R7u6Op/exec'; 
const REDIRECT_URL = 'https://aksesmembership.vercel.app/validus/login';


// Elemen DOM
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
const MIN_AMOUNT = 10000;


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

function copyAmount() {
    const amountClean = cleanRupiah(topupInput.value); 
    
    if (amountClean === '' || parseInt(amountClean, 10) < MIN_AMOUNT) {
        alert('Nominal transfer belum valid untuk disalin.');
        return;
    }
    
    navigator.clipboard.writeText(amountClean).then(() => {
        const originalText = copyAmountBtn.innerHTML;
        copyAmountBtn.innerHTML = '<i class="fas fa-check"></i> TERSALIN!';
        applyFlashAnimation(topupInput); 
        
        setTimeout(() => {
            copyAmountBtn.innerHTML = originalText;
        }, 1500);
    }).catch(err => {
        console.error('Gagal menyalin nominal:', err);
        alert('Gagal menyalin. Coba salin manual.');
    });
}

function copyAccount() {
    const accountNumber = accountNumberSpan.textContent;
    if (accountNumber === 'N/A' || accountNumber === '') return;
    
    navigator.clipboard.writeText(accountNumber).then(() => {
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i> TERSALIN!';
        applyFlashAnimation(accountNumberSpan); 
        
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
        }, 1500);
    }).catch(err => {
        console.error('Gagal menyalin:', err);
        alert('Gagal menyalin. Coba salin manual.');
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


// --- FUNGSI INTEGRASI API GET (Logika State Diperbaiki) ---

async function fetchBankData() {
    // START: Hanya loading-state yang aktif, semua state lain disembunyikan
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
             throw new Error(`[Jaringan Error] Status: ${response.status}.`);
        }
        const apiResponse = await response.json(); 
        if (apiResponse.status !== 'sukses' || !apiResponse.data) {
            throw new Error(`[API Error Logika] Pesan: ${apiResponse.message || 'Data API tidak valid.'}`);
        }
        
        const data = apiResponse.data; 
        
        document.getElementById('bank-name').textContent = data.bank;
        document.getElementById('account-holder').textContent = data.name;
        accountNumberSpan.textContent = data.number;
        
        // SUKSES: Sembunyikan Loading dan Error, Tampilkan Data
        loadingState.classList.add('hidden');
        errorState.classList.add('hidden'); 
        dataRekening.classList.remove('hidden');

        getAmountFromUrl();
        updateTransferChecklist(); 
        checkFormValidity(); 

    } catch (error) {
        clearTimeout(timeoutId); 
        let errorMessage = error.name === 'AbortError' ? "Gagal memuat data (Timeout 10 detik). Cek koneksi Anda." : error.message;

        console.error("FATAL ERROR FETCH DATA:", errorMessage);
        
        // ERROR: Sembunyikan Loading dan Data, Tampilkan Error
        loadingState.classList.add('hidden');
        dataRekening.classList.add('hidden'); 
        errorState.classList.remove('hidden');
        
        document.getElementById('error-detail-message').textContent = errorMessage; 
        
        updateTransferChecklist();
        checkFormValidity();
    }
}


// --- EVENT LISTENERS ---

document.addEventListener('DOMContentLoaded', fetchBankData); 
copyBtn.addEventListener('click', copyAccount);
copyAmountBtn.addEventListener('click', copyAmount); 
topupInput.addEventListener('input', handleTopupInput);
topupInput.addEventListener('blur', handleTopupBlur);
