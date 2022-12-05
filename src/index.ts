import { AppDataSource } from "./data-source"
import * as express from "express"
import { Response, Request, NextFunction } from "express";
import * as cors from 'cors'
import { env } from "process";
import { StudentRouter} from './routers/Student/router'
import { CourseRouter } from "./routers/Course/router";


AppDataSource.initialize().then(async () => {
    const app = express();
    app.use(express.json());
    app.use(cors());

    

    app.get('/', (req, res) => { return res.status(200).json({ "Hello": "world!" }); });

    // Routers 
    app.use('/students', StudentRouter)
    app.use('/course', CourseRouter)

    app.listen(process.env.SERVER_PORT || 3000, () => {
        console.log("listening on port " + process.env.SERVER_PORT)
    })

}).catch(error => console.log(error))
