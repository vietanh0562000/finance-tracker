import { useState } from 'react';
import { transactionApi } from '../services/api.ts'
import type { Transaction } from '../models/Transaction';

export default function TransactionForm(){
    const [amount, setAmount] = useState(0);
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    
    const handleAmountChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setAmount(Number(e.target.value));
    }

    const handleDescriptionChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value);
    }

    const handleDateChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setDate(e.target.value);
    }

    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        var newTransaction : Transaction = {
            amount: amount,
            description: description,
            date: date
        }

        transactionApi.create(newTransaction).then(data => {
            console.log(`Add ${data} successful`);
        })
        .catch(e => {
            console.log(e);
        });
        
    }
    return (
    <>
         <form onSubmit={handleSubmit}>
            <input name="Amount transaction" value={amount} onChange={handleAmountChange} />
            <input name="Description" value={description} onChange={handleDescriptionChange}/>
            <input name="Date" type='date' value={date} onChange={handleDateChange} />
            <button type="submit">Submit</button>
        </form>
    </>);
   
}