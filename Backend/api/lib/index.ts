import App from './app'
import CvController from "./controllers/cv.controller";
import UserController from "./controllers/user.controller";

const app: App = new App([
    new CvController(),
    new UserController()
]);

app.listen();