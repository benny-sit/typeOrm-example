import * as express from "express";
import { StudentRoutes } from "./routes";


const router = express.Router();

StudentRoutes.forEach(route => {
    router[route.method](route.path, route.action)
})


export { router as StudentRouter} 

