import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, BookOpen, Sparkles } from 'lucide-react';
import { NatureIcon } from '../NatureIcons';

interface Slide1IntroProps {
  onNext: () => void;
}

export const Slide1Intro: React.FC<Slide1IntroProps> = ({ onNext }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
      {/* Kolom Kiri: Judul & Identitas */}
      <div className="lg:col-span-7 space-y-6">
        <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-600">
          <span className="text-blue-700">Matematika</span>
          <span aria-hidden="true">·</span>
          <span className="text-emerald-700">Kelas 2 SD</span>
          <span aria-hidden="true">·</span>
          <span className="text-purple-700">Tema Hewan &amp; Tumbuhan</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
          Petualangan{' '}
          <span className="text-red-600">Pola</span> dan{' '}
          <span className="text-blue-600">Letak</span>{' '}
          <span className="text-emerald-600">Benda</span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
          Halo adik-adik hebat! Mari bermain dan belajar bersama hewan-hewan lucu serta
          tumbuhan warna-warni di taman matematika yang ceria.
        </p>

        {/* Kotak Identitas Sederhana */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm max-w-xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-slate-500">Mata Pelajaran</p>
              <p className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-blue-600 shrink-0" />
                Matematika
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-semibold text-slate-500">Jenjang Kelas</p>
              <p className="text-sm font-bold text-slate-900">Kelas 2 SD</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-semibold text-slate-500">Topik Utama</p>
              <p className="text-sm font-bold text-slate-900">Pola &amp; Letak Benda</p>
            </div>
          </div>
        </div>

        {/* Strip 6 Warna Ceria */}
        <div className="flex items-center gap-2.5 pt-1" aria-label="Warna ceria media belajar">
          <span className="w-6 h-6 rounded-lg bg-red-500 border border-red-600" title="Merah" />
          <span className="w-6 h-6 rounded-lg bg-yellow-400 border border-yellow-500" title="Kuning" />
          <span className="w-6 h-6 rounded-lg bg-emerald-500 border border-emerald-600" title="Hijau" />
          <span className="w-6 h-6 rounded-lg bg-blue-500 border border-blue-600" title="Biru" />
          <span className="w-6 h-6 rounded-lg bg-purple-500 border border-purple-600" title="Ungu" />
          <span className="w-6 h-6 rounded-lg bg-orange-500 border border-orange-600" title="Oren" />
          <span className="text-xs font-medium text-slate-500 ml-1">
            6 Warna Taman Belajar
          </span>
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={onNext}
            className="inline-flex items-center gap-3 px-7 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-display font-bold text-lg shadow-md shadow-blue-200 transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 whitespace-nowrap shrink-0"
          >
            <Sparkles className="w-5 h-5" />
            Mulai Belajar
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Kolom Kanan: Ilustrasi Taman Hewan & Tumbuhan */}
      <div className="lg:col-span-5">
        <div className="relative bg-gradient-to-b from-sky-50 via-emerald-50 to-amber-50 border-2 border-emerald-200 rounded-3xl p-6 sm:p-8 overflow-hidden shadow-sm">
          {/* Langit & Matahari Kuning */}
          <div className="flex justify-between items-start mb-6">
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <NatureIcon id="kupukupu" size={64} />
            </motion.div>

            <motion.div
              animate={{ rotate: [0, 8, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="w-16 h-16 rounded-full bg-yellow-400 border-4 border-amber-300 shadow-sm flex items-center justify-center"
              aria-hidden="true"
            >
              <div className="w-8 h-8 rounded-full bg-yellow-200/70" />
            </motion.div>

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
            >
              <NatureIcon id="burung" size={64} />
            </motion.div>
          </div>

          {/* Barisan Hewan di Tengah */}
          <div className="bg-white/85 backdrop-blur-sm border border-emerald-200 rounded-2xl p-4 mb-5">
            <div className="flex items-center justify-around gap-2">
              <motion.div
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <NatureIcon id="kelinci" size={62} />
              </motion.div>
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
              >
                <NatureIcon id="kucing" size={62} />
              </motion.div>
              <motion.div
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 1.9, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
              >
                <NatureIcon id="katak" size={62} />
              </motion.div>
            </div>
          </div>

          {/* Barisan Bunga & Buah Warna-Warni di Bawah */}
          <div className="bg-emerald-200/60 border border-emerald-300 rounded-2xl p-3.5">
            <div className="flex items-center justify-around gap-1">
              <NatureIcon id="bunga-merah" size={46} />
              <NatureIcon id="bunga-kuning" size={46} />
              <NatureIcon id="daun-hijau" size={46} />
              <NatureIcon id="daun-biru" size={46} />
              <NatureIcon id="bunga-ungu" size={46} />
              <NatureIcon id="buah-oren" size={46} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
