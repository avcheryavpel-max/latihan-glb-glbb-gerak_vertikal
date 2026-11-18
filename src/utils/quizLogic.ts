import type {
  QuestionGrade,
  QuestionItem,
  QuizResult,
  StudentAnswer,
  TopicMastery,
} from '../types/quiz';

export const OPTION_LETTERS = ['A', 'B', 'C', 'D', 'E'] as const;

export const TYPE_LABELS: Record<QuestionItem['type'], string> = {
  mcq: 'Pilihan Ganda',
  complex: 'PG Kompleks',
  tf: 'Benar / Salah',
  numeric: 'Isian Singkat',
};

export function formatNumberId(n: number): string {
  return Number(n).toLocaleString('id-ID', { maximumFractionDigits: 2 });
}

export function formatDuration(sec: number): string {
  const safe = Math.max(0, Math.round(sec));
  const m = Math.floor(safe / 60);
  const s = safe % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export function normNum(raw: unknown): number | null {
  if (typeof raw !== 'string') return null;
  let s = raw
    .trim()
    .toLowerCase()
    .replace(/[\s\u00a0\u2009]/g, '')
    .replace(/\u2212/g, '-');
  if (!s) return null;

  s = s.replace(/,/g, '.');

  for (const unit of ['m/s²', 'm/s2', 'm/s', 'km/jam', 'm', 's']) {
    if (s.endsWith(unit)) {
      s = s.slice(0, -unit.length);
      break;
    }
  }

  if (!/^[+-]?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/.test(s)) {
    return null;
  }

  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}

export function isQuestionAnswered(q: QuestionItem, ans?: StudentAnswer): boolean {
  if (!ans) return false;
  if (q.type === 'mcq') {
    return ans.choice !== null && ans.choice !== undefined;
  }
  if (q.type === 'complex') {
    return Array.isArray(ans.choices) && ans.choices.length > 0;
  }
  if (q.type === 'tf') {
    return Array.isArray(ans.tf) && ans.tf.some((v) => v === true || v === false);
  }
  return typeof ans.value === 'string' && ans.value.trim() !== '';
}

export function isQuestionPartial(q: QuestionItem, ans?: StudentAnswer): boolean {
  if (q.type !== 'tf' || !ans || !isQuestionAnswered(q, ans)) return false;
  const tf = ans.tf || [];
  const total = q.statements?.length ?? 4;
  if (tf.length < total) return true;
  return tf.some((v) => v !== true && v !== false);
}

export function gradeQuestion(q: QuestionItem, ans?: StudentAnswer): QuestionGrade {
  const answered = isQuestionAnswered(q, ans);
  let score = 0;
  let status: QuestionGrade['status'] = 'kosong';
  let detail: string | undefined;

  if (q.type === 'mcq') {
    const ok = answered && ans?.choice === q.correctChoice;
    score = ok ? 10 : 0;
    status = !answered ? 'kosong' : ok ? 'benar' : 'salah';
  } else if (q.type === 'complex') {
    const selected = [...(ans?.choices ?? [])].sort((a, b) => a - b).join(',');
    const expected = [...(q.correctChoices ?? [])].sort((a, b) => a - b).join(',');
    const ok = answered && selected === expected;
    score = ok ? 10 : 0;
    status = !answered ? 'kosong' : ok ? 'benar' : 'salah';
  } else if (q.type === 'tf') {
    const key = q.correctTf ?? [];
    const tf = ans?.tf ?? [null, null, null, null];
    let nb = 0;
    let ns = 0;
    let nk = 0;

    key.forEach((expectedVal, idx) => {
      const resp = tf[idx];
      if (resp !== true && resp !== false) {
        nk++;
        return;
      }
      if (resp === expectedVal) {
        score += 2.5;
        nb++;
      } else {
        score -= 1;
        ns++;
      }
    });

    detail = `${nb} benar · ${ns} salah · ${nk} kosong`;
    if (!answered) {
      status = 'kosong';
    } else if (score === 10) {
      status = 'benar';
    } else if (nb > 0) {
      status = 'parsial';
    } else {
      status = 'salah';
    }
  } else {
    const parsed = normNum(ans?.value);
    const target = q.correctNumeric?.value ?? 0;
    const tol = q.correctNumeric?.tolerance ?? 0;
    const ok = answered && parsed !== null && Math.abs(parsed - target) <= tol;
    score = ok ? 10 : 0;
    status = !answered ? 'kosong' : ok ? 'benar' : 'salah';
  }

  return {
    id: q.id,
    type: q.type,
    score: Math.round(score * 100) / 100,
    maxScore: 10,
    status,
    detail,
  };
}

const TOPIC_RECOMMENDATIONS: Record<string, { strong: string; mid: string; weak: string }> = {
  'GLB & Penyusulan': {
    strong: 'Sangat baik dalam menyusun persamaan posisi dua benda dengan waktu keberangkatan berbeda.',
    mid: 'Perhatikan kembali pergeseran waktu (t − t₀) saat benda kedua berangkat lebih lambat.',
    weak: 'Latih kembali penulisan fungsi posisi x(t) untuk gerak lurus beraturan dan berubah beraturan.',
  },
  'Grafik Kinematika': {
    strong: 'Mampu membaca luas daerah grafik v–t dan kemiringan grafik dengan akurat.',
    mid: 'Ingat bahwa perpindahan memperhatikan tanda positif/negatif luas, sedangkan jarak selalu bernilai positif.',
    weak: 'Pelajari ulang hubungan integral (luas grafik) dan turunan (gradien) antara grafik a–t, v–t, dan x–t.',
  },
  'GLBB & Pengereman': {
    strong: 'Menguasai analisis gerak bertahap serta evaluasi kelayakan fisis akar persamaan kuadrat.',
    mid: 'Pastikan satuan kecepatan selalu diubah ke m/s terlebih dahulu dan cek batas fisik setiap fase gerak.',
    weak: 'Latih kembali pemecahan gerak menjadi fase reaksi, fase percepatan, dan fase perlambatan menggunakan v² = v₀² + 2as.',
  },
  'Gerak Vertikal': {
    strong: 'Memahami simetri waktu gerak vertikal ke atas serta konsep percepatan gravitasi konstan.',
    mid: 'Perhatikan tanda vektor posisi/kecepatan dan bedakan antara titik tertinggi (v = 0) dengan saat kembali ke posisi awal.',
    weak: 'Pelajari kembali persamaan gerak jatuh bebas dan gerak vertikal ke atas dengan acuan ketinggian yang konsisten.',
  },
};

export function computeTopicMastery(
  questions: QuestionItem[],
  perQuestion: QuestionGrade[]
): TopicMastery[] {
  const groups = new Map<string, { ids: number[]; earned: number; max: number }>();

  for (const q of questions) {
    const grade = perQuestion.find((p) => p.id === q.id);
    const current = groups.get(q.topicGroup) ?? { ids: [], earned: 0, max: 0 };
    current.ids.push(q.id);
    current.earned += Math.max(0, grade?.score ?? 0);
    current.max += grade?.maxScore ?? 10;
    groups.set(q.topicGroup, current);
  }

  const result: TopicMastery[] = [];
  for (const [topicGroup, data] of groups.entries()) {
    const percent = data.max > 0 ? Math.round((data.earned / data.max) * 100) : 0;
    const statusLabel: TopicMastery['statusLabel'] =
      percent >= 80 ? 'Sangat Menguasai' : percent >= 55 ? 'Cukup Baik' : 'Perlu Penguatan';
    const recSet = TOPIC_RECOMMENDATIONS[topicGroup];
    const recommendation =
      statusLabel === 'Sangat Menguasai'
        ? recSet.strong
        : statusLabel === 'Cukup Baik'
          ? recSet.mid
          : recSet.weak;

    result.push({
      topicGroup,
      questionIds: data.ids,
      earnedScore: Math.round(data.earned * 100) / 100,
      maxScore: data.max,
      percent,
      statusLabel,
      recommendation,
    });
  }

  return result;
}

export function gradeQuiz(
  questions: QuestionItem[],
  answers: Record<number, StudentAnswer>,
  studentName: string,
  studentClass: string,
  durationSec: number
): QuizResult {
  const perQuestion = questions.map((q) => gradeQuestion(q, answers[q.id]));
  const answeredCount = questions.filter((q) => isQuestionAnswered(q, answers[q.id])).length;
  const rawTotal =
    Math.round(perQuestion.reduce((sum, item) => sum + item.score, 0) * 100) / 100;
  const finalScore = Math.max(0, rawTotal);

  return {
    studentName: studentName.trim() || 'Peserta Latihan',
    studentClass: studentClass || 'SMA Fisika',
    submittedAt: new Date().toISOString(),
    durationSec: Math.max(0, Math.round(durationSec)),
    perQuestion,
    rawTotal,
    finalScore,
    percent: finalScore,
    counts: {
      benar: perQuestion.filter((p) => p.status === 'benar').length,
      salah: perQuestion.filter((p) => p.status === 'salah').length,
      parsial: perQuestion.filter((p) => p.status === 'parsial').length,
      kosong: perQuestion.filter((p) => p.status === 'kosong').length,
    },
    answeredCount,
    clamped: rawTotal < 0,
    mastery: computeTopicMastery(questions, perQuestion),
  };
}

export function getPredicateLabel(score: number): string {
  if (score >= 90) return 'Sangat Baik';
  if (score >= 75) return 'Baik';
  if (score >= 60) return 'Cukup';
  return 'Perlu Pendampingan';
}
