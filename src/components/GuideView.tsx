import React from 'react';
import { ArrowLeft, Play, Volume2, Calculator, ShieldCheck } from 'lucide-react';
import type { AppView } from '../types/quiz';

interface GuideViewProps {
  onStartPractice: () => void;
  onNavigate: (view: AppView) => void;
}

export const GuideView: React.FC<GuideViewProps> = ({ onStartPractice, onNavigate }) => {
  return (
    <div className="bg-white border border-[#CBEAE4] rounded-2xl p-6 sm:p-8 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#E6F4F1]">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-[#0F766E] bg-white hover:bg-[#F0FDFA] border border-[#CBEAE4] rounded-xl transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            Kembali
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#0F2D2B]">
              Petunjuk Penggunaan Aplikasi
            </h1>
            <p className="text-xs text-[#4B7A74]">
              Panduan pengerjaan soal, aturan skor, pengisian numerik, dan narator audio.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onStartPractice}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold text-white bg-[#0F766E] hover:bg-[#0D9488] rounded-xl transition-colors cursor-pointer"
        >
          <Play className="w-4 h-4" aria-hidden="true" />
          MULAI LATIHAN
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {/* Box 1 */}
        <section className="border border-[#E2EFEC] rounded-xl p-5 bg-[#FCFEFE]">
          <h2 className="text-sm font-extrabold text-[#0F766E] mb-3">
            1. Bentuk Soal &amp; Aturan Skor (Total 100 Poin)
          </h2>
          <div className="divide-y divide-[#E6F4F1] text-sm text-[#17423F]">
            <div className="py-2.5 flex gap-3">
              <span className="font-mono-math font-bold text-[#0F766E] w-12 shrink-0">1–2</span>
              <span>
                <strong>Pilihan Ganda (A–E).</strong> Benar bernilai <strong>+10</strong>, salah atau
                kosong bernilai 0.
              </span>
            </div>
            <div className="py-2.5 flex gap-3">
              <span className="font-mono-math font-bold text-[#0F766E] w-12 shrink-0">3–4</span>
              <span>
                <strong>PG Kompleks (Kotak Centang).</strong> Skor 10 diberikan{' '}
                <strong>hanya jika seluruh pernyataan benar dipilih dan tidak ada yang salah</strong>;
                satu kesalahan menghasilkan skor 0.
              </span>
            </div>
            <div className="py-2.5 flex gap-3">
              <span className="font-mono-math font-bold text-[#0F766E] w-12 shrink-0">5</span>
              <span>
                <strong>Benar / Salah (4 Pernyataan).</strong> Dinilai per pernyataan: benar{' '}
                <span className="text-[#059669] font-bold">+2,5</span>, salah{' '}
                <span className="text-[#E11D48] font-bold">−1</span>, kosong <strong>0</strong>{' '}
                (maksimal +10, minimal −4).
              </span>
            </div>
            <div className="py-2.5 flex gap-3">
              <span className="font-mono-math font-bold text-[#0F766E] w-12 shrink-0">6–10</span>
              <span>
                <strong>Isian Singkat Matematis.</strong> Benar sesuai rentang toleransi bernilai{' '}
                <strong>+10</strong>, salah atau kosong 0.
              </span>
            </div>
          </div>
        </section>

        {/* Box 2 */}
        <section className="border border-[#BAE6FD] rounded-xl p-5 bg-[#F0F9FF]">
          <h2 className="text-sm font-extrabold text-[#0369A1] flex items-center gap-2 mb-3">
            <Calculator className="w-4 h-4" aria-hidden="true" />
            2. Tutorial Pengisian Isian Singkat (Soal 6–10)
          </h2>
          <ol className="list-decimal pl-5 space-y-2 text-sm text-[#0C4A6E]">
            <li>
              Masukkan <strong>angka saja</strong> — satuan (<span className="font-mono-math">m</span>{' '}
              atau <span className="font-mono-math">m/s</span>) sudah tersedia di samping kolom.
            </li>
            <li>
              Tanda desimal boleh memakai <strong>koma atau titik</strong>:{' '}
              <code className="px-1.5 py-0.5 bg-white border border-[#BAE6FD] rounded text-xs font-mono-math">
                122,5
              </code>{' '}
              sama dengan{' '}
              <code className="px-1.5 py-0.5 bg-white border border-[#BAE6FD] rounded text-xs font-mono-math">
                122.5
              </code>
              .
            </li>
            <li>
              Bilangan negatif diawali minus, contoh{' '}
              <code className="px-1.5 py-0.5 bg-white border border-[#BAE6FD] rounded text-xs font-mono-math">
                -4
              </code>
              . Notasi ilmiah memakai{' '}
              <code className="px-1.5 py-0.5 bg-white border border-[#BAE6FD] rounded text-xs font-mono-math">
                1.2e3
              </code>
              .
            </li>
            <li>
              Spasi diabaikan. Kolom yang dibiarkan kosong berarti <strong>tidak dijawab</strong>{' '}
              (bukan nol).
            </li>
          </ol>
        </section>

        {/* Box 3 */}
        <section className="border border-[#E2EFEC] rounded-xl p-5 bg-[#FCFEFE]">
          <h2 className="text-sm font-extrabold text-[#0F766E] flex items-center gap-2 mb-3">
            <ShieldCheck className="w-4 h-4" aria-hidden="true" />
            3. Mekanisme Latihan &amp; Pembahasan Terkunci Sebelum Menjawab
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-sm text-[#17423F]">
            <li>
              Kerjakan soal satu per satu. Gunakan tombol <strong>SOAL SEBELUMNYA</strong>,{' '}
              <strong>SOAL BERIKUTNYA</strong>, atau panel nomor 1–10 di atas.
            </li>
            <li>
              Kunci jawaban dan pembahasan tidak ditampilkan sebelum kamu mengirimkan jawaban.
            </li>
            <li>
              Setelah yakin dengan pilihan atau isianmu, tekan <strong>KIRIM &amp; PERIKSA JAWABAN</strong>{' '}
              untuk melihat status benar/salah serta membuka pembahasan buku teks lengkap.
            </li>
            <li>
              Jika sudah selesai seluruhnya, tekan <strong>SELESAIKAN LATIHAN</strong> untuk melihat
              rekap nilai dan evaluasi penguasaan tiap sub-materi.
            </li>
          </ul>
        </section>

        {/* Box 4 */}
        <section className="border border-[#E2EFEC] rounded-xl p-5 bg-[#FCFEFE]">
          <h2 className="text-sm font-extrabold text-[#0F766E] flex items-center gap-2 mb-3">
            <Volume2 className="w-4 h-4" aria-hidden="true" />
            4. Cara Menggunakan Narator Audio Guru
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-sm text-[#17423F]">
            <li>
              Setiap pembahasan dilengkapi tombol <strong>PUTAR PEMBAHASAN</strong> yang membacakan
              seluruh 6 tahap penjelasan secara runtut dengan intonasi guru fisika.
            </li>
            <li>
              Gunakan tombol <strong>JEDA</strong>, <strong>LANJUTKAN</strong>, <strong>ULANGI</strong>,
              dan <strong>BERHENTI</strong> serta pengatur kecepatan (<span className="font-mono-math">0,8×</span>{' '}
              hingga <span className="font-mono-math">1,3×</span>).
            </li>
            <li>
              Bagian teks buku yang sedang dijelaskan akan otomatis tersorot agar kamu dapat
              membaca sambil mendengarkan langkah demi langkah.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};
