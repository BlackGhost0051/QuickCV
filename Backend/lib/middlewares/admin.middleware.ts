import { Request, Response, NextFunction } from "express";
import JwtService from "../modules/services/jwt.service";
import DatabaseService from "../modules/services/database.service";

const jwtService = new JwtService();
const databaseService = new DatabaseService();

const verifyAdmin = async ( request: Request, response: Response, next: NextFunction) => {
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

            const decoded = jwtService.verifyToken(token);
            const login: string = decoded.login;


            await databaseService.connect();
            const isAdmin = await databaseService.isAdmin(login);


            if(!isAdmin){
                return response.status(403).json({ error: "Access denied. Admins only." });
            }


            next();
        } catch (ex){
            return response.status(400).send('Invalid token.');
        }

    } else {
        return response.status(401).send('Access denied. No token provided.');
    }
}

export default verifyAdmin;