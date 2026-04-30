import { handleTransaction } from './service/route/transaction.js';
import express from 'express';
import { connectToMongoDB } from './service/config/mongodb_connection.js';
import { handleAuth } from './service/route/auth.js';
import cors from 'cors';
console.log('Server is running...');
async function main() {
    
    const myApp = express();
    myApp.use(cors()); 
    myApp.use(express.json()); 
    const port = 3000; 
    const db = await connectToMongoDB();
    
    handleTransaction(myApp,db);
    handleAuth(myApp,db);
    
    myApp.listen(port, () => {
      console.log(`Server running at <http://localhost>:${port}/`);
    });
}

main();