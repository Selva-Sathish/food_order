import jwt from 'jsonwebtoken';
import dotenv from '@dotenvx/dotenvx';

dotenv.config();


export function authentication(req, res, next){
    const authHeader = req.headers['Authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if(!token){
        return res.status(401).json({message : "Token was missing"});
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
        if(err) {
            return res.status(403).json({message: "Invalid or Token expired"})
        }

        req.user = decode;
        next();
    })
}