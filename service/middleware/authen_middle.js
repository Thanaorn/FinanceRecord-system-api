import jwt from 'jsonwebtoken';
export function authenMiddle(req, res, next) {
    console.log('authenMidle function called');
    const authHeader = req.headers.authorization;
    console.log('authHeader = ',authHeader);
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log('No token provided');
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }
    const token = authHeader.split(' ')[1];
    try {
        // 4. ตรวจสอบ Token
        const decoded = jwt.verify(token, process.env.AUTHEN_SECRET_KEY);
        // เก็บข้อมูล user ไว้ใช้ต่อใน Controller
        req.user = decoded.user || decoded; 

        next();
    } catch (err) {
        console.error('JWT Error:', err.message);
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token expired' });
        }
        return res.status(401).json({ error: 'Invalid token' });
    }
}

export function generateToken(user,password){ 
    const token = jwt.sign({ email: user, password: password }, process.env.AUTHEN_SECRET_KEY, { expiresIn: '1h' }); 
    console.log('token = ',token);
    return token;
}