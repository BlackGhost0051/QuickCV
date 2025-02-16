import express from 'express';
import {config} from "./config";
import Controller from "./interfaces/controller.interface";
import bodyParser from "body-parser";


class App{
    public app: express.Application;

    constructor(controllers: Controller[]) {
        this.app = express();

        this.initializeMiddlewares();
        this.initializeControllers(controllers);
    }

    private initializeControllers(controllers: Controller[]): void {
        controllers.forEach((controller) => {
            this.app.use('/', controller.router);
        });
    }

    private initializeMiddlewares(): void{
        this.app.use(bodyParser.json());
    }

    public listen(): void {
        this.app.listen(config.port, () => {
            console.log(`App listen on the port: ${config.port}`);
        });
    }
}

export default App;