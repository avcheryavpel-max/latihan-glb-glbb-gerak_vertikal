import React from 'react';
import { Play, BookOpen, CheckCircle2, XCircle, MinusCircle } from 'lucide-react';
import type { QuestionItem, StudentAnswer } from '../types/quiz';
import { TYPE_LABELS, gradeQuestion, isQuestionAnswered } from '../utils/quizLogic';

interface TopicsViewProps {
  questions: QuestionItem[];
  answers: Record<number, StudentAnswer>;
  checkedIds: Record<number, boolean>;
  onOpenQuestion: (index: number) => void;
}

export const TopicsView: React.FC<TopicsViewProps> = ({
  questions,
  answers,
  checkedIds,
  onOpenQuestion,
}) => {
  return (
    <div className="space-y-6">
      <div className="bg-white border border-[#CBEAE4] rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#0F2D2B]">
            Daftar Materi &amp; Soal Latihan Kinematika
          </h1>
          <p className="text-sm text-[#4B7A74] mt-1">
            Seluruh 10 soal HOTS mencakup GLB, GLBB, Grafik Kinematika, dan Gerak Vertikal. Pilih
            nomor mana saja untuk mulai berlatih atau membuka pembahasan setelah dijawab.
          </p>
        </div>
        <button
          type="button"
          onClick={() => onOpenQuestion(0)}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-white bg-[#0F766E] hover:bg-[#0D9488] rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          <Play className="w-4 h-4" aria-hidden="true" />
          Mulai dari Soal 1
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {questions.map((q, idx) => {
          const isChecked = Boolean(checkedIds[q.id]);
          const isAnswered = isQuestionAnswered(q, answers[q.id]);
          const grade = isChecked ? gradeQuestion(q, answers[q.id]) : null;

          return (
            <div
              key={q.id}
              className="bg-white border border-[#CBEAE4] rounded-xl p-5 flex flex-col justify-between gap-4"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#4B7A74] mb-1.5">
                  <span className="font-mono-math font-bold text-[#0F766E] tabular-nums">
                    Soal {q.id} / {questions.length} · {TYPE_LABELS[q.type]} · {q.level}
                  </span>

                  {isChecked && grade ? (
                    <span
                      className={`inline-flex items-center gap-1 font-bold ${
                        grade.status === 'benar'
                          ? 'text-[#059669]'
                          : grade.status === 'parsial'
                            ? 'text-[#D97706]'
                            : 'text-[#E11D48]'
                      }`}
                    >
                      {grade.status === 'benar' ? (
                        <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                      ) : grade.status === 'parsial' ? (
                        <MinusCircle className="w-3.5 h-3.5" aria-hidden="true" />
                      ) : (
                        <XCircle className="w-3.5 h-3.5" aria-hidden="true" />
                      )}
                      {grade.status.toUpperCase()} ({grade.score}/10)
                    </span>
                  ) : isAnswered ? (
                    <span className="font-bold text-[#0F766E]">Terisi (belum diperiksa)</span>
                  ) : (
                    <span className="font-medium text-[#64748B]">Belum dikerjakan</span>
                  )}
                </div>

                <h2 className="text-base font-extrabold text-[#0F2D2B]">{q.title}</h2>
                <p className="text-xs font-semibold text-[#0F766E] mt-1">{q.topic}</p>
                <p className="text-sm text-[#3C6A65] mt-2 line-clamp-2">{q.stem[0]}</p>
              </div>

              <div className="pt-3 border-t border-[#F0F7F6] flex items-center justify-between gap-3">
                <span className="text-xs font-medium text-[#5E8F88]">{q.topicGroup}</span>
                <button
                  type="button"
                  onClick={() => onOpenQuestion(idx)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-[#0F766E] bg-[#F0FDFA] hover:bg-[#CCFBF1] border border-[#99E2D8] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {isChecked ? (
                    <>
                      <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
                      Lihat Pembahasan
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5" aria-hidden="true" />
                      Kerjakan Soal
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
