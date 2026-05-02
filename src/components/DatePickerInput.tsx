import { useEffect, useRef, useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

// ── helpers ──────────────────────────────────────────────────────────────────

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const DAY_LABELS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

function parseDate(s: string) {
  if (!s) return null;
  const [y, m, d] = s.split('-').map(Number);
  return { year: y, month: m - 1, day: d };
}

function toDateStr(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function formatDate(s: string) {
  const p = parseDate(s);
  if (!p) return '';
  return new Date(p.year, p.month, p.day).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  });
}

// ── calendar popup ────────────────────────────────────────────────────────────

type PopupProps = {
  value: string;
  onChange: (v: string) => void;
  onClose: () => void;
};

function CalendarPopup({ value, onChange, onClose }: PopupProps) {
  const today = new Date();
  const sel = parseDate(value);
  const init = sel ?? { year: today.getFullYear(), month: today.getMonth(), day: today.getDate() };

  const [year, setYear] = useState(init.year);
  const [month, setMonth] = useState(init.month);

  const prevMonth = () => {
    if (month === 0) { setYear(y => y - 1); setMonth(11); }
    else setMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (month === 11) { setYear(y => y + 1); setMonth(0); }
    else setMonth(m => m + 1);
  };

  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth  = new Date(year, month + 1, 0).getDate();
  const cells        = [
    ...Array<null>(firstWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div className="bg-white rounded-2xl border border-caramel-500/15 shadow-card p-3 w-72">
      {/* Month nav */}
      <div className="flex items-center justify-between mb-2 px-1">
        <button
          type="button"
          onClick={prevMonth}
          className="w-8 h-8 rounded-full flex items-center justify-center text-amber-900 hover:bg-amber-50 transition-colors"
        >
          <ChevronLeft size={16} />
        </button>
        <span className="font-heading font-bold text-sm text-amber-900">
          {MONTH_NAMES[month]} {year}
        </span>
        <button
          type="button"
          onClick={nextMonth}
          className="w-8 h-8 rounded-full flex items-center justify-center text-amber-900 hover:bg-amber-50 transition-colors"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Day-of-week headers */}
      <div className="grid grid-cols-7 mb-1">
        {DAY_LABELS.map(d => (
          <div key={d} className="h-7 flex items-center justify-center font-body font-medium text-xs text-caramel-500 uppercase">
            {d}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 gap-y-0.5">
        {cells.map((day, i) => {
          if (!day) return <div key={i} />;

          const isSelected = !!sel && sel.year === year && sel.month === month && sel.day === day;
          const isToday    = today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;

          return (
            <button
              key={i}
              type="button"
              onClick={() => { onChange(toDateStr(year, month, day)); onClose(); }}
              className={[
                'h-8 w-8 mx-auto rounded-full flex items-center justify-center font-body text-sm transition-colors',
                isSelected
                  ? 'bg-amber-400 text-amber-900 font-bold'
                  : isToday
                    ? 'border border-amber-400 text-amber-900 hover:bg-amber-50'
                    : 'text-amber-900 hover:bg-amber-50',
              ].join(' ')}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* Clear */}
      {value && (
        <div className="mt-3 pt-2 border-t border-caramel-500/10 text-center">
          <button
            type="button"
            onClick={() => { onChange(''); onClose(); }}
            className="text-xs font-body text-caramel-500 hover:text-error transition-colors"
          >
            Clear date
          </button>
        </div>
      )}
    </div>
  );
}

// ── main component ────────────────────────────────────────────────────────────

type DatePickerInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  /** 'form' = separate amber button; 'compact' = icon inside pill */
  variant?: 'form' | 'compact';
};

const pillBase =
  'bg-white border-[1.5px] border-amber-900 rounded-full flex items-center font-body cursor-pointer select-none transition-colors hover:border-amber-400';

export default function DatePickerInput({
  value,
  onChange,
  placeholder = 'Pick a date',
  required,
  variant = 'form',
}: DatePickerInputProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click or Escape
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

  const toggle = () => setOpen(o => !o);

  const displayText = value
    ? <span className="text-amber-900">{formatDate(value)}</span>
    : <span className="italic text-caramel-500/60">{placeholder}</span>;

  // Hidden input keeps form validation working
  const hiddenInput = (
    <input
      type="date"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      tabIndex={-1}
      className="sr-only"
    />
  );

  const popup = open && (
    <div className="absolute top-full left-0 mt-2 z-50">
      <CalendarPopup value={value} onChange={onChange} onClose={() => setOpen(false)} />
    </div>
  );

  if (variant === 'compact') {
    return (
      <div ref={containerRef} className="relative flex-1">
        <div
          className={`${pillBase} h-11 px-4 pr-10 text-sm`}
          onClick={toggle}
        >
          {displayText}
          <Calendar size={15} className="text-caramel-500 absolute right-3 top-1/2 -translate-y-1/2" />
        </div>
        {hiddenInput}
        {popup}
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative flex items-center gap-3">
      <div
        className={`${pillBase} flex-1 px-5 text-base`}
        style={{ height: '52px' }}
        onClick={toggle}
      >
        {displayText}
      </div>
      {hiddenInput}
      <button
        type="button"
        onClick={toggle}
        className={`w-12 h-12 rounded-xl flex items-center justify-center text-amber-900 transition-colors flex-shrink-0 ${open ? 'bg-caramel-500' : 'bg-amber-400 hover:bg-amber-600'}`}
      >
        <Calendar size={20} />
      </button>
      {popup}
    </div>
  );
}
