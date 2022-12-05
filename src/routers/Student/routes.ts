import * as express from 'express';
import { Response, Request, NextFunction } from 'express';
import { AppDataSource} from '../../data-source'
import { Student } from '../../entity/Student';

const studentRepo = AppDataSource.getRepository(Student)


async function getAllStudents(req: Request, res: Response, next: NextFunction) {

    const students = await studentRepo.find({ 
        relations: {
            course: true
        }
    });

    return res.status(200).json(students)
}   

async function createStudent(req: Request, res: Response, next: NextFunction) {
    
    const data = req.body
    console.log(data);
    
    let ans
    try {
        ans = await studentRepo.insert(data);
    } catch (error) {
        return res.status(401).json({ error: error.sqlMessage});
    }

    return res.status(201).json(ans.identifiers);
}






export const StudentRoutes = [
    {
        method: 'get',
        path: '/',
        action: getAllStudents
    }, 
    {
        method: 'post',
        path: '/',
        action: createStudent
    }
]
