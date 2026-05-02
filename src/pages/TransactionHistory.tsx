import { useContext, useEffect } from 'react';
import { transactionApi } from '../services/api';
import TransactionItem from '../components/Transaction';
import TransactionSearchBar from '../components/TransactionSearchBar';
import PageTitle from '../components/PageTitle';
import { TransactionContext } from '../context/TransactionContext';

export default function TransactionHistory() {
  const transactionContext = useContext(TransactionContext);

  useEffect(() => {
    transactionApi
      .getAll()
      .then((data) => transactionContext?.setTransactions(data))
      .catch(console.error);
  }, []);

  const onDeleteTransaction = (id: number) => {
    transactionApi.delete(id).then(() => {
      const updated =
        transactionContext?.transactions.filter((t) => t.id !== id) ?? [];
      transactionContext?.setTransactions(updated);
    });
  };

  return (
    <div>
      <PageTitle before="TRANSACTION" highlight="HISTORY" />
      <TransactionSearchBar />

      {transactionContext?.transactions.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 py-20 px-5">
          <span className="text-5xl">📭</span>
          <p className="font-heading font-bold text-xl text-amber-900">No transactions yet</p>
          <p className="font-body text-sm text-caramel-500 text-center">
            Start tracking your finances by adding a transaction
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl mx-4 border border-caramel-500/15 shadow-card overflow-hidden">
          {transactionContext?.transactions.map((t) => (
            <TransactionItem
              key={t.id?.toString()}
              id={t.id ?? Number.NaN}
              amount={t.amount}
              description={t.description}
              date={t.date}
              onDelete={onDeleteTransaction}
            />
          ))}
        </div>
      )}
    </div>
  );
}
