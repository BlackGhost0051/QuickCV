import Controller from "../interfaces/controller.interface";
import {Router} from "express";


class UserController implements Controller{
    public path = '/user';
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}/auth`, this.authenticate);
        this.router.post(`${this.path}/register`, this.register);

        this.router.patch(`${this.path}/change-password`, this.changePassword);
    }

    private authenticate(){

    }

    private register(){

    }

    private changePassword(){

    }
}

export default UserController;