import jwt from 'jsonwebtoken';
import {config} from "../../config";

interface JwtPayload{
    login: string;
    iat?: number;
    exp?: number;
}


class JwtService{

    generateToken(login: string){
        const payload: JwtPayload = { login };

        return jwt.sign(payload, config.JwtSecret, { expiresIn: '1d' });
    }

    verifyToken(token:string): JwtPayload{
        try {
            if(token.startsWith('token=')){
                token = token.slice(6, token.length);
            }

            return jwt.verify(token, config.JwtSecret) as JwtPayload;
        } catch (error) {
            throw new Error('Invalid or expired token');
        }
    }
}

export default JwtService;