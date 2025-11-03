import React, { useState } from "react";
import { Link as LinkIcon, UserPlus, Wallet, QrCode } from "lucide-react";

export const MemberLanding: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const brand = "rgb(196, 22, 28)";

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setName("");
    setEmail("");
  };

  const actions = [
    {
      id: "platform",
      label: "Akses Platform",
      desc: "Masuk ke portal platform anggota",
      icon: <LinkIcon className="w-6 h-6" />,
      onClick: () => scrollTo("platform"),
    },
    {
      id: "signup",
      label: "Daftar Akun",
      desc: "Buat akun baru dengan cepat",
      icon: <UserPlus className="w-6 h-6" />,
      onClick: () => scrollTo("signup"),
    },
    {
      id: "update",
      label: "Update Rekening",
      desc: "Lihat info rekening terbaru",
      icon: <Wallet className="w-6 h-6" />,
      onClick: () => scrollTo("update"),
    },
    {
      id: "qris",
      label: "Pembayaran QRIS",
      desc: "Bayar mudah via QRIS",
      icon: <QrCode className="w-6 h-6" />,
      onClick: () => scrollTo("qris"),
    },
  ];

  return (
    <main className="bg-white text-zinc-900" id="home">
      {/* Hero */}
      <section className="pt-28 pb-10 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
               style={{ backgroundColor: "#fff", border: `1px solid ${brand}` }}>
            <span className="text-sm" style={{ color: brand }}>Portal Member</span>
          </div>
          <h1 className="mt-6 text-4xl md:text-5xl font-extrabold tracking-tight">
            Akses Mudah untuk Member
          </h1>
          <p className="mt-4 text-lg text-zinc-600">
            Akses platform, daftar akun, lihat update rekening terbaru, dan lakukan pembayaran QRIS secara cepat.
          </p>
        </div>
      </section>

      {/* Action Buttons */}
      <section className="px-6 pb-16">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {actions.map((a) => (
            <button
              key={a.id}
              onClick={a.onClick}
              aria-label={a.label}
              className="group rounded-xl border border-zinc-200 bg-white p-5 text-left shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white"
                     style={{ backgroundColor: brand }}>
                  {a.icon}
                </div>
                <div className="font-semibold">{a.label}</div>
              </div>
              <p className="mt-2 text-sm text-zinc-600 group-hover:text-zinc-700">{a.desc}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Platform link placeholder */}
      <section id="platform" className="px-6 pb-8">
        <div className="max-w-5xl mx-auto rounded-xl border border-zinc-200 p-6">
          <h2 className="text-xl font-bold">Platform Link</h2>
          <p className="mt-2 text-zinc-600">
            Tambahkan URL platform resmi Anda di sini. Tombol "Akses Platform" akan diarahkan ke link tersebut.
          </p>
        </div>
      </section>

      {/* Signup form */}
      <section id="signup" className="px-6 pb-8">
        <div className="max-w-5xl mx-auto rounded-xl border border-zinc-200 p-6">
          <h2 className="text-xl font-bold">Daftar Akun</h2>
          <p className="mt-2 text-zinc-600">Isi formulir singkat berikut (demo, tanpa backend).</p>

          <form onSubmit={handleSubmit} className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nama"
              className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandRed"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandRed"
            />
            <button
              type="submit"
              className="w-full px-4 py-3 rounded-lg text-white font-semibold hover:brightness-95 active:scale-95 transition"
              style={{ backgroundColor: brand }}
            >
              Kirim
            </button>
          </form>

          {submitted && (
            <div className="mt-4 text-sm font-medium" style={{ color: brand }}>
              Berhasil! Pendaftaran Anda tercatat (demo).
            </div>
          )}
        </div>
      </section>

      {/* Update rekening */}
      <section id="update" className="px-6 pb-8">
        <div className="max-w-5xl mx-auto rounded-xl border border-zinc-200 p-6">
          <h2 className="text-xl font-bold">Update Rekening Terbaru</h2>
          <p className="mt-2 text-zinc-600">
            Informasi rekening terbaru akan ditampilkan di sini. Hubungkan ke backend untuk pembaruan realtime.
          </p>
        </div>
      </section>

      {/* QRIS */}
      <section id="qris" className="px-6 pb-24">
        <div className="max-w-5xl mx-auto rounded-xl border border-zinc-200 p-6">
          <h2 className="text-xl font-bold">Pembayaran QRIS</h2>
          <p className="mt-2 text-zinc-600">
            Tampilkan kode QR atau tautan pembayaran QRIS di sini. Integrasi backend direkomendasikan untuk transaksi.
          </p>
          <div className="mt-4 w-full h-40 rounded-lg border border-dashed border-zinc-300 flex items-center justify-center text-zinc-500">
            Placeholder QRIS
          </div>
        </div>
      </section>
    </main>
  );
};
