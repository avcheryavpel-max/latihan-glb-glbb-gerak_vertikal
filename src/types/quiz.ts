export type QuestionType = 'mcq' | 'complex' | 'tf' | 'numeric';

export type AppView = 'home' | 'guide' | 'topics' | 'quiz' | 'results';

export interface FormulaItem {
  persamaan: string;
  keteranganSimbol: string[];
}

export interface SolutionStep {
  judul: string;
  penjelasan: string;
  persamaan?: string;
  alasanLangkah: string;
  catatanSatuan?: string;
}

export interface OptionReview {
  label: string;
  benar: boolean;
  penjelasan: string;
}

export interface TextbookExplanation {
  memahamiPermasalahan: {
    situasi: string;
    diketahui: string[];
    ditanya: string;
    hubunganStimulus: string;
  };
  mengidentifikasiKonsep: {
    judulKonsep: string;
    prinsipIlmiah: string;
    relevansi: string;
    penjelasanPemula: string;
  };
  strategiPenyelesaian: {
    pendekatan: string;
    analisisVisual: string;
    rumus: FormulaItem[];
  };
  langkahPenyelesaian: SolutionStep[];
  kesimpulan: {
    hasilAkhir: string;
    maknaKontekstual: string;
    jawabanBenar: string;
  };
  tipsDanKonsep: {
    caraCepat: string;
    kesalahanUmum: string[];
    konsepPenting: string;
    alternatifPenyelesaian?: string;
    telaahOpsi?: OptionReview[];
  };
}

export interface NarratorSegment {
  stageIndex: number;
  stageTitle: string;
  spokenText: string;
}

export interface QuestionItem {
  id: number;
  type: QuestionType;
  topicGroup: 'GLB & Penyusulan' | 'Grafik Kinematika' | 'GLBB & Pengereman' | 'Gerak Vertikal';
  topic: string;
  level: string;
  title: string;
  stem: string[];
  stimulusCaption: string;
  stimulusChips: string[];
  // Type-specific fields
  options?: string[];
  statements?: string[];
  unit?: string;
  placeholder?: string;
  // Answer key
  correctChoice?: number;
  correctChoices?: number[];
  correctTf?: boolean[];
  correctNumeric?: {
    value: number;
    tolerance: number;
  };
  keyLabel: string;
  explanation: TextbookExplanation;
  narratorSegments: NarratorSegment[];
}

export interface StudentAnswer {
  choice?: number | null;
  choices?: number[];
  tf?: (boolean | null)[];
  value?: string;
}

export type AnswerStatus = 'benar' | 'salah' | 'parsial' | 'kosong';

export interface QuestionGrade {
  id: number;
  type: QuestionType;
  score: number;
  maxScore: number;
  status: AnswerStatus;
  detail?: string;
}

export interface TopicMastery {
  topicGroup: string;
  questionIds: number[];
  earnedScore: number;
  maxScore: number;
  percent: number;
  statusLabel: 'Sangat Menguasai' | 'Cukup Baik' | 'Perlu Penguatan';
  recommendation: string;
}

export interface QuizResult {
  studentName: string;
  studentClass: string;
  submittedAt: string;
  durationSec: number;
  perQuestion: QuestionGrade[];
  rawTotal: number;
  finalScore: number;
  percent: number;
  counts: {
    benar: number;
    salah: number;
    parsial: number;
    kosong: number;
  };
  answeredCount: number;
  clamped: boolean;
  mastery: TopicMastery[];
}
