import { Home, PlusCircle, Quote } from 'lucide-react';

type PageType = 'home' | 'write' | 'quote';

interface BottomNavProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
}

export function BottomNav({ currentPage, onNavigate }: BottomNavProps) {
  const navItems = [
    { id: 'home' as PageType, icon: Home, label: '홈화면' },
    { id: 'write' as PageType, icon: PlusCircle, label: '작성+' },
    { id: 'quote' as PageType, icon: Quote, label: '명언발췌' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-lg z-50">
      <div className="max-w-lg mx-auto px-4">
        <div className="flex justify-around py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`nav-item ${isActive ? 'active' : ''} py-2 px-4`}
              >
                <Icon size={24} strokeWidth={isActive ? 2 : 1.5} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
