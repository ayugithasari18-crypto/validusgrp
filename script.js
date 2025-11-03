// =================================================================
// ⚠️ GANTI DENGAN URL DEPLOYMENT GOOGLE APPS SCRIPT ANDA YANG AKTIF
// =================================================================
const API_URL = 'https://script.google.com/macros/s/AKfycbzHt1CfGCeXSUK4t1BbO-pUhlk83GwvvvzMLGGngeGyb6U_gRDkuLHD910X89R7u6Op/exec';

// URL Tujuan Redirection setelah konfirmasi
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
    confirmBtn.textContent = enable ? 'SUDAH DIBAYAR' : 'Menunggu Data Rekening...';
}

function formatRupiah(number) {
    if (isNaN(number) || number <= 0) return ''; 
    // Menggunakan Intl.NumberFormat untuk standar IDR
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 2 
    }).format(number);
}


// --- HANDLERS ---

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
        alert('Gagal menyalin. Coba salin manual.');
    });
}

// --- KODE BARU UNTUK INPUT NOMINAL ---

function cleanRupiah(numberString) {
    // Menghilangkan semua karakter selain digit
    return numberString.replace(/[^0-9]/g, '');
}

function formatRupiah(number) {
    if (isNaN(number) || number <= 0) return ''; 
    // Menggunakan Intl.NumberFormat untuk standar IDR
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0, // Hilangkan .00 di belakang
        maximumFractionDigits: 0
    }).format(number);
}


function handleTopupInput(e) {
    // Fungsi ini HANYA membersihkan input, tidak memformat
    let input = e.target.value;
    let cleanValue = cleanRupiah(input);
    
    // Ini penting: Hanya tampilkan angka bersih agar kursor tidak loncat
    if (cleanValue === '') {
        e.target.value = '';
    } else {
        // Tampilkan angka mentah yang diformat dengan pemisah ribuan (opsional, tapi lebih baik)
        e.target.value = new Intl.NumberFormat('id-ID').format(parseInt(cleanValue, 10));
    }
}

function handleTopupBlur(e) {
    // Fungsi ini memformat penuh saat input selesai (blur)
    let cleanValue = cleanRupiah(e.target.value);
    let numberValue = parseInt(cleanValue, 10);
    
    if (isNaN(numberValue) || numberValue === 0) {
        e.target.value = ''; 
        return;
    }
    
    // Tampilkan format Rupiah lengkap (Rp. 1.000.000)
    e.target.value = formatRupiah(numberValue);
}

// --- EVENT LISTENERS BARU DI AKHIR script.js ---

// Ganti listeners lama dengan yang baru ini:
document.addEventListener('DOMContentLoaded', fetchBankData); 
copyBtn.addEventListener('click', copyAccount);
topupInput.addEventListener('input', handleTopupInput);
topupInput.addEventListener('blur', handleTopupBlur); // <-- TAMBAH EVENT BLUR INI!
confirmBtn.addEventListener('click', handlePaymentConfirmation);
