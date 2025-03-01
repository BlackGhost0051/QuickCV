import { Request, Response, NextFunction } from "express";


const verifyAdmin = ( request: Request, response: Response, next: NextFunction) => {
    let token = request.headers['x-auth-token'] || request.headers['authorization'];

    if (!token) {
        token = request.cookies?.token;
    }

    if(token && typeof token === 'string'){
        if (token.startsWith('Bearer ')){
            token = token.slice(7, token.length);
        }

        try{
            console.log("ADMIN ", token);
            // need verify token and user isAdmin !!!
            next();
        } catch (ex){
            return response.status(400).send('Invalid token.');
        }

    } else {
        return response.status(401).send('Access denied. No token provided.');
    }
}

export default verifyAdmin;