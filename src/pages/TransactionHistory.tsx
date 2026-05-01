import { useEffect, useState } from 'react'
import { transactionApi } from '../services/api';
import TransactionItem from '../components/Transaction';
import type  { Transaction }  from '../models/Transaction';

export default function TransactionHistory(){
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        transactionApi.getAll().then(data => {
            setTransactions(data);
        })
        .catch(e => {
            console.error(e);
        })
    }, [])

    return <>
        {transactions.map(t => <TransactionItem
            key={t.id?.toString()} 
            amount={t.amount} 
            description={t.description}
            date={t.date} />)}
    </>
}