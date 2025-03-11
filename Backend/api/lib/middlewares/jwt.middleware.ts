import { Request, Response, NextFunction} from "express";
import JwtService from "../modules/services/jwt.service";
import jwt from "jsonwebtoken";

const jwtService = new JwtService();

const verifyToken = (request: Request, response: Response, next: NextFunction)=> {
    let token = request.headers['x-auth-token'] || request.headers['authorization'];

    if (!token) {
        token = request.cookies?.token;
    }

    if(token && typeof token === 'string'){
        if (token.startsWith('Bearer ')){
            token = token.slice(7, token.length);
        }

        try{
            console.log("TOKEN ==== ", token);


            const decoded = jwtService.verifyToken(token);


            next();
        } catch (ex){
            return response.status(400).json({ error: 'Invalid token.' });
        }

    } else {
        return response.status(401).json({ error: 'Access denied. No token provided.' });
    }
}

export default verifyToken;