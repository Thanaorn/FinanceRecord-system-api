import dotenv from 'dotenv';
dotenv.config();

//read all transactions from the database
export function readTransaction(db,email) {
    console.log('readTransaction function called');

    const collection = db.collection(process.env.TRANSACTION_COLLECTION);
    try{
        const result = collection.findOne({ email: email });
        return result;
    }catch(err){
        console.error(err.message);
        throw err;
    }
  
}

export function createTransaction(db,data) {
    console.log('createTransaction function called');
    const collection = db.collection(process.env.TRANSACTION_COLLECTION);

    try{
        let formatData = {
            email: data.user,
        }
        const formatTransactions = {
            category: data.category,
            amount: data.amount,
            date: data.date,
        }
        console.log('formatTransactions = ',formatTransactions);
        const result = collection.updateOne(
            { email: data.email },
            { $push: { transactions: { $each: [formatTransactions] } } }
        );
        return result;  
    }catch(err){
        console.error(err.message);
        throw err;
    }   

}
