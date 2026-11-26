import { NatureItemId, QuizQuestion } from '../types/lesson';

export interface SlideInfo {
  id: number;
  shortTitle: string;
  fullTitle: string;
  accentBg: string;
  accentText: string;
  accentBorder: string;
}

export const SLIDES: SlideInfo[] = [
  {
    id: 0,
    shortTitle: 'Pembuka',
    fullTitle: 'Pembuka dan Identitas',
    accentBg: 'bg-red-500',
    accentText: 'text-red-700',
    accentBorder: 'border-red-300',
  },
  {
    id: 1,
    shortTitle: 'Tujuan',
    fullTitle: 'Tujuan Pembelajaran',
    accentBg: 'bg-orange-500',
    accentText: 'text-orange-700',
    accentBorder: 'border-orange-300',
  },
  {
    id: 2,
    shortTitle: 'Materi',
    fullTitle: 'Materi Inti Singkat',
    accentBg: 'bg-amber-400',
    accentText: 'text-amber-800',
    accentBorder: 'border-amber-300',
  },
  {
    id: 3,
    shortTitle: 'Aktivitas',
    fullTitle: 'Aktivitas Interaktif',
    accentBg: 'bg-emerald-500',
    accentText: 'text-emerald-700',
    accentBorder: 'border-emerald-300',
  },
  {
    id: 4,
    shortTitle: 'Kuis',
    fullTitle: 'Kuis Mencocokkan',
    accentBg: 'bg-blue-500',
    accentText: 'text-blue-700',
    accentBorder: 'border-blue-300',
  },
  {
    id: 5,
    shortTitle: 'Refleksi',
    fullTitle: 'Umpan Balik dan Refleksi',
    accentBg: 'bg-purple-500',
    accentText: 'text-purple-700',
    accentBorder: 'border-purple-300',
  },
];

export interface PatternActivityTask {
  id: number;
  title: string;
  sequence: (NatureItemId | null)[];
  answer: NatureItemId;
  options: NatureItemId[];
  hint: string;
  successNote: string;
}

export const PATTERN_ACTIVITIES: PatternActivityTask[] = [
  {
    id: 0,
    title: 'Taman Bunga Berwarna',
    sequence: ['bunga-merah', 'bunga-kuning', 'bunga-merah', null],
    answer: 'bunga-kuning',
    options: ['bunga-kuning', 'daun-biru', 'bunga-ungu'],
    hint: 'Lihat urutannya: Merah, Kuning, Merah, lalu apa lagi ya?',
    successNote: 'Betul! Polanya bergantian Merah dan Kuning.',
  },
  {
    id: 1,
    title: 'Barisan Hewan Taman',
    sequence: ['kelinci', 'katak', 'kelinci', null],
    answer: 'katak',
    options: ['ikan', 'katak', 'lebah'],
    hint: 'Setelah Kelinci selalu ada hewan hijau yang suka melompat!',
    successNote: 'Tepat sekali! Kelinci, Katak, Kelinci, Katak.',
  },
  {
    id: 2,
    title: 'Kebun Buah dan Daun',
    sequence: ['daun-hijau', 'daun-hijau', 'buah-oren', 'daun-hijau', 'daun-hijau', null],
    answer: 'buah-oren',
    options: ['daun-biru', 'bunga-ungu', 'buah-oren'],
    hint: 'Hitung daunnya: dua Daun Hijau lalu satu buah berwarna oren!',
    successNote: 'Hebat! Polanya 2 Daun Hijau lalu 1 Jeruk Oren.',
  },
];

export interface PositionActivityTask {
  id: number;
  prompt: string;
  targetZone: 'atas' | 'bawah' | 'kiri' | 'kanan';
  animal: NatureItemId;
  anchorLabel: string;
  hint: string;
  successNote: string;
}

export const POSITION_ACTIVITIES: PositionActivityTask[] = [
  {
    id: 0,
    prompt: 'Ayo taruh Kupu-kupu di ATAS pohon!',
    targetZone: 'atas',
    animal: 'kupukupu',
    anchorLabel: 'Pohon Hijau',
    hint: 'Bagian atas ada di dekat puncak daun pohon.',
    successNote: 'Pintar! Kupu-kupu terbang di atas pohon.',
  },
  {
    id: 1,
    prompt: 'Ayo taruh Kura-kura di BAWAH pohon!',
    targetZone: 'bawah',
    animal: 'kurakura',
    anchorLabel: 'Pohon Hijau',
    hint: 'Bagian bawah ada di dekat rumput dan akar pohon.',
    successNote: 'Bagus! Kura-kura beristirahat di bawah pohon.',
  },
  {
    id: 2,
    prompt: 'Ayo taruh Kelinci di sebelah KIRI pohon!',
    targetZone: 'kiri',
    animal: 'kelinci',
    anchorLabel: 'Pohon Hijau',
    hint: 'Sebelah kiri adalah kotak yang ada di sisi tangan kirimu.',
    successNote: 'Benar! Kelinci bermain di sebelah kiri pohon.',
  },
  {
    id: 3,
    prompt: 'Ayo taruh Burung Biru di sebelah KANAN pohon!',
    targetZone: 'kanan',
    animal: 'burung',
    anchorLabel: 'Pohon Hijau',
    hint: 'Sebelah kanan adalah kotak yang ada di sisi tangan kananmu.',
    successNote: 'Keren! Burung biru hinggap di sebelah kanan pohon.',
  },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    title: 'Soal 1: Mencocokkan Pola Tumbuhan',
    instruction: 'Cocokkan barisan pola di kiri dengan gambar lanjutan yang tepat di kanan.',
    hint: 'Perhatikan gambar yang terus berulang satu per satu secara bergantian.',
    leftItems: [
      {
        id: 'q1-l1',
        label: 'Pola 1',
        kind: 'pattern',
        sequence: ['bunga-merah', 'daun-hijau', 'bunga-merah'],
        correctRightId: 'q1-r3',
      },
      {
        id: 'q1-l2',
        label: 'Pola 2',
        kind: 'pattern',
        sequence: ['bunga-kuning', 'bunga-ungu', 'bunga-kuning'],
        correctRightId: 'q1-r1',
      },
      {
        id: 'q1-l3',
        label: 'Pola 3',
        kind: 'pattern',
        sequence: ['buah-oren', 'daun-biru', 'buah-oren'],
        correctRightId: 'q1-r2',
      },
    ],
    rightItems: [
      {
        id: 'q1-r1',
        label: 'Bunga Ungu',
        kind: 'item',
        item: 'bunga-ungu',
        accentColor: 'purple',
      },
      {
        id: 'q1-r2',
        label: 'Daun Biru',
        kind: 'item',
        item: 'daun-biru',
        accentColor: 'blue',
      },
      {
        id: 'q1-r3',
        label: 'Daun Hijau',
        kind: 'item',
        item: 'daun-hijau',
        accentColor: 'green',
      },
    ],
  },
  {
    id: 2,
    title: 'Soal 2: Mencocokkan Pola Hewan',
    instruction: 'Cocokkan barisan hewan di kiri dengan hewan berikutnya di kanan.',
    hint: 'Sebutkan nama hewannya berurutan dari kiri ke kanan untuk menemukan hewan selanjutnya.',
    leftItems: [
      {
        id: 'q2-l1',
        label: 'Barisan 1',
        kind: 'pattern',
        sequence: ['kelinci', 'kucing', 'kelinci', 'kucing'],
        correctRightId: 'q2-r3',
      },
      {
        id: 'q2-l2',
        label: 'Barisan 2',
        kind: 'pattern',
        sequence: ['katak', 'kupukupu', 'katak', 'kupukupu'],
        correctRightId: 'q2-r1',
      },
      {
        id: 'q2-l3',
        label: 'Barisan 3',
        kind: 'pattern',
        sequence: ['lebah', 'lebah', 'ikan', 'lebah', 'lebah'],
        correctRightId: 'q2-r2',
      },
    ],
    rightItems: [
      {
        id: 'q2-r1',
        label: 'Katak',
        kind: 'item',
        item: 'katak',
        accentColor: 'green',
      },
      {
        id: 'q2-r2',
        label: 'Ikan',
        kind: 'item',
        item: 'ikan',
        accentColor: 'orange',
      },
      {
        id: 'q2-r3',
        label: 'Kelinci',
        kind: 'item',
        item: 'kelinci',
        accentColor: 'red',
      },
    ],
  },
  {
    id: 3,
    title: 'Soal 3: Mencocokkan Letak Benda (Atas, Bawah, Dalam)',
    instruction: 'Cocokkan gambar posisi hewan di kiri dengan keterangan letak yang sesuai di kanan.',
    hint: 'Amati letak hewannya: apakah terbang di atas, duduk di bawah pohon, atau berenang di dalam air?',
    leftItems: [
      {
        id: 'q3-l1',
        label: 'Di mana Kupu-kupu?',
        kind: 'scene',
        scene: 'kupu-atas-bunga',
        correctRightId: 'q3-r3',
      },
      {
        id: 'q3-l2',
        label: 'Di mana Kelinci?',
        kind: 'scene',
        scene: 'kelinci-bawah-pohon',
        correctRightId: 'q3-r1',
      },
      {
        id: 'q3-l3',
        label: 'Di mana Ikan?',
        kind: 'scene',
        scene: 'ikan-dalam-kolam',
        correctRightId: 'q3-r2',
      },
    ],
    rightItems: [
      {
        id: 'q3-r1',
        label: 'Di bawah pohon',
        kind: 'text',
        accentColor: 'green',
      },
      {
        id: 'q3-r2',
        label: 'Di dalam kolam',
        kind: 'text',
        accentColor: 'blue',
      },
      {
        id: 'q3-r3',
        label: 'Di atas bunga',
        kind: 'text',
        accentColor: 'purple',
      },
    ],
  },
  {
    id: 4,
    title: 'Soal 4: Mencocokkan Letak Benda (Kiri, Kanan, Luar)',
    instruction: 'Cocokkan gambar di kiri dengan kata letak benda yang benar di kanan.',
    hint: 'Gunakan tangan kiri dan tangan kananmu untuk mengecek posisi pot ungu dan burung oren!',
    leftItems: [
      {
        id: 'q4-l1',
        label: 'Posisi Pot Ungu?',
        kind: 'scene',
        scene: 'pot-kiri-pohon',
        correctRightId: 'q4-r2',
      },
      {
        id: 'q4-l2',
        label: 'Posisi Burung Oren?',
        kind: 'scene',
        scene: 'burung-kanan-pohon',
        correctRightId: 'q4-r3',
      },
      {
        id: 'q4-l3',
        label: 'Posisi Katak Hijau?',
        kind: 'scene',
        scene: 'katak-luar-kolam',
        correctRightId: 'q4-r1',
      },
    ],
    rightItems: [
      {
        id: 'q4-r1',
        label: 'Di luar kolam',
        kind: 'text',
        accentColor: 'green',
      },
      {
        id: 'q4-r2',
        label: 'Di sebelah kiri',
        kind: 'text',
        accentColor: 'purple',
      },
      {
        id: 'q4-r3',
        label: 'Di sebelah kanan',
        kind: 'text',
        accentColor: 'orange',
      },
    ],
  },
  {
    id: 5,
    title: 'Soal 5: Gabungan Pola dan Letak Benda',
    instruction: 'Cocokkan setiap gambar dan pola di kiri dengan jawaban yang tepat di kanan.',
    hint: 'Cek pola daun dan jeruk di baris pertama, lalu lihat posisi Kucing dan Kura-kura!',
    leftItems: [
      {
        id: 'q5-l1',
        label: 'Lanjutan pola ini?',
        kind: 'pattern',
        sequence: ['daun-hijau', 'buah-oren', 'daun-hijau'],
        correctRightId: 'q5-r2',
      },
      {
        id: 'q5-l2',
        label: 'Di mana Kucing Kuning?',
        kind: 'scene',
        scene: 'kucing-atas-batu',
        correctRightId: 'q5-r3',
      },
      {
        id: 'q5-l3',
        label: 'Di mana Kura-kura Ungu?',
        kind: 'scene',
        scene: 'kurakura-bawah-jamur',
        correctRightId: 'q5-r1',
      },
    ],
    rightItems: [
      {
        id: 'q5-r1',
        label: 'Di bawah jamur',
        kind: 'text',
        accentColor: 'red',
      },
      {
        id: 'q5-r2',
        label: 'Jeruk Oren',
        kind: 'item',
        item: 'buah-oren',
        accentColor: 'orange',
      },
      {
        id: 'q5-r3',
        label: 'Di atas batu',
        kind: 'text',
        accentColor: 'blue',
      },
    ],
  },
];
