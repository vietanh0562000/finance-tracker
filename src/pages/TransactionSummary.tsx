import { useContext, useEffect, useMemo } from 'react';
import { transactionApi } from '../services/api';
import { TransactionContext } from '../context/TransactionContext';
import PageTitle from '../components/PageTitle';

type StatCardProps = {
  emoji: string;
  label: string;
  amount: number;
  colorClass: string;
};

function StatCard({ emoji, label, amount, colorClass }: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-caramel-500/15 shadow-card p-4 flex flex-col gap-2">
      <span className="text-2xl">{emoji}</span>
      <p className="font-body font-medium text-xs uppercase tracking-wide text-caramel-500">
        {label}
      </p>
      <p className={`font-heading font-bold text-xl ${colorClass}`}>
        ${Math.abs(amount).toFixed(2)}
      </p>
    </div>
  );
}

export default function TransactionSummary() {
  const transactionContext = useContext(TransactionContext);

  useEffect(() => {
    transactionApi
      .getAll()
      .then((data) => transactionContext?.setTransactions(data))
      .catch(console.error);
  }, []);

  const { income, expense, balance } = useMemo(() => {
    const txns = transactionContext?.transactions ?? [];
    const income = txns
      .filter((t) => t.amount > 0)
      .reduce((sum, t) => sum + t.amount, 0);
    const expense = txns
      .filter((t) => t.amount < 0)
      .reduce((sum, t) => sum + t.amount, 0);
    return { income, expense, balance: income + expense };
  }, [transactionContext?.transactions]);

  return (
    <div>
      <PageTitle before="YOUR" highlight="FINANCES" />

      <div className="px-4 grid grid-cols-3 gap-3 mt-2">
        <StatCard
          emoji="📈"
          label="Income"
          amount={income}
          colorClass="text-success"
        />
        <StatCard
          emoji="📉"
          label="Expenses"
          amount={expense}
          colorClass="text-error"
        />
        <StatCard
          emoji="💰"
          label="Balance"
          amount={balance}
          colorClass={balance >= 0 ? 'text-amber-900' : 'text-error'}
        />
      </div>

      {transactionContext?.transactions.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 py-16 px-5">
          <span className="text-5xl">🌱</span>
          <p className="font-heading font-bold text-xl text-amber-900 text-center">
            No data yet
          </p>
          <p className="font-body text-sm text-caramel-500 text-center">
            Add your first transaction to see your financial overview
          </p>
        </div>
      ) : (
        <div className="px-4 mt-6">
          <h2 className="font-heading font-bold text-base uppercase tracking-wide text-caramel-500 mb-3">
            Recent Activity
          </h2>
          <div className="bg-white rounded-2xl border border-caramel-500/15 shadow-card overflow-hidden">
            {(transactionContext?.transactions ?? []).slice(0, 5).map((t) => {
              const isNeg = t.amount < 0;
              return (
                <div
                  key={t.id?.toString()}
                  className="flex items-center gap-3 py-3 px-4 border-b border-caramel-500/10 last:border-0"
                >
                  <div className="w-9 h-9 rounded-full bg-amber-50 border border-caramel-500/15 flex items-center justify-center font-heading font-bold text-amber-900 text-sm flex-shrink-0">
                    {t.description.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-heading font-semibold text-amber-900 text-sm truncate">
                      {t.description}
                    </p>
                    <p className="font-body text-xs text-caramel-500">{t.date}</p>
                  </div>
                  <span
                    className={`font-heading font-bold text-sm ${
                      isNeg ? 'text-error' : 'text-success'
                    }`}
                  >
                    {isNeg ? '-' : '+'}${Math.abs(t.amount).toFixed(2)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
