import Controller from '../interfaces/controller.interface';
import {Router, Request, Response, NextFunction} from "express";

class CvController implements Controller{
    public path = '/cv';
    public router = Router();


    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/generate`, this.generate);
    }


    private generate = async (request: Request, response: Response) => {
        return response.status(200).json({ message: "TEST" });
    };
}

export default CvController;