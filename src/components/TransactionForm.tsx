import { useContext, useState } from 'react';
import { transactionApi } from '../services/api.ts'
import type { Transaction } from '../models/Transaction';
import { TransactionContext } from '../context/TransactionContext.tsx';

export default function TransactionForm() {
    const [amount, setAmount] = useState(0);
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");

    const transactionContext = useContext(TransactionContext);

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(Number(e.target.value));
    }

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value);
    }

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDate(e.target.value);
    }

    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newTransaction: Transaction = {
            amount: amount,
            description: description,
            date: date
        }

        transactionApi.create(newTransaction).then(data => {
            transactionContext?.addTransaction(data);
        })
        .catch(e => {
            console.log(e);
        });
    }

    return (
        <form className="transaction-form" onSubmit={handleSubmit}>
            <div className="form-field">
                <label htmlFor="amount">Amount</label>
                <input
                    id="amount"
                    name="amount"
                    type="number"
                    step="0.01"
                    value={amount}
                    onChange={handleAmountChange}
                    placeholder="0.00"
                />
            </div>
            <div className="form-field">
                <label htmlFor="description">Description</label>
                <input
                    id="description"
                    name="description"
                    value={description}
                    onChange={handleDescriptionChange}
                    placeholder="e.g. Groceries"
                />
            </div>
            <div className="form-field">
                <label htmlFor="date">Date</label>
                <input
                    id="date"
                    name="date"
                    type="date"
                    value={date}
                    onChange={handleDateChange}
                />
            </div>
            <button type="submit" className="submit-btn">Add Transaction</button>
        </form>
    );
}
