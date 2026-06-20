export type ReadingStatus = 'purchased' | 'reading' | 'completed' | 'paused';

export interface BookRecord {
  id: string;
  thumbnail: string;
  title: string;
  author: string;
  publisher: string;
  readDate: string;
  status: ReadingStatus;
  rating: number;
  review: string;
  createdAt: string;
}

export const STATUS_LABELS: Record<ReadingStatus, string> = {
  purchased: '구매',
  reading: '읽는중',
  completed: '완독',
  paused: '멈춤',
};

export const DEFAULT_BACKGROUNDS = [
  'https://images.pexels.com/photos/1366957/pexels-photo-1366957.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1766838/pexels-photo-1766838.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1166209/pexels-photo-1166209.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/255379/pexels-photo-255379.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/164005/pexels-photo-164005.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=800',
];

export const DEFAULT_COVER = 'https://images.pexels.com/photos/2908984/pexels-photo-2908984.jpeg?auto=compress&cs=tinysrgb&w=400';

export const FONT_OPTIONS = [
  { value: "'Noto Sans KR', sans-serif", label: '고딕' },
  { value: "'Noto Serif KR', serif", label: '명조' },
  { value: "'Gowun Batang', serif", label: '고운바탕' },
  { value: "'Gaegu', cursive", label: '개구리' },
];
