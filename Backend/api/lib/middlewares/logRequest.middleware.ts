import { Request, Response, NextFunction} from "express";

const logRequestMiddleware = (request: Request, response: Response, next: NextFunction)=> {
    const method = request.method;
    const url = request.originalUrl;

    const now = new Date()
    const time = now.toLocaleTimeString("en-GB", { hour12: false });
    const year = now.getFullYear();

    const timestamp = `${time} - ${year}`;

    console.log(`\x1b[33m[${timestamp}]\x1b[0m ${method} ${url}`);
    next();
}

export default logRequestMiddleware;