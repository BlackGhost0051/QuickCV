import { Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";

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
            // need verify token !!!
            next();
        } catch (ex){
            return response.status(400).send('Invalid token.');
        }

    } else {
        return response.status(401).send('Access denied. No token provided.');
    }
}

export default verifyToken;