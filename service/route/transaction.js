import { 
    deleteTransactionController, 
    getUserTransactionController, 
    createTransactionController 
} 
    from '../controller/transaction_controller.js';

import { authenMiddle } from '../middleware/authen_middle.js';
export function handleTransaction( app,db) {
    app.get('/transaction', (req, res) => {
        res.send('Transaction');
        console.log('Transaction');
    });
    getUserTransaction(app,db);
    createUserTransaction(app,db);
    deleteUserTransaction(app,db);
}

export function getUserTransaction(app,db) {
    app.post('/transaction/get',authenMiddle,(req, res) => {
        console.log('Get User Transaction');
        const result = getUserTransactionController(db,req,res);
    });
}

export function createUserTransaction(app,db) {
    app.post('/transaction/create',authenMiddle, (req, res) => {
        console.log('Create User Transaction');
        const result = createTransactionController(db,req,res);
    });
}

export function deleteUserTransaction(app,db) {
    app.post('/transaction/delete',authenMiddle, (req, res) => {
        console.log('Delete User Transaction');
        const result = deleteTransactionController(db,req,res);
    });
}

