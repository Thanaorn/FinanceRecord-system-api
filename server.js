import { handleTransaction } from './service/route/transaction.js'; //เรียกใช้ฟังก์ชัน handleTransaction จากไฟล์ transaction.js
import express from 'express'; //เรียกใช้ express ผ่าน import
import { connectToMongoDB } from './service/config/mongodb_connection.js'; //เรียกใช้ฟังก์ชัน connectToMongoDB จากไฟล์ mongodb_connection.js
import { handleAuth } from './service/route/auth.js';
import cors from 'cors'; //เรียกใช้ cors ผ่าน import
console.log('Server is running...'); //แสดงข้อความว่า Server กำลังทำงาน

async function main() {
    
    const myApp = express(); //สร้างตัวแปร myApp เพื่อใช้งาน express 
    myApp.use(cors()); //ใช้ cors เพื่ออนุญาตให้เข้าถึง API จากโดเมนอื่น
    myApp.use(express.json()); //ใช้ express.json() เพื่อแปลงข้อมูลที่ส่งมาจาก client เป็น JSON
    const port = 3000; //พอร์ตของ Server ที่ใช้ในการเปิด Localhost 
    
    // myApp.get('/', (req, res) => {
    //   res.send('Hello World!');
    //   console.log('Hello World!');
    // }); 
    const db = await connectToMongoDB();
    
    // db.collection('user').find({}).toArray().then(result => {
    //     console.log('Users = ',result);
    // });
    
    handleTransaction(myApp,db);
    handleAuth(myApp,db);
    
    myApp.listen(port, () => {
      console.log(`Server running at <http://localhost>:${port}/`);
    });
}

main();