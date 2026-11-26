import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  Lock,
  Sparkles,
  Link2,
  RotateCcw,
} from 'lucide-react';
import { QUIZ_QUESTIONS } from '../../data/lessonData';
import { QuestionProgress, QuizRightItem } from '../../types/lesson';
import { NatureIcon, PositionScene } from '../NatureIcons';

interface Slide5QuizProps {
  currentQuestionIdx: number;
  onChangeQuestionIdx: (idx: number) => void;
  quizProgress: Record<number, QuestionProgress>;
  onUpdateQuestionProgress: (questionId: number, next: QuestionProgress) => void;
  onFinishQuiz: () => void;
}

const PAIR_BADGES = [
  {
    bg: 'bg-red-600',
    text: 'text-white',
    border: 'border-red-500',
    softBg: 'bg-red-50',
    stroke: '#EF4444',
    label: 'Pasangan 1',
  },
  {
    bg: 'bg-blue-600',
    text: 'text-white',
    border: 'border-blue-500',
    softBg: 'bg-blue-50',
    stroke: '#3B82F6',
    label: 'Pasangan 2',
  },
  {
    bg: 'bg-purple-600',
    text: 'text-white',
    border: 'border-purple-500',
    softBg: 'bg-purple-50',
    stroke: '#A855F7',
    label: 'Pasangan 3',
  },
];

const RIGHT_ACCENT_STYLES: Record<QuizRightItem['accentColor'], string> = {
  red: 'border-red-300 bg-red-50/60',
  yellow: 'border-amber-300 bg-amber-50/60',
  green: 'border-emerald-300 bg-emerald-50/60',
  blue: 'border-blue-300 bg-blue-50/60',
  purple: 'border-purple-300 bg-purple-50/60',
  orange: 'border-orange-300 bg-orange-50/60',
};

interface LineCoord {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  stroke: string;
}

export const Slide5Quiz: React.FC<Slide5QuizProps> = ({
  currentQuestionIdx,
  onChangeQuestionIdx,
  quizProgress,
  onUpdateQuestionProgress,
  onFinishQuiz,
}) => {
  const question = QUIZ_QUESTIONS[currentQuestionIdx];
  const progress = quizProgress[question.id] ?? {
    matches: {},
    hasWrongAttempt: false,
    isLocked: false,
    earnedFirstTryPoint: false,
    feedbackState: 'idle',
  };

  const [selectedLeftId, setSelectedLeftId] = useState<string | null>(null);
  const [lines, setLines] = useState<LineCoord[]>([]);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const leftRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const rightRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  // Reset selected left card when switching questions
  useEffect(() => {
    setSelectedLeftId(null);
  }, [currentQuestionIdx]);

  // Compute SVG connector lines between matched cards
  const updateLines = () => {
    const container = containerRef.current;
    if (!container) return;
    const containerRect = container.getBoundingClientRect();
    const newLines: LineCoord[] = [];

    question.leftItems.forEach((leftItem, idx) => {
      const rightId = progress.matches[leftItem.id];
      if (!rightId) return;
      const leftEl = leftRefs.current[leftItem.id];
      const rightEl = rightRefs.current[rightId];
      if (!leftEl || !rightEl) return;

      const lRect = leftEl.getBoundingClientRect();
      const rRect = rightEl.getBoundingClientRect();
      // Only draw horizontal lines when side-by-side (desktop/tablet)
      if (rRect.left > lRect.right - 10) {
        newLines.push({
          x1: lRect.right - containerRect.left,
          y1: lRect.top + lRect.height / 2 - containerRect.top,
          x2: rRect.left - containerRect.left,
          y2: rRect.top + rRect.height / 2 - containerRect.top,
          stroke: PAIR_BADGES[idx % PAIR_BADGES.length].stroke,
        });
      }
    });

    setLines(newLines);
  };

  useLayoutEffect(() => {
    updateLines();
    window.addEventListener('resize', updateLines);
    return () => window.removeEventListener('resize', updateLines);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress.matches, currentQuestionIdx]);

  const handleSelectLeft = (leftId: string) => {
    if (progress.isLocked) return;
    setSelectedLeftId((prev) => (prev === leftId ? null : leftId));
  };

  const handleSelectRight = (rightId: string) => {
    if (progress.isLocked) return;
    if (!selectedLeftId) {
      // If clicking an already-matched right card without a left card selected, unpair it
      const existingLeft = Object.keys(progress.matches).find(
        (lId) => progress.matches[lId] === rightId
      );
      if (existingLeft) {
        const nextMatches = { ...progress.matches };
        delete nextMatches[existingLeft];
        onUpdateQuestionProgress(question.id, {
          ...progress,
          matches: nextMatches,
          feedbackState: 'idle',
        });
      }
      return;
    }

    const nextMatches = { ...progress.matches };
    // Ensure 1-to-1 matching: remove rightId if it was assigned to another left card
    Object.keys(nextMatches).forEach((lId) => {
      if (nextMatches[lId] === rightId) {
        delete nextMatches[lId];
      }
    });
    nextMatches[selectedLeftId] = rightId;

    onUpdateQuestionProgress(question.id, {
      ...progress,
      matches: nextMatches,
      feedbackState: 'idle',
    });

    // Automatically move selection to the next unmatched left item for smooth UX
    const nextUnmatched = question.leftItems.find(
      (item) => item.id !== selectedLeftId && !nextMatches[item.id]
    );
    setSelectedLeftId(nextUnmatched ? nextUnmatched.id : null);
  };

  const handleClearMatches = () => {
    if (progress.isLocked) return;
    setSelectedLeftId(null);
    onUpdateQuestionProgress(question.id, {
      ...progress,
      matches: {},
      feedbackState: 'idle',
    });
  };

  const allMatched = question.leftItems.every((item) => Boolean(progress.matches[item.id]));

  const handleCheckAnswer = () => {
    if (progress.isLocked || !allMatched) return;

    const isAllCorrect = question.leftItems.every(
      (item) => progress.matches[item.id] === item.correctRightId
    );

    if (isAllCorrect) {
      onUpdateQuestionProgress(question.id, {
        ...progress,
        isLocked: true,
        earnedFirstTryPoint: !progress.hasWrongAttempt,
        feedbackState: 'correct',
      });
      setSelectedLeftId(null);
    } else {
      onUpdateQuestionProgress(question.id, {
        ...progress,
        hasWrongAttempt: true,
        feedbackState: 'wrong',
      });
    }
  };

  const lockedCount = QUIZ_QUESTIONS.filter((q) => quizProgress[q.id]?.isLocked).length;
  const progressPercent = Math.round((lockedCount / QUIZ_QUESTIONS.length) * 100);
  const isLastQuestion = currentQuestionIdx === QUIZ_QUESTIONS.length - 1;

  return (
    <div className="space-y-5">
      {/* Header Kuis + Indikator Nomor Soal & Kemajuan Belajar */}
      <div className="bg-white border-2 border-blue-200 rounded-2xl p-4 sm:p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold text-blue-700">
              Slide 5 · Kuis Evaluasi Mencocokkan
            </p>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              {question.title}
            </h2>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="text-sm font-extrabold text-blue-800 bg-blue-50 border border-blue-200 px-3.5 py-1.5 rounded-xl tabular-nums whitespace-nowrap">
              Soal {currentQuestionIdx + 1} dari {QUIZ_QUESTIONS.length}
            </span>
            <span className="text-sm font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-xl tabular-nums whitespace-nowrap">
              Kemajuan: {lockedCount}/{QUIZ_QUESTIONS.length}
            </span>
          </div>
        </div>

        {/* Bilah Kemajuan Belajar */}
        <div className="space-y-2">
          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
            <motion.div
              className="h-full bg-gradient-to-r from-red-500 via-amber-400 via-emerald-500 to-blue-600"
              initial={false}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.35 }}
            />
          </div>

          {/* Indikator Nomor 1-5 */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              {QUIZ_QUESTIONS.map((q, idx) => {
                const qProg = quizProgress[q.id];
                const isSolved = qProg?.isLocked;
                const isCurrent = idx === currentQuestionIdx;
                // Allow clicking back to solved questions or current question
                const canJump = isSolved || isCurrent || idx <= lockedCount;
                return (
                  <button
                    key={q.id}
                    type="button"
                    disabled={!canJump}
                    onClick={() => canJump && onChangeQuestionIdx(idx)}
                    className={`w-9 h-9 rounded-xl font-display font-bold text-sm border-2 flex items-center justify-center transition-all tabular-nums ${
                      isCurrent
                        ? 'bg-blue-600 text-white border-blue-700 shadow-sm cursor-pointer'
                        : isSolved
                        ? 'bg-emerald-500 text-white border-emerald-600 cursor-pointer'
                        : 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                    }`}
                    title={`Soal ${q.id}`}
                  >
                    {isSolved && !isCurrent ? <CheckCircle2 className="w-4 h-4" /> : q.id}
                  </button>
                );
              })}
            </div>
            <span className="text-xs font-semibold text-slate-500 hidden sm:inline">
              Jawab benar untuk membuka soal berikutnya
            </span>
          </div>
        </div>
      </div>

      {/* Instruksi & Status Kunci */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3">
        <p className="text-sm sm:text-base font-bold text-slate-800">
          {question.instruction}{' '}
          {!progress.isLocked && (
            <span className="font-normal text-slate-600">
              (Klik kartu kiri lalu klik pasangannya di kanan)
            </span>
          )}
        </p>

        {progress.isLocked ? (
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-3 py-1 rounded-lg whitespace-nowrap shrink-0">
            <Lock className="w-3.5 h-3.5" />
            Soal Terkunci
          </span>
        ) : (
          <button
            type="button"
            onClick={handleClearMatches}
            disabled={Object.keys(progress.matches).length === 0}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-red-700 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed whitespace-nowrap shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Ulangi Pasangan
          </button>
        )}
      </div>

      {/* Area Mencocokkan Kiri & Kanan */}
      <div ref={containerRef} className="relative">
        {/* Garis Penghubung SVG untuk layar md ke atas */}
        <svg
          className="hidden md:block absolute inset-0 w-full h-full pointer-events-none z-10"
          aria-hidden="true"
        >
          {lines.map((line, i) => {
            const midX = (line.x1 + line.x2) / 2;
            const pathD = `M ${line.x1} ${line.y1} C ${midX} ${line.y1}, ${midX} ${line.y2}, ${line.x2} ${line.y2}`;
            return (
              <g key={i}>
                <path
                  d={pathD}
                  stroke={line.stroke}
                  strokeWidth="4"
                  strokeLinecap="round"
                  fill="none"
                />
                <circle cx={line.x1} cy={line.y1} r="5" fill={line.stroke} />
                <circle cx={line.x2} cy={line.y2} r="5" fill={line.stroke} />
              </g>
            );
          })}
        </svg>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-stretch">
          {/* Kolom Kiri (Soal) */}
          <div className="md:col-span-6 space-y-3.5 relative z-20">
            <p className="text-xs font-bold text-slate-500">Daftar Gambar Soal (Kiri)</p>
            {question.leftItems.map((leftItem, idx) => {
              const badge = PAIR_BADGES[idx % PAIR_BADGES.length];
              const isSelected = selectedLeftId === leftItem.id;
              const pairedRightId = progress.matches[leftItem.id];
              const pairedRight = question.rightItems.find((r) => r.id === pairedRightId);

              return (
                <button
                  key={leftItem.id}
                  ref={(el) => {
                    leftRefs.current[leftItem.id] = el;
                  }}
                  type="button"
                  disabled={progress.isLocked}
                  onClick={() => handleSelectLeft(leftItem.id)}
                  className={`w-full text-left rounded-2xl p-3.5 border-2 transition-all flex flex-col gap-2.5 ${
                    progress.isLocked ? 'cursor-default opacity-95' : 'cursor-pointer'
                  } ${
                    isSelected
                      ? 'bg-blue-50 border-blue-600 ring-4 ring-blue-200 shadow-md'
                      : pairedRight
                      ? `${badge.softBg} ${badge.border}`
                      : 'bg-white border-slate-200 hover:border-blue-400'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-0.5 rounded-lg ${badge.bg} ${badge.text}`}
                    >
                      {idx + 1}. {leftItem.label}
                    </span>

                    {pairedRight ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-800 bg-white px-2.5 py-0.5 rounded-lg border border-slate-300">
                        <Link2 className="w-3.5 h-3.5" />
                        {pairedRight.label}
                      </span>
                    ) : (
                      <span className="text-xs font-semibold text-slate-400">
                        {isSelected ? 'Pilih pasangan di kanan...' : 'Belum dipasangkan'}
                      </span>
                    )}
                  </div>

                  {leftItem.kind === 'pattern' && leftItem.sequence && (
                    <div className="flex items-center gap-1.5 sm:gap-2 bg-white rounded-xl p-2 border border-slate-200 overflow-x-auto">
                      {leftItem.sequence.map((seqId, sIdx) => (
                        <div key={sIdx} className="shrink-0">
                          <NatureIcon id={seqId} size={42} />
                        </div>
                      ))}
                      <div className="w-10 h-10 rounded-xl border-2 border-dashed border-orange-400 bg-orange-50 flex items-center justify-center font-display font-extrabold text-orange-600 shrink-0">
                        ?
                      </div>
                    </div>
                  )}

                  {leftItem.kind === 'scene' && leftItem.scene && (
                    <div className="h-28 w-full rounded-xl overflow-hidden border border-slate-200 bg-white">
                      <PositionScene scene={leftItem.scene} />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Kolom Kanan (Pilihan Pasangan) */}
          <div className="md:col-span-6 space-y-3.5 relative z-20 flex flex-col justify-between">
            <div className="space-y-3.5">
              <p className="text-xs font-bold text-slate-500">Pilihan Pasangan (Kanan)</p>
              {question.rightItems.map((rightItem) => {
                // Find if paired with a left item
                const pairedLeftIdx = question.leftItems.findIndex(
                  (l) => progress.matches[l.id] === rightItem.id
                );
                const isPaired = pairedLeftIdx !== -1;
                const badge = isPaired ? PAIR_BADGES[pairedLeftIdx % PAIR_BADGES.length] : null;

                return (
                  <button
                    key={rightItem.id}
                    ref={(el) => {
                      rightRefs.current[rightItem.id] = el;
                    }}
                    type="button"
                    disabled={progress.isLocked}
                    onClick={() => handleSelectRight(rightItem.id)}
                    className={`w-full min-h-[104px] rounded-2xl p-4 border-2 transition-all flex items-center justify-between gap-4 ${
                      progress.isLocked ? 'cursor-default opacity-95' : 'cursor-pointer'
                    } ${
                      isPaired && badge
                        ? `${badge.softBg} ${badge.border} shadow-sm`
                        : selectedLeftId
                        ? `${RIGHT_ACCENT_STYLES[rightItem.accentColor]} hover:scale-[1.01] hover:shadow-md`
                        : `${RIGHT_ACCENT_STYLES[rightItem.accentColor]} hover:border-slate-400`
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      {rightItem.kind === 'item' && rightItem.item ? (
                        <div className="bg-white rounded-xl p-2 border border-slate-200 shrink-0">
                          <NatureIcon id={rightItem.item} size={54} />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center font-display font-extrabold text-slate-700 shrink-0">
                          <Link2 className="w-5 h-5" />
                        </div>
                      )}
                      <span className="font-display font-bold text-lg text-slate-900 text-left">
                        {rightItem.label}
                      </span>
                    </div>

                    {isPaired && badge && (
                      <span
                        className={`text-xs font-bold px-3 py-1 rounded-xl shrink-0 ${badge.bg} ${badge.text}`}
                      >
                        {badge.label}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Area Umpan Balik */}
      {progress.feedbackState === 'correct' && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-emerald-50 border-2 border-emerald-500 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xl font-display font-extrabold text-emerald-900">
                Kamu hebat !
              </p>
              <p className="text-sm font-semibold text-emerald-800">
                {progress.earnedFirstTryPoint
                  ? 'Semua pasangan benar pada percobaan pertama (+20 poin)!'
                  : 'Semua pasangan sudah benar! Soal ini sudah dikunci.'}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {progress.feedbackState === 'wrong' && (
        <motion.div
          initial={{ opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-amber-50 border-2 border-amber-400 rounded-2xl p-5 flex items-start gap-3.5"
        >
          <div className="w-11 h-11 rounded-2xl bg-amber-400 text-slate-900 flex items-center justify-center shrink-0">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <p className="text-base font-display font-extrabold text-amber-950">
              Ayo berpikir kembali dan coba lagi!
            </p>
            <p className="text-sm font-semibold text-amber-900">
              Petunjuk: {question.hint}
            </p>
            <p className="text-xs font-medium text-amber-800">
              Ubah pasangan yang menurutmu masih kurang tepat, lalu klik &ldquo;Periksa Jawaban&rdquo;.
            </p>
          </div>
        </motion.div>
      )}

      {/* Tombol Aksi Kuis */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-200">
        <button
          type="button"
          onClick={() => onChangeQuestionIdx(currentQuestionIdx - 1)}
          disabled={currentQuestionIdx === 0}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-slate-200 bg-white text-slate-700 font-bold text-sm hover:bg-slate-50 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed whitespace-nowrap shrink-0"
        >
          <ArrowLeft className="w-4 h-4" />
          Soal Sebelumnya
        </button>

        <div className="flex items-center gap-3">
          {!progress.isLocked && (
            <button
              type="button"
              onClick={handleCheckAnswer}
              disabled={!allMatched}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:bg-slate-200 disabled:text-slate-400 text-white font-display font-bold text-base shadow-sm transition-colors cursor-pointer disabled:cursor-not-allowed whitespace-nowrap shrink-0"
            >
              <CheckCircle2 className="w-5 h-5" />
              Periksa Jawaban
            </button>
          )}

          <button
            type="button"
            disabled={!progress.isLocked}
            onClick={() => {
              if (isLastQuestion) {
                onFinishQuiz();
              } else {
                onChangeQuestionIdx(currentQuestionIdx + 1);
              }
            }}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-display font-bold text-base shadow-sm transition-all whitespace-nowrap shrink-0 ${
              progress.isLocked
                ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            {isLastQuestion ? 'Lihat Hasil & Refleksi' : 'Soal Berikutnya'}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
