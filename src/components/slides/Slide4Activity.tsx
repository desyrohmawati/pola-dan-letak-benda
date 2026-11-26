import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, HelpCircle, Sparkles } from 'lucide-react';
import { NatureIcon, NATURE_ITEM_LABELS } from '../NatureIcons';
import { PATTERN_ACTIVITIES, POSITION_ACTIVITIES } from '../../data/lessonData';
import { ActivityProgress, NatureItemId } from '../../types/lesson';

interface Slide4ActivityProps {
  progress: ActivityProgress;
  onCompletePattern: (taskId: number) => void;
  onCompletePosition: (taskId: number) => void;
  onNext: () => void;
}

export const Slide4Activity: React.FC<Slide4ActivityProps> = ({
  progress,
  onCompletePattern,
  onCompletePosition,
  onNext,
}) => {
  const [activeGame, setActiveGame] = useState<'pola' | 'letak'>('pola');

  // State Aktivitas 1: Lengkapi Pola
  const [patternIdx, setPatternIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<NatureItemId | null>(null);
  const [patternStatus, setPatternStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');

  // State Aktivitas 2: Letak Benda
  const [posIdx, setPosIdx] = useState(0);
  const [placedZone, setPlacedZone] = useState<string | null>(null);
  const [posStatus, setPosStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');

  const currentPatternTask = PATTERN_ACTIVITIES[patternIdx];
  const currentPosTask = POSITION_ACTIVITIES[posIdx];

  const handleChoosePatternOption = (opt: NatureItemId) => {
    setSelectedOption(opt);
    if (opt === currentPatternTask.answer) {
      setPatternStatus('correct');
      onCompletePattern(currentPatternTask.id);
    } else {
      setPatternStatus('wrong');
    }
  };

  const handleSelectPatternTask = (idx: number) => {
    setPatternIdx(idx);
    setSelectedOption(null);
    setPatternStatus('idle');
  };

  const handleClickPositionZone = (zone: 'atas' | 'bawah' | 'kiri' | 'kanan') => {
    setPlacedZone(zone);
    if (zone === currentPosTask.targetZone) {
      setPosStatus('correct');
      onCompletePosition(currentPosTask.id);
    } else {
      setPosStatus('wrong');
    }
  };

  const handleSelectPositionTask = (idx: number) => {
    setPosIdx(idx);
    setPlacedZone(null);
    setPosStatus('idle');
  };

  const totalDone = progress.completedPatterns.length + progress.completedPositions.length;
  const totalTasks = PATTERN_ACTIVITIES.length + POSITION_ACTIVITIES.length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <p className="text-sm font-bold text-emerald-700">
            Slide 4 · Aktivitas Interaktif ({totalDone}/{totalTasks} selesai)
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Ayo Berlatih Sambil Bermain!
          </h2>
        </div>

        {/* Pilih Aktivitas */}
        <div className="flex items-center gap-2 p-1.5 bg-slate-100 border border-slate-200 rounded-2xl shrink-0">
          <button
            type="button"
            onClick={() => setActiveGame('pola')}
            className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              activeGame === 'pola'
                ? 'bg-orange-500 text-white shadow-sm'
                : 'text-slate-700 hover:bg-white'
            }`}
          >
            Aktivitas 1: Lengkapi Pola
          </button>
          <button
            type="button"
            onClick={() => setActiveGame('letak')}
            className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              activeGame === 'letak'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-700 hover:bg-white'
            }`}
          >
            Aktivitas 2: Taruh Hewan
          </button>
        </div>
      </div>

      {activeGame === 'pola' ? (
        <div className="bg-white border-2 border-orange-200 rounded-3xl p-6 space-y-6 shadow-sm">
          {/* Pemilih Nomor Tantangan Pola */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {PATTERN_ACTIVITIES.map((task, idx) => {
                const isDone = progress.completedPatterns.includes(task.id);
                return (
                  <button
                    key={task.id}
                    type="button"
                    onClick={() => handleSelectPatternTask(idx)}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold border-2 transition-all cursor-pointer whitespace-nowrap ${
                      patternIdx === idx
                        ? 'bg-orange-500 text-white border-orange-600'
                        : isDone
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-orange-300'
                    }`}
                  >
                    {isDone && <CheckCircle2 className="w-4 h-4" />}
                    Tantangan {idx + 1}
                  </button>
                );
              })}
            </div>
            <span className="text-sm font-bold text-orange-800">{currentPatternTask.title}</span>
          </div>

          {/* Barisan Pola dengan Kotak Kosong */}
          <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-5">
            <p className="text-sm font-bold text-slate-700 mb-4">
              Klik gambar di bawah untuk melengkapi kotak tanda tanya (?):
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              {currentPatternTask.sequence.map((item, idx) => {
                if (item !== null) {
                  return (
                    <div
                      key={idx}
                      className="w-20 h-24 bg-white border-2 border-slate-200 rounded-2xl flex flex-col items-center justify-center p-2 shadow-sm"
                    >
                      <NatureIcon id={item} size={50} />
                      <span className="text-[11px] font-bold text-slate-600 mt-1 text-center leading-tight">
                        {NATURE_ITEM_LABELS[item]}
                      </span>
                    </div>
                  );
                }

                return (
                  <motion.div
                    key={idx}
                    animate={
                      patternStatus === 'correct'
                        ? { scale: [1, 1.08, 1] }
                        : patternStatus === 'wrong'
                        ? { x: [-4, 4, -4, 0] }
                        : {}
                    }
                    className={`w-22 h-24 rounded-2xl border-3 border-dashed flex flex-col items-center justify-center p-2 ${
                      patternStatus === 'correct'
                        ? 'bg-emerald-50 border-emerald-500'
                        : patternStatus === 'wrong'
                        ? 'bg-red-50 border-red-400'
                        : 'bg-white border-orange-400'
                    }`}
                  >
                    {selectedOption ? (
                      <>
                        <NatureIcon id={selectedOption} size={50} />
                        <span className="text-[11px] font-bold text-slate-700 mt-1 text-center leading-tight">
                          {NATURE_ITEM_LABELS[selectedOption]}
                        </span>
                      </>
                    ) : (
                      <span className="text-3xl font-display font-extrabold text-orange-500">?</span>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Pilihan Jawaban */}
          <div className="space-y-3">
            <p className="text-sm font-bold text-slate-700">Pilih gambar lanjutan yang tepat:</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {currentPatternTask.options.map((opt) => {
                const isSelected = selectedOption === opt;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleChoosePatternOption(opt)}
                    className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                      isSelected && patternStatus === 'correct'
                        ? 'bg-emerald-50 border-emerald-500 shadow-sm'
                        : isSelected && patternStatus === 'wrong'
                        ? 'bg-red-50 border-red-400'
                        : 'bg-white border-slate-200 hover:border-orange-400 hover:bg-orange-50/40'
                    }`}
                  >
                    <NatureIcon id={opt} size={48} />
                    <span className="font-display font-bold text-base text-slate-900">
                      {NATURE_ITEM_LABELS[opt]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Umpan Balik Aktivitas Pola */}
          {patternStatus === 'correct' && (
            <div className="bg-emerald-50 border-2 border-emerald-400 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3 text-emerald-900 font-bold">
                <Sparkles className="w-6 h-6 text-emerald-600 shrink-0" />
                <span>{currentPatternTask.successNote}</span>
              </div>
              {patternIdx < PATTERN_ACTIVITIES.length - 1 ? (
                <button
                  type="button"
                  onClick={() => handleSelectPatternTask(patternIdx + 1)}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm cursor-pointer whitespace-nowrap shrink-0"
                >
                  Tantangan Berikutnya
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setActiveGame('letak')}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm cursor-pointer whitespace-nowrap shrink-0"
                >
                  Coba Aktivitas 2
                </button>
              )}
            </div>
          )}

          {patternStatus === 'wrong' && (
            <div className="bg-amber-50 border-2 border-amber-400 rounded-2xl p-4 flex items-center gap-3 text-amber-950 font-semibold">
              <HelpCircle className="w-6 h-6 text-amber-600 shrink-0" />
              <span>Belum tepat, yuk coba lagi! {currentPatternTask.hint}</span>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white border-2 border-blue-200 rounded-3xl p-6 space-y-5 shadow-sm">
          {/* Pemilih Nomor Tantangan Letak Benda */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {POSITION_ACTIVITIES.map((task, idx) => {
                const isDone = progress.completedPositions.includes(task.id);
                return (
                  <button
                    key={task.id}
                    type="button"
                    onClick={() => handleSelectPositionTask(idx)}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold border-2 transition-all cursor-pointer whitespace-nowrap ${
                      posIdx === idx
                        ? 'bg-blue-600 text-white border-blue-700'
                        : isDone
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-blue-300'
                    }`}
                  >
                    {isDone && <CheckCircle2 className="w-4 h-4" />}
                    Misi {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Instruksi Misi */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-center gap-4">
            <div className="bg-white rounded-xl p-2 border border-blue-200 shrink-0">
              <NatureIcon id={currentPosTask.animal} size={48} />
            </div>
            <div>
              <p className="text-xs font-bold text-blue-700">Misi Letak Benda {posIdx + 1}</p>
              <p className="text-lg font-display font-bold text-slate-900">
                {currentPosTask.prompt}
              </p>
            </div>
          </div>

          {/* Grid Taman Interaktif: Atas, Kiri, Pohon, Kanan, Bawah */}
          <div className="bg-emerald-50/70 border-2 border-emerald-200 rounded-2xl p-5">
            <div className="grid grid-cols-3 gap-3 max-w-xl mx-auto items-center">
              {/* Baris 1: Kosong - ATAS - Kosong */}
              <div />
              <button
                type="button"
                onClick={() => handleClickPositionZone('atas')}
                className={`h-24 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center p-2 transition-all cursor-pointer ${
                  placedZone === 'atas' && posStatus === 'correct'
                    ? 'bg-emerald-100 border-emerald-600'
                    : placedZone === 'atas' && posStatus === 'wrong'
                    ? 'bg-red-100 border-red-500'
                    : 'bg-white border-blue-300 hover:bg-blue-50'
                }`}
              >
                {placedZone === 'atas' ? (
                  <NatureIcon id={currentPosTask.animal} size={52} />
                ) : (
                  <span className="text-sm font-bold text-blue-700">Klik: Di Atas</span>
                )}
              </button>
              <div />

              {/* Baris 2: KIRI - POHON - KANAN */}
              <button
                type="button"
                onClick={() => handleClickPositionZone('kiri')}
                className={`h-28 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center p-2 transition-all cursor-pointer ${
                  placedZone === 'kiri' && posStatus === 'correct'
                    ? 'bg-emerald-100 border-emerald-600'
                    : placedZone === 'kiri' && posStatus === 'wrong'
                    ? 'bg-red-100 border-red-500'
                    : 'bg-white border-purple-300 hover:bg-purple-50'
                }`}
              >
                {placedZone === 'kiri' ? (
                  <NatureIcon id={currentPosTask.animal} size={52} />
                ) : (
                  <span className="text-sm font-bold text-purple-700">Klik: Di Kiri</span>
                )}
              </button>

              {/* Pohon Tengah */}
              <div className="h-28 rounded-2xl bg-white border-2 border-emerald-400 flex flex-col items-center justify-center p-2 shadow-sm">
                <svg width="56" height="62" viewBox="0 0 64 70" fill="none" aria-label="Pohon Hijau">
                  <rect x="26" y="42" width="12" height="24" rx="3" fill="#B45309" />
                  <circle cx="32" cy="26" r="18" fill="#22C55E" stroke="#15803D" strokeWidth="2.5" />
                  <circle cx="22" cy="30" r="11" fill="#22C55E" />
                  <circle cx="42" cy="30" r="11" fill="#22C55E" />
                </svg>
                <span className="text-xs font-bold text-emerald-900">Pohon Hijau</span>
              </div>

              <button
                type="button"
                onClick={() => handleClickPositionZone('kanan')}
                className={`h-28 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center p-2 transition-all cursor-pointer ${
                  placedZone === 'kanan' && posStatus === 'correct'
                    ? 'bg-emerald-100 border-emerald-600'
                    : placedZone === 'kanan' && posStatus === 'wrong'
                    ? 'bg-red-100 border-red-500'
                    : 'bg-white border-orange-300 hover:bg-orange-50'
                }`}
              >
                {placedZone === 'kanan' ? (
                  <NatureIcon id={currentPosTask.animal} size={52} />
                ) : (
                  <span className="text-sm font-bold text-orange-700">Klik: Di Kanan</span>
                )}
              </button>

              {/* Baris 3: Kosong - BAWAH - Kosong */}
              <div />
              <button
                type="button"
                onClick={() => handleClickPositionZone('bawah')}
                className={`h-24 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center p-2 transition-all cursor-pointer ${
                  placedZone === 'bawah' && posStatus === 'correct'
                    ? 'bg-emerald-100 border-emerald-600'
                    : placedZone === 'bawah' && posStatus === 'wrong'
                    ? 'bg-red-100 border-red-500'
                    : 'bg-white border-amber-400 hover:bg-amber-50'
                }`}
              >
                {placedZone === 'bawah' ? (
                  <NatureIcon id={currentPosTask.animal} size={52} />
                ) : (
                  <span className="text-sm font-bold text-amber-800">Klik: Di Bawah</span>
                )}
              </button>
              <div />
            </div>
          </div>

          {/* Umpan Balik Aktivitas Letak */}
          {posStatus === 'correct' && (
            <div className="bg-emerald-50 border-2 border-emerald-400 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3 text-emerald-900 font-bold">
                <Sparkles className="w-6 h-6 text-emerald-600 shrink-0" />
                <span>{currentPosTask.successNote}</span>
              </div>
              {posIdx < POSITION_ACTIVITIES.length - 1 && (
                <button
                  type="button"
                  onClick={() => handleSelectPositionTask(posIdx + 1)}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm cursor-pointer whitespace-nowrap shrink-0"
                >
                  Misi Berikutnya
                </button>
              )}
            </div>
          )}

          {posStatus === 'wrong' && (
            <div className="bg-amber-50 border-2 border-amber-400 rounded-2xl p-4 flex items-center gap-3 text-amber-950 font-semibold">
              <HelpCircle className="w-6 h-6 text-amber-600 shrink-0" />
              <span>Ayo coba lagi! {currentPosTask.hint}</span>
            </div>
          )}
        </div>
      )}

      <div className="flex justify-end pt-1">
        <button
          type="button"
          onClick={onNext}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-display font-bold text-base shadow-sm transition-colors cursor-pointer whitespace-nowrap shrink-0"
        >
          Lanjut ke Kuis Evaluasi
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
