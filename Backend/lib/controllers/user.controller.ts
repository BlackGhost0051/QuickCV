import Controller from "../interfaces/controller.interface";
import {Request, Response, Router} from "express";
import DatabaseService from "../modules/services/database.service";
import PasswordService from "../modules/services/password.service";
import logRequestMiddleware from "../middlewares/logRequest.middleware";
import JwtService from "../modules/services/jwt.service";

class UserController implements Controller{
    public path = '/user';
    public router = Router();
    private dbService: DatabaseService;
    private passwordService: PasswordService;
    private jwtService: JwtService;

    constructor() {
        this.dbService = new DatabaseService();
        this.passwordService = new PasswordService();
        this.jwtService = new JwtService();

        this.router.use(logRequestMiddleware);
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}/auth`, this.authenticate.bind(this));
        this.router.post(`${this.path}/register`, this.register.bind(this));

        this.router.patch(`${this.path}/change-password`, this.changePassword);
    }


    private async authenticate(request: Request, response: Response){
        const { login, password } = request.body;

        if(!login || !password){
            return response.status(400).send("Login and password are required.");
        }


        try{
            await this.dbService.connect();
            const user = await this.dbService.getUserByLogin(login);

            if (!user) {
                return response.status(404).send("User not found.");
            }

            const passwordMatch = await this.passwordService.comparePassword(password, user.password);

            if(!passwordMatch){
                return response.status(401).send("Invalid credentials.");
            }

            const token = this.jwtService.generateToken(login);
            console.log("Token = " + token);

            // const decoded = this.jwtService.verifyToken(token);
            // console.log("Decode login = " + decoded.login);

            response.cookie("token", token, { httpOnly: true, secure: true });
            response.status(200).send("Authentication successful!");
        } catch (error){
            response.status(500).send(`Error during authentication: ${error}`);
        }
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