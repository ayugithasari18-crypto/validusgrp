// =================================================================
// ⚠️ GANTI DENGAN URL DEPLOYMENT GOOGLE APPS SCRIPT ANDA YANG AKTIF
// =================================================================
const API_URL = 'https://script.google.com/macros/s/AKfycbzHt1CfGCeXSUK4t1BbO-pUhlk83GwvvvzMLGGngeGyb6U_gRDkuLHD910X89R7u6Op/exec'; 
const REDIRECT_URL = 'https://aksesmembership.vercel.app/validus/login';


// Elemen DOM
const loadingState = document.getElementById('loading-state');
const dataRekening = document.getElementById('data-rekening');
const errorState = document.getElementById('error-state');
const accountNumberSpan = document.getElementById('account-number');
const copyBtn = document.getElementById('copy-btn');

// Elemen Form
const topupInput = document.getElementById('topup-amount');
const continueBtn = document.getElementById('continue-button'); 

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

// --- FUNGSI BARU: MEMBACA PARAMETER URL ---
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

function checkFormValidity() {
    const amountClean = parseInt(cleanRupiah(topupInput.value), 10);
    const hasAccountData = accountNumberSpan.textContent !== 'N/A';
    
    // Aktifkan tombol jika data rekening ada DAN nominal transfer valid
    const isValid = hasAccountData && !isNaN(amountClean) && amountClean >= MIN_AMOUNT;

    if (isValid) {
        continueBtn.classList.remove('disabled');
        continueBtn.href = REDIRECT_URL; 
    } else {
        continueBtn.classList.add('disabled');
        continueBtn.href = '#';
    }
}


// --- HANDLERS ---

function copyAccount() {
    const accountNumber = accountNumberSpan.textContent;
    if (accountNumber === 'N/A' || accountNumber === '') return;
    
    navigator.clipboard.writeText(accountNumber).then(() => {
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i> TERSALIN!';
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
        }, 1500);
    }).catch(err => {
        console.error('Gagal menyalin:', err);
        alert('Gagal menyalin. Coba salin manual.');
    });
}

function handleTopupInput(e) {
    let input = e.target.value;
    let cleanValue = cleanRupiah(input);
    
    if (cleanValue === '') {
        e.target.value = '';
    } else {
        // Hanya format tampilan saat diketik
        e.target.value = new Intl.NumberFormat('id-ID').format(parseInt(cleanValue, 10));
    }
    checkFormValidity();
}

function handleTopupBlur(e) {
    let cleanValue = cleanRupiah(e.target.value);
    let numberValue = parseInt(cleanValue, 10);
    
    if (isNaN(numberValue) || numberValue === 0) {
        e.target.value = ''; 
    } else {
        // Format Rupiah penuh saat kehilangan fokus (blur)
        e.target.value = formatRupiah(numberValue);
    }
    checkFormValidity();
}

// --- FUNGSI INTEGRASI API GET (Memuat Data Rekening) ---

async function fetchBankData() {
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
        
        // Sukses
        loadingState.classList.add('hidden');
        dataRekening.classList.remove('hidden');

        // 1. Coba isi nominal dari URL
        getAmountFromUrl();
        // 2. Cek validitas form dan aktifkan tombol jika sudah terisi
        checkFormValidity(); 

    } catch (error) {
        clearTimeout(timeoutId); 
        let errorMessage = error.name === 'AbortError' ? "Gagal memuat data (Timeout 10 detik). Cek koneksi Anda." : error.message;

        console.error("FATAL ERROR FETCH DATA:", errorMessage);
        
        // Error
        loadingState.classList.add('hidden');
        errorState.classList.remove('hidden');
        document.getElementById('error-detail-message').textContent = errorMessage; 
        checkFormValidity();
    }
}


// --- EVENT LISTENERS ---

document.addEventListener('DOMContentLoaded', fetchBankData); 
copyBtn.addEventListener('click', copyAccount);
topupInput.addEventListener('input', handleTopupInput);
topupInput.addEventListener('blur', handleTopupBlur);
