import React from 'react';
import { NatureItemId, SceneType } from '../types/lesson';

interface IconProps {
  id: NatureItemId;
  className?: string;
  size?: number;
}

export const NATURE_ITEM_LABELS: Record<NatureItemId, string> = {
  'bunga-merah': 'Bunga Merah',
  'bunga-kuning': 'Bunga Kuning',
  'bunga-ungu': 'Bunga Ungu',
  'daun-hijau': 'Daun Hijau',
  'daun-biru': 'Daun Biru',
  'buah-oren': 'Jeruk Oren',
  kelinci: 'Kelinci',
  kucing: 'Kucing',
  katak: 'Katak',
  kupukupu: 'Kupu-kupu',
  burung: 'Burung',
  lebah: 'Lebah',
  ikan: 'Ikan',
  kurakura: 'Kura-kura',
};

export const NatureIcon: React.FC<IconProps> = ({ id, className = '', size = 56 }) => {
  switch (id) {
    case 'bunga-merah':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} aria-label="Bunga Merah">
          <path d="M32 36V58" stroke="#16A34A" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M32 48C32 48 41 46 43 40C37 39 32 43 32 48Z" fill="#22C55E" stroke="#15803D" strokeWidth="1.5" />
          <circle cx="32" cy="14" r="9" fill="#EF4444" stroke="#B91C1C" strokeWidth="2" />
          <circle cx="44" cy="23" r="9" fill="#EF4444" stroke="#B91C1C" strokeWidth="2" />
          <circle cx="39" cy="36" r="9" fill="#EF4444" stroke="#B91C1C" strokeWidth="2" />
          <circle cx="25" cy="36" r="9" fill="#EF4444" stroke="#B91C1C" strokeWidth="2" />
          <circle cx="20" cy="23" r="9" fill="#EF4444" stroke="#B91C1C" strokeWidth="2" />
          <circle cx="32" cy="26" r="8" fill="#FACC15" stroke="#CA8A04" strokeWidth="2" />
          <circle cx="29.5" cy="25" r="1.3" fill="#713F12" />
          <circle cx="34.5" cy="25" r="1.3" fill="#713F12" />
          <path d="M29.5 28.5C30.8 30 33.2 30 34.5 28.5" stroke="#713F12" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );

    case 'bunga-kuning':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} aria-label="Bunga Kuning">
          <path d="M32 36V58" stroke="#16A34A" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M32 48C32 48 23 46 21 40C27 39 32 43 32 48Z" fill="#22C55E" stroke="#15803D" strokeWidth="1.5" />
          <ellipse cx="32" cy="12" rx="6" ry="9" fill="#FACC15" stroke="#CA8A04" strokeWidth="2" />
          <ellipse cx="45" cy="20" rx="9" ry="6" transform="rotate(-20 45 20)" fill="#FACC15" stroke="#CA8A04" strokeWidth="2" />
          <ellipse cx="43" cy="34" rx="9" ry="6" transform="rotate(25 43 34)" fill="#FACC15" stroke="#CA8A04" strokeWidth="2" />
          <ellipse cx="21" cy="34" rx="9" ry="6" transform="rotate(-25 21 34)" fill="#FACC15" stroke="#CA8A04" strokeWidth="2" />
          <ellipse cx="19" cy="20" rx="9" ry="6" transform="rotate(20 19 20)" fill="#FACC15" stroke="#CA8A04" strokeWidth="2" />
          <circle cx="32" cy="25" r="8.5" fill="#F97316" stroke="#C2410C" strokeWidth="2" />
          <circle cx="29.5" cy="24" r="1.3" fill="#FFFFFF" />
          <circle cx="34.5" cy="24" r="1.3" fill="#FFFFFF" />
          <path d="M29.5 27.5C30.8 29 33.2 29 34.5 27.5" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );

    case 'bunga-ungu':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} aria-label="Bunga Ungu">
          <path d="M32 36V58" stroke="#16A34A" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M32 47C32 47 41 45 43 39C37 38 32 42 32 47Z" fill="#22C55E" stroke="#15803D" strokeWidth="1.5" />
          <path d="M20 14C20 14 25 20 32 14C39 20 44 14 44 14C46 25 41 36 32 36C23 36 18 25 20 14Z" fill="#A855F7" stroke="#7E22CE" strokeWidth="2.2" strokeLinejoin="round" />
          <path d="M32 14V35" stroke="#D8B4FE" strokeWidth="2" strokeLinecap="round" />
          <circle cx="28" cy="25" r="1.4" fill="#FFFFFF" />
          <circle cx="36" cy="25" r="1.4" fill="#FFFFFF" />
          <path d="M29.5 29C31 30.5 33 30.5 34.5 29" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );

    case 'daun-hijau':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} aria-label="Daun Hijau">
          <path d="M16 50C16 50 16 20 48 12C48 12 48 44 16 50Z" fill="#22C55E" stroke="#15803D" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M12 54L40 22" stroke="#15803D" strokeWidth="2.8" strokeLinecap="round" />
          <path d="M25 39L36 36" stroke="#BBF7D0" strokeWidth="2" strokeLinecap="round" />
          <path d="M31 32L31 22" stroke="#BBF7D0" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'daun-biru':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} aria-label="Daun Biru">
          <path d="M16 50C16 50 16 20 48 12C48 12 48 44 16 50Z" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M12 54L40 22" stroke="#1D4ED8" strokeWidth="2.8" strokeLinecap="round" />
          <path d="M25 39L36 36" stroke="#BFDBFE" strokeWidth="2" strokeLinecap="round" />
          <path d="M31 32L31 22" stroke="#BFDBFE" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'buah-oren':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} aria-label="Jeruk Oren">
          <path d="M32 16C34 10 39 8 43 9" stroke="#15803D" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M32 15C32 15 24 10 19 14C22 19 28 19 32 15Z" fill="#22C55E" stroke="#15803D" strokeWidth="1.8" />
          <circle cx="32" cy="36" r="18" fill="#F97316" stroke="#C2410C" strokeWidth="2.5" />
          <circle cx="25" cy="29" r="3" fill="#FDBA74" opacity="0.7" />
          <circle cx="27" cy="35" r="1.5" fill="#7C2D12" />
          <circle cx="37" cy="35" r="1.5" fill="#7C2D12" />
          <path d="M29 40C30.5 42 33.5 42 35 40" stroke="#7C2D12" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );

    case 'kelinci':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} aria-label="Kelinci">
          <ellipse cx="23" cy="18" rx="5.5" ry="13" transform="rotate(-8 23 18)" fill="#FFFFFF" stroke="#475569" strokeWidth="2.2" />
          <ellipse cx="23" cy="18" rx="2.6" ry="8" transform="rotate(-8 23 18)" fill="#FDA4AF" />
          <ellipse cx="41" cy="18" rx="5.5" ry="13" transform="rotate(8 41 18)" fill="#FFFFFF" stroke="#475569" strokeWidth="2.2" />
          <ellipse cx="41" cy="18" rx="2.6" ry="8" transform="rotate(8 41 18)" fill="#FDA4AF" />
          <circle cx="32" cy="39" r="16" fill="#FFFFFF" stroke="#475569" strokeWidth="2.2" />
          <circle cx="26" cy="37" r="2" fill="#1E293B" />
          <circle cx="38" cy="37" r="2" fill="#1E293B" />
          <ellipse cx="32" cy="41" rx="2.8" ry="2" fill="#F43F5E" />
          <path d="M29 44.5C30.5 46 33.5 46 35 44.5" stroke="#475569" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="22" cy="42" r="2.5" fill="#FECDD3" />
          <circle cx="42" cy="42" r="2.5" fill="#FECDD3" />
        </svg>
      );

    case 'kucing':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} aria-label="Kucing">
          <path d="M16 28L14 12L28 20Z" fill="#FACC15" stroke="#CA8A04" strokeWidth="2.2" strokeLinejoin="round" />
          <path d="M48 28L50 12L36 20Z" fill="#FACC15" stroke="#CA8A04" strokeWidth="2.2" strokeLinejoin="round" />
          <circle cx="32" cy="36" r="17" fill="#FDE047" stroke="#CA8A04" strokeWidth="2.2" />
          <path d="M29 20V25M32 19V25M35 20V25" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" />
          <circle cx="26" cy="34" r="2.2" fill="#1E293B" />
          <circle cx="38" cy="34" r="2.2" fill="#1E293B" />
          <polygon points="32,40 29.5,37.5 34.5,37.5" fill="#F97316" />
          <path d="M28 43C30 45 34 45 36 43" stroke="#713F12" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M13 36H20M13 40H20M44 36H51M44 40H51" stroke="#A16207" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );

    case 'katak':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} aria-label="Katak">
          <circle cx="22" cy="22" r="7" fill="#4ADE80" stroke="#15803D" strokeWidth="2.2" />
          <circle cx="42" cy="22" r="7" fill="#4ADE80" stroke="#15803D" strokeWidth="2.2" />
          <circle cx="22" cy="22" r="3.5" fill="#FFFFFF" />
          <circle cx="42" cy="22" r="3.5" fill="#FFFFFF" />
          <circle cx="22" cy="22" r="1.8" fill="#0F172A" />
          <circle cx="42" cy="22" r="1.8" fill="#0F172A" />
          <ellipse cx="32" cy="39" rx="20" ry="15" fill="#22C55E" stroke="#15803D" strokeWidth="2.2" />
          <ellipse cx="32" cy="44" rx="13" ry="8" fill="#DCFCE7" />
          <path d="M23 36C27 40 37 40 41 36" stroke="#14532D" strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="19" cy="36" r="2.3" fill="#FDA4AF" />
          <circle cx="45" cy="36" r="2.3" fill="#FDA4AF" />
        </svg>
      );

    case 'kupukupu':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} aria-label="Kupu-kupu">
          <path d="M30 30C20 14 8 18 11 30C13 36 22 36 30 34Z" fill="#A855F7" stroke="#7E22CE" strokeWidth="2" />
          <path d="M34 30C44 14 56 18 53 30C51 36 42 36 34 34Z" fill="#A855F7" stroke="#7E22CE" strokeWidth="2" />
          <path d="M30 34C20 36 14 48 22 50C28 51 31 44 31 36Z" fill="#F97316" stroke="#C2410C" strokeWidth="2" />
          <path d="M34 34C44 36 50 48 42 50C36 51 33 44 33 36Z" fill="#F97316" stroke="#C2410C" strokeWidth="2" />
          <circle cx="18" cy="26" r="3" fill="#FDE047" />
          <circle cx="46" cy="26" r="3" fill="#FDE047" />
          <rect x="29" y="22" width="6" height="26" rx="3" fill="#1E293B" />
          <path d="M30 22C27 16 24 14 22 15M34 22C37 16 40 14 42 15" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'burung':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} aria-label="Burung">
          <path d="M12 36L20 32V40L12 36Z" fill="#2563EB" stroke="#1E40AF" strokeWidth="2" strokeLinejoin="round" />
          <ellipse cx="34" cy="36" rx="16" ry="13" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2.2" />
          <ellipse cx="32" cy="39" rx="9" ry="7" fill="#93C5FD" />
          <path d="M48 31L57 34L48 37Z" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.8" strokeLinejoin="round" />
          <circle cx="41" cy="31" r="2.2" fill="#0F172A" />
          <circle cx="41.7" cy="30.3" r="0.7" fill="#FFFFFF" />
          <path d="M30 49V55M38 49V55" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'lebah':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} aria-label="Lebah">
          <ellipse cx="26" cy="21" rx="7" ry="10" transform="rotate(-20 26 21)" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="2" />
          <ellipse cx="38" cy="21" rx="7" ry="10" transform="rotate(20 38 21)" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="2" />
          <ellipse cx="32" cy="37" rx="16" ry="12" fill="#FACC15" stroke="#1E293B" strokeWidth="2.2" />
          <path d="M26 26V48M34 25V49" stroke="#1E293B" strokeWidth="4" />
          <circle cx="42" cy="35" r="2" fill="#1E293B" />
          <path d="M14 37L10 37" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'ikan':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} aria-label="Ikan">
          <path d="M12 24L22 34L12 44V24Z" fill="#F97316" stroke="#C2410C" strokeWidth="2" strokeLinejoin="round" />
          <ellipse cx="35" cy="34" rx="17" ry="12" fill="#FB923C" stroke="#C2410C" strokeWidth="2.2" />
          <path d="M30 22C33 15 39 15 40 22" fill="#FACC15" stroke="#C2410C" strokeWidth="2" />
          <circle cx="44" cy="31" r="2.3" fill="#0F172A" />
          <circle cx="44.7" cy="30.3" r="0.8" fill="#FFFFFF" />
          <path d="M31 24C28 31 28 37 31 44" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'kurakura':
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} aria-label="Kura-kura">
          <circle cx="51" cy="38" r="7" fill="#A855F7" stroke="#6B21A8" strokeWidth="2" />
          <circle cx="53" cy="36.5" r="1.4" fill="#FFFFFF" />
          <path d="M16 44H46C46 31 39 24 31 24C23 24 16 31 16 44Z" fill="#22C55E" stroke="#15803D" strokeWidth="2.2" />
          <path d="M26 26L23 36H39L36 26" stroke="#166534" strokeWidth="2" strokeLinejoin="round" />
          <rect x="19" y="44" width="6" height="7" rx="3" fill="#C084FC" stroke="#6B21A8" strokeWidth="1.8" />
          <rect x="37" y="44" width="6" height="7" rx="3" fill="#C084FC" stroke="#6B21A8" strokeWidth="1.8" />
        </svg>
      );
  }
};

export const PositionScene: React.FC<{ scene: SceneType; className?: string }> = ({ scene, className = '' }) => {
  switch (scene) {
    case 'kupu-atas-bunga':
      return (
        <svg viewBox="0 0 180 120" className={`w-full h-full ${className}`} fill="none" aria-label="Kupu-kupu di atas bunga">
          <rect width="180" height="120" rx="14" fill="#EFF6FF" />
          <path d="M0 102H180V120H0V102Z" fill="#86EFAC" />
          {/* Bunga Merah di bawah */}
          <path d="M90 78V104" stroke="#16A34A" strokeWidth="4" strokeLinecap="round" />
          <circle cx="90" cy="64" r="6" fill="#EF4444" />
          <circle cx="99" cy="70" r="6" fill="#EF4444" />
          <circle cx="95" cy="80" r="6" fill="#EF4444" />
          <circle cx="85" cy="80" r="6" fill="#EF4444" />
          <circle cx="81" cy="70" r="6" fill="#EF4444" />
          <circle cx="90" cy="72" r="5" fill="#FACC15" />
          {/* Kupu-kupu di atas */}
          <g transform="translate(65, 10) scale(0.78)">
            <path d="M30 30C20 14 8 18 11 30C13 36 22 36 30 34Z" fill="#A855F7" stroke="#7E22CE" strokeWidth="2" />
            <path d="M34 30C44 14 56 18 53 30C51 36 42 36 34 34Z" fill="#A855F7" stroke="#7E22CE" strokeWidth="2" />
            <path d="M30 34C20 36 14 48 22 50C28 51 31 44 31 36Z" fill="#F97316" stroke="#C2410C" strokeWidth="2" />
            <path d="M34 34C44 36 50 48 42 50C36 51 33 44 33 36Z" fill="#F97316" stroke="#C2410C" strokeWidth="2" />
            <rect x="29" y="22" width="6" height="24" rx="3" fill="#1E293B" />
          </g>
        </svg>
      );

    case 'kelinci-bawah-pohon':
      return (
        <svg viewBox="0 0 180 120" className={`w-full h-full ${className}`} fill="none" aria-label="Kelinci di bawah pohon">
          <rect width="180" height="120" rx="14" fill="#FEF9C3" />
          <path d="M0 98H180V120H0V98Z" fill="#4ADE80" />
          {/* Pohon */}
          <rect x="78" y="54" width="24" height="46" rx="4" fill="#B45309" />
          <circle cx="90" cy="36" r="24" fill="#22C55E" stroke="#15803D" strokeWidth="2" />
          <circle cx="68" cy="44" r="18" fill="#22C55E" stroke="#15803D" strokeWidth="2" />
          <circle cx="112" cy="44" r="18" fill="#22C55E" stroke="#15803D" strokeWidth="2" />
          <circle cx="90" cy="36" r="22" fill="#22C55E" />
          {/* Kelinci di bawah pohon */}
          <g transform="translate(106, 66) scale(0.65)">
            <ellipse cx="23" cy="18" rx="5.5" ry="13" fill="#FFFFFF" stroke="#475569" strokeWidth="2.5" />
            <ellipse cx="41" cy="18" rx="5.5" ry="13" fill="#FFFFFF" stroke="#475569" strokeWidth="2.5" />
            <circle cx="32" cy="39" r="16" fill="#FFFFFF" stroke="#475569" strokeWidth="2.5" />
            <circle cx="26" cy="37" r="2" fill="#1E293B" />
            <circle cx="38" cy="37" r="2" fill="#1E293B" />
            <ellipse cx="32" cy="41" rx="2.8" ry="2" fill="#F43F5E" />
          </g>
        </svg>
      );

    case 'ikan-dalam-kolam':
      return (
        <svg viewBox="0 0 180 120" className={`w-full h-full ${className}`} fill="none" aria-label="Ikan di dalam kolam">
          <rect width="180" height="120" rx="14" fill="#ECFDF5" />
          {/* Kolam Biru */}
          <ellipse cx="90" cy="68" rx="68" ry="36" fill="#60A5FA" stroke="#2563EB" strokeWidth="4" />
          <ellipse cx="90" cy="68" rx="56" ry="27" fill="#3B82F6" />
          {/* Ikan di dalam kolam */}
          <g transform="translate(62, 42) scale(0.85)">
            <path d="M12 24L22 34L12 44V24Z" fill="#F97316" stroke="#C2410C" strokeWidth="2" />
            <ellipse cx="35" cy="34" rx="17" ry="12" fill="#FDBA74" stroke="#C2410C" strokeWidth="2" />
            <circle cx="44" cy="31" r="2.2" fill="#0F172A" />
          </g>
          <circle cx="118" cy="54" r="3" fill="#DBEAFE" />
          <circle cx="126" cy="46" r="2" fill="#DBEAFE" />
        </svg>
      );

    case 'pot-kiri-pohon':
      return (
        <svg viewBox="0 0 180 120" className={`w-full h-full ${className}`} fill="none" aria-label="Pot bunga ungu di sebelah kiri pohon">
          <rect width="180" height="120" rx="14" fill="#F5F3FF" />
          <path d="M0 98H180V120H0V98Z" fill="#86EFAC" />
          {/* Pohon di tengah-kanan */}
          <rect x="114" y="54" width="18" height="46" rx="3" fill="#B45309" />
          <circle cx="123" cy="38" r="22" fill="#22C55E" stroke="#15803D" strokeWidth="2" />
          {/* Pot Ungu di sebelah KIRI */}
          <path d="M34 74H66L61 98H39L34 74Z" fill="#A855F7" stroke="#7E22CE" strokeWidth="2.5" strokeLinejoin="round" />
          <rect x="31" y="68" width="38" height="7" rx="3" fill="#C084FC" stroke="#7E22CE" strokeWidth="2" />
          <path d="M50 68V52" stroke="#16A34A" strokeWidth="3" />
          <circle cx="50" cy="46" r="7" fill="#FACC15" stroke="#CA8A04" strokeWidth="2" />
          <text x="50" y="26" textAnchor="middle" fill="#6B21A8" fontSize="11" fontWeight="700">Kiri</text>
        </svg>
      );

    case 'burung-kanan-pohon':
      return (
        <svg viewBox="0 0 180 120" className={`w-full h-full ${className}`} fill="none" aria-label="Burung oren di sebelah kanan pohon">
          <rect width="180" height="120" rx="14" fill="#FFF7ED" />
          <path d="M0 98H180V120H0V98Z" fill="#86EFAC" />
          {/* Pohon di kiri-tengah */}
          <rect x="52" y="54" width="18" height="46" rx="3" fill="#B45309" />
          <circle cx="61" cy="38" r="22" fill="#22C55E" stroke="#15803D" strokeWidth="2" />
          {/* Burung Oren di sebelah KANAN */}
          <g transform="translate(106, 54) scale(0.8)">
            <path d="M12 36L20 32V40L12 36Z" fill="#EA580C" />
            <ellipse cx="34" cy="36" rx="16" ry="13" fill="#F97316" stroke="#C2410C" strokeWidth="2.2" />
            <path d="M48 31L57 34L48 37Z" fill="#FACC15" />
            <circle cx="41" cy="31" r="2.2" fill="#0F172A" />
            <path d="M30 49V55M38 49V55" stroke="#9A3412" strokeWidth="2.5" strokeLinecap="round" />
          </g>
          <text x="134" y="34" textAnchor="middle" fill="#C2410C" fontSize="11" fontWeight="700">Kanan</text>
        </svg>
      );

    case 'katak-luar-kolam':
      return (
        <svg viewBox="0 0 180 120" className={`w-full h-full ${className}`} fill="none" aria-label="Katak hijau di luar kolam">
          <rect width="180" height="120" rx="14" fill="#ECFDF5" />
          <path d="M0 92H180V120H0V92Z" fill="#86EFAC" />
          {/* Kolam biru di sisi kiri */}
          <ellipse cx="64" cy="76" rx="48" ry="26" fill="#60A5FA" stroke="#2563EB" strokeWidth="3.5" />
          <ellipse cx="64" cy="76" rx="38" ry="19" fill="#3B82F6" />
          {/* Katak di rumput di LUAR kolam */}
          <g transform="translate(116, 48) scale(0.75)">
            <circle cx="22" cy="22" r="7" fill="#4ADE80" stroke="#15803D" strokeWidth="2.2" />
            <circle cx="42" cy="22" r="7" fill="#4ADE80" stroke="#15803D" strokeWidth="2.2" />
            <circle cx="22" cy="22" r="2" fill="#0F172A" />
            <circle cx="42" cy="22" r="2" fill="#0F172A" />
            <ellipse cx="32" cy="39" rx="20" ry="15" fill="#22C55E" stroke="#15803D" strokeWidth="2.2" />
            <path d="M23 36C27 40 37 40 41 36" stroke="#14532D" strokeWidth="2.2" strokeLinecap="round" />
          </g>
        </svg>
      );

    case 'kucing-atas-batu':
      return (
        <svg viewBox="0 0 180 120" className={`w-full h-full ${className}`} fill="none" aria-label="Kucing kuning di atas batu biru">
          <rect width="180" height="120" rx="14" fill="#FEFCE8" />
          <path d="M0 98H180V120H0V98Z" fill="#86EFAC" />
          {/* Batu Biru besar */}
          <path d="M44 100C44 74 64 66 90 66C116 66 136 74 136 100H44Z" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2.5" />
          {/* Kucing Kuning di atas batu */}
          <g transform="translate(64, 18) scale(0.82)">
            <path d="M16 28L14 12L28 20Z" fill="#FACC15" stroke="#CA8A04" strokeWidth="2.2" />
            <path d="M48 28L50 12L36 20Z" fill="#FACC15" stroke="#CA8A04" strokeWidth="2.2" />
            <circle cx="32" cy="36" r="17" fill="#FDE047" stroke="#CA8A04" strokeWidth="2.2" />
            <circle cx="26" cy="34" r="2.2" fill="#1E293B" />
            <circle cx="38" cy="34" r="2.2" fill="#1E293B" />
            <polygon points="32,40 29.5,37.5 34.5,37.5" fill="#F97316" />
          </g>
        </svg>
      );

    case 'kurakura-bawah-jamur':
      return (
        <svg viewBox="0 0 180 120" className={`w-full h-full ${className}`} fill="none" aria-label="Kura-kura ungu di bawah jamur merah">
          <rect width="180" height="120" rx="14" fill="#FFF1F2" />
          <path d="M0 98H180V120H0V98Z" fill="#86EFAC" />
          {/* Jamur Merah besar */}
          <rect x="80" y="50" width="20" height="50" rx="6" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" />
          <path d="M42 54C42 26 64 16 90 16C116 16 138 26 138 54H42Z" fill="#EF4444" stroke="#B91C1C" strokeWidth="2.5" />
          <circle cx="68" cy="36" r="6" fill="#FFFFFF" />
          <circle cx="102" cy="30" r="5" fill="#FFFFFF" />
          <circle cx="116" cy="43" r="4" fill="#FFFFFF" />
          {/* Kura-kura Ungu di bawah tudung jamur */}
          <g transform="translate(96, 62) scale(0.7)">
            <circle cx="51" cy="38" r="7" fill="#A855F7" stroke="#6B21A8" strokeWidth="2" />
            <path d="M16 44H46C46 31 39 24 31 24C23 24 16 31 16 44Z" fill="#9333EA" stroke="#581C87" strokeWidth="2.2" />
            <rect x="19" y="44" width="6" height="7" rx="3" fill="#C084FC" stroke="#6B21A8" strokeWidth="1.8" />
            <rect x="37" y="44" width="6" height="7" rx="3" fill="#C084FC" stroke="#6B21A8" strokeWidth="1.8" />
          </g>
        </svg>
      );
  }
};
