import { getUserController, createUserController , loginUserController } from "../controller/auth_controller.js";
 
export function handleAuth( app,db) {
    app.get('/auth', (req, res) => {
        res.send('Auth');
        console.log('Auth');
    });
    createUser(app,db);
    loginUser(app,db);
    readAllUser(app,db);
}

//create user
export function createUser( app,db) {
    app.post('/auth/register', (req, res) => {
        console.log('Create User');
        createUserController(db,req,res);
    });
}

//login user
export function loginUser( app,db) {
    app.post('/auth/login', (req, res) => {
        console.log('Login User');
        const result = loginUserController(db,req,res);
    });
}

export function readAllUser( app,db) {
    app.get('/auth/read', (req, res) => {
        console.log('Read User');
        const result = getUserController(db,res);
    });
}