// URL API Backend Google Script
const API_URL = 'https://script.google.com/macros/s/AKfycbyo4cv-kHFZYlKpDfauCDYAfuCDYAfqZB0dX-7d0r6i5d6oz8qRVwNyCk2INWYE9FbOyzezvr/exec';

// Elemen DOM
const loadingState = document.getElementById('loading-state');
const dataRekening = document.getElementById('data-rekening');
const errorState = document.getElementById('error-state');
const accountNumberSpan = document.getElementById('account-number');
const copyBtn = document.getElementById('copy-btn');
const topupInput = document.getElementById('topup-amount');
const confirmBtn = document.getElementById('confirm-payment-btn');

/**
 * Fungsi untuk mengambil data rekening dari API backend.
 * Menggunakan mode no-cors jika diperlukan (meskipun idealnya tidak untuk JSON API)
 * Kunci sukses: memastikan data adalah objek JSON yang valid.
 */
async function fetchBankData() {
    loadingState.classList.add('active'); 
    dataRekening.classList.add('hidden');
    errorState.classList.add('hidden');
    toggleConfirmButton(false);

    try {
        // Percobaan fetch data
        const response = await fetch(API_URL); // Tidak menggunakan mode: 'no-cors' agar bisa mengecek status response
        
        if (!response.ok) {
            // Jika status HTTP bukan 200 (misalnya 404, 500), lempar error
            throw new Error(`Gagal Fetch: Status HTTP ${response.status}. Mungkin masalah CORS atau server.`);
        }
        
        // Coba parsing JSON
        const data = await response.json();

        // Validasi: Pastikan data utama ada
        if (!data.bank_name || !data.account_number) {
            throw new Error('Data rekening tidak lengkap. API merespons, tetapi data kunci hilang.');
        }
        
        // Tampilkan data yang berhasil
        document.getElementById('bank-name').textContent = data.bank_name;
        document.getElementById('account-holder').textContent = data.account_holder;
        accountNumberSpan.textContent = data.account_number;
        
        loadingState.classList.remove('active');
        dataRekening.classList.remove('hidden');
        toggleConfirmButton(true);

    } catch (error) {
        // Blok ini menangani masalah jaringan, masalah parsing JSON, dan error validasi
        console.error("Kesalahan Pengambilan Data Rekening:", error.message);
        loadingState.classList.remove('active');
        errorState.classList.remove('hidden'); // Menampilkan pesan: Gagal memuat data rekening
        confirmBtn.textContent = 'Kesalahan Data';
    }
}

/**
 * Fungsi untuk menyalin Nomor Rekening.
 */
function copyAccount() {
    const accountNumber = accountNumberSpan.textContent;
    navigator.clipboard.writeText(accountNumber).then(() => {
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Tersalin!';
        setTimeout(() => {
            copyBtn.textContent = originalText;
        }, 1500);
    }).catch(err => {
        console.error('Gagal menyalin:', err);
        alert('Gagal menyalin nomor rekening.');
    });
}

/**
 * Fungsi untuk memformat input menjadi format mata uang IDR.
 */
function formatRupiah(number) {
    if (isNaN(number) || number === 0) return '';
    const formatted = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 2
    }).format(number);
    // Menghapus simbol IDR dan spasi, hanya menyisakan 'Rp100.000,00'
    return formatted.replace(/\s/g, '').replace('IDR', 'Rp'); 
}

/**
 * Handler input: hanya angka, format langsung.
 */
function handleTopupInput(e) {
    // Menghilangkan semua karakter non-digit kecuali tanda desimal/koma jika ada
    let value = e.target.value.replace(/[^0-9]/g, ''); 
    
    // Konversi ke angka
    let numberValue = parseInt(value, 10) || 0;

    // Terapkan format: RpX.XXX.XXX,00
    e.target.value = formatRupiah(numberValue);
}

/**
 * Handler Tombol "Sudah Dibayar".
 * Redireksi ke URL login sesuai permintaan terbaru.
 */
function handlePaymentConfirmation() {
    // Menonaktifkan tombol sementara (opsional, untuk mencegah klik ganda)
    confirmBtn.disabled = true;
    confirmBtn.textContent = 'Memproses...';
    
    // Redirect ke URL Login
    window.location.href = 'https://aksesmembership.vercel.app/validus/login';
}

// Event Listeners
document.addEventListener('DOMContentLoaded', fetchBankData); // Panggil saat halaman dimuat
copyBtn.addEventListener('click', copyAccount);
topupInput.addEventListener('input', handleTopupInput);
confirmBtn.addEventListener('click', handlePaymentConfirmation);
document.addEventListener('DOMContentLoaded', fetchBankData);
