import { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import { Image, Type, Quote, Download, Palette, Maximize2, RefreshCw } from 'lucide-react';
import { DEFAULT_BACKGROUNDS, FONT_OPTIONS } from '../types';

export function QuotePage() {
  const [background, setBackground] = useState(DEFAULT_BACKGROUNDS[0]);
  const [customBackground, setCustomBackground] = useState('');
  const [quoteText, setQuoteText] = useState('');
  const [bookTitle, setBookTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [fontFamily, setFontFamily] = useState(FONT_OPTIONS[0].value);
  const [fontColor, setFontColor] = useState('#ffffff');
  const [fontSize, setFontSize] = useState(24);
  const [isExporting, setIsExporting] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);

  const activeBackground = customBackground || background;

  const handleDownload = async () => {
    if (!cardRef.current) return;

    setIsExporting(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
      });

      const link = document.createElement('a');
      link.download = `quote-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('이미지 다운로드 실패:', error);
      alert('이미지 저장에 실패했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 page-container p-4">
      <header className="pt-6 pb-4">
        <h1 className="text-2xl font-bold text-gray-800">명언 카드 만들기</h1>
        <p className="text-sm text-gray-500 mt-1">아름다운 명언 카드를 만들어 보세요</p>
      </header>

      <div className="bg-white rounded-2xl shadow-sm p-4 mb-4">
        <div
          ref={cardRef}
          className="relative aspect-square rounded-xl overflow-hidden flex flex-col items-center justify-center p-6"
          style={{
            backgroundImage: `url(${activeBackground})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative z-10 text-center max-w-full">
            {quoteText ? (
              <p
                className="font-serif-kr leading-relaxed mb-4 break-keep"
                style={{ color: fontColor, fontSize: `${fontSize}px`, fontFamily }}
              >
                "{quoteText}"
              </p>
            ) : (
              <p
                className="font-serif-kr leading-relaxed mb-4 opacity-50"
                style={{ color: fontColor, fontSize: `${fontSize}px`, fontFamily }}
              >
                "명언을 입력하세요..."
              </p>
            )}
            {(bookTitle || author) && (
              <p
                className="text-sm opacity-80"
                style={{ color: fontColor }}
              >
                - {bookTitle}{author && `, ${author}`}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-5 space-y-5">
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
            <Image size={16} />
            배경 이미지 선택
          </label>
          <div className="grid grid-cols-3 gap-2 mb-3">
            {DEFAULT_BACKGROUNDS.map((bg, index) => (
              <button
                key={index}
                onClick={() => {
                  setBackground(bg);
                  setCustomBackground('');
                }}
                className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                  background === bg && !customBackground
                    ? 'border-amber-500 shadow-md'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <img src={bg} alt={`배경 ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
          <input
            type="url"
            value={customBackground}
            onChange={(e) => setCustomBackground(e.target.value)}
            placeholder="또는 직접 URL을 입력하세요"
            className="input-field text-sm"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <Quote size={16} />
            명언 텍스트
          </label>
          <textarea
            value={quoteText}
            onChange={(e) => setQuoteText(e.target.value)}
            placeholder="명언 또는 좋아하는 구절을 입력하세요"
            className="input-field min-h-[80px] resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              책 제목
            </label>
            <input
              type="text"
              value={bookTitle}
              onChange={(e) => setBookTitle(e.target.value)}
              placeholder="책 제목"
              className="input-field"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              작가
            </label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="작가명"
              className="input-field"
            />
          </div>
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
            <Type size={16} />
            글씨체
          </label>
          <div className="grid grid-cols-4 gap-2">
            {FONT_OPTIONS.map((font) => (
              <button
                key={font.value}
                onClick={() => setFontFamily(font.value)}
                className={`px-3 py-2 rounded-lg text-sm border-2 transition-all ${
                  fontFamily === font.value
                    ? 'border-amber-500 bg-amber-50 text-amber-700'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
                style={{ fontFamily: font.value }}
              >
                {font.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
            <Palette size={16} />
            글씨 색상
          </label>
          <div className="flex gap-2">
            {['#ffffff', '#fcd34d', '#f87171', '#60a5fa', '#34d399'].map((color) => (
              <button
                key={color}
                onClick={() => setFontColor(color)}
                className={`w-10 h-10 rounded-full border-3 transition-all ${
                  fontColor === color ? 'ring-2 ring-offset-2 ring-amber-500' : ''
                }`}
                style={{ backgroundColor: color, border: '2px solid rgba(0,0,0,0.1)' }}
              />
            ))}
            <input
              type="color"
              value={fontColor}
              onChange={(e) => setFontColor(e.target.value)}
              className="w-10 h-10 rounded-full cursor-pointer"
            />
          </div>
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
            <Maximize2 size={16} />
            글씨 크기: {fontSize}px
          </label>
          <input
            type="range"
            min="16"
            max="48"
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="w-full accent-amber-500"
          />
        </div>

        <button
          onClick={handleDownload}
          disabled={isExporting || !quoteText}
          className="btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isExporting ? (
            <>
              <RefreshCw size={18} className="animate-spin" />
              저장 중...
            </>
          ) : (
            <>
              <Download size={18} />
              이미지 다운로드
            </>
          )}
        </button>

        {!quoteText && (
          <p className="text-xs text-gray-400 text-center">
            명언을 입력하면 다운로드 버튼이 활성화됩니다
          </p>
        )}
      </div>
    </div>
  );
}
