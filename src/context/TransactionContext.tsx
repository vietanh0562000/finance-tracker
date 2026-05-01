import { createContext, useState, type ReactNode } from "react";
import type { Transaction } from "../models/Transaction";

type TransactionContextType = {
    transactions: Transaction[];
    setTransactions: (transactions : Transaction[]) => void;
}

export const TransactionContext =
  createContext<TransactionContextType | null>(null);

type Props = {
    children: ReactNode
};

export default function TransactionContextProvider({children} : Props){
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    return (
        <TransactionContext.Provider
            value={{
                transactions,
                setTransactions
            }}
        >
            {children}
        </TransactionContext.Provider>
    )
}

