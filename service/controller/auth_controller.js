import { readUser,createUser,findUserByEmail,findUserByEmailAndPassword } from "../models/auth_models.js";
export async function getUserController(db,res) {
    try{
        const result = await readUser(db);
        let user = [];
        for (let i = 0; i < result.length; i++) {
            user.push(result[i].user);
            console.log('user = ',user[i]);
        }
        res.status(200).json({ users: user });
        return result;
    }catch(err){
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
        throw err;
    }
}

export async function createUserController(db,req,res) {
    if (!req) {
        return res.status(400).json({ error: 'Invalid request' });
    }else{
        let data = req.body;
        //check if the email already exists in the database before creating a new user
        let emailExists = false;
        findUserByEmail(db,data).then(result => {
            if(result){
                res.status(409).json({ error: 'User already exists' });
                emailExists = true;
            }else{
                console.log('Go to Create User');
            }
        }).catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
            throw err;
        });

        //create a new user
        if(!emailExists){
            createUser(db,data).then(result => {
                console.log('Create User Success = ',result);
                res.status(201).json({ message: 'User created successfully' });
                return;
            }).catch(err => {
                console.error(err);
                res.status(500).json({ error: 'Internal Server Error' });
                throw err;
            });
        }
    }
}

export async function loginUserController(db,req,res) {
    if (!req) {
        return res.status(400).json({ error: 'Invalid request' });
    }else{
        let data = req.body;
        findUserByEmailAndPassword(db,data).then(result => {
            console.log('result = ',result);
            if(result){
                console.log('Login Success');
                return res.status(200).json({ message: 'Login successful' });
            }else{
                return res.status(401).json({ error: 'Invalid email or password' });
            }
        }).catch(err => {
            console.error("err:",err);
            return res.status(500).json({ error: 'Internal Server Error' });
            throw err;
        })
    
        
    }
}