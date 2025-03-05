import Controller from "../interfaces/controller.interface";
import {Request, Response, Router} from "express";
import DatabaseService from "../modules/services/database.service";
import PasswordService from "../modules/services/password.service";
import logRequestMiddleware from "../middlewares/logRequest.middleware";
import JwtService from "../modules/services/jwt.service";
import adminMiddleware from "../middlewares/admin.middleware";
import jwtMiddleware from "../middlewares/jwt.middleware";

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
        this.router.get(`${this.path}/get_all_users`, adminMiddleware, this.get_all_users.bind(this));

        this.router.post(`${this.path}/auth`, this.authenticate.bind(this));
        this.router.post(`${this.path}/register`, this.register.bind(this));

        this.router.patch(`${this.path}/change_password`, jwtMiddleware, this.changePassword.bind(this));

        this.router.delete(`${this.path}/delete_user`, adminMiddleware, this.delete_user.bind(this));
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

    private async changePassword(request: Request, response: Response){ // need test !!!
        const { login, oldPassword, newPassword } = request.body;

        if (!login || !oldPassword || !newPassword) {
            return response.status(400).send("All fields are required.");
        }

        try{
            await this.dbService.connect();
            const user = await this.dbService.getUserByLogin(login);


            if (!user) {
                return response.status(404).send("User not found.");
            }

            const passwordMatch = await this.passwordService.comparePassword(oldPassword, user.password);
            if (!passwordMatch) {
                return response.status(401).send("Old password is incorrect.");
            }

            await this.dbService.updateUser(login, newPassword);
            response.status(200).send("Password updated successfully.");
        } catch (error){
            response.status(500).send(`Error changing password: ${error}`);
        }
    }

    private async delete_user(request: Request, response: Response){
        const { login } = request.body;

        if(!login){
            return response.status(400).send("Login is required.");
        }

        try{
            await this.dbService.connect();


            const user = await this.dbService.getUserByLogin(login);

            if (!user) {
                return response.status(404).send("User not found.");
            }

            await this.dbService.deleteUser(login);
            response.status(200).send("User deleted successfully.");
        } catch (error){
            response.status(500).send(`Error deleting user: ${error}`);
        }
    }

    private async get_all_users(request: Request, response:Response){
        try{
            await this.dbService.connect();
            const users = await this.dbService.getAllUsers();

            response.status(200).json(users);
        } catch (error) {
            response.status(500).send(`Error retrieving users: ${error}`);
        }
    }
}

export default UserController;