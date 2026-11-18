import React from 'react';
import { ArrowRight, BookOpen, ListChecks, Volume2, HelpCircle } from 'lucide-react';
import type { AppView } from '../types/quiz';

interface HomeViewProps {
  studentName: string;
  studentClass: string;
  answeredCount: number;
  checkedCount: number;
  onNameChange: (val: string) => void;
  onClassChange: (val: string) => void;
  onStartPractice: () => void;
  onNavigate: (view: AppView) => void;
}

const CLASS_OPTIONS = [
  'X-1',
  'X-2',
  'X-3',
  'XI IPA 1',
  'XI IPA 2',
  'XI IPA 3',
  'XII IPA 1',
  'XII IPA 2',
  'Mandiri / Umum',
];

export const HomeView: React.FC<HomeViewProps> = ({
  studentName,
  studentClass,
  answeredCount,
  checkedCount,
  onNameChange,
  onClassChange,
  onStartPractice,
  onNavigate,
}) => {
  return (
    <div className="space-y-8">
      {/* Two-Column Hero Split */}
      <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-6 items-stretch">
        {/* Hero Showcase Panel */}
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0B3B39] via-[#0F766E] to-[#0891B2] text-white p-7 sm:p-9 flex flex-col justify-between">
          <div>
            <p className="text-xs font-bold tracking-[0.18em] uppercase text-[#99F6E4]">
              Latihan Evaluasi Interaktif · Fisika SMA
            </p>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight mt-3 max-w-xl [text-wrap:balance]">
              Kinematika Gerak Lurus Berbasis HOTS
            </h1>
            <p className="text-sm sm:text-base text-[#D5FDF6] mt-3 max-w-xl leading-relaxed">
              10 soal latihan baru yang setara dengan standar evaluasi HOTS: kasus kendaraan berpapasan,
              grafik v–t dan a–t, gerak vertikal dari ketinggian, pengereman bertahap, hingga analisis
              kelayakan fisis akar persamaan.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold text-[#BFF5EC] tabular-nums">
              <span>10 Soal HOTS</span>
              <span aria-hidden="true">·</span>
              <span>4 Bentuk Evaluasi</span>
              <span aria-hidden="true">·</span>
              <span>g = 10 m/s²</span>
              <span aria-hidden="true">·</span>
              <span>Skor Maksimal 100</span>
            </div>
          </div>

          {/* Crisp Kinematic Graph Illustration */}
          <div className="mt-6 pt-5 border-t border-white/15">
            <svg
              viewBox="0 0 420 96"
              role="img"
              aria-label="Ilustrasi grafik kecepatan terhadap waktu"
              className="w-full h-auto block"
            >
              <path
                d="M10 82 L105 22 L245 22 L320 82"
                fill="none"
                stroke="#5EEAD4"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M10 82 H410" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
              <circle cx="105" cy="22" r="4.5" fill="#FFFFFF" />
              <circle cx="245" cy="22" r="4.5" fill="#FFFFFF" />
              <path
                d="M320 82 L400 38"
                stroke="#FBBF24"
                strokeWidth="3"
                strokeDasharray="6 6"
                strokeLinecap="round"
              />
              <text x="408" y="24" textAnchor="end" fill="#FDE68A" fontSize="12.5" fontWeight="700">
                v(t) · GLB &amp; GLBB
              </text>
            </svg>
            <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#E0F2FE]">
              <span>GLB &amp; Penyusulan</span>
              <span aria-hidden="true">·</span>
              <span>Grafik x–t, v–t, a–t</span>
              <span aria-hidden="true">·</span>
              <span>Jatuh Bebas</span>
              <span aria-hidden="true">·</span>
              <span>Vertikal ke Atas/Bawah</span>
            </div>
          </div>
        </section>

        {/* Preparation / Start Card */}
        <section className="bg-white border border-[#CBEAE4] rounded-2xl p-6 sm:p-7 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-[#0F2D2B]">Mulai Sesi Latihan</h2>
            <p className="text-sm text-[#4B7A74] mt-1">
              Identitas bersifat opsional untuk mencatat hasil latihan dan evaluasi penguasaan materi.
            </p>

            <div className="mt-5 space-y-4">
              <div>
                <label
                  htmlFor="home-nama"
                  className="block text-xs font-bold uppercase tracking-wide text-[#134E4A] mb-1.5"
                >
                  Nama Siswa
                </label>
                <input
                  id="home-nama"
                  type="text"
                  maxLength={80}
                  value={studentName}
                  onChange={(e) => onNameChange(e.target.value)}
                  placeholder="cth. Nadia Putri Ramadhani"
                  className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl border border-[#CBEAE4] bg-white text-sm text-[#0F2D2B] focus:outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#14B8A6]/20"
                />
              </div>

              <div>
                <label
                  htmlFor="home-kelas"
                  className="block text-xs font-bold uppercase tracking-wide text-[#134E4A] mb-1.5"
                >
                  Kelas / Kelompok
                </label>
                <select
                  id="home-kelas"
                  value={studentClass}
                  onChange={(e) => onClassChange(e.target.value)}
                  className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl border border-[#CBEAE4] bg-white text-sm text-[#0F2D2B] focus:outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#14B8A6]/20"
                >
                  <option value="">— Pilih kelas (opsional) —</option>
                  {CLASS_OPTIONS.map((cls) => (
                    <option key={cls} value={cls}>
                      {cls}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {answeredCount > 0 && (
              <div className="mt-4 px-3.5 py-2.5 rounded-xl bg-[#F0FDFA] border border-[#99E2D8] text-xs font-semibold text-[#0F766E] tabular-nums">
                Progres tersimpan: {answeredCount}/10 soal terisi · {checkedCount}/10 soal sudah diperiksa.
              </div>
            )}
          </div>

          <div className="mt-6 space-y-2.5">
            <button
              type="button"
              onClick={onStartPractice}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[48px] text-sm font-bold text-white bg-[#0F766E] hover:bg-[#0D9488] rounded-xl transition-colors cursor-pointer"
            >
              <span>{answeredCount > 0 ? 'LANJUTKAN LATIHAN' : 'MULAI LATIHAN SEKARANG'}</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => onNavigate('guide')}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 min-h-[42px] text-xs font-bold text-[#0F766E] bg-white hover:bg-[#F0FDFA] border border-[#CBEAE4] rounded-xl transition-colors cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5" aria-hidden="true" />
                Petunjuk
              </button>
              <button
                type="button"
                onClick={() => onNavigate('topics')}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 min-h-[42px] text-xs font-bold text-[#0F766E] bg-white hover:bg-[#F0FDFA] border border-[#CBEAE4] rounded-xl transition-colors cursor-pointer"
              >
                <ListChecks className="w-3.5 h-3.5" aria-hidden="true" />
                Daftar Materi
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Three Pillar Features (Aligned with Prompt) */}
      <section className="grid md:grid-cols-3 gap-5">
        <div className="bg-white border border-[#CBEAE4] rounded-xl p-5">
          <div className="flex items-center gap-2.5 text-[#0F766E] font-bold text-sm mb-2">
            <ListChecks className="w-4 h-4 shrink-0" aria-hidden="true" />
            <h3>1. Soal HOTS Setara Modul</h3>
          </div>
          <p className="text-sm text-[#3C6A65] leading-relaxed">
            Setiap soal menguji penalaran ilmiah C4–C5 melalui stimulus diagram lintasan dan grafik
            berskala dalam empat format: Pilihan Ganda, PG Kompleks, Benar/Salah, dan Isian Singkat.
          </p>
        </div>

        <div className="bg-white border border-[#CBEAE4] rounded-xl p-5">
          <div className="flex items-center gap-2.5 text-[#0F766E] font-bold text-sm mb-2">
            <BookOpen className="w-4 h-4 shrink-0" aria-hidden="true" />
            <h3>2. Pembahasan Buku Teks 6 Tahap</h3>
          </div>
          <p className="text-sm text-[#3C6A65] leading-relaxed">
            Setelah mengirimkan jawaban, siswa memperoleh pembahasan runtut dari pemahaman masalah,
            identifikasi konsep, strategi rumus, langkah substitusi, kesimpulan, hingga tips cepat.
          </p>
        </div>

        <div className="bg-white border border-[#CBEAE4] rounded-xl p-5">
          <div className="flex items-center gap-2.5 text-[#0F766E] font-bold text-sm mb-2">
            <Volume2 className="w-4 h-4 shrink-0" aria-hidden="true" />
            <h3>3. Narator Audio Guru Indonesia</h3>
          </div>
          <p className="text-sm text-[#3C6A65] leading-relaxed">
            Dilengkapi narator suara Bahasa Indonesia dengan kontrol putar, jeda, lanjutkan, ulangi,
            pengaturan kecepatan, serta sorotan teks yang tersinkronisasi otomatis dengan suara.
          </p>
        </div>
      </section>
    </div>
  );
};
