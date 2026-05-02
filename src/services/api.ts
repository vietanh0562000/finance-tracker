import axios from 'axios'
import type { Transaction } from '../models/Transaction';

const API_URL = 'http://localhost:3001'

export const transactionApi = {
    getAll : async () => {
        const res = await axios.get(`${API_URL}/transactions`);

        return res.data;
    },

    create : async (newTransaction: Transaction) => {
        const res = await axios.post(`${API_URL}/transactions`, newTransaction);
        return res.data;
    },

    delete : async (id: number) => {
        const res = await axios.delete(`${API_URL}/transactions/${id}`);
        return res.data;
    }
}