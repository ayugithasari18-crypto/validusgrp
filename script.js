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

// Elemen Form, Checklist, dll... (tetap sama)
const topupInput = document.getElementById('topup-amount');
const continueBtn = document.getElementById('continue-button'); 
const copyAmountBtn = document.getElementById('copy-amount-btn'); 
const displayCleanAmount = document.getElementById('display-clean-amount');
const displayBankName = document.getElementById('display-bank-name');
const MIN_AMOUNT = 10000;


// --- FUNGSI UTILITY (tetap sama) ---

function cleanRupiah(numberString) { /* ... */ }
function formatRupiah(number) { /* ... */ }
function applyFlashAnimation(element) { /* ... */ }
function copyAmount() { /* ... */ }
function copyAccount() { /* ... */ }
function updateTransferChecklist() { /* ... */ }
function checkFormValidity() { /* ... */ }
function handleTopupInput(e) { /* ... */ }
function handleTopupBlur(e) { /* ... */ }
function getAmountFromUrl() { /* ... */ }


// --- FUNGSI INTEGRASI API GET (Memuat Data Rekening) ---

async function fetchBankData() {
    // START: Hanya loading-state yang aktif
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
        
        // SUKSES: Sembunyikan semua state lain
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
        
        // ERROR: Sembunyikan semua state lain kecuali error
        loadingState.classList.add('hidden');
        dataRekening.classList.add('hidden'); 
        errorState.classList.remove('hidden');
        
        document.getElementById('error-detail-message').textContent = errorMessage; 
        
        updateTransferChecklist();
        checkFormValidity();
    }
}


// --- EVENT LISTENERS (tetap sama) ---

document.addEventListener('DOMContentLoaded', fetchBankData); 
copyBtn.addEventListener('click', copyAccount);
copyAmountBtn.addEventListener('click', copyAmount); 
topupInput.addEventListener('input', handleTopupInput);
topupInput.addEventListener('blur', handleTopupBlur);
