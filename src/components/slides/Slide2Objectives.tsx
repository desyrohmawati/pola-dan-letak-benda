import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, Compass, Repeat } from 'lucide-react';
import { NatureIcon } from '../NatureIcons';

interface Slide2ObjectivesProps {
  onNext: () => void;
}

export const Slide2Objectives: React.FC<Slide2ObjectivesProps> = ({ onNext }) => {
  const [activePreview, setActivePreview] = useState<'pola' | 'letak'>('pola');

  return (
    <div className="space-y-7">
      {/* Header Slide */}
      <div className="space-y-2 max-w-3xl">
        <p className="text-sm font-bold text-orange-700">Slide 2 · Tujuan Pembelajaran</p>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Apa yang Akan Kita Pelajari Hari Ini?
        </h2>
        <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
          Setelah belajar bersama, kamu akan dapat{' '}
          <strong className="text-blue-700 font-bold">
            memahami pola dan letak benda
          </strong>{' '}
          dengan tepat dan gembira!
        </p>
      </div>

      {/* Tujuan Utama Banner */}
      <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-amber-400 text-slate-900 flex items-center justify-center shrink-0 shadow-sm">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div className="space-y-1">
          <p className="text-xs font-bold text-amber-900">Tujuan Pembelajaran Utama</p>
          <p className="text-lg sm:text-xl font-display font-bold text-slate-900">
            Murid dapat memahami pola dan letak benda.
          </p>
        </div>
      </div>

      {/* Dua Kartu Penjabaran Tujuan */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {/* Kartu 1: Pola */}
        <motion.button
          type="button"
          onClick={() => setActivePreview('pola')}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.99 }}
          className={`text-left rounded-2xl p-6 border-2 transition-all cursor-pointer flex flex-col justify-between gap-5 ${
            activePreview === 'pola'
              ? 'bg-purple-50 border-purple-500 shadow-md'
              : 'bg-white border-slate-200 hover:border-purple-300'
          }`}
        >
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0">
                <Repeat className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">1. Mengenal Pola Benda</h3>
            </div>
            <p className="text-slate-700 text-base leading-relaxed">
              Mengenali susunan gambar hewan dan tumbuhan yang berulang secara teratur, lalu
              menebak gambar berikutnya.
            </p>
          </div>

          <div className="bg-white border border-purple-200 rounded-xl p-4">
            <p className="text-xs font-semibold text-purple-800 mb-2">Contoh Pola Berulang:</p>
            <div className="flex items-center justify-between gap-1">
              <NatureIcon id="bunga-merah" size={44} />
              <NatureIcon id="daun-hijau" size={44} />
              <NatureIcon id="bunga-merah" size={44} />
              <NatureIcon id="daun-hijau" size={44} />
              <span className="text-sm font-bold text-purple-700 px-2">...</span>
            </div>
          </div>
        </motion.button>

        {/* Kartu 2: Letak Benda */}
        <motion.button
          type="button"
          onClick={() => setActivePreview('letak')}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.99 }}
          className={`text-left rounded-2xl p-6 border-2 transition-all cursor-pointer flex flex-col justify-between gap-5 ${
            activePreview === 'letak'
              ? 'bg-emerald-50 border-emerald-500 shadow-md'
              : 'bg-white border-slate-200 hover:border-emerald-300'
          }`}
        >
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">2. Mengenal Letak Benda</h3>
            </div>
            <p className="text-slate-700 text-base leading-relaxed">
              Mengetahui posisi suatu benda seperti di atas, di bawah, di kiri, di kanan, di dalam,
              dan di luar.
            </p>
          </div>

          <div className="bg-white border border-emerald-200 rounded-xl p-4">
            <p className="text-xs font-semibold text-emerald-800 mb-2">Kata Posisi yang Dipelajari:</p>
            <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold">
              <span className="py-1.5 px-2 rounded-lg bg-red-100 text-red-800">Di Atas</span>
              <span className="py-1.5 px-2 rounded-lg bg-amber-100 text-amber-900">Di Bawah</span>
              <span className="py-1.5 px-2 rounded-lg bg-blue-100 text-blue-800">Di Dalam</span>
              <span className="py-1.5 px-2 rounded-lg bg-emerald-100 text-emerald-800">Di Luar</span>
              <span className="py-1.5 px-2 rounded-lg bg-purple-100 text-purple-800">Di Kiri</span>
              <span className="py-1.5 px-2 rounded-lg bg-orange-100 text-orange-800">Di Kanan</span>
            </div>
          </div>
        </motion.button>
      </div>

      <div className="flex justify-end pt-1">
        <button
          type="button"
          onClick={onNext}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-display font-bold text-base shadow-sm transition-colors cursor-pointer whitespace-nowrap shrink-0"
        >
          Lanjut ke Materi
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
