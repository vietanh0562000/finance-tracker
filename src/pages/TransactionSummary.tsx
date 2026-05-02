import { useContext, useMemo, useState } from "react";
import { TransactionContext } from "../context/TransactionContext";

export default function TransactionSummary(){
    const transactionContext = useContext(TransactionContext);

    const total = useMemo(() => {
        return transactionContext?.transactions.map(transaction => transaction.amount)
            .reduce((acc, curr) => {
                return acc + curr;
            });
        
    }, [transactionContext?.transactions])

    return (
        <>
            <p>{total}</p>
        </>
    )
}