import { useEffect, useMemo, useState } from 'react';
import { QUESTIONS } from './data/questions';
import type { AppView, QuizResult, StudentAnswer } from './types/quiz';
import { gradeQuiz, isQuestionAnswered } from './utils/quizLogic';
import { TopNav } from './components/TopNav';
import { HomeView } from './components/HomeView';
import { GuideView } from './components/GuideView';
import { TopicsView } from './components/TopicsView';
import { QuizView } from './components/QuizView';
import { ResultsView } from './components/ResultsView';

const STORAGE_KEY = 'kgl-practice-v1';

interface PersistedState {
  view: AppView;
  studentName: string;
  studentClass: string;
  currentIndex: number;
  answers: Record<number, StudentAnswer>;
  checkedIds: Record<number, boolean>;
  startedAt: number | null;
  result: QuizResult | null;
}

const VALID_VIEWS: AppView[] = ['home', 'guide', 'topics', 'quiz', 'results'];

function loadInitialState(): PersistedState {
  const fallback: PersistedState = {
    view: 'home',
    studentName: '',
    studentClass: '',
    currentIndex: 0,
    answers: {},
    checkedIds: {},
    startedAt: null,
    result: null,
  };

  if (typeof window === 'undefined') return fallback;

  let loaded = { ...fallback };
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<PersistedState>;
      if (parsed && typeof parsed === 'object') {
        loaded = {
          view: VALID_VIEWS.includes(parsed.view as AppView) ? (parsed.view as AppView) : 'home',
          studentName: typeof parsed.studentName === 'string' ? parsed.studentName : '',
          studentClass: typeof parsed.studentClass === 'string' ? parsed.studentClass : '',
          currentIndex:
            typeof parsed.currentIndex === 'number' &&
            parsed.currentIndex >= 0 &&
            parsed.currentIndex < QUESTIONS.length
              ? parsed.currentIndex
              : 0,
          answers:
            parsed.answers && typeof parsed.answers === 'object' ? parsed.answers : {},
          checkedIds:
            parsed.checkedIds && typeof parsed.checkedIds === 'object' ? parsed.checkedIds : {},
          startedAt: typeof parsed.startedAt === 'number' ? parsed.startedAt : null,
          result: parsed.result ?? null,
        };
      }
    }
  } catch {
    // Ignore storage read errors
  }

  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get('autostart') === '1') {
      loaded.view = 'quiz';
      if (loaded.startedAt === null) {
        loaded.startedAt = Date.now();
      }
    } else {
      const requestedView = params.get('view') as AppView | null;
      if (requestedView && VALID_VIEWS.includes(requestedView)) {
        loaded.view = requestedView;
      }
    }
  } catch {
    // Ignore URL parsing errors
  }

  return loaded;
}

export default function App() {
  const [state, setState] = useState<PersistedState>(() => loadInitialState());

  useEffect(() => {
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore storage write errors
    }
  }, [state]);

  const answeredCount = useMemo(
    () => QUESTIONS.filter((q) => isQuestionAnswered(q, state.answers[q.id])).length,
    [state.answers]
  );

  const checkedCount = useMemo(
    () => QUESTIONS.filter((q) => Boolean(state.checkedIds[q.id])).length,
    [state.checkedIds]
  );

  const hasStarted = state.startedAt !== null || answeredCount > 0 || checkedCount > 0;
  const hasFinished = state.result !== null;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const handleNavigate = (nextView: AppView) => {
    setState((prev) => ({
      ...prev,
      view: nextView,
      startedAt:
        nextView === 'quiz' && prev.startedAt === null ? Date.now() : prev.startedAt,
    }));
    scrollToTop();
  };

  const handleStartPractice = () => {
    setState((prev) => ({
      ...prev,
      view: 'quiz',
      startedAt: prev.startedAt ?? Date.now(),
    }));
    scrollToTop();
  };

  const handleRestartPractice = () => {
    setState((prev) => ({
      ...prev,
      view: 'quiz',
      currentIndex: 0,
      answers: {},
      checkedIds: {},
      startedAt: Date.now(),
      result: null,
    }));
    scrollToTop();
  };

  const handleUpdateAnswer = (
    questionId: number,
    updater: StudentAnswer | ((prev: StudentAnswer) => StudentAnswer)
  ) => {
    setState((prev) => {
      const currentAns = prev.answers[questionId] ?? {};
      const nextAns =
        typeof updater === 'function' ? updater(currentAns) : updater;
      return {
        ...prev,
        answers: {
          ...prev.answers,
          [questionId]: nextAns,
        },
        result: null,
      };
    });
  };

  const handleCheckQuestion = (questionId: number) => {
    setState((prev) => ({
      ...prev,
      checkedIds: {
        ...prev.checkedIds,
        [questionId]: true,
      },
      result: null,
    }));
  };

  const handleResetSingleQuestion = (questionId: number) => {
    setState((prev) => {
      const nextChecked = { ...prev.checkedIds };
      delete nextChecked[questionId];
      const nextAnswers = { ...prev.answers };
      delete nextAnswers[questionId];
      return {
        ...prev,
        checkedIds: nextChecked,
        answers: nextAnswers,
        result: null,
      };
    });
  };

  const handleFinishPractice = () => {
    setState((prev) => {
      const durationSec = prev.startedAt
        ? Math.max(1, Math.round((Date.now() - prev.startedAt) / 1000))
        : 0;
      const computedResult = gradeQuiz(
        QUESTIONS,
        prev.answers,
        prev.studentName,
        prev.studentClass,
        durationSec
      );
      return {
        ...prev,
        view: 'results',
        result: computedResult,
      };
    });
    scrollToTop();
  };

  const handleOpenTopicQuestion = (index: number) => {
    const safeIdx = Math.max(0, Math.min(QUESTIONS.length - 1, index));
    setState((prev) => ({
      ...prev,
      currentIndex: safeIdx,
      view: 'quiz',
      startedAt: prev.startedAt ?? Date.now(),
    }));
    scrollToTop();
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F6FAFA] text-[#0F2D2B]">
      <TopNav
        currentView={state.view}
        hasStarted={hasStarted}
        hasFinished={hasFinished}
        onNavigate={handleNavigate}
        onStartPractice={handleStartPractice}
        onRestartPractice={handleRestartPractice}
      />

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {state.view === 'home' && (
          <HomeView
            studentName={state.studentName}
            studentClass={state.studentClass}
            answeredCount={answeredCount}
            checkedCount={checkedCount}
            onNameChange={(val) =>
              setState((prev) => ({ ...prev, studentName: val }))
            }
            onClassChange={(val) =>
              setState((prev) => ({ ...prev, studentClass: val }))
            }
            onStartPractice={handleStartPractice}
            onNavigate={handleNavigate}
          />
        )}

        {state.view === 'guide' && (
          <GuideView
            onStartPractice={handleStartPractice}
            onNavigate={handleNavigate}
          />
        )}

        {state.view === 'topics' && (
          <TopicsView
            questions={QUESTIONS}
            answers={state.answers}
            checkedIds={state.checkedIds}
            onOpenQuestion={handleOpenTopicQuestion}
          />
        )}

        {state.view === 'quiz' && (
          <QuizView
            questions={QUESTIONS}
            currentIndex={state.currentIndex}
            answers={state.answers}
            checkedIds={state.checkedIds}
            onSelectIndex={(idx) =>
              setState((prev) => ({ ...prev, currentIndex: idx }))
            }
            onUpdateAnswer={handleUpdateAnswer}
            onCheckQuestion={handleCheckQuestion}
            onResetSingleQuestion={handleResetSingleQuestion}
            onFinishPractice={handleFinishPractice}
          />
        )}

        {state.view === 'results' && (
          <ResultsView
            questions={QUESTIONS}
            answers={state.answers}
            result={state.result}
            onFinishNow={handleFinishPractice}
            onRestartPractice={handleRestartPractice}
            onJumpToQuiz={handleStartPractice}
          />
        )}
      </main>

      <footer className="border-t border-[#D5EBE7] bg-white/80 py-4 px-4 sm:px-6 text-center text-xs text-[#4B7A74]">
        Lab Latihan HOTS Kinematika · Fisika SMA · Pembahasan Buku Teks &amp; Narator Audio Guru
      </footer>
    </div>
  );
}
