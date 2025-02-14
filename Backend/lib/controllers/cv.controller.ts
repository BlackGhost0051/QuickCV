import Controller from '../interfaces/controller.interface';
import {Router, Request, Response, NextFunction} from "express";
import puppeteer from "puppeteer";

class CvController implements Controller{
    public path = '/cv';
    public router = Router();


    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/generate-pdf`, this.generate_pdf);
    }


    private generate_pdf = async (request: Request, response: Response) => {
        try {

        } catch (error) {
            console.error("Error generating PDF:", error);
            response.status(500).json({ error: "Failed to generate PDF" });
        }
    };
}

export default CvController;