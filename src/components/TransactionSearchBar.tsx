import { useContext, useState } from 'react'
import { transactionApi } from '../services/api';
import { TransactionContext } from '../context/TransactionContext';

export default function TransactionSearchBar() {
    const [amount, setAmount] = useState<number>(Number.NaN);
    const [fromDate, setFromDate] = useState<string>();
    const [toDate, setToDate] = useState<string>();

    const transactionContext = useContext(TransactionContext);

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(Number(e.target.value));
    }

    const handleFromDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFromDate(e.target.value);
    }

    const handleToDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setToDate(e.target.value);
    }

    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        //Approach 1: Get all and filter
        transactionApi.getAll().then(data => {
            transactionContext?.setTransactions([]);
        })
        //TODO: Search in context
        //TODO: Call api to Search
        console.log('Searcing')
    }
    
    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type='number' value={amount} onChange={handleAmountChange} />
                <input type='date' value={fromDate} onChange={handleFromDateChange} />
                <input type='date' value={toDate} onChange={handleToDateChange}/>
                <button type='submit'>Search</button>
            </form>
        </>
    )
}