import React, { useState } from 'react';
import {
  RotateCcw,
  CheckCircle2,
  XCircle,
  MinusCircle,
  ChevronDown,
  ChevronUp,
  Award,
  BookOpen,
} from 'lucide-react';
import type { QuestionItem, QuizResult, StudentAnswer } from '../types/quiz';
import {
  OPTION_LETTERS,
  TYPE_LABELS,
  formatDuration,
  formatNumberId,
  getPredicateLabel,
} from '../utils/quizLogic';
import { StimulusFigure } from './StimulusFigure';
import { TextbookExplanation } from './TextbookExplanation';

interface ResultsViewProps {
  questions: QuestionItem[];
  answers: Record<number, StudentAnswer>;
  result: QuizResult | null;
  onFinishNow: () => void;
  onRestartPractice: () => void;
  onJumpToQuiz: () => void;
}

function renderStudentAnswerSummary(q: QuestionItem, ans?: StudentAnswer): string {
  if (!ans) return 'Tidak dijawab';
  if (q.type === 'mcq') {
    if (ans.choice === null || ans.choice === undefined) return 'Tidak dijawab';
    return `${OPTION_LETTERS[ans.choice]} · ${q.options?.[ans.choice] ?? ''}`;
  }
  if (q.type === 'complex') {
    const sel = [...(ans.choices ?? [])].sort((a, b) => a - b);
    if (!sel.length) return 'Tidak dijawab';
    return sel.map((i) => OPTION_LETTERS[i]).join(', ');
  }
  if (q.type === 'tf') {
    const tf = ans.tf ?? [null, null, null, null];
    if (!tf.some((v) => v === true || v === false)) return 'Tidak dijawab';
    return tf
      .map((v, i) => `P${i + 1}: ${v === true ? 'Benar' : v === false ? 'Salah' : '—'}`)
      .join(' · ');
  }
  const raw = (ans.value ?? '').trim();
  return raw ? `${raw} ${q.unit ?? ''}` : 'Tidak dijawab';
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  questions,
  answers,
  result,
  onFinishNow,
  onRestartPractice,
  onJumpToQuiz,
}) => {
  const [openReviewId, setOpenReviewId] = useState<number | null>(1);

  if (!result) {
    return (
      <div className="bg-white border border-[#CBEAE4] rounded-2xl p-8 text-center max-w-2xl mx-auto space-y-4">
        <Award className="w-10 h-10 text-[#0F766E] mx-auto" aria-hidden="true" />
        <h1 className="text-xl font-extrabold text-[#0F2D2B]">Belum Ada Hasil Latihan</h1>
        <p className="text-sm text-[#4B7A74]">
          Selesaikan sesi latihan terlebih dahulu untuk melihat nilai akhir, evaluasi penguasaan
          materi, serta daftar pembahasan lengkap seluruh soal.
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={onJumpToQuiz}
            className="px-5 py-2.5 text-sm font-bold text-white bg-[#0F766E] hover:bg-[#0D9488] rounded-xl cursor-pointer"
          >
            Buka Ruang Latihan
          </button>
          <button
            type="button"
            onClick={onFinishNow}
            className="px-5 py-2.5 text-sm font-bold text-[#0F766E] bg-white hover:bg-[#F0FDFA] border border-[#CBEAE4] rounded-xl cursor-pointer"
          >
            Hitung Skor Saat Ini
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Score Summary Card */}
      <section className="bg-white border border-[#CBEAE4] rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#0F766E]">
              Hasil Evaluasi Latihan · Kinematika Gerak Lurus
            </p>
            <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1 mt-2">
              <span className="font-mono-math text-5xl font-extrabold text-[#0F2D2B] tabular-nums">
                {formatNumberId(result.finalScore)}
              </span>
              <span className="text-lg font-bold text-[#4B7A74] whitespace-nowrap shrink-0">
                / 100
              </span>
              <span className="text-sm font-bold text-[#0F766E] whitespace-nowrap">
                · {getPredicateLabel(result.finalScore)}
              </span>
            </div>
            <p className="text-sm text-[#3C6A65] mt-2">
              Peserta: <strong className="text-[#0F2D2B]">{result.studentName}</strong> ({result.studentClass})
              <span aria-hidden="true"> · </span>
              Durasi: <span className="font-mono-math tabular-nums">{formatDuration(result.durationSec)}</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onRestartPractice}
              className="inline-flex items-center gap-2 px-5 py-3 text-sm font-bold text-white bg-[#0F766E] hover:bg-[#0D9488] rounded-xl transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
              ULANGI LATIHAN
            </button>
          </div>
        </div>

        {/* Counts Breakdown */}
        <div className="mt-6 pt-5 border-t border-[#E6F4F1] grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
          <div className="border border-[#A7F3D0] bg-[#ECFDF5] rounded-xl p-3">
            <div className="text-xs font-bold text-[#047857]">Benar Penuh</div>
            <div className="font-mono-math text-2xl font-extrabold text-[#059669] tabular-nums mt-0.5">
              {result.counts.benar}
            </div>
          </div>
          <div className="border border-[#FDE68A] bg-[#FFFBEB] rounded-xl p-3">
            <div className="text-xs font-bold text-[#B45309]">Parsial</div>
            <div className="font-mono-math text-2xl font-extrabold text-[#D97706] tabular-nums mt-0.5">
              {result.counts.parsial}
            </div>
          </div>
          <div className="border border-[#FECDD3] bg-[#FFF1F2] rounded-xl p-3">
            <div className="text-xs font-bold text-[#9F1239]">Salah</div>
            <div className="font-mono-math text-2xl font-extrabold text-[#E11D48] tabular-nums mt-0.5">
              {result.counts.salah}
            </div>
          </div>
          <div className="border border-[#E2E8F0] bg-[#F8FAFC] rounded-xl p-3">
            <div className="text-xs font-bold text-[#475569]">Kosong</div>
            <div className="font-mono-math text-2xl font-extrabold text-[#64748B] tabular-nums mt-0.5">
              {result.counts.kosong}
            </div>
          </div>
          <div className="border border-[#CBEAE4] bg-[#F0FDFA] rounded-xl p-3 col-span-2 sm:col-span-1">
            <div className="text-xs font-bold text-[#0F766E]">Skor Mentah</div>
            <div className="font-mono-math text-2xl font-extrabold text-[#0F2D2B] tabular-nums mt-0.5">
              {formatNumberId(result.rawTotal)}
            </div>
          </div>
        </div>

        {result.clamped && (
          <div className="mt-4 px-4 py-2.5 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] text-xs font-semibold text-[#92400E]">
            Skor mentah bernilai negatif ({formatNumberId(result.rawTotal)}) karena pengurangan poin
            pada Soal 5. Nilai akhir dibatasi minimum 0.
          </div>
        )}
      </section>

      {/* Topic Mastery Evaluation */}
      <section className="bg-white border border-[#CBEAE4] rounded-2xl p-6 sm:p-7">
        <h2 className="text-lg font-extrabold text-[#0F2D2B] mb-1">
          Evaluasi Penguasaan Materi Kinematika
        </h2>
        <p className="text-xs text-[#4B7A74] mb-5">
          Pemetaan capaian berdasarkan kelompok konsep fisika yang diujikan.
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          {result.mastery.map((m) => (
            <div
              key={m.topicGroup}
              className="border border-[#E2EFEC] rounded-xl p-4 bg-[#FCFEFE] space-y-2.5"
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-sm font-bold text-[#0F2D2B]">{m.topicGroup}</h3>
                <span
                  className={`text-xs font-extrabold ${
                    m.statusLabel === 'Sangat Menguasai'
                      ? 'text-[#059669]'
                      : m.statusLabel === 'Cukup Baik'
                        ? 'text-[#D97706]'
                        : 'text-[#E11D48]'
                  }`}
                >
                  {m.statusLabel} ({m.percent}%)
                </span>
              </div>

              <div className="h-2 bg-[#E6F4F1] rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all ${
                    m.percent >= 80
                      ? 'bg-[#059669]'
                      : m.percent >= 55
                        ? 'bg-[#D97706]'
                        : 'bg-[#E11D48]'
                  }`}
                  style={{ width: `${m.percent}%` }}
                />
              </div>

              <div className="text-xs text-[#4B7A74] tabular-nums">
                Soal nomor {m.questionIds.join(', ')} · Skor {formatNumberId(m.earnedScore)} /{' '}
                {m.maxScore}
              </div>
              <p className="text-xs text-[#17423F] leading-relaxed">{m.recommendation}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Full Question-by-Question Review + Textbook & Audio */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 px-1">
          <BookOpen className="w-5 h-5 text-[#0F766E]" aria-hidden="true" />
          <h2 className="text-lg font-extrabold text-[#0F2D2B]">
            Pembahasan Lengkap &amp; Narator Audio (Soal 1–10)
          </h2>
        </div>

        {questions.map((q) => {
          const grade = result.perQuestion.find((p) => p.id === q.id)!;
          const isOpen = openReviewId === q.id;

          return (
            <div
              key={q.id}
              className="bg-white border border-[#CBEAE4] rounded-2xl overflow-hidden"
            >
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpenReviewId(isOpen ? null : q.id)}
                className="w-full px-5 py-4 flex flex-wrap items-center justify-between gap-3 text-left hover:bg-[#F6FAFA] transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-8 h-8 rounded-lg bg-[#0F2D2B] text-white font-mono-math text-sm font-bold flex items-center justify-center shrink-0 tabular-nums">
                    {q.id}
                  </span>
                  <div className="min-w-0">
                    <div className="text-sm font-extrabold text-[#0F2D2B] truncate">
                      {q.title}
                    </div>
                    <div className="text-xs text-[#4B7A74]">
                      {TYPE_LABELS[q.type]} · Kunci: <strong className="text-[#0F2D2B]">{q.keyLabel}</strong>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs font-extrabold font-mono-math tabular-nums ${
                      grade.status === 'benar'
                        ? 'text-[#059669]'
                        : grade.status === 'parsial'
                          ? 'text-[#D97706]'
                          : grade.status === 'salah'
                            ? 'text-[#E11D48]'
                            : 'text-[#64748B]'
                    }`}
                  >
                    {grade.status === 'benar' ? (
                      <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                    ) : grade.status === 'parsial' ? (
                      <MinusCircle className="w-4 h-4" aria-hidden="true" />
                    ) : (
                      <XCircle className="w-4 h-4" aria-hidden="true" />
                    )}
                    {grade.status.toUpperCase()} · {formatNumberId(grade.score)}/10
                  </span>

                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#4B7A74]" aria-hidden="true" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#4B7A74]" aria-hidden="true" />
                  )}
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-6 pt-3 border-t border-[#E6F4F1]">
                  <div className="mb-4 px-4 py-3 rounded-xl bg-[#F8FCFB] border border-[#CBEAE4] text-sm">
                    <span className="font-bold text-[#0F766E]">Jawaban Kamu: </span>
                    <span className="text-[#0F2D2B] font-medium">
                      {renderStudentAnswerSummary(q, answers[q.id])}
                    </span>
                    {grade.detail && (
                      <span className="text-xs text-[#4B7A74] ml-2">({grade.detail})</span>
                    )}
                  </div>

                  <div className="space-y-2 text-sm text-[#17423F] mb-3">
                    {q.stem.map((p, idx) => (
                      <p key={idx}>{p}</p>
                    ))}
                  </div>

                  <StimulusFigure question={q} />

                  <TextbookExplanation question={q} />
                </div>
              )}
            </div>
          );
        })}
      </section>
    </div>
  );
};
