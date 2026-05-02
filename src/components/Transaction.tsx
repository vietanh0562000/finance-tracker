import { Trash2 } from 'lucide-react';

type TransactionItemProps = {
  id: Number;
  amount: Number;
  description: String;
  date: String;
  onDelete: Function;
};

export default function TransactionItem({
  id,
  amount,
  description,
  date,
  onDelete,
}: TransactionItemProps) {
  const isNegative = Number(amount) < 0;
  const formatted = `${isNegative ? '-' : '+'}$${Math.abs(Number(amount)).toFixed(2)}`;
  const initial = description.toString().charAt(0).toUpperCase();

  return (
    <div className="flex items-center gap-4 py-4 px-5 border-b border-caramel-500/10 hover:bg-amber-50/50 transition-colors">
      {/* Avatar */}
      <div className="w-12 h-12 rounded-full bg-amber-50 border border-caramel-500/15 flex items-center justify-center font-heading font-bold text-amber-900 flex-shrink-0">
        {initial}
      </div>

      {/* Meta */}
      <div className="flex-1 min-w-0">
        <p className="font-heading font-semibold text-amber-900 truncate">
          {description.toString()}
        </p>
        <p className="font-body text-sm text-caramel-500">{date.toString()}</p>
      </div>

      {/* Amount badge + delete */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <span
          className={`font-heading font-bold bg-gray-100 px-3 py-1.5 rounded-lg text-sm ${
            isNegative ? 'text-error' : 'text-success'
          }`}
        >
          {formatted}
        </span>
        <button
          onClick={() => onDelete(id)}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-error/60 hover:text-error hover:bg-error/10 transition-colors"
          aria-label="Delete transaction"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}
