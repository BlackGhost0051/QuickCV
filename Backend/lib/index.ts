import App from './app'
import CvController from "./controllers/cv.controller";

const app: App = new App([
    new CvController()
]);

app.listen();