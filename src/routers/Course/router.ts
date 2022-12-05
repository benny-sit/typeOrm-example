import * as express from "express";
import { CoursesRoutes } from "./routes";


const router = express.Router();

CoursesRoutes.forEach(route => {
    router[route.method](route.path, route.action)
})


export { router as CourseRouter} 

