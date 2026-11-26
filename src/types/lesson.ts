export type SlideIndex = 0 | 1 | 2 | 3 | 4 | 5;

export type NatureItemId =
  | 'bunga-merah'
  | 'bunga-kuning'
  | 'bunga-ungu'
  | 'daun-hijau'
  | 'daun-biru'
  | 'buah-oren'
  | 'kelinci'
  | 'kucing'
  | 'katak'
  | 'kupukupu'
  | 'burung'
  | 'lebah'
  | 'ikan'
  | 'kurakura';

export type SceneType =
  | 'kupu-atas-bunga'
  | 'kelinci-bawah-pohon'
  | 'ikan-dalam-kolam'
  | 'pot-kiri-pohon'
  | 'burung-kanan-pohon'
  | 'katak-luar-kolam'
  | 'kucing-atas-batu'
  | 'kurakura-bawah-jamur';

export interface QuizLeftItem {
  id: string;
  label: string;
  sublabel?: string;
  kind: 'pattern' | 'scene';
  sequence?: NatureItemId[];
  scene?: SceneType;
  correctRightId: string;
}

export interface QuizRightItem {
  id: string;
  label: string;
  kind: 'item' | 'text';
  item?: NatureItemId;
  accentColor: 'red' | 'yellow' | 'green' | 'blue' | 'purple' | 'orange';
}

export interface QuizQuestion {
  id: number;
  title: string;
  instruction: string;
  hint: string;
  leftItems: QuizLeftItem[];
  rightItems: QuizRightItem[];
}

export interface QuestionProgress {
  // Maps leftItem.id -> rightItem.id
  matches: Record<string, string>;
  hasWrongAttempt: boolean;
  isLocked: boolean;
  earnedFirstTryPoint: boolean;
  feedbackState: 'idle' | 'correct' | 'wrong';
}

export interface ActivityProgress {
  completedPatterns: number[];
  completedPositions: number[];
}

export interface ReflectionData {
  mood: string | null;
  favoritePart: string | null;
}
