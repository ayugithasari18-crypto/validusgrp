import React, { useState, useEffect } from 'react';
import './index.css'; // Pastikan CSS dimuat

const GoogleScriptUrl = "https://script.google.com/macros/s/AKfycbyo4cv-kHFZYlKpDfauCDYAfqZB0dX-7d0r6i5d6oz8qRVwNyCk2INWYE9FbOyzezvr/exec";
const LogoUrl = "https://validusgrp.com/wp-content/uploads/2022/04/validus-capital-logo-red.png";

const App = () => {
    const [rekening, setRekening] = useState("Memuat data rekening...");

    // Fungsi untuk mengambil data rekening
    useEffect(() => {
        const fetchRekening = async () => {
            try {
                const response = await fetch(GoogleScriptUrl);
                const data = await response.json();
                
                if (data && data.rekening) {
                    setRekening(data.rekening); // Asumsi Google Script mengembalikan {rekening: "..."}
                } else {
                    setRekening("Data rekening tidak ditemukan atau format salah.");
                }
            } catch (error) {
                console.error("Gagal mengambil data rekening:", error);
                setRekening("Gagal memuat data rekening. Silakan coba lagi.");
            }
        };

        fetchRekening();
    }, []);
    
    // Mengubah tampilan kartu ikon (simulasi Tailwind/CSS)
    const cardStyle = "p-4 border border-gray-200 rounded-lg text-center hover:shadow-md transition duration-300";
    const iconStyle = "text-red-600 mb-2"; 

    return (
        <div style={{ fontFamily: 'sans-serif', margin: 0, padding: 0 }}>
            {/* Header */}
            <header style={{ borderBottom: '1px solid #eee', padding: '15px 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={LogoUrl} alt="Logo Perusahaan" style={{ height: '30px' }} />
                    <span style={{ marginLeft: '10px', fontSize: '18px', fontWeight: 'bold', color: '#333' }}>Validus Grup</span>
                </div>
                <button style={{ backgroundColor: '#cc0000', color: 'white', padding: '8px 15px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Daftar Akun</button>
            </header>

            {/* Konten Utama */}
            <main style={{ maxWidth: '1000px', margin: '40px auto', padding: '0 20px' }}>
                <h1 style={{ textAlign: 'center', fontSize: '2.5em', fontWeight: 'bold', color: '#333', marginBottom: '10px' }}>Akses Mudah untuk Member</h1>
                <p style={{ textAlign: 'center', color: '#666', marginBottom: '40px' }}>Akses platform, lihat update rekening terbaru, dan lakukan pembayaran QRIS secara cepat.</p>

                {/* Bagian Kartu Ikon */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', textAlign: 'center' }}>
                    
                    {/* 1. Akses Platform */}
                    <div className={cardStyle}>
                        <div className={iconStyle}>
                            {/* Ganti dengan ikon yang sesuai, misal SVG atau Font Awesome */}
                            <span style={{ fontSize: '2em' }}>🔗</span>
                        </div>
                        <h3 style={{ fontWeight: 'bold' }}>Akses Platform</h3>
                        <p style={{ color: '#666', fontSize: '0.9em' }}>Klik ke portal platform segera</p>
                    </div>

                    {/* 2. Update Rekening */}
                    <div className={cardStyle}>
                        <div className={iconStyle}>
                            <span style={{ fontSize: '2em' }}>💳</span>
                        </div>
                        <h3 style={{ fontWeight: 'bold' }}>Update Rekening</h3>
                        <p style={{ color: '#666', fontSize: '0.9em' }}>Lihat info rekening terbaru</p>
                    </div>

                    {/* 3. Pembayaran QRIS */}
                    <div className={cardStyle}>
                        <div className={iconStyle}>
                            <span style={{ fontSize: '2em' }}>📱</span>
                        </div>
                        <h3 style={{ fontWeight: 'bold' }}>Pembayaran QRIS</h3>
                        <p style={{ color: '#666', fontSize: '0.9em' }}>Bayar mudah via QRIS</p>
                    </div>

                </div>

                {/* Platform Link */}
                <section style={{ marginTop: '50px', border: '1px solid #ddd', padding: '25px', borderRadius: '8px' }}>
                    <h2 style={{ fontSize: '1.5em', fontWeight: 'bold', marginBottom: '15px' }}>Platform Link</h2>
                    <p style={{ color: '#666', marginBottom: '20px' }}>Tambahkan URL platform resmi Anda di sini. Tombol "Akses Platform" akan diarahkan ke link tersebut.</p>
                    <button style={{ backgroundColor: '#007bff', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Akses Platform</button>
                </section>

                {/* HAPUS: Formulir Daftar Akun (Sesuai Permintaan Anda) */}

                {/* Update Rekening Terbaru (Dari Google Script) */}
                <section style={{ marginTop: '30px', border: '1px solid #ddd', padding: '25px', borderRadius: '8px' }}>
                    <h2 style={{ fontSize: '1.5em', fontWeight: 'bold', marginBottom: '15px' }}>Update Rekening Terbaru</h2>
                    <p style={{ whiteSpace: 'pre-wrap', backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '4px', border: '1px dashed #ccc' }}>
                        {rekening}
                    </p>
                </section>

                {/* Pembayaran QRIS */}
                <section style={{ marginTop: '30px', border: '1px solid #ddd', padding: '25px', borderRadius: '8px' }}>
                    <h2 style={{ fontSize: '1.5em', fontWeight: 'bold', marginBottom: '15px' }}>Pembayaran QRIS</h2>
                    <div style={{ height: '150px', backgroundColor: '#f9f9f9', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed #ccc', borderRadius: '4px' }}>
                        Placeholder QRIS
                    </div>
                </section>

            </main>

            {/* Footer */}
            <footer style={{ backgroundColor: '#333', color: 'white', textAlign: 'center', padding: '20px 0', marginTop: '50px' }}>
                <p>&copy; {new Date().getFullYear()} Company. All rights reserved.</p>
                {/* Tambahkan ikon sosial media di sini */}
            </footer>
        </div>
    );
};

export default App;
