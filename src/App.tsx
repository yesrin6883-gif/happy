import { useState } from 'react';
import { BookRecord } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import { BottomNav } from './components/BottomNav';
import { HomePage } from './pages/HomePage';
import { WritePage } from './pages/WritePage';
import { QuotePage } from './pages/QuotePage';

type PageType = 'home' | 'write' | 'quote';

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [books, setBooks] = useLocalStorage<BookRecord[]>('book-records', []);
  const [editBook, setEditBook] = useState<BookRecord | null>(null);

  const handleNavigate = (page: PageType) => {
    if (page !== 'write') {
      setEditBook(null);
    }
    setCurrentPage(page);
  };

  const handleSave = (bookData: Omit<BookRecord, 'id' | 'createdAt'>) => {
    if (editBook) {
      setBooks((prev) =>
        prev.map((b) =>
          b.id === editBook.id
            ? { ...b, ...bookData }
            : b
        )
      );
      setEditBook(null);
    } else {
      const newBook: BookRecord = {
        ...bookData,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      };
      setBooks((prev) => [newBook, ...prev]);
    }
  };

  const handleEdit = (book: BookRecord) => {
    setEditBook(book);
    setCurrentPage('write');
  };

  const handleDelete = (id: string) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      setBooks((prev) => prev.filter((b) => b.id !== id));
    }
  };

  const handleCancelEdit = () => {
    setEditBook(null);
    setCurrentPage('home');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            books={books}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        );
      case 'write':
        return (
          <WritePage
            onSave={handleSave}
            onNavigate={handleNavigate}
            editBook={editBook}
            onCancel={handleCancelEdit}
          />
        );
      case 'quote':
        return <QuotePage />;
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white/50 min-h-screen relative">
      {renderPage()}
      <BottomNav currentPage={currentPage} onNavigate={handleNavigate} />
    </div>
  );
}

export default App;
