import { useState, useRef, useEffect } from 'react';
import { Grid3X3, List, MoreVertical, Calendar, Star, Type, Pencil, Trash2, Book, Clock } from 'lucide-react';
import { BookRecord, STATUS_LABELS } from '../types';
import { StarRating } from '../components/StarRating';

type SortType = 'time' | 'rating' | 'name';
type ViewType = 'grid' | 'list';

interface HomePageProps {
  books: BookRecord[];
  onEdit: (book: BookRecord) => void;
  onDelete: (id: string) => void;
}

export function HomePage({ books, onEdit, onDelete }: HomePageProps) {
  const [sortBy, setSortBy] = useState<SortType>('time');
  const [viewType, setViewType] = useState<ViewType>('grid');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const sortedBooks = [...books].sort((a, b) => {
    switch (sortBy) {
      case 'time':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'rating':
        return b.rating - a.rating;
      case 'name':
        return a.title.localeCompare(b.title, 'ko');
    }
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <Book size={10} className="mr-1" />;
      case 'reading':
        return <Clock size={10} className="mr-1" />;
      default:
        return null;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'purchased':
        return 'status-purchased';
      case 'reading':
        return 'status-reading';
      case 'completed':
        return 'status-completed';
      case 'paused':
        return 'status-paused';
      default:
        return 'status-purchased';
    }
  };

  const sortOptions: { type: SortType; icon: React.ReactNode; label: string }[] = [
    { type: 'time', icon: <Calendar size={16} />, label: '시간순' },
    { type: 'rating', icon: <Star size={16} />, label: '별점순' },
    { type: 'name', icon: <Type size={16} />, label: '가나다순' },
  ];

  if (books.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 page-container p-6">
        <header className="pt-8 pb-6">
          <h1 className="text-2xl font-bold text-gray-800">My 독후감 노트</h1>
          <p className="text-sm text-gray-500 mt-1">나만의 독서 기록을 시작해보세요</p>
        </header>
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-32 h-40 bg-gradient-to-br from-amber-100 to-orange-100 rounded-lg flex items-center justify-center shadow-lg">
            <Book size={48} className="text-amber-400" />
          </div>
          <p className="text-gray-500 mt-6 text-center">
            아직 기록된 독후감이 없습니다.<br />
            <span className="text-amber-600">작성하기</span> 버튼을 눌러 시작해보세요!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 page-container p-4">
      <header className="pt-6 pb-4 px-2">
        <h1 className="text-2xl font-bold text-gray-800">My 독후감 노트</h1>
        <p className="text-sm text-gray-500 mt-1">
          총 {books.length}권의 독서 기록
        </p>
      </header>

      <div className="flex items-center justify-between mb-4 px-2">
        <div className="flex gap-2">
          {sortOptions.map((option) => (
            <button
              key={option.type}
              onClick={() => setSortBy(option.type)}
              className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm transition-all ${
                sortBy === option.type
                  ? 'bg-amber-500 text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {option.icon}
              <span className="hidden sm:inline">{option.label}</span>
            </button>
          ))}
        </div>

        <div className="flex gap-1 bg-white rounded-lg p-1">
          <button
            onClick={() => setViewType('grid')}
            className={`p-2 rounded-lg transition-all ${
              viewType === 'grid' ? 'bg-amber-100 text-amber-600' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <Grid3X3 size={20} />
          </button>
          <button
            onClick={() => setViewType('list')}
            className={`p-2 rounded-lg transition-all ${
              viewType === 'list' ? 'bg-amber-100 text-amber-600' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <List size={20} />
          </button>
        </div>
      </div>

      {viewType === 'grid' ? (
        <div className="grid grid-cols-3 gap-3">
          {sortedBooks.map((book) => (
            <div key={book.id} className="book-card relative group">
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={book.thumbnail || 'https://images.pexels.com/photos/2908984/pexels-photo-2908984.jpeg?auto=compress&cs=tinysrgb&w=400'}
                  alt={book.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/2908984/pexels-photo-2908984.jpeg?auto=compress&cs=tinysrgb&w=400';
                  }}
                />
              </div>
              <div className="absolute top-1 right-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenMenuId(openMenuId === book.id ? null : book.id);
                  }}
                  className="w-7 h-7 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white transition-all"
                >
                  <MoreVertical size={14} className="text-gray-600" />
                </button>
                {openMenuId === book.id && (
                  <div
                    ref={menuRef}
                    className="absolute top-9 right-0 bg-white rounded-lg shadow-xl border border-gray-100 py-1 z-20 min-w-[100px]"
                  >
                    <button
                      onClick={() => {
                        onEdit(book);
                        setOpenMenuId(null);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <Pencil size={14} />
                      수정
                    </button>
                    <button
                      onClick={() => {
                        onDelete(book.id);
                        setOpenMenuId(null);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <Trash2 size={14} />
                      삭제
                    </button>
                  </div>
                )}
              </div>
              <div className="p-2">
                <p className="text-xs font-medium text-gray-800 truncate">{book.title}</p>
                <p className="text-xs text-gray-500 truncate">{book.author}</p>
                <div className="flex items-center gap-1 mt-1">
                  <StarRating rating={book.rating} readonly size={12} />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {sortedBooks.map((book) => (
            <div key={book.id} className="book-card flex p-3 relative">
              <div className="w-16 h-20 flex-shrink-0 overflow-hidden rounded-md shadow-sm">
                <img
                  src={book.thumbnail || 'https://images.pexels.com/photos/2908984/pexels-photo-2908984.jpeg?auto=compress&cs=tinysrgb&w=400'}
                  alt={book.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/2908984/pexels-photo-2908984.jpeg?auto=compress&cs=tinysrgb&w=400';
                  }}
                />
              </div>
              <div className="flex-1 ml-3 min-w-0">
                <h3 className="font-medium text-gray-800 truncate">{book.title}</h3>
                <p className="text-sm text-gray-500 truncate">{book.author}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`status-badge ${getStatusClass(book.status)}`}>
                    {getStatusIcon(book.status)}
                    {STATUS_LABELS[book.status]}
                  </span>
                  <StarRating rating={book.rating} readonly size={14} />
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenMenuId(openMenuId === book.id ? null : book.id);
                }}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 self-center"
              >
                <MoreVertical size={18} className="text-gray-400" />
              </button>
              {openMenuId === book.id && (
                <div
                  ref={menuRef}
                  className="absolute top-1/2 right-0 transform bg-white rounded-lg shadow-xl border border-gray-100 py-1 z-20 min-w-[100px]"
                >
                  <button
                    onClick={() => {
                      onEdit(book);
                      setOpenMenuId(null);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <Pencil size={14} />
                    수정
                  </button>
                  <button
                    onClick={() => {
                      onDelete(book.id);
                      setOpenMenuId(null);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <Trash2 size={14} />
                    삭제
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
