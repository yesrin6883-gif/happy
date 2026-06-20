import { useState, useEffect } from 'react';
import { Calendar, BookOpen, User, Building2, Image, PenLine, Save, X } from 'lucide-react';
import { BookRecord, ReadingStatus, STATUS_LABELS, DEFAULT_COVER } from '../types';
import { StarRating } from '../components/StarRating';

interface WritePageProps {
  onSave: (book: Omit<BookRecord, 'id' | 'createdAt'>) => void;
  onNavigate: (page: 'home') => void;
  editBook?: BookRecord | null;
  onCancel: () => void;
}

export function WritePage({ onSave, onNavigate, editBook, onCancel }: WritePageProps) {
  const [currentDate] = useState(new Date().toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }));

  const [thumbnail, setThumbnail] = useState(editBook?.thumbnail || '');
  const [title, setTitle] = useState(editBook?.title || '');
  const [author, setAuthor] = useState(editBook?.author || '');
  const [publisher, setPublisher] = useState(editBook?.publisher || '');
  const [readDate, setReadDate] = useState(editBook?.readDate || '');
  const [status, setStatus] = useState<ReadingStatus>(editBook?.status || 'purchased');
  const [rating, setRating] = useState(editBook?.rating || 0);
  const [review, setReview] = useState(editBook?.review || '');

  useEffect(() => {
    if (editBook) {
      setThumbnail(editBook.thumbnail);
      setTitle(editBook.title);
      setAuthor(editBook.author);
      setPublisher(editBook.publisher);
      setReadDate(editBook.readDate);
      setStatus(editBook.status);
      setRating(editBook.rating);
      setReview(editBook.review);
    }
  }, [editBook]);

  const handleSave = () => {
    if (!title.trim()) {
      alert('책 제목을 입력해주세요.');
      return;
    }

    onSave({
      thumbnail: thumbnail || DEFAULT_COVER,
      title,
      author,
      publisher,
      readDate,
      status,
      rating,
      review,
    });

    if (!editBook) {
      setThumbnail('');
      setTitle('');
      setAuthor('');
      setPublisher('');
      setReadDate('');
      setStatus('purchased');
      setRating(0);
      setReview('');
    }

    onNavigate('home');
  };

  const statusOptions: { value: ReadingStatus; label: string; color: string }[] = [
    { value: 'purchased', label: STATUS_LABELS.purchased, color: 'bg-blue-100 text-blue-700 border-blue-300' },
    { value: 'reading', label: STATUS_LABELS.reading, color: 'bg-emerald-100 text-emerald-700 border-emerald-300' },
    { value: 'completed', label: STATUS_LABELS.completed, color: 'bg-amber-100 text-amber-700 border-amber-300' },
    { value: 'paused', label: STATUS_LABELS.paused, color: 'bg-gray-100 text-gray-700 border-gray-300' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 page-container p-4">
      <header className="pt-6 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400 flex items-center gap-1">
              <Calendar size={14} />
              {currentDate}
            </p>
            <h1 className="text-2xl font-bold text-gray-800 mt-1">
              {editBook ? '독후감 수정' : '새 독후감 작성'}
            </h1>
          </div>
          {editBook && (
            <button
              onClick={onCancel}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X size={20} className="text-gray-500" />
            </button>
          )}
        </div>
      </header>

      <div className="bg-white rounded-2xl shadow-sm p-5 space-y-5">
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <Image size={16} />
            썸네일 이미지 URL
          </label>
          <input
            type="url"
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
            placeholder="이미지 URL을 입력하세요 (선택)"
            className="input-field"
          />
          {(thumbnail || DEFAULT_COVER) && (
            <div className="mt-3 w-20 h-28 rounded-lg overflow-hidden shadow-sm">
              <img
                src={thumbnail || DEFAULT_COVER}
                alt="미리보기"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = DEFAULT_COVER;
                }}
              />
            </div>
          )}
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <BookOpen size={16} />
            책 제목 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="책 제목을 입력하세요"
            className="input-field"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <User size={16} />
            저자
          </label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="저자명을 입력하세요"
            className="input-field"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <Building2 size={16} />
            출판사
          </label>
          <input
            type="text"
            value={publisher}
            onChange={(e) => setPublisher(e.target.value)}
            placeholder="출판사명을 입력하세요"
            className="input-field"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <Calendar size={16} />
            읽은 날
          </label>
          <input
            type="date"
            value={readDate}
            onChange={(e) => setReadDate(e.target.value)}
            className="input-field"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            독서 상태
          </label>
          <div className="flex flex-wrap gap-2">
            {statusOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setStatus(option.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition-all ${
                  status === option.value ? option.color : 'border-gray-200 text-gray-400 hover:border-gray-300'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            평점
          </label>
          <div className="flex items-center gap-3">
            <StarRating rating={rating} onChange={setRating} size={32} />
            <span className="text-lg font-medium text-amber-600">{rating > 0 ? `${rating}점` : '-'}</span>
          </div>
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <PenLine size={16} />
            독후감
          </label>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="책에 대한 생각을 자유롭게 적어보세요..."
            className="input-field min-h-[150px] resize-none"
          />
        </div>

        <button onClick={handleSave} className="btn-primary flex items-center justify-center gap-2">
          <Save size={18} />
          {editBook ? '수정하기' : '저장하기'}
        </button>
      </div>
    </div>
  );
}
