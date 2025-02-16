import Controller from "../interfaces/controller.interface";
import {Request, Response, Router} from "express";
import DatabaseService from "../modules/services/database.service";


class UserController implements Controller{
    public path = '/user';
    public router = Router();
    private dbService: DatabaseService;

    constructor() {
        this.dbService = new DatabaseService();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`/test`, this.test.bind(this));

        this.router.post(`${this.path}/auth`, this.authenticate);
        this.router.post(`${this.path}/register`, this.register.bind(this));

        this.router.patch(`${this.path}/change-password`, this.changePassword);
    }

    private async test(request: Request, responce: Response){
        try{

            await this.dbService.connect();
            responce.status(200).send('Database connection successful!');
        } catch (error){
            responce.status(500).send(`Failed to connect to the database : ${error}`);
        }
    }

    private authenticate(){

    }

    private async register(request: Request, response: Response){
        const { login, password } = request.body;

        if(!login || !password){
            return response.status(400).send("Login and password are required.");
        }


        try{
            await this.dbService.connect();

            const existingUser = await this.dbService.getUserByLogin(login);

            if(existingUser){
                return response.status(400).send("User with this login already exists.");
            }

            await this.dbService.addUser(login,password);
            response.status(201).send("User registered successfully!");
        } catch (error){
            response.status(500).send(`Error during registration: ${error}`);
        }
    }

    private changePassword(){

    }
}

export default UserController;