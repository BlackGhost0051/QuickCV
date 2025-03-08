import Controller from '../interfaces/controller.interface';
import {Router, Request, Response, NextFunction, response} from "express";
import puppeteer from "puppeteer";
import jwtMiddleware from "../middlewares/jwt.middleware";

import CvService from "../modules/services/cv.service";

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

            response.status(201).send(htmlContent);
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