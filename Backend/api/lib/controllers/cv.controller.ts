import Controller from '../interfaces/controller.interface';
import {Router, Request, Response, NextFunction, response} from "express";
import puppeteer from "puppeteer";
import jwtMiddleware from "../middlewares/jwt.middleware";

import CvService from "../modules/services/cv.service";
import fetch from 'node-fetch';

class CvController implements Controller{
    public path = '/api/cv';
    public router = Router();
    private cvService: CvService;


    constructor() {
        this.initializeRoutes();

        this.cvService = new CvService();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/get_all_forms`, jwtMiddleware, this.get_all_forms)

        this.router.post(`${this.path}/generate-pdf`, jwtMiddleware ,this.generate_pdf);

        this.router.post(`${this.path}/get_form`, jwtMiddleware, this.get_form);

        // test
        this.router.get(`${this.path}/statistics`, this.get_statistic.bind(this));
    }

    private async get_statistic(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await fetch('https://data.montgomerycountymd.gov/api/views/48wg-fkab/rows.json?accessType=DOWNLOAD');

            if (!response.ok) {
                return res.status(response.status).json({ error: 'Failed to fetch data' });
            }

            const data = await response.json();
            return res.status(200).json(data);
        } catch (error) {
            console.error('Error fetching data:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }


    private generate_pdf = async (request: Request, response: Response) => {
        try {
            const { userData, formId } = request.body;

            if (!userData || typeof formId !== "number") {
                return response.status(400).json({ error: "Invalid request format" });
            }

            const pdfUint8Array = await this.cvService.generateCVPDF(userData, formId);

            response.setHeader("Content-Type", "application/pdf");
            response.setHeader("Content-Disposition", "attachment; filename=cv.pdf");

            // Convert Uint8Array to Buffer before sending
            response.send(Buffer.from(pdfUint8Array));
        } catch (error) {
            console.error("Error generating PDF:", error);
            response.status(500).json({ error: "Failed to generate PDF" });
        }
    };

    private get_form = async (request: Request, response: Response) => {
        try {
            const { userData, formId } = request.body;

            if(!userData || typeof formId !== "number"){
                return response.status(400).json({ error: "Invalid request format" });
            }

            const htmlContent = this.cvService.generateCVHTML(userData, formId);

            response.status(200).json(htmlContent);
        } catch (error) {
            response.status(500).json({ error: "Failed to generate CV form" });
        }
    }

    private get_all_forms = async (request: Request, response: Response) => {
        try{
            response.status(201).json(this.cvService.getAllForms());
        } catch (error) {
            response.status(500).json({ error: "Failed to get CV forms" });
        }
    }
}

export default CvController;