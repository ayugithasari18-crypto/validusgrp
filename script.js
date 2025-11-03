// URL API Backend Google Script (Ganti dengan URL Deploy Anda yang AKTIF)
const API_URL = 'https://script.google.com/macros/s/AKfycbyo4cv-kHFZYlKpDfauCDYAfqZB0dX-7d0r6i5d6oz8qRVwNyCk2INWYE9FbOyzezvr/exec';

// Elemen DOM (Tetap sama)
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

function copyAccount() {
    const accountNumber = accountNumberSpan.textContent;
    if (accountNumber === 'N/A' || accountNumber === '') return;
    
    navigator.clipboard.writeText(accountNumber).then(() => {
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Tersalin!';
        setTimeout(() => {
            copyBtn.textContent = originalText;
        }, 1500);
    }).catch(err => {
        console.error('Gagal menyalin:', err);
        alert('Gagal menyalin nomor rekening. Gunakan salin manual.');
    });
}

function formatRupiah(number) {
    if (isNaN(number) || number <= 0) return ''; 
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 2 
    }).format(number);
}

function handleTopupInput(e) {
    let input = e.target.value;
    let cleanValue = input.replace(/[^0-9]/g, '');
    let numberValue = parseInt(cleanValue, 10);
    
    if (isNaN(numberValue) || numberValue === 0) {
        e.target.value = ''; 
        return;
    }

    e.target.value = formatRupiah(numberValue);
    e.target.setAttribute('data-value', numberValue);
}

function handlePaymentConfirmation() {
    const REDIRECT_URL = 'https://aksesmembership.vercel.app/validus/login';

    if (confirmBtn.disabled) return;

    confirmBtn.disabled = true;
    confirmBtn.textContent = 'Mengalihkan...';
    
    window.location.href = REDIRECT_URL;
}


// --- FUNGSI INTEGRASI API UTAMA ---

async function fetchBankData() {
    loadingState.classList.add('active'); 
    dataRekening.classList.add('hidden');
    errorState.classList.add('hidden');
    toggleConfirmButton(false);

    try {
        const response = await fetch(API_URL); 
        
        if (!response.ok) {
            throw new Error(`Gagal Fetch: Status HTTP ${response.status}. Mungkin masalah CORS atau server.`);
        }
        
        const apiResponse = await response.json(); 

        // 1. Cek Status Sukses dari respons API Google Script
        if (apiResponse.status !== 'sukses' || !apiResponse.data) {
            throw new Error(`API merespons, tetapi status bukan sukses: ${apiResponse.message || 'Pesan tidak tersedia'}`);
        }
        
        const data = apiResponse.data; // Objek data yang berisi informasi rekening

        // 2. Tentukan Key Berdasarkan Header Sheet (asumsi tanpa spasi, karena di-clean di Apps Script)
        // Jika header sheet Anda adalah: "Nama Bank", "Nama Pemegang Rekening", "Nomor Rekening"
        const bankNameKey = 'NamaBank'; 
        const accountHolderKey = 'NamaPemegangRekening';
        const accountNumberKey = 'NomorRekening';

        if (!data[bankNameKey] || !data[accountNumberKey]) {
            throw new Error('Data rekening tidak lengkap: Pastikan nama header di Google Sheet sesuai (misal: NamaBank).');
        }
        
        // 3. Tampilkan data
        document.getElementById('bank-name').textContent = data[bankNameKey];
        document.getElementById('account-holder').textContent = data[accountHolderKey];
        accountNumberSpan.textContent = data[accountNumberKey];
        
        loadingState.classList.remove('active');
        dataRekening.classList.remove('hidden');
        toggleConfirmButton(true);

    } catch (error) {
        console.error("Kesalahan Pengambilan Data Rekening:", error.message);
        loadingState.classList.remove('active');
        errorState.classList.remove('hidden');
        confirmBtn.textContent = 'Kesalahan Data';
    }
}


// --- EVENT LISTENERS ---

document.addEventListener('DOMContentLoaded', fetchBankData); 
copyBtn.addEventListener('click', copyAccount);
topupInput.addEventListener('input', handleTopupInput);
confirmBtn.addEventListener('click', handlePaymentConfirmation);
