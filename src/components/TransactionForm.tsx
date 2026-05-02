import { useContext, useState } from 'react';
import { transactionApi } from '../services/api.ts';
import type { Transaction } from '../models/Transaction';
import { TransactionContext } from '../context/TransactionContext.tsx';
import DatePickerInput from './DatePickerInput';
import CategoryInput from './CategoryInput.tsx';

type TransactionType = 'expense' | 'income';

export default function TransactionForm() {
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState<TransactionType>('expense');

  const transactionContext = useContext(TransactionContext);

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const signedAmount = type === 'expense' ? -Math.abs(amount) : Math.abs(amount);
    const newTransaction: Transaction = {
      amount: signedAmount,
      description,
      date,
      category
    };

    transactionApi
      .create(newTransaction)
      .then((data) => {
        transactionContext?.addTransaction(data);
        setAmount(0);
        setDescription('');
        setDate('');
      })
      .catch(console.error);
  };

  const inputClass =
    'flex-1 h-13 px-5 bg-white border-[1.5px] border-amber-900 rounded-full font-body text-amber-900 placeholder:text-caramel-500/60 placeholder:italic focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30 outline-none transition-all duration-200 text-base';

  return (
    <form onSubmit={handleSubmit} className="px-5 pt-4 space-y-5">
      {/* Type toggle */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => setType('expense')}
          className={`px-6 py-2.5 rounded-full font-heading font-bold text-sm transition-colors ${
            type === 'expense'
              ? 'bg-amber-400 text-amber-900'
              : 'bg-gray-100 text-gray-400'
          }`}
        >
          Expense
        </button>
        <button
          type="button"
          onClick={() => setType('income')}
          className={`px-6 py-2.5 rounded-full font-heading font-bold text-sm transition-colors ${
            type === 'income'
              ? 'bg-amber-400 text-amber-900'
              : 'bg-gray-100 text-gray-400'
          }`}
        >
          Income
        </button>
      </div>

      <div className="border-t-2 border-amber-900" />

      {/* Description */}
      <div className="flex items-center gap-3">
        <input
          className={inputClass}
          style={{ height: '52px' }}
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Expense's name"
          required
        />
      </div>

      {/* Category */}

      <CategoryInput value={category} onChange={setCategory}/>

      {/* Amount */}
      <div className="flex items-center gap-3">
        <input
          className={inputClass}
          style={{ height: '52px' }}
          type="number"
          step="0.01"
          min="0"
          value={amount || ''}
          onChange={(e) => setAmount(Number(e.target.value))}
          placeholder="Amount"
          required
        />
      </div>

      {/* Date */}
      <DatePickerInput
        value={date}
        onChange={setDate}
        placeholder="Fill in the date"
        required
      />

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-amber-400 hover:bg-amber-600 active:bg-caramel-500 active:scale-[0.98] rounded-full font-heading font-bold text-lg text-amber-900 shadow-md transition-all duration-200"
        style={{ height: '56px' }}
      >
        Add Transaction
      </button>
    </form>
  );
}
