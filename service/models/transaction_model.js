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
            id : crypto.randomUUID(),
            category: data.category,
            amount: data.amount,
            date: data.date,
        }
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

export function deleteTransaction(db,data) {
    console.log('deleteTransaction function called');
    const collection = db.collection(process.env.TRANSACTION_COLLECTION);
    try{
        const result = collection.updateOne({ email: data.email }, { $pull: { transactions: { id: data.id } } });
        return result;
    }catch(err){
        console.error(err.message);
        throw err;
    }
}

export function createBaseTransaction(db,data) {
    console.log('createBaseTransaction function called');
    const collection = db.collection(process.env.TRANSACTION_COLLECTION);
    const formatData = {
        email: data.email,
        transactions: []
    }
    try{
        const result = collection.insertOne(data);
        return result;
    }catch(err){
        console.error(err.message);
        throw err;
    }
}
