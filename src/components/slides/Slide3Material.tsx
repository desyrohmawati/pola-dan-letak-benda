import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Play, Repeat, Compass } from 'lucide-react';
import { NatureIcon, NATURE_ITEM_LABELS } from '../NatureIcons';
import { NatureItemId } from '../../types/lesson';

interface Slide3MaterialProps {
  onNext: () => void;
}

type MaterialTab = 'pola' | 'letak';
type PositionKey = 'atas' | 'bawah' | 'kiri' | 'kanan' | 'dalam' | 'luar';

interface PatternExample {
  id: number;
  title: string;
  ruleText: string;
  items: NatureItemId[];
  colorClass: string;
}

const PATTERN_EXAMPLES: PatternExample[] = [
  {
    id: 0,
    title: 'Pola Bunga dan Daun',
    ruleText: 'Bunga Merah lalu Daun Hijau diulang terus-menerus.',
    items: ['bunga-merah', 'daun-hijau', 'bunga-merah', 'daun-hijau', 'bunga-merah', 'daun-hijau'],
    colorClass: 'border-red-300 bg-red-50',
  },
  {
    id: 1,
    title: 'Pola Hewan Lucu',
    ruleText: 'Kelinci lalu Kucing, kemudian berulang lagi Kelinci dan Kucing.',
    items: ['kelinci', 'kucing', 'kelinci', 'kucing', 'kelinci', 'kucing'],
    colorClass: 'border-blue-300 bg-blue-50',
  },
  {
    id: 2,
    title: 'Pola 3 Warna Tumbuhan',
    ruleText: 'Urutannya: Bunga Kuning, Bunga Ungu, lalu Jeruk Oren.',
    items: ['bunga-kuning', 'bunga-ungu', 'buah-oren', 'bunga-kuning', 'bunga-ungu', 'buah-oren'],
    colorClass: 'border-purple-300 bg-purple-50',
  },
];

const POSITION_DETAILS: Record<
  PositionKey,
  {
    label: string;
    sentence: string;
    animal: NatureItemId;
    btnColor: string;
  }
> = {
  atas: {
    label: 'Di Atas',
    sentence: 'Kupu-kupu terbang DI ATAS bunga merah.',
    animal: 'kupukupu',
    btnColor: 'bg-red-600 text-white border-red-700',
  },
  bawah: {
    label: 'Di Bawah',
    sentence: 'Kelinci duduk DI BAWAH pohon hijau.',
    animal: 'kelinci',
    btnColor: 'bg-amber-400 text-slate-900 border-amber-500',
  },
  kiri: {
    label: 'Di Kiri',
    sentence: 'Kucing berdiri di sebelah KIRI pohon.',
    animal: 'kucing',
    btnColor: 'bg-purple-600 text-white border-purple-700',
  },
  kanan: {
    label: 'Di Kanan',
    sentence: 'Burung biru hinggap di sebelah KANAN pohon.',
    animal: 'burung',
    btnColor: 'bg-orange-500 text-white border-orange-600',
  },
  dalam: {
    label: 'Di Dalam',
    sentence: 'Ikan berenang DI DALAM kolam biru.',
    animal: 'ikan',
    btnColor: 'bg-blue-600 text-white border-blue-700',
  },
  luar: {
    label: 'Di Luar',
    sentence: 'Katak hijau melompat DI LUAR kolam biru.',
    animal: 'katak',
    btnColor: 'bg-emerald-600 text-white border-emerald-700',
  },
};

export const Slide3Material: React.FC<Slide3MaterialProps> = ({ onNext }) => {
  const [activeTab, setActiveTab] = useState<MaterialTab>('pola');
  const [selectedPatternIdx, setSelectedPatternIdx] = useState<number>(0);
  const [highlightedStep, setHighlightedStep] = useState<number | null>(null);
  const [isPlayingPattern, setIsPlayingPattern] = useState<boolean>(false);
  const [activePosition, setActivePosition] = useState<PositionKey>('atas');

  const currentPattern = PATTERN_EXAMPLES[selectedPatternIdx];

  useEffect(() => {
    if (!isPlayingPattern) return;
    let step = 0;
    setHighlightedStep(0);
    const interval = window.setInterval(() => {
      step += 1;
      if (step >= currentPattern.items.length) {
        setIsPlayingPattern(false);
        setHighlightedStep(null);
        window.clearInterval(interval);
      } else {
        setHighlightedStep(step);
      }
    }, 650);

    return () => window.clearInterval(interval);
  }, [isPlayingPattern, currentPattern.items.length]);

  const handleSelectPattern = (idx: number) => {
    setIsPlayingPattern(false);
    setHighlightedStep(null);
    setSelectedPatternIdx(idx);
  };

  const posInfo = POSITION_DETAILS[activePosition];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1.5">
          <p className="text-sm font-bold text-amber-800">Slide 3 · Materi Inti Singkat</p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Yuk Kenali Pola dan Letak Benda!
          </h2>
        </div>

        {/* Tombol Pilihan Sub-Materi */}
        <div className="flex items-center gap-2 p-1.5 bg-slate-100 border border-slate-200 rounded-2xl shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('pola')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              activeTab === 'pola'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-700 hover:bg-white'
            }`}
          >
            <Repeat className="w-4 h-4" />
            1. Mengenal Pola
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('letak')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              activeTab === 'letak'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-700 hover:bg-white'
            }`}
          >
            <Compass className="w-4 h-4" />
            2. Mengenal Letak Benda
          </button>
        </div>
      </div>

      {activeTab === 'pola' ? (
        <div className="space-y-5">
          {/* Penjelasan Inti Pola */}
          <div className="bg-purple-50 border-2 border-purple-200 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-purple-950">Apa itu Pola?</h3>
              <p className="text-slate-700 text-base">
                <strong>Pola</strong> adalah susunan gambar, warna, atau benda yang{' '}
                <strong className="text-purple-800">berulang secara teratur</strong>.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsPlayingPattern(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <Play className="w-4 h-4" />
              {isPlayingPattern ? 'Sedang Berjalan...' : 'Putar Urutan Pola'}
            </button>
          </div>

          {/* Pilihan Contoh Pola */}
          <div className="flex flex-wrap gap-2">
            {PATTERN_EXAMPLES.map((ex, idx) => (
              <button
                key={ex.id}
                type="button"
                onClick={() => handleSelectPattern(idx)}
                className={`px-4 py-2 rounded-xl text-sm font-bold border-2 transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  selectedPatternIdx === idx
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'
                }`}
              >
                {ex.title}
              </button>
            ))}
          </div>

          {/* Papan Visual Pola */}
          <div className={`border-2 rounded-3xl p-6 space-y-5 ${currentPattern.colorClass}`}>
            <p className="text-base font-bold text-slate-800">{currentPattern.ruleText}</p>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {currentPattern.items.map((itemId, idx) => {
                const isActive = highlightedStep === idx;
                return (
                  <motion.div
                    key={`${currentPattern.id}-${idx}`}
                    animate={isActive ? { scale: 1.08, y: -6 } : { scale: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`bg-white rounded-2xl p-3 border-2 flex flex-col items-center gap-2 shadow-sm ${
                      isActive ? 'border-purple-600 ring-4 ring-purple-200' : 'border-white'
                    }`}
                  >
                    <span className="text-xs font-bold text-slate-400 tabular-nums">#{idx + 1}</span>
                    <NatureIcon id={itemId} size={56} />
                    <span className="text-xs font-bold text-slate-700 text-center">
                      {NATURE_ITEM_LABELS[itemId]}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Panggung Visual Interaktif Letak Benda */}
          <div className="lg:col-span-7 bg-gradient-to-b from-sky-50 to-emerald-50 border-2 border-emerald-200 rounded-3xl p-5 flex flex-col justify-between min-h-[320px]">
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-sm font-bold text-emerald-900">Taman Letak Benda</span>
              <span className="text-sm font-bold text-blue-800 bg-white px-3 py-1 rounded-xl border border-blue-200">
                {posInfo.label}
              </span>
            </div>

            {/* Area Scene Dinamis */}
            <div className="relative bg-white/80 border border-emerald-200 rounded-2xl h-56 overflow-hidden flex items-center justify-center">
              {/* Rumput Bawah */}
              <div className="absolute bottom-0 inset-x-0 h-12 bg-emerald-200/80" />

              {activePosition === 'dalam' || activePosition === 'luar' ? (
                /* Panggung Kolam Biru */
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* Kolam di kiri-tengah */}
                  <div className="w-56 h-28 rounded-full bg-blue-500 border-4 border-blue-700 shadow-inner flex items-center justify-center relative mr-16">
                    <span className="text-xs font-bold text-blue-100 absolute bottom-2">
                      Kolam Biru
                    </span>
                    {activePosition === 'dalam' && (
                      <motion.div
                        key="ikan-dalam"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1, x: [0, 8, 0] }}
                        transition={{ duration: 0.4 }}
                      >
                        <NatureIcon id="ikan" size={64} />
                      </motion.div>
                    )}
                  </div>

                  {/* Area Luar Kolam (Kanan) */}
                  {activePosition === 'luar' && (
                    <motion.div
                      key="katak-luar"
                      initial={{ scale: 0.5, opacity: 0, y: 12 }}
                      animate={{ scale: 1, opacity: 1, y: 0 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                      className="flex flex-col items-center"
                    >
                      <NatureIcon id="katak" size={64} />
                      <span className="text-xs font-bold text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded-lg">
                        Di luar kolam
                      </span>
                    </motion.div>
                  )}
                </div>
              ) : (
                /* Panggung Pohon & Bunga */
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* Pohon Hijau di Tengah */}
                  <div className="relative flex flex-col items-center z-10">
                    <div className="w-28 h-24 rounded-full bg-emerald-500 border-4 border-emerald-700 flex items-center justify-center">
                      <div className="w-4 h-4 rounded-full bg-red-500 -translate-x-4 -translate-y-2" />
                      <div className="w-4 h-4 rounded-full bg-orange-400 translate-x-4 translate-y-2" />
                    </div>
                    <div className="w-7 h-14 bg-amber-800 rounded-b-md -mt-2" />
                  </div>

                  {/* Hewan di Atas */}
                  {activePosition === 'atas' && (
                    <motion.div
                      key="pos-atas"
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="absolute top-3 left-1/2 -translate-x-1/2 z-20"
                    >
                      <NatureIcon id="kupukupu" size={56} />
                    </motion.div>
                  )}

                  {/* Hewan di Bawah */}
                  {activePosition === 'bawah' && (
                    <motion.div
                      key="pos-bawah"
                      initial={{ y: 16, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="absolute bottom-2 left-1/2 translate-x-6 z-20"
                    >
                      <NatureIcon id="kelinci" size={56} />
                    </motion.div>
                  )}

                  {/* Hewan di Kiri */}
                  {activePosition === 'kiri' && (
                    <motion.div
                      key="pos-kiri"
                      initial={{ x: -24, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      className="absolute left-6 sm:left-12 bottom-6 z-20 flex flex-col items-center"
                    >
                      <NatureIcon id="kucing" size={60} />
                      <span className="text-xs font-bold text-purple-800">Kiri</span>
                    </motion.div>
                  )}

                  {/* Hewan di Kanan */}
                  {activePosition === 'kanan' && (
                    <motion.div
                      key="pos-kanan"
                      initial={{ x: 24, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      className="absolute right-6 sm:right-12 bottom-10 z-20 flex flex-col items-center"
                    >
                      <NatureIcon id="burung" size={60} />
                      <span className="text-xs font-bold text-orange-800">Kanan</span>
                    </motion.div>
                  )}
                </div>
              )}
            </div>

            <p className="text-center text-base font-bold text-slate-800 mt-3 bg-white rounded-xl py-2.5 px-4 border border-emerald-200">
              {posInfo.sentence}
            </p>
          </div>

          {/* Kontrol Tombol Posisi */}
          <div className="lg:col-span-5 bg-white border-2 border-slate-200 rounded-3xl p-5 flex flex-col justify-between gap-4">
            <div className="space-y-1.5">
              <h3 className="text-lg font-bold text-slate-900">Coba Klik Kata Letak Benda!</h3>
              <p className="text-sm text-slate-600">
                Klik tombol warna-warni di bawah untuk melihat posisi hewan berpindah tempat.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {(Object.keys(POSITION_DETAILS) as PositionKey[]).map((key) => {
                const detail = POSITION_DETAILS[key];
                const isSelected = activePosition === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActivePosition(key)}
                    className={`py-3 px-4 rounded-xl border-2 font-display font-bold text-base transition-all cursor-pointer whitespace-nowrap ${
                      isSelected
                        ? `${detail.btnColor} shadow-md scale-[1.02]`
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {detail.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-end pt-1">
        <button
          type="button"
          onClick={onNext}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-display font-bold text-base shadow-sm transition-colors cursor-pointer whitespace-nowrap shrink-0"
        >
          Lanjut ke Aktivitas Seru
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
