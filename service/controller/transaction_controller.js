import { readTransaction,createTransaction } from '../models/transaction_model.js';

export async function getUserTransactionController(db,req,res) {
    try{
        console.log('Get User Transaction');
        const data = req.body;
        const result = await readTransaction(db,data.email);
        console.log('result = ',result);
        console.log('result.transactions = ',result.transactions);
        const transactions = [];
        for (let i = 0; i < result.transactions.length; i++) {
            transactions.push(result.transactions[i]);
        }
        console.log('transactions = ',transactions);
        res.status(200).json({ transactions: transactions });
        return result;
    }catch(err){
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
        throw err;
    }
}

export async function createTransactionController(db,req,res) {
    try{
        console.log('Create User Transaction');
        const data = req.body;
        console.log('data = ',data);
        const result = await createTransaction(db,data);
        console.log('result = ',result);
        res.status(200).json({ message: 'Transaction created successfully' });
        return result;
    }catch(err){
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
        throw err;
    }
}

