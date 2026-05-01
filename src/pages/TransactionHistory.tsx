import { useContext, useEffect} from 'react'
import { transactionApi } from '../services/api';
import TransactionItem from '../components/Transaction';
import TransactionSearchBar from '../components/TransactionSearchBar';
import { TransactionContext } from '../context/TransactionContext';

export default function TransactionHistory() {
    const transactionContext = useContext(TransactionContext);

    useEffect(() => {
        transactionApi.getAll().then(data => {
            transactionContext?.setTransactions(data);
        })
        .catch(e => {
            console.error(e);
        })
    }, [])

    return (
        <div className="page-container">
            <h1 className="page-title">Transaction History</h1>
            <TransactionSearchBar />
            <div className="transaction-list">
                {transactionContext?.transactions.map(t => (
                    <TransactionItem
                        key={t.id?.toString()}
                        amount={t.amount}
                        description={t.description}
                        date={t.date}
                    />
                ))}
            </div>
        </div>
    );
}
