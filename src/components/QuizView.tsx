import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  XCircle,
  MinusCircle,
  Send,
  Flag,
  RotateCcw,
} from 'lucide-react';
import type { QuestionItem, StudentAnswer } from '../types/quiz';
import {
  OPTION_LETTERS,
  TYPE_LABELS,
  formatNumberId,
  gradeQuestion,
  isQuestionAnswered,
  isQuestionPartial,
  normNum,
} from '../utils/quizLogic';
import { StimulusFigure } from './StimulusFigure';
import { TextbookExplanation } from './TextbookExplanation';

interface QuizViewProps {
  questions: QuestionItem[];
  currentIndex: number;
  answers: Record<number, StudentAnswer>;
  checkedIds: Record<number, boolean>;
  onSelectIndex: (idx: number) => void;
  onUpdateAnswer: (
    questionId: number,
    updater: StudentAnswer | ((prev: StudentAnswer) => StudentAnswer)
  ) => void;
  onCheckQuestion: (questionId: number) => void;
  onResetSingleQuestion: (questionId: number) => void;
  onFinishPractice: () => void;
}

export const QuizView: React.FC<QuizViewProps> = ({
  questions,
  currentIndex,
  answers,
  checkedIds,
  onSelectIndex,
  onUpdateAnswer,
  onCheckQuestion,
  onResetSingleQuestion,
  onFinishPractice,
}) => {
  const [confirmFinish, setConfirmFinish] = useState(false);

  const q = questions[currentIndex];
  const ans = answers[q.id] ?? {};
  const isAnswered = isQuestionAnswered(q, ans);
  const isChecked = Boolean(checkedIds[q.id]);
  const grade = isChecked ? gradeQuestion(q, ans) : null;

  const totalAnswered = questions.filter((item) =>
    isQuestionAnswered(item, answers[item.id])
  ).length;
  const unansweredIds = questions
    .filter((item) => !isQuestionAnswered(item, answers[item.id]))
    .map((item) => item.id);

  const handleMcqChange = (optIdx: number) => {
    if (isChecked) return;
    onUpdateAnswer(q.id, { choice: optIdx });
  };

  const handleComplexToggle = (optIdx: number) => {
    if (isChecked) return;
    onUpdateAnswer(q.id, (prevAns) => {
      const prev = prevAns.choices ?? [];
      const next = prev.includes(optIdx)
        ? prev.filter((i) => i !== optIdx)
        : [...prev, optIdx];
      return { ...prevAns, choices: next };
    });
  };

  const handleTfToggle = (stmtIdx: number, val: boolean) => {
    if (isChecked) return;
    onUpdateAnswer(q.id, (prevAns) => {
      const prev = [...(prevAns.tf ?? [null, null, null, null])];
      prev[stmtIdx] = prev[stmtIdx] === val ? null : val;
      return { ...prevAns, tf: prev };
    });
  };

  const handleNumericChange = (raw: string) => {
    if (isChecked) return;
    onUpdateAnswer(q.id, { value: raw });
  };

  const parsedNum = q.type === 'numeric' ? normNum(ans.value) : null;
  const rawNumTrimmed = (ans.value ?? '').trim();

  return (
    <div className="space-y-5">
      {/* Top Question Navigator & Progress Strip */}
      <section
        aria-label="Navigasi dan progres latihan"
        className="bg-white border border-[#CBEAE4] rounded-2xl p-4 sm:p-5 space-y-3.5"
      >
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onSelectIndex(Math.max(0, currentIndex - 1))}
              disabled={currentIndex === 0}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[40px] text-xs font-bold text-[#0F766E] bg-white hover:bg-[#F0FDFA] border border-[#99E2D8] rounded-xl disabled:opacity-45 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" aria-hidden="true" />
              SOAL SEBELUMNYA
            </button>

            <button
              type="button"
              onClick={() => onSelectIndex(Math.min(questions.length - 1, currentIndex + 1))}
              disabled={currentIndex === questions.length - 1}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[40px] text-xs font-bold text-[#0F766E] bg-white hover:bg-[#F0FDFA] border border-[#99E2D8] rounded-xl disabled:opacity-45 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              SOAL BERIKUTNYA
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => setConfirmFinish((prev) => !prev)}
            className="inline-flex items-center gap-2 px-4 py-2 min-h-[40px] text-xs font-bold text-white bg-[#0F766E] hover:bg-[#0D9488] rounded-xl transition-colors cursor-pointer"
          >
            <Flag className="w-3.5 h-3.5" aria-hidden="true" />
            SELESAIKAN LATIHAN
          </button>
        </div>

        {/* Numbered 1-10 Grid */}
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
          {questions.map((item, idx) => {
            const itemAns = answers[item.id];
            const itemAnswered = isQuestionAnswered(item, itemAns);
            const itemPartial = isQuestionPartial(item, itemAns);
            const itemChecked = Boolean(checkedIds[item.id]);
            const itemGrade = itemChecked ? gradeQuestion(item, itemAns) : null;
            const isCurrent = idx === currentIndex;

            let btnStyle = 'bg-white border-[#CBEAE4] text-[#4B7A74] hover:border-[#0D9488]';
            if (itemChecked && itemGrade) {
              if (itemGrade.status === 'benar') {
                btnStyle = 'bg-[#ECFDF5] border-[#059669] text-[#047857]';
              } else if (itemGrade.status === 'parsial') {
                btnStyle = 'bg-[#FFFBEB] border-[#D97706] text-[#B45309]';
              } else {
                btnStyle = 'bg-[#FFF1F2] border-[#E11D48] text-[#BE123C]';
              }
            } else if (itemPartial) {
              btnStyle = 'bg-[#FEF3C7] border-[#F59E0B] text-[#92400E]';
            } else if (itemAnswered) {
              btnStyle = 'bg-[#0D9488] border-[#0D9488] text-white';
            }

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectIndex(idx)}
                aria-label={`Soal ${item.id}${isCurrent ? ' (sedang aktif)' : ''}`}
                aria-current={isCurrent ? 'step' : undefined}
                className={`h-10 rounded-xl border text-sm font-extrabold font-mono-math tabular-nums transition-all cursor-pointer ${btnStyle} ${
                  isCurrent ? 'ring-2 ring-offset-1 ring-[#0F2D2B]' : ''
                }`}
              >
                {item.id}
              </button>
            );
          })}
        </div>

        {/* Progress Bar & Status Summary */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[#4B7A74]">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>
              <strong className="text-[#0F2D2B] font-mono-math tabular-nums">
                {totalAnswered}/10
              </strong>{' '}
              terisi
            </span>
            <span aria-hidden="true">·</span>
            <span>Putih = kosong</span>
            <span aria-hidden="true">·</span>
            <span>Teal = terisi</span>
            <span aria-hidden="true">·</span>
            <span>Garis tepi hijau/merah = sudah diperiksa</span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-48">
            <div className="flex-1 h-2 bg-[#E6F4F1] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#0D9488] transition-all duration-300"
                style={{ width: `${totalAnswered * 10}%` }}
              />
            </div>
            <span className="font-mono-math font-bold text-[#0F766E] tabular-nums">
              {totalAnswered * 10}%
            </span>
          </div>
        </div>

        {/* Finish Confirmation Drawer */}
        {confirmFinish && (
          <div
            role="alertdialog"
            aria-label="Konfirmasi akhiri latihan"
            className="mt-2 pt-4 border-t border-dashed border-[#99E2D8] space-y-3"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="text-sm font-semibold text-[#0F2D2B]">
                {unansweredIds.length === 0 ? (
                  <span className="text-[#047857]">
                    Semua 10 soal telah terisi. Siap melihat hasil nilai dan evaluasi materi?
                  </span>
                ) : (
                  <span>
                    Soal yang belum dijawab:{' '}
                    <strong className="text-[#B45309]">
                      nomor {unansweredIds.join(', ')}
                    </strong>
                    . Tetap selesaikan latihan sekarang?
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setConfirmFinish(false)}
                  className="px-3.5 py-2 text-xs font-bold text-[#4B7A74] bg-white hover:bg-[#F8FCFB] border border-[#CBEAE4] rounded-xl cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={onFinishPractice}
                  className="px-4 py-2 text-xs font-bold text-white bg-[#0F766E] hover:bg-[#0D9488] rounded-xl cursor-pointer"
                >
                  Ya, Akhiri &amp; Lihat Hasil
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Active Question Card */}
      <article className="bg-white border border-[#CBEAE4] rounded-2xl p-5 sm:p-7">
        {/* Clean Unboxed Metadata Header */}
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-semibold text-[#4B7A74] mb-2 tabular-nums">
          <span className="font-extrabold text-[#0F766E]">SOAL {q.id} / {questions.length}</span>
          <span aria-hidden="true">·</span>
          <span>{TYPE_LABELS[q.type]}</span>
          <span aria-hidden="true">·</span>
          <span>{q.topic}</span>
          <span aria-hidden="true">·</span>
          <span>{q.level}</span>
          <span aria-hidden="true">·</span>
          <span>10 poin</span>
        </div>

        <h1 className="text-xl sm:text-2xl font-extrabold text-[#0F2D2B] mb-3">{q.title}</h1>

        {/* Question Stem */}
        <div className="space-y-2.5 text-[15px] text-[#17423F] leading-relaxed">
          {q.stem.map((paragraph, pIdx) => (
            <p key={pIdx}>{paragraph}</p>
          ))}
        </div>

        {/* Scientific SVG Stimulus */}
        <StimulusFigure question={q} />

        {/* Response Section */}
        <div className="mt-5">
          {q.type === 'mcq' && q.options && (
            <div className="space-y-2.5" role="radiogroup" aria-label={`Pilihan jawaban soal ${q.id}`}>
              {q.options.map((optText, idx) => {
                const selected = ans.choice === idx;
                const isKey = isChecked && q.correctChoice === idx;
                const isWrongSelected = isChecked && selected && !isKey;

                let rowClasses =
                  'border-[#CBEAE4] bg-white hover:border-[#0D9488] hover:bg-[#F6FAFA]';
                if (isChecked) {
                  if (isKey) {
                    rowClasses = 'border-[#059669] bg-[#ECFDF5]';
                  } else if (isWrongSelected) {
                    rowClasses = 'border-[#E11D48] bg-[#FFF1F2]';
                  } else {
                    rowClasses = 'border-[#E2EFEC] bg-white opacity-75';
                  }
                } else if (selected) {
                  rowClasses = 'border-[#0D9488] bg-[#F0FDFA] ring-1 ring-[#0D9488]';
                }

                return (
                  <label
                    key={optText}
                    className={`flex items-start gap-3 border rounded-xl p-3.5 transition-colors ${
                      isChecked ? 'cursor-default' : 'cursor-pointer'
                    } ${rowClasses}`}
                  >
                    <input
                      type="radio"
                      name={`q-${q.id}`}
                      value={idx}
                      checked={selected}
                      disabled={isChecked}
                      onChange={() => handleMcqChange(idx)}
                      className="sr-only"
                    />
                    <span
                      className={`w-7 h-7 rounded-lg border text-xs font-extrabold flex items-center justify-center shrink-0 ${
                        selected
                          ? 'bg-[#0F766E] border-[#0F766E] text-white'
                          : 'bg-white border-[#99E2D8] text-[#0F766E]'
                      }`}
                    >
                      {OPTION_LETTERS[idx]}
                    </span>
                    <span className="text-sm font-medium text-[#0F2D2B] pt-1 flex-1">
                      {optText}
                    </span>
                    {isChecked && isKey && (
                      <span className="text-xs font-bold text-[#059669] shrink-0 pt-1">
                        Kunci Benar
                      </span>
                    )}
                  </label>
                );
              })}
            </div>
          )}

          {q.type === 'complex' && q.options && (
            <div className="space-y-3">
              <div className="px-3.5 py-2.5 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] text-xs font-semibold text-[#92400E]">
                Pilih lebih dari satu pernyataan yang benar. Skor 10 hanya diberikan jika seluruh
                pilihan benar dipilih dan tidak ada pilihan salah.
              </div>

              <div className="space-y-2.5">
                {q.options.map((optText, idx) => {
                  const selected = (ans.choices ?? []).includes(idx);
                  const isKey = isChecked && (q.correctChoices ?? []).includes(idx);
                  const isWrongSelected = isChecked && selected && !isKey;

                  let rowClasses =
                    'border-[#CBEAE4] bg-white hover:border-[#0D9488] hover:bg-[#F6FAFA]';
                  if (isChecked) {
                    if (isKey) {
                      rowClasses = 'border-[#059669] bg-[#ECFDF5]';
                    } else if (isWrongSelected) {
                      rowClasses = 'border-[#E11D48] bg-[#FFF1F2]';
                    } else {
                      rowClasses = 'border-[#E2EFEC] bg-white opacity-80';
                    }
                  } else if (selected) {
                    rowClasses = 'border-[#0D9488] bg-[#F0FDFA] ring-1 ring-[#0D9488]';
                  }

                  return (
                    <label
                      key={optText}
                      className={`flex items-start gap-3 border rounded-xl p-3.5 transition-colors ${
                        isChecked ? 'cursor-default' : 'cursor-pointer'
                      } ${rowClasses}`}
                    >
                      <input
                        type="checkbox"
                        checked={selected}
                        disabled={isChecked}
                        onChange={() => handleComplexToggle(idx)}
                        className="mt-1 w-4 h-4 accent-[#0F766E] shrink-0"
                      />
                      <span
                        className={`w-7 h-7 rounded-lg border text-xs font-extrabold flex items-center justify-center shrink-0 ${
                          selected
                            ? 'bg-[#0F766E] border-[#0F766E] text-white'
                            : 'bg-white border-[#99E2D8] text-[#0F766E]'
                        }`}
                      >
                        {OPTION_LETTERS[idx]}
                      </span>
                      <span className="text-sm font-medium text-[#0F2D2B] pt-1 flex-1">
                        {optText}
                      </span>
                      {isChecked && isKey && (
                        <span className="text-xs font-bold text-[#059669] shrink-0 pt-1">
                          Benar
                        </span>
                      )}
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {q.type === 'tf' && q.statements && (
            <div className="space-y-3">
              <div className="px-3.5 py-2.5 rounded-xl bg-[#FFF1F2] border border-[#FECDD3] text-xs font-semibold text-[#9F1239]">
                Skor per pernyataan: benar +2,5 · salah −1 · kosong 0. Ketuk pilihan yang sama sekali
                lagi untuk membatalkan.
              </div>

              {q.statements.map((stmtText, idx) => {
                const val = (ans.tf ?? [null, null, null, null])[idx];
                const expected = q.correctTf?.[idx];

                return (
                  <div
                    key={stmtText}
                    className="border border-[#CBEAE4] rounded-xl p-3.5 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="text-sm text-[#0F2D2B] flex-1">
                      <strong className="text-[#0F766E] mr-1.5">P{idx + 1}.</strong>
                      {stmtText}
                      {isChecked && expected !== undefined && (
                        <span className="block text-xs font-bold text-[#0F766E] mt-1">
                          Kunci: {expected ? 'BENAR' : 'SALAH'}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        disabled={isChecked}
                        aria-pressed={val === true}
                        onClick={() => handleTfToggle(idx, true)}
                        className={`px-4 py-2 min-h-[40px] rounded-xl border text-xs font-extrabold transition-colors cursor-pointer disabled:cursor-default ${
                          val === true
                            ? 'bg-[#0F766E] border-[#0F766E] text-white'
                            : 'bg-white border-[#CBEAE4] text-[#4B7A74] hover:border-[#0D9488]'
                        }`}
                      >
                        BENAR
                      </button>
                      <button
                        type="button"
                        disabled={isChecked}
                        aria-pressed={val === false}
                        onClick={() => handleTfToggle(idx, false)}
                        className={`px-4 py-2 min-h-[40px] rounded-xl border text-xs font-extrabold transition-colors cursor-pointer disabled:cursor-default ${
                          val === false
                            ? 'bg-[#E11D48] border-[#E11D48] text-white'
                            : 'bg-white border-[#CBEAE4] text-[#4B7A74] hover:border-[#E11D48]'
                        }`}
                      >
                        SALAH
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {q.type === 'numeric' && (
            <div className="space-y-3">
              <div className="px-4 py-3 rounded-xl bg-[#F0F9FF] border border-[#BAE6FD] text-xs text-[#0C4A6E]">
                <strong>Cara mengisi:</strong> ketik <strong>angka saja</strong> (koma atau titik
                diperbolehkan, mis. <code className="font-mono-math">122,5</code> atau{' '}
                <code className="font-mono-math">122.5</code>). Kolom kosong berarti tidak dijawab.
              </div>

              <div className="flex flex-wrap items-stretch gap-2.5">
                <label htmlFor={`num-input-${q.id}`} className="sr-only">
                  Jawaban angka untuk soal {q.id}
                </label>
                <input
                  id={`num-input-${q.id}`}
                  type="text"
                  inputMode="decimal"
                  autoComplete="off"
                  spellCheck={false}
                  disabled={isChecked}
                  value={ans.value ?? ''}
                  onChange={(e) => handleNumericChange(e.target.value)}
                  placeholder={q.placeholder ?? 'contoh: 12,5'}
                  className="flex-1 min-w-[180px] px-4 py-3 min-h-[48px] rounded-xl border-2 border-[#99E2D8] bg-white font-mono-math text-lg font-bold text-[#0F2D2B] focus:outline-none focus:border-[#0F766E] disabled:bg-[#F8FCFB]"
                />
                <span className="px-4 min-h-[48px] rounded-xl bg-[#0F2D2B] text-[#CCFBF1] font-mono-math font-bold text-sm flex items-center justify-center">
                  {q.unit}
                </span>
              </div>

              {rawNumTrimmed && (
                <p
                  className={`text-xs font-bold ${
                    parsedNum === null ? 'text-[#B45309]' : 'text-[#059669]'
                  }`}
                >
                  {parsedNum === null
                    ? 'Format angka belum dikenali — ketik angka seperti 72 atau 122,5'
                    : `Terbaca: ${formatNumberId(parsedNum)} ${q.unit ?? ''}`}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Submit & Check Action Row (Never leaks key before student submits) */}
        <div className="mt-6 pt-5 border-t border-[#E6F4F1] flex flex-wrap items-center justify-between gap-3">
          {!isChecked ? (
            <>
              <p className="text-xs text-[#4B7A74]">
                {isAnswered
                  ? 'Jawaban siap diperiksa. Kamu masih boleh mengubah pilihan sebelum mengirim.'
                  : 'Pilih atau isi jawabanmu terlebih dahulu untuk membuka pembahasan.'}
              </p>
              <button
                type="button"
                disabled={!isAnswered}
                onClick={() => onCheckQuestion(q.id)}
                className="inline-flex items-center gap-2 px-5 py-2.5 min-h-[44px] text-sm font-bold text-white bg-[#0F766E] hover:bg-[#0D9488] rounded-xl transition-colors disabled:opacity-45 disabled:cursor-not-allowed cursor-pointer"
              >
                <Send className="w-4 h-4" aria-hidden="true" />
                KIRIM &amp; PERIKSA JAWABAN
              </button>
            </>
          ) : (
            grade && (
              <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  {grade.status === 'benar' ? (
                    <CheckCircle2 className="w-6 h-6 text-[#059669] shrink-0" aria-hidden="true" />
                  ) : grade.status === 'parsial' ? (
                    <MinusCircle className="w-6 h-6 text-[#D97706] shrink-0" aria-hidden="true" />
                  ) : (
                    <XCircle className="w-6 h-6 text-[#E11D48] shrink-0" aria-hidden="true" />
                  )}
                  <div>
                    <div className="text-sm font-extrabold text-[#0F2D2B]">
                      Status Jawaban:{' '}
                      <span
                        className={
                          grade.status === 'benar'
                            ? 'text-[#059669]'
                            : grade.status === 'parsial'
                              ? 'text-[#D97706]'
                              : 'text-[#E11D48]'
                        }
                      >
                        {grade.status.toUpperCase()}
                      </span>{' '}
                      · Skor{' '}
                      <span className="font-mono-math tabular-nums">
                        {formatNumberId(grade.score)}/10
                      </span>
                    </div>
                    <div className="text-xs text-[#4B7A74]">
                      Kunci jawaban: <strong className="text-[#0F2D2B]">{q.keyLabel}</strong>
                      {grade.detail ? ` · (${grade.detail})` : ''}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onResetSingleQuestion(q.id)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-[#0F766E] bg-white hover:bg-[#F0FDFA] border border-[#99E2D8] rounded-xl cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                    Coba Jawab Ulang
                  </button>
                  {currentIndex < questions.length - 1 ? (
                    <button
                      type="button"
                      onClick={() => onSelectIndex(currentIndex + 1)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#0F766E] hover:bg-[#0D9488] rounded-xl cursor-pointer"
                    >
                      Lanjut Soal {currentIndex + 2}
                      <ChevronRight className="w-4 h-4" aria-hidden="true" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={onFinishPractice}
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#0F766E] hover:bg-[#0D9488] rounded-xl cursor-pointer"
                    >
                      Lihat Hasil Akhir
                      <Flag className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  )}
                </div>
              </div>
            )
          )}
        </div>
      </article>

      {/* Full 6-Stage Textbook Explanation & Synchronized Audio Narrator (Only after submission) */}
      {isChecked && <TextbookExplanation question={q} />}
    </div>
  );
};
