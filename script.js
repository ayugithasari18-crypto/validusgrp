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
const topupInput = document.getElementById('topup-amount');
const confirmBtn = document.getElementById('confirm-payment-btn');


// --- FUNGSI UTILITY ---

function toggleConfirmButton(enable) {
    confirmBtn.disabled = !enable;
    confirmBtn.textContent = enable ? 'SUDHA DIBAYAR' : 'Menunggu Data Rekening...';
}

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
        e.target.value = new Intl.NumberFormat('id-ID').format(parseInt(cleanValue, 10));
    }
}

function handleTopupBlur(e) {
    let cleanValue = cleanRupiah(e.target.value);
    let numberValue = parseInt(cleanValue, 10);
    
    if (isNaN(numberValue) || numberValue === 0) {
        e.target.value = ''; 
        return;
    }
    
    e.target.value = formatRupiah(numberValue);
}

function handlePaymentConfirmation() {
    if (confirmBtn.disabled) return;
    confirmBtn.disabled = true;
    confirmBtn.textContent = 'Mengalihkan...';
    window.location.href = REDIRECT_URL;
}


// --- FUNGSI INTEGRASI API UTAMA DENGAN PERBAIKAN BUG VISIBILITAS ---

async function fetchBankData() {
    // 1. Tampilkan Loading State dan sembunyikan semua yang lain
    loadingState.classList.remove('hidden'); // Tampilkan
    dataRekening.classList.add('hidden');    // Sembunyikan
    errorState.classList.add('hidden');      // Sembunyikan
    toggleConfirmButton(false);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); 

    try {
        const response = await fetch(API_URL, { signal: controller.signal });
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
        
        // 2. Berhasil: Sembunyikan Loading dan tampilkan Data Rekening
        loadingState.classList.add('hidden');
        dataRekening.classList.remove('hidden');
        toggleConfirmButton(true);

    } catch (error) {
        clearTimeout(timeoutId); 
        
        let errorMessage = error.name === 'AbortError' ? "Gagal memuat data (Timeout 10 detik). Cek koneksi Anda." : error.message;

        console.error("FATAL ERROR FETCH DATA:", errorMessage);
        
        // 3. Error: Sembunyikan Loading dan tampilkan Error State
        loadingState.classList.add('hidden');
        errorState.classList.remove('hidden');
        
        document.getElementById('error-detail-message').textContent = errorMessage; 
        confirmBtn.textContent = 'Kesalahan Data';
    }
}


// --- EVENT LISTENERS ---

document.addEventListener('DOMContentLoaded', fetchBankData); 
copyBtn.addEventListener('click', copyAccount);
topupInput.addEventListener('input', handleTopupInput);
topupInput.addEventListener('blur', handleTopupBlur); 
confirmBtn.addEventListener('click', handlePaymentConfirmation);
