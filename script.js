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

function handleTopupInput(e) {
    let input = e.target.value;
    // Hapus semua non-digit
    let cleanValue = input.replace(/[^0-9]/g, '');
    let numberValue = parseInt(cleanValue, 10);
    
    if (isNaN(numberValue) || numberValue === 0) {
        e.target.value = ''; 
        return;
    }

    // Tampilkan nilai yang diformat
    e.target.value = formatRupiah(numberValue);
}

function handlePaymentConfirmation() {
    if (confirmBtn.disabled) return;

    confirmBtn.disabled = true;
    confirmBtn.textContent = 'Mengalihkan...';
    
    // Redirect ke URL login yang diminta
    window.location.href = REDIRECT_URL;
}


// ==========================================================
// KODE FETCHBANKDATA BARU DENGAN TIMEOUT
// ==========================================================
async function fetchBankData() {
    loadingState.classList.add('active'); 
    dataRekening.classList.add('hidden');
    errorState.classList.add('hidden');
    toggleConfirmButton(false);

    // Buat sinyal untuk timeout (misalnya, 10 detik)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // Batas waktu 10 detik

    try {
        const response = await fetch(API_URL, { signal: controller.signal });
        clearTimeout(timeoutId); // Hapus timeout jika berhasil fetch

        if (!response.ok) {
             throw new Error(`[Jaringan Error] Status: ${response.status}.`);
        }
        
        const apiResponse = await response.json(); 

        // Cek Status Sukses
        if (apiResponse.status !== 'sukses' || !apiResponse.data) {
            throw new Error(`[API Error Logika] Pesan: ${apiResponse.message || 'Data API tidak valid.'}`);
        }
        
        const data = apiResponse.data; 
        
        // MENCARI KEY: 'name', 'number', 'bank'
        document.getElementById('bank-name').textContent = data.bank;
        document.getElementById('account-holder').textContent = data.name;
        accountNumberSpan.textContent = data.number;
        
        loadingState.classList.remove('active');
        dataRekening.classList.remove('hidden');
        toggleConfirmButton(true);

    } catch (error) {
        clearTimeout(timeoutId); // Pastikan timeout dibersihkan jika error terjadi
        
        let errorMessage = "Koneksi terputus. Muat ulang halaman.";
        if (error.name === 'AbortError') {
             errorMessage = "Gagal memuat data (Timeout 10 detik).";
        } else {
             errorMessage = error.message;
        }

        console.error("FATAL ERROR FETCH DATA:", errorMessage);
        
        loadingState.classList.remove('active');
        errorState.classList.remove('hidden');
        
        document.getElementById('error-state').innerHTML = `<p>Gagal memuat data rekening</p><small style="color:#ce1126; font-size:0.8em;">${errorMessage}</small>`;
        confirmBtn.textContent = 'Kesalahan Data';
    }
}


// --- EVENT LISTENERS ---

document.addEventListener('DOMContentLoaded', fetchBankData); 
copyBtn.addEventListener('click', copyAccount);
topupInput.addEventListener('input', handleTopupInput);
confirmBtn.addEventListener('click', handlePaymentConfirmation);
