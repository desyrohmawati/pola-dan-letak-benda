import React from 'react';
import { motion } from 'motion/react';
import { Award, CheckCircle2, Heart, RotateCcw, Star } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../../data/lessonData';
import { QuestionProgress, ReflectionData } from '../../types/lesson';
import { NatureIcon } from '../NatureIcons';

interface Slide6ReflectionProps {
  quizProgress: Record<number, QuestionProgress>;
  reflection: ReflectionData;
  onUpdateReflection: (next: ReflectionData) => void;
  onRestartAll: () => void;
}

const MOOD_OPTIONS = [
  { id: 'senang', label: 'Senang Sekali!', color: 'bg-emerald-50 border-emerald-400 text-emerald-900' },
  { id: 'semangat', label: 'Makin Semangat!', color: 'bg-amber-50 border-amber-400 text-amber-950' },
  { id: 'penasaran', label: 'Ingin Belajar Lagi!', color: 'bg-blue-50 border-blue-400 text-blue-900' },
];

const FAVORITE_OPTIONS = [
  { id: 'pola', label: 'Menebak Pola Hewan & Tumbuhan', color: 'bg-purple-50 border-purple-400 text-purple-900' },
  { id: 'letak', label: 'Belajar Letak Benda', color: 'bg-orange-50 border-orange-400 text-orange-900' },
  { id: 'kuis', label: 'Kuis Mencocokkan', color: 'bg-red-50 border-red-400 text-red-900' },
];

export const Slide6Reflection: React.FC<Slide6ReflectionProps> = ({
  quizProgress,
  reflection,
  onUpdateReflection,
  onRestartAll,
}) => {
  const firstTryCorrectCount = QUIZ_QUESTIONS.filter(
    (q) => quizProgress[q.id]?.earnedFirstTryPoint
  ).length;
  const completedQuestionsCount = QUIZ_QUESTIONS.filter(
    (q) => quizProgress[q.id]?.isLocked
  ).length;

  const totalQuestions = QUIZ_QUESTIONS.length;
  const score = firstTryCorrectCount * 20;

  let feedbackHeadline = 'Terus Semangat Belajar!';
  let feedbackBody =
    'Kamu sudah berusaha menyelesaikan semua soal. Ayo ulangi lagi untuk mendapat nilai lebih tinggi pada percobaan pertama!';

  if (completedQuestionsCount < totalQuestions) {
    feedbackHeadline = 'Ayo Selesaikan Kuis Terlebih Dahulu!';
    feedbackBody = `Baru ${completedQuestionsCount} dari ${totalQuestions} soal yang diselesaikan. Kamu bisa kembali ke Slide 5 untuk menuntaskan kuis, atau klik Coba Lagi dari awal.`;
  } else if (firstTryCorrectCount === 5) {
    feedbackHeadline = 'Luar Biasa! Kamu Hebat Sekali!';
    feedbackBody =
      'Kamu berhasil menjawab semua soal dengan benar pada percobaan pertama. Kamu sudah sangat memahami pola dan letak benda!';
  } else if (firstTryCorrectCount >= 3) {
    feedbackHeadline = 'Bagus Sekali! Kamu Hebat!';
    feedbackBody =
      'Sebagian besar soal berhasil kamu jawab benar langsung pada percobaan pertama. Terus berlatih agar makin teliti!';
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1.5">
        <p className="text-sm font-bold text-purple-700">Slide 6 · Umpan Balik dan Refleksi</p>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Hasil Petualangan Belajarmu
        </h2>
      </div>

      {/* Ringkasan Skor & Umpan Balik */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-5 bg-gradient-to-br from-blue-600 via-purple-600 to-orange-500 rounded-3xl p-6 text-white flex flex-col justify-between gap-5 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-white/90">Nilai Percobaan Pertama</span>
            <Award className="w-7 h-7 text-yellow-300" />
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-6xl font-display font-extrabold tabular-nums">{score}</span>
            <span className="text-2xl font-bold text-white/80 tabular-nums">/ 100</span>
          </div>

          <div className="flex items-center gap-1.5" aria-label={`${firstTryCorrectCount} dari 5 bintang`}>
            {QUIZ_QUESTIONS.map((q, idx) => {
              const earned = quizProgress[q.id]?.earnedFirstTryPoint;
              return (
                <motion.div
                  key={q.id}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: idx * 0.08 }}
                >
                  <Star
                    className={`w-7 h-7 ${
                      earned ? 'text-yellow-300 fill-yellow-300' : 'text-white/35'
                    }`}
                  />
                </motion.div>
              );
            })}
          </div>

          <p className="text-sm font-semibold text-white/95">
            Benar pada percobaan pertama: {firstTryCorrectCount} dari {totalQuestions} soal
          </p>
        </div>

        {/* Umpan Balik & Rincian Per Soal */}
        <div className="lg:col-span-7 bg-white border-2 border-slate-200 rounded-3xl p-6 flex flex-col justify-between gap-5">
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              {feedbackHeadline}
            </h3>
            <p className="text-slate-700 text-base leading-relaxed">{feedbackBody}</p>
          </div>

          {/* Rincian Status Soal 1-5 */}
          <div className="grid grid-cols-5 gap-2">
            {QUIZ_QUESTIONS.map((q) => {
              const qp = quizProgress[q.id];
              const isFirstTry = qp?.earnedFirstTryPoint;
              const isSolved = qp?.isLocked;
              return (
                <div
                  key={q.id}
                  className={`rounded-2xl p-3 border text-center space-y-1 ${
                    isFirstTry
                      ? 'bg-emerald-50 border-emerald-300'
                      : isSolved
                      ? 'bg-amber-50 border-amber-300'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <p className="text-xs font-bold text-slate-600 tabular-nums">Soal {q.id}</p>
                  <p className="text-xs font-extrabold text-slate-900">
                    {isFirstTry ? '+20' : isSolved ? 'Ulang' : '-'}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-around bg-emerald-50/70 border border-emerald-200 rounded-2xl p-3">
            <NatureIcon id="kelinci" size={44} />
            <NatureIcon id="bunga-merah" size={44} />
            <NatureIcon id="kupukupu" size={44} />
            <NatureIcon id="bunga-kuning" size={44} />
            <NatureIcon id="katak" size={44} />
          </div>
        </div>
      </div>

      {/* Bagian Refleksi Murid */}
      <div className="bg-white border-2 border-purple-200 rounded-3xl p-6 space-y-5">
        <div className="flex items-center gap-2.5">
          <Heart className="w-5 h-5 text-red-500 fill-red-500" />
          <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
            Refleksi Belajar Hari Ini
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <p className="text-sm font-bold text-slate-700">
              1. Bagaimana perasaanmu setelah belajar pola dan letak benda?
            </p>
            <div className="flex flex-wrap gap-2.5">
              {MOOD_OPTIONS.map((opt) => {
                const selected = reflection.mood === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => onUpdateReflection({ ...reflection, mood: opt.id })}
                    className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border-2 text-sm font-bold transition-all cursor-pointer ${
                      selected
                        ? `${opt.color} ring-2 ring-purple-400 shadow-sm`
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {selected && <CheckCircle2 className="w-4 h-4" />}
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-bold text-slate-700">
              2. Bagian mana yang paling kamu sukai?
            </p>
            <div className="flex flex-wrap gap-2.5">
              {FAVORITE_OPTIONS.map((opt) => {
                const selected = reflection.favoritePart === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => onUpdateReflection({ ...reflection, favoritePart: opt.id })}
                    className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border-2 text-sm font-bold transition-all cursor-pointer ${
                      selected
                        ? `${opt.color} ring-2 ring-purple-400 shadow-sm`
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {selected && <CheckCircle2 className="w-4 h-4" />}
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Tombol Coba Lagi yang Mengulang dari Awal dan Menghapus Semua Progres */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900 text-white rounded-3xl p-5 sm:p-6">
        <div className="space-y-1 text-center sm:text-left">
          <p className="text-lg font-display font-bold">Ingin Mengulang Petualangan dari Awal?</p>
          <p className="text-sm text-slate-300">
            Menekan &ldquo;Coba Lagi&rdquo; akan mengulang dari Slide 1 dan menghapus progres sebelumnya.
          </p>
        </div>

        <button
          type="button"
          onClick={onRestartAll}
          className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-display font-extrabold text-base shadow-md transition-all cursor-pointer whitespace-nowrap shrink-0"
        >
          <RotateCcw className="w-5 h-5" />
          Coba Lagi
        </button>
      </div>
    </div>
  );
};
