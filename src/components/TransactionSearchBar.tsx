import { useContext, useState } from 'react';
import { Search } from 'lucide-react';
import { transactionApi } from '../services/api';
import { TransactionContext } from '../context/TransactionContext';
import type { Transaction } from '../models/Transaction';

type FilterType = 'all' | 'income' | 'expense';

export default function TransactionSearchBar() {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [filterType, setFilterType] = useState<FilterType>('all');

  const transactionContext = useContext(TransactionContext);

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    transactionApi.getAll().then((data) => {
      const transactions = data as Transaction[];
      const filtered = transactions.filter((t) => {
        if (fromDate && t.date < fromDate) return false;
        if (toDate && t.date > toDate) return false;
        if (filterType === 'income' && t.amount <= 0) return false;
        if (filterType === 'expense' && t.amount >= 0) return false;
        return true;
      });
      transactionContext?.setTransactions(filtered);
    });
  };

  const pillBase = 'px-5 py-2 rounded-full font-heading font-bold text-sm transition-colors';
  const activePill = `${pillBase} bg-amber-400 text-amber-900`;
  const inactivePill = `${pillBase} bg-gray-100 text-gray-400 hover:bg-amber-100`;

  const inputClass =
    'flex-1 px-5 bg-white border-[1.5px] border-amber-900 rounded-full font-body text-amber-900 placeholder:text-caramel-500/60 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30 outline-none transition-all text-sm';

  return (
    <form onSubmit={handleSubmit} className="px-5 pt-2 pb-4 space-y-3">
      {/* Type filter pills */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        {(['all', 'income', 'expense'] as FilterType[]).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilterType(f)}
            className={filterType === f ? activePill : inactivePill}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Date range */}
      <div className="flex gap-2">
        <input
          className={inputClass}
          style={{ height: '44px' }}
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          placeholder="From"
        />
        <input
          className={inputClass}
          style={{ height: '44px' }}
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          placeholder="To"
        />
        <button
          type="submit"
          className="w-11 h-11 bg-amber-400 rounded-xl flex items-center justify-center text-amber-900 hover:bg-amber-600 transition-colors flex-shrink-0"
        >
          <Search size={18} />
        </button>
      </div>
    </form>
  );
}
