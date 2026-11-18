import React, { useEffect, useRef } from 'react';
import { Volume2, CheckCircle2, XCircle, Lightbulb, BookOpen } from 'lucide-react';
import type { QuestionItem } from '../types/quiz';
import { formatMathHtml } from '../utils/mathFormat';
import { useNarrator } from '../hooks/useNarrator';
import { AudioNarratorBar } from './AudioNarratorBar';

interface TextbookExplanationProps {
  question: QuestionItem;
}

function MathText({ text, className = '' }: { text: string; className?: string }) {
  return (
    <span
      className={className}
      dangerouslySetInnerHTML={{ __html: formatMathHtml(text) }}
    />
  );
}

export const TextbookExplanation: React.FC<TextbookExplanationProps> = ({ question }) => {
  const { explanation: exp, narratorSegments } = question;
  const narrator = useNarrator(question.id, narratorSegments);
  const stageRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    if (narrator.activeStageIndex !== null) {
      const el = stageRefs.current[narrator.activeStageIndex];
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }, [narrator.activeStageIndex]);

  const sectionHighlightClass = (idx: number) =>
    narrator.activeStageIndex === idx
      ? 'scroll-mt-24 bg-[#FEF9E7] border-[#D97706] ring-2 ring-[#F59E0B]/30'
      : 'scroll-mt-24 bg-white/75 border-[#EAE2CF]';

  const renderListenStageBtn = (idx: number) => {
    const isReadingThis =
      narrator.activeStageIndex === idx &&
      (narrator.status === 'playing' || narrator.status === 'loading');
    return (
      <button
        type="button"
        onClick={() => narrator.playAll(idx)}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-bold rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
          isReadingThis
            ? 'bg-[#0F766E] text-white border-[#0F766E]'
            : 'bg-white text-[#0F766E] border-[#CBEAE4] hover:bg-[#F0FDFA]'
        }`}
      >
        <Volume2 className="w-3.5 h-3.5" aria-hidden="true" />
        {isReadingThis ? 'Sedang Dibacakan' : 'Dengarkan Tahap Ini'}
      </button>
    );
  };

  return (
    <div className="mt-6">
      <AudioNarratorBar
        status={narrator.status}
        engine={narrator.engine}
        serverAvailable={narrator.serverAvailable}
        activeStageIndex={narrator.activeStageIndex}
        progressPercent={narrator.progressPercent}
        rate={narrator.rate}
        errorMessage={narrator.errorMessage}
        segments={narratorSegments}
        onPlay={() => narrator.playAll(0)}
        onPause={narrator.pause}
        onResume={narrator.resume}
        onRestart={narrator.restart}
        onStop={narrator.stop}
        onRateChange={narrator.setRate}
        onEngineChange={narrator.setEngine}
      />

      <article
        className="bg-[#FFFDF7] border border-[#E6DEC9] rounded-xl p-5 sm:p-7 text-[#2C2A25]"
        aria-label={`Pembahasan Buku Teks Soal ${question.id}`}
      >
        {/* Header Buku Teks */}
        <header className="mb-5 pb-4 border-b border-[#EAE2CF]">
          <div className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-[#0F766E]">
            <BookOpen className="w-4 h-4" aria-hidden="true" />
            <span>Pembahasan Buku Teks · Soal {question.id}</span>
          </div>
          <h3 className="font-serif-book text-xl sm:text-2xl font-bold text-[#133835] mt-1">
            {question.title}
          </h3>
        </header>

        <div className="space-y-4 font-serif-book leading-relaxed">
          {/* 1. Memahami Permasalahan */}
          <section
            ref={(el) => {
              stageRefs.current[0] = el;
            }}
            className={`rounded-xl border p-4 sm:p-5 transition-colors ${sectionHighlightClass(0)}`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <h4 className="font-sans text-sm font-bold text-[#0F766E]">
                1. Memahami Permasalahan
              </h4>
              {renderListenStageBtn(0)}
            </div>
            <p className="text-[15px] text-[#2C2A25] mb-3">
              <MathText text={exp.memahamiPermasalahan.situasi} />
            </p>
            <div className="grid sm:grid-cols-2 gap-4 text-[14.5px]">
              <div>
                <div className="font-sans text-xs font-bold uppercase tracking-wide text-[#134E4A] mb-1.5">
                  Diketahui
                </div>
                <ul className="list-disc pl-5 space-y-1">
                  {exp.memahamiPermasalahan.diketahui.map((item) => (
                    <li key={item}>
                      <MathText text={item} />
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="font-sans text-xs font-bold uppercase tracking-wide text-[#134E4A] mb-1">
                    Ditanyakan
                  </div>
                  <p>
                    <MathText text={exp.memahamiPermasalahan.ditanya} />
                  </p>
                </div>
                <div>
                  <div className="font-sans text-xs font-bold uppercase tracking-wide text-[#134E4A] mb-1">
                    Hubungan Stimulus & Pertanyaan
                  </div>
                  <p>
                    <MathText text={exp.memahamiPermasalahan.hubunganStimulus} />
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 2. Mengidentifikasi Konsep Dasar */}
          <section
            ref={(el) => {
              stageRefs.current[1] = el;
            }}
            className={`rounded-xl border p-4 sm:p-5 transition-colors ${sectionHighlightClass(1)}`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <h4 className="font-sans text-sm font-bold text-[#0F766E]">
                2. Mengidentifikasi Konsep Dasar — {exp.mengidentifikasiKonsep.judulKonsep}
              </h4>
              {renderListenStageBtn(1)}
            </div>
            <div className="space-y-2.5 text-[15px]">
              <p>
                <strong className="font-semibold text-[#133835]">Prinsip Ilmiah: </strong>
                <MathText text={exp.mengidentifikasiKonsep.prinsipIlmiah} />
              </p>
              <p>
                <strong className="font-semibold text-[#133835]">Relevansi dalam Soal: </strong>
                <MathText text={exp.mengidentifikasiKonsep.relevansi} />
              </p>
              <div className="bg-[#F0F9FF] border border-[#BAE6FD] rounded-lg p-3 text-[14.5px] text-[#0C4A6E]">
                <strong className="font-sans text-xs font-bold uppercase tracking-wide block mb-1">
                  Analogi Sederhana untuk Pemahaman Awal
                </strong>
                <MathText text={exp.mengidentifikasiKonsep.penjelasanPemula} />
              </div>
            </div>
          </section>

          {/* 3. Menentukan Strategi Penyelesaian */}
          <section
            ref={(el) => {
              stageRefs.current[2] = el;
            }}
            className={`rounded-xl border p-4 sm:p-5 transition-colors ${sectionHighlightClass(2)}`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <h4 className="font-sans text-sm font-bold text-[#0F766E]">
                3. Menentukan Strategi Penyelesaian
              </h4>
              {renderListenStageBtn(2)}
            </div>
            <p className="text-[15px] mb-2">
              <MathText text={exp.strategiPenyelesaian.pendekatan} />
            </p>
            <p className="text-[14.5px] text-[#4E4A40] mb-3">
              <strong className="font-semibold text-[#133835]">Analisis Stimulus: </strong>
              <MathText text={exp.strategiPenyelesaian.analisisVisual} />
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {exp.strategiPenyelesaian.rumus.map((r) => (
                <div
                  key={r.persamaan}
                  className="bg-[#FBF7EC] border border-[#EAE0C8] rounded-lg p-3"
                >
                  <div className="text-center text-base font-semibold text-[#133835] py-1 overflow-x-auto">
                    <MathText text={r.persamaan} />
                  </div>
                  <ul className="mt-2 pt-2 border-t border-[#EAE0C8] text-xs font-sans text-[#4E4A40] space-y-1">
                    {r.keteranganSimbol.map((ket) => (
                      <li key={ket}>
                        <MathText text={ket} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* 4. Penyelesaian Langkah demi Langkah */}
          <section
            ref={(el) => {
              stageRefs.current[3] = el;
            }}
            className={`rounded-xl border p-4 sm:p-5 transition-colors ${sectionHighlightClass(3)}`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <h4 className="font-sans text-sm font-bold text-[#0F766E]">
                4. Penyelesaian Langkah demi Langkah
              </h4>
              {renderListenStageBtn(3)}
            </div>
            <div className="space-y-4">
              {exp.langkahPenyelesaian.map((step, idx) => (
                <div key={step.judul} className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#0F766E] text-white font-sans text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 tabular-nums">
                    {idx + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h5 className="font-bold text-[15.5px] text-[#133835]">
                      <MathText text={step.judul} />
                    </h5>
                    <p className="text-[14.5px] mt-0.5">
                      <MathText text={step.penjelasan} />
                    </p>
                    {step.persamaan && (
                      <div className="my-2 px-3 py-2 bg-[#FBF7EC] border border-[#EAE0C8] rounded-lg text-center text-[16px] text-[#133835] overflow-x-auto">
                        <MathText text={step.persamaan} />
                      </div>
                    )}
                    <p className="text-xs font-sans text-[#4E4A40]">
                      <strong>Alasan langkah:</strong> <MathText text={step.alasanLangkah} />
                      {step.catatanSatuan && (
                        <>
                          {' '}
                          · <span className="text-[#0F766E] font-semibold">{step.catatanSatuan}</span>
                        </>
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 5. Menarik Kesimpulan */}
          <section
            ref={(el) => {
              stageRefs.current[4] = el;
            }}
            className={`rounded-xl border p-4 sm:p-5 transition-colors ${sectionHighlightClass(4)}`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <h4 className="font-sans text-sm font-bold text-[#0F766E]">
                5. Menarik Kesimpulan
              </h4>
              {renderListenStageBtn(4)}
            </div>
            <div className="border-2 border-[#0F766E] bg-[#F0FDFA] rounded-xl px-4 py-3 text-center mb-3">
              <div className="font-sans text-[11px] font-bold uppercase tracking-wider text-[#0F766E]">
                Hasil Akhir & Jawaban Benar
              </div>
              <div className="text-lg font-bold text-[#134E4A] mt-0.5">
                <MathText text={exp.kesimpulan.hasilAkhir} /> — {exp.kesimpulan.jawabanBenar}
              </div>
            </div>
            <p className="text-[15px]">
              <MathText text={exp.kesimpulan.maknaKontekstual} />
            </p>
          </section>

          {/* 6. Tips dan Pemahaman Konsep */}
          <section
            ref={(el) => {
              stageRefs.current[5] = el;
            }}
            className={`rounded-xl border p-4 sm:p-5 transition-colors ${sectionHighlightClass(5)}`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <h4 className="font-sans text-sm font-bold text-[#B45309] flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4" aria-hidden="true" />
                <span>6. Tips, Alternatif & Pemahaman Konsep</span>
              </h4>
              {renderListenStageBtn(5)}
            </div>

            <div className="space-y-3 text-[14.5px]">
              <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded-lg p-3">
                <strong className="font-sans text-xs font-bold uppercase tracking-wide text-[#92400E] block mb-1">
                  Cara Cepat Menyelesaikan
                </strong>
                <MathText text={exp.tipsDanKonsep.caraCepat} />
              </div>

              <div>
                <strong className="font-sans text-xs font-bold uppercase tracking-wide text-[#9F1239] block mb-1">
                  Kesalahan Umum yang Harus Dihindari
                </strong>
                <ul className="list-disc pl-5 space-y-1">
                  {exp.tipsDanKonsep.kesalahanUmum.map((err) => (
                    <li key={err}>
                      <MathText text={err} />
                    </li>
                  ))}
                </ul>
              </div>

              <p>
                <strong className="font-semibold text-[#133835]">Konsep Penting untuk Diingat: </strong>
                <MathText text={exp.tipsDanKonsep.konsepPenting} />
              </p>

              {exp.tipsDanKonsep.alternatifPenyelesaian && (
                <p>
                  <strong className="font-semibold text-[#133835]">Alternatif Penyelesaian: </strong>
                  <MathText text={exp.tipsDanKonsep.alternatifPenyelesaian} />
                </p>
              )}

              {exp.tipsDanKonsep.telaahOpsi && exp.tipsDanKonsep.telaahOpsi.length > 0 && (
                <div className="pt-2 border-t border-[#EAE2CF]">
                  <strong className="font-sans text-xs font-bold uppercase tracking-wide text-[#134E4A] block mb-2">
                    Telaah Setiap Opsi / Pernyataan
                  </strong>
                  <div className="space-y-2">
                    {exp.tipsDanKonsep.telaahOpsi.map((opsi) => (
                      <div key={opsi.label} className="flex items-start gap-2.5 text-sm">
                        {opsi.benar ? (
                          <CheckCircle2
                            className="w-4 h-4 text-[#059669] shrink-0 mt-1"
                            aria-hidden="true"
                          />
                        ) : (
                          <XCircle
                            className="w-4 h-4 text-[#E11D48] shrink-0 mt-1"
                            aria-hidden="true"
                          />
                        )}
                        <div>
                          <strong className="text-[#133835]">{opsi.label}: </strong>
                          <MathText text={opsi.penjelasan} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      </article>
    </div>
  );
};
