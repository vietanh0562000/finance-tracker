import { createContext, useState, type ReactNode } from "react";
import type { Transaction } from "../models/Transaction";

type TransactionContextType = {
    transactions: Transaction[];
    setTransactions: (transactions : Transaction[]) => void;
    addTransaction: (transaction : Transaction) => void;
}

export const TransactionContext =
  createContext<TransactionContextType | null>(null);

type Props = {
    children: ReactNode
};

export default function TransactionContextProvider({children} : Props){
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    const addTransaction = (transaction: Transaction) => {
        setTransactions([...transactions, transaction]);
    }

    return (
        <TransactionContext.Provider
            value={{
                transactions,
                setTransactions,
                addTransaction
            }}
        >
            {children}
        </TransactionContext.Provider>
    )
}

