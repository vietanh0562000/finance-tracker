import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Category } from '../models/Category';

const EMOJI: Record<string, string> = {
  FOOD: '🍔',
  DRINK: '🥤',
  STUDY: '📚',
  WORK: '💼',
  TRAVEL: '✈️',
};

function label(cat: string) {
  return cat.charAt(0) + cat.slice(1).toLowerCase();
}

type CategoryInputProps = {
  value: string;
  onChange: (value: string) => void;
};

const pillBase =
  'bg-white border-[1.5px] border-amber-900 rounded-full flex items-center font-body cursor-pointer select-none transition-colors hover:border-amber-400';

export default function CategoryInput({ value, onChange }: CategoryInputProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const categories = Category.getAll();

  useEffect(() => {
    if (!open) return;
    const onMouseDown = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      {/* Trigger pill */}
      <div
        className={`${pillBase} px-5 text-base justify-between`}
        style={{ height: '52px' }}
        onClick={() => setOpen(o => !o)}
      >
        {value ? (
          <span className="flex items-center gap-2 text-amber-900">
            <span>{EMOJI[value] ?? '🏷️'}</span>
            <span>{label(value)}</span>
          </span>
        ) : (
          <span className="italic text-caramel-500/60">Select category</span>
        )}
        <ChevronDown
          size={18}
          className={`text-caramel-500 flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-white rounded-2xl border border-caramel-500/15 shadow-card overflow-hidden">
          {categories.map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => { onChange(cat); setOpen(false); }}
              className={`w-full flex items-center gap-3 px-5 py-3 font-body text-base transition-colors border-b border-caramel-500/10 last:border-0 ${
                value === cat
                  ? 'bg-amber-400/20 text-amber-900 font-semibold'
                  : 'text-amber-900 hover:bg-amber-50'
              }`}
            >
              <span className="text-xl w-7">{EMOJI[cat] ?? '🏷️'}</span>
              <span className="flex-1 text-left">{label(cat)}</span>
              {value === cat && <span className="text-amber-400 font-bold text-sm">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
