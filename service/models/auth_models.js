import dotenv from 'dotenv';
dotenv.config();

//read all users from the database
export function readUser(db) {
    console.log('readUser function called');

    const collection = db.collection(process.env.USER_COLLECTION);
    try{
        const result = collection.find().toArray();
        return result;
    }catch(err){
        console.error(err.message);
        throw err;
    }
  
}

export function createUser(db,data) {
    // TODO: Check if the email already exists in the database before creating a new user
    console.log('createUser function called');
    const collection = db.collection(process.env.USER_COLLECTION);
    try{
        let formatData = {
            email: data.email,
            password: data.password
        }
        console.log('formatData = ',formatData);
        const result = collection.insertOne(formatData);
        return result;
    }catch(err){
        console.error(err.message);
        throw err;
    }   

}

export function findUserByEmail(db,data) {
    console.log('findUserByEmail function called');
    const collection = db.collection(process.env.USER_COLLECTION);
    try{
        const result = collection.findOne({ email: data.email });
        console.log('findUserByEmail result = ',result);
        return result;
    }catch(err){
        console.error(err.message);
        throw err;
    }   
}

export function findUserByEmailAndPassword(db,data) {
    console.log('findUserByEmailAndPassword function called');
    const collection = db.collection(process.env.USER_COLLECTION);
    try{
        const result = collection.findOne({ email: data.email, password: data.password });
        return result;
    }catch(err){
        console.error(err.message);
        throw err;
    }   
}