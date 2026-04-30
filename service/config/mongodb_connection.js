import { MongoClient } from 'mongodb';
import dotenv from 'dotenv'; //เรียกใช้ dotenv ผ่าน import
dotenv.config();
export async function connectToMongoDB() {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    listDatabases(client);
    console.log('Connected to MongoDB');
    const db =client.db(process.env.DB_NAME);
    return db;
  }
  export default connectToMongoDB;

  function listDatabases(client){
    client.db().admin().listDatabases().then(databasesList => {
        console.log("Databases:");
        databasesList.databases.forEach(db => console.log(` - ${db.name}`));
    });
  }
