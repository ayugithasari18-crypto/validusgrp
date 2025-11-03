// =================================================================
// ⚠️ GANTI DENGAN URL DEPLOYMENT GOOGLE APPS SCRIPT ANDA YANG AKTIF
// =================================================================
const API_URL = 'https://script.google.com/macros/s/AKfycbyo4cv-kHFZYlKpDfauCDYAfuCDYAfqZB0dX-7d0r6i5d6oz8qRVwNyCk2INWYE9FbOyzezvr/exec';

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
    confirmBtn.textContent = enable ? 'SUDHA DIBAYAR' : 'Menunggu Data Rekening...';
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


// --- FUNGSI INTEGRASI API UTAMA ---

async function fetchBankData() {
    loadingState.classList.add('active'); 
    dataRekening.classList.add('hidden');
    errorState.classList.add('hidden');
    toggleConfirmButton(false);

    try {
        const response = await fetch(API_URL); 
        
        if (!response.status === 404 || response.status === 500) {
             throw new Error(`[Gagal Jaringan] Status: ${response.status}. Cek URL API atau izin akses.`);
        }
        
        const apiResponse = await response.json(); 

        // Cek Status Sukses dari respons Apps Script
        if (apiResponse.status !== 'sukses' || !apiResponse.data) {
            // Menangkap pesan error dari backend Apps Script (misal: "Header tidak lengkap")
            throw new Error(`[API Gagal Logika] Pesan: ${apiResponse.message || 'Data API tidak valid.'}`);
        }
        
        const data = apiResponse.data; 

        // MENCARI KEY YANG DIMINTA: 'name', 'number', 'bank'
        const accountHolderKey = 'name'; 
        const accountNumberKey = 'number';
        const bankNameKey = 'bank'; 

        if (!data[accountHolderKey] || !data[accountNumberKey] || !data[bankNameKey]) {
            throw new Error('Key data (name, number, atau bank) tidak ditemukan dalam respons API.');
        }

        // Tampilkan data ke elemen HTML
        document.getElementById('bank-name').textContent = data[bankNameKey];
        document.getElementById('account-holder').textContent = data[accountHolderKey];
        accountNumberSpan.textContent = data[accountNumberKey];
        
        loadingState.classList.remove('active');
        dataRekening.classList.remove('hidden');
        toggleConfirmButton(true);

    } catch (error) {
        console.error("FATAL ERROR FETCH DATA:", error.message);
        
        loadingState.classList.remove('active');
        errorState.classList.remove('hidden');
        
        // Tampilkan error yang lebih detail di UI
        document.getElementById('error-state').innerHTML = `<p>Gagal memuat data rekening</p><small style="color:#ce1126; font-size:0.8em;">${error.message}</small>`;
        confirmBtn.textContent = 'Kesalahan Data';
    }
}


// --- EVENT LISTENERS ---

document.addEventListener('DOMContentLoaded', fetchBankData); 
copyBtn.addEventListener('click', copyAccount);
topupInput.addEventListener('input', handleTopupInput);
confirmBtn.addEventListener('click', handlePaymentConfirmation);
