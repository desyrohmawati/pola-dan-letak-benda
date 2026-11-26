import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { SLIDES } from './data/lessonData';
import {
  ActivityProgress,
  QuestionProgress,
  ReflectionData,
  SlideIndex,
} from './types/lesson';
import { Slide1Intro } from './components/slides/Slide1Intro';
import { Slide2Objectives } from './components/slides/Slide2Objectives';
import { Slide3Material } from './components/slides/Slide3Material';
import { Slide4Activity } from './components/slides/Slide4Activity';
import { Slide5Quiz } from './components/slides/Slide5Quiz';
import { Slide6Reflection } from './components/slides/Slide6Reflection';

const INITIAL_ACTIVITY_PROGRESS: ActivityProgress = {
  completedPatterns: [],
  completedPositions: [],
};

const INITIAL_REFLECTION: ReflectionData = {
  mood: null,
  favoritePart: null,
};

export default function App() {
  const [currentSlide, setCurrentSlide] = useState<SlideIndex>(0);
  const [sessionResetKey, setSessionResetKey] = useState<number>(0);

  // Progres Aktivitas & Kuis & Refleksi
  const [activityProgress, setActivityProgress] = useState<ActivityProgress>(
    INITIAL_ACTIVITY_PROGRESS
  );
  const [currentQuizIdx, setCurrentQuizIdx] = useState<number>(0);
  const [quizProgress, setQuizProgress] = useState<Record<number, QuestionProgress>>({});
  const [reflection, setReflection] = useState<ReflectionData>(INITIAL_REFLECTION);

  const goToSlide = (idx: SlideIndex) => {
    setCurrentSlide(idx);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCompletePattern = (taskId: number) => {
    setActivityProgress((prev) =>
      prev.completedPatterns.includes(taskId)
        ? prev
        : { ...prev, completedPatterns: [...prev.completedPatterns, taskId] }
    );
  };

  const handleCompletePosition = (taskId: number) => {
    setActivityProgress((prev) =>
      prev.completedPositions.includes(taskId)
        ? prev
        : { ...prev, completedPositions: [...prev.completedPositions, taskId] }
    );
  };

  const handleUpdateQuestionProgress = (questionId: number, next: QuestionProgress) => {
    setQuizProgress((prev) => ({
      ...prev,
      [questionId]: next,
    }));
  };

  // Tombol "Coba Lagi": Mengulang media dari awal dan menghapus seluruh progres sebelumnya
  const handleRestartAll = () => {
    setCurrentSlide(0);
    setCurrentQuizIdx(0);
    setQuizProgress({});
    setActivityProgress(INITIAL_ACTIVITY_PROGRESS);
    setReflection(INITIAL_REFLECTION);
    setSessionResetKey((k) => k + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeSlideInfo = SLIDES[currentSlide];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFBFD] text-slate-800">
      {/* Top Bar: 3 Zona Bersih */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-8">
          {/* Zona 1: Brand Title */}
          <button
            type="button"
            onClick={() => goToSlide(0)}
            className="text-lg sm:text-xl font-display font-extrabold tracking-tight text-slate-900 whitespace-nowrap shrink-0 cursor-pointer"
          >
            Matematika Kelas 2
          </button>

          {/* Zona 2: Navigasi Slide */}
          <nav
            aria-label="Navigasi Slide"
            className="hidden lg:flex items-center gap-5 text-sm font-semibold text-slate-600"
          >
            {SLIDES.map((slide, idx) => {
              const isActive = idx === currentSlide;
              return (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => goToSlide(idx as SlideIndex)}
                  className={`py-1 border-b-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'border-blue-600 text-slate-900 font-bold'
                      : 'border-transparent hover:text-slate-900 hover:border-slate-300'
                  }`}
                >
                  {idx + 1}. {slide.shortTitle}
                </button>
              );
            })}
          </nav>

          {/* Zona 3: 1 Aksi Utama */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={handleRestartAll}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-bold transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <RotateCcw className="w-4 h-4" />
              Coba Lagi
            </button>
          </div>
        </div>

        {/* Garis 6 Warna Ceria */}
        <div className="grid grid-cols-6 h-1.5 w-full" aria-hidden="true">
          <div className="bg-red-500" />
          <div className="bg-orange-500" />
          <div className="bg-yellow-400" />
          <div className="bg-emerald-500" />
          <div className="bg-blue-500" />
          <div className="bg-purple-500" />
        </div>
      </header>

      {/* Panggung Utama Slide Presentasi */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col justify-between gap-6">
        {/* Navigasi Cepat Mobile/Tablet */}
        <div className="flex lg:hidden items-center gap-2 overflow-x-auto pb-1">
          {SLIDES.map((slide, idx) => {
            const isActive = idx === currentSlide;
            return (
              <button
                key={slide.id}
                type="button"
                onClick={() => goToSlide(idx as SlideIndex)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? `${slide.accentBg} text-white border-transparent`
                    : 'bg-white text-slate-700 border-slate-200'
                }`}
              >
                {idx + 1}. {slide.shortTitle}
              </button>
            );
          })}
        </div>

        {/* Kartu Slide */}
        <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-8 lg:p-10 shadow-sm flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${sessionResetKey}-${currentSlide}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            >
              {currentSlide === 0 && <Slide1Intro onNext={() => goToSlide(1)} />}
              {currentSlide === 1 && <Slide2Objectives onNext={() => goToSlide(2)} />}
              {currentSlide === 2 && <Slide3Material onNext={() => goToSlide(3)} />}
              {currentSlide === 3 && (
                <Slide4Activity
                  progress={activityProgress}
                  onCompletePattern={handleCompletePattern}
                  onCompletePosition={handleCompletePosition}
                  onNext={() => goToSlide(4)}
                />
              )}
              {currentSlide === 4 && (
                <Slide5Quiz
                  currentQuestionIdx={currentQuizIdx}
                  onChangeQuestionIdx={setCurrentQuizIdx}
                  quizProgress={quizProgress}
                  onUpdateQuestionProgress={handleUpdateQuestionProgress}
                  onFinishQuiz={() => goToSlide(5)}
                />
              )}
              {currentSlide === 5 && (
                <Slide6Reflection
                  quizProgress={quizProgress}
                  reflection={reflection}
                  onUpdateReflection={setReflection}
                  onRestartAll={handleRestartAll}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Kontrol Navigasi Bawah Presentasi */}
        <footer className="flex flex-wrap items-center justify-between gap-4 px-2">
          <button
            type="button"
            onClick={() => currentSlide > 0 && goToSlide((currentSlide - 1) as SlideIndex)}
            disabled={currentSlide === 0}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-sm disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed whitespace-nowrap shrink-0"
          >
            <ChevronLeft className="w-4 h-4" />
            Slide Sebelumnya
          </button>

          <div className="flex items-center gap-2 text-sm font-bold text-slate-600 tabular-nums">
            <span>
              Slide {currentSlide + 1} dari {SLIDES.length}
            </span>
            <span aria-hidden="true">·</span>
            <span className={activeSlideInfo.accentText}>{activeSlideInfo.fullTitle}</span>
          </div>

          <button
            type="button"
            onClick={() =>
              currentSlide < SLIDES.length - 1 && goToSlide((currentSlide + 1) as SlideIndex)
            }
            disabled={currentSlide === SLIDES.length - 1}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed whitespace-nowrap shrink-0"
          >
            Slide Berikutnya
            <ChevronRight className="w-4 h-4" />
          </button>
        </footer>
      </main>
    </div>
  );
}
