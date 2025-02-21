import { Request, Response, NextFunction} from "express";

const verifyToken = (request: Request, response: Response, next: NextFunction)=> {
    let token = request.headers['x-auth-token'] || request.headers['authorization'];

    if (!token) {
        token = request.cookies.token;
    }
}

export default verifyToken;