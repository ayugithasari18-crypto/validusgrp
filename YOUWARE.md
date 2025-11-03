# YOUWARE Project Guide — Member Portal Landing

A React + TypeScript + Vite + Tailwind project focused on a simple member landing page: akses platform, daftar akun, update rekening, dan pembayaran QRIS. Desain dominan putih dengan aksen merah brand `#C4161C`.

## Development Commands

- Install dependencies: `npm install`
- Production build: `npm run build`
- Preview production build: `npm run preview`

Tip: Jalankan build setelah setiap perubahan untuk memastikan kesiapan produksi.

## Architecture Overview

- Entry: `src/main.tsx` → renders `src/App.tsx`
- App composition: `Header` + `MemberLanding` + `Footer`
  - `src/components/Header.tsx`: Navigasi sederhana dengan aksen merah brand (`bg-brandRed`, `text-brandRed`) dan anchor ke `#home`, `#platform`, `#signup`, `#qris`
  - `src/components/MemberLanding.tsx`: Halaman utama berisi:
    - Hero teks: portal member, deskripsi akses cepat
    - Tombol aksi (ikon Lucide): Akses Platform, Daftar Akun, Update Rekening, Pembayaran QRIS
    - Form daftar akun (in-memory): nama, email; submit menampilkan notifikasi sukses lokal
    - Section anchors: `platform`, `signup`, `update`, `qris`
  - `src/components/Footer.tsx`: Footer sederhana

### Design System

- Tailwind config: `tailwind.config.js`
  - Extended color: `brandRed: "#C4161C"`
  - Gunakan utilitas Tailwind: `bg-brandRed`, `text-brandRed`, `focus:ring-brandRed`
- Asset paths: gunakan absolute public paths (`/assets/...`) bila menambahkan gambar.

## Current State & Extensibility

- Ikon: menggunakan `lucide-react` untuk icon default; dapat diganti dengan ikon custom (SVG/PNG) di `/src/assets` lalu referensikan sebagai `/assets/...` setelah build.
- Form daftar akun: saat ini in-memory (tanpa backend). Siap dihubungkan ke backend untuk penyimpanan data.
- Update rekening & QRIS: section placeholder siap diintegrasikan dengan API/backend.

## Backend Integration (Recommended)

Tidak ada database saat ini. Untuk fitur lanjut:
- Gunakan Youware Backend (Workers + D1 + R2) untuk:
  - Menyimpan pendaftaran akun
  - Menampilkan update rekening (fetch berkala atau realtime)
  - Memproses transaksi dan menayangkan QRIS (presigned URL untuk QR code/image)
- Struktur backend direkomendasikan:
  - Direktori: `/backend`
  - `wrangler.toml`, `package.json`, `tsconfig.json`
  - `src/` dengan domain folders: `handlers/`, `services/`, `lib/`, `middlewares/`
  - `schema.sql` untuk definisi tabel (buat ketika mulai menambah data)

Contoh tabel awal (buat saat implementasi, bukan sekarang):
- `users (id, name, email, created_at)`
- `accounts_updates (id, title, content, created_at)`
- `payments (id, user_id, amount, status, created_at)`

## Customization Notes

- Ubah teks/logo di `Header.tsx` (`logoText`) sesuai brand.
- Ganti label tombol dan flow di `MemberLanding.tsx` sesuai kebutuhan.
- Tambahkan URL platform resmi pada section `Platform Link` dan arahkan tombol ke URL tersebut.
- Untuk QRIS, tampilkan QR code (image/SVG) dengan path absolut `/assets/...` dan proses transaksi via backend.

## References

- Build output: `dist/`
- Tech versions: React 18, TypeScript 5.8, Vite 7, Tailwind 3.4, Framer Motion, Lucide React.
