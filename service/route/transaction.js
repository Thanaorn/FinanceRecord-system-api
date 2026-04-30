import { getUserTransactionController, createTransactionController } from '../controller/transaction_controller.js';
export function handleTransaction( app,db) {
    app.get('/transaction', (req, res) => {
        res.send('Transaction');
        console.log('Transaction');
    });
    getUserTransaction(app,db);
    createUserTransaction(app,db);
}

export function getUserTransaction(app,db) {
    app.post('/transaction/get', (req, res) => {
        console.log('Get User Transaction');
        const result = getUserTransactionController(db,req,res);
    });
}

export function createUserTransaction(app,db) {
    app.post('/transaction/create', (req, res) => {
        console.log('Create User Transaction');
        const result = createTransactionController(db,req,res);
    });
}

