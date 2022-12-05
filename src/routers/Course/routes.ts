import * as express from 'express';
import { Response, Request, NextFunction } from 'express';
import { AppDataSource } from '../../data-source';
import { Course } from '../../entity/Course';


const courseRepo = AppDataSource.getRepository(Course)

async function getAllCourses(req: Request, res: Response, next: NextFunction) {

    const courses = await courseRepo.find();

    return res.status(200).json(courses);
}


async function createCourse(req: Request, res: Response, next: NextFunction) {
    const data = req.body

    let ans;
    try {
        ans = await courseRepo.insert(data);
    } catch (error) {
        return res.status(400).json({ error: error.sqlMessage});
    }


    return res.status(201).json(ans.identifiers);
}

async function deleteCourse(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    

    try {
        await courseRepo.delete(id);
    } catch (error) {
        return res.status(400).json({ error: error.sqlMessage});
    }

    return res.status(200).json({ deleted: id });
}


async function updateCourse(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const data = req.body;

    try {
        await courseRepo.update(id, data)
    } catch (error) {
        return res.status(400).json({ error: error.sqlMessage});
    }

    return res.status(200).json({ updated: id})
}

async function courseDetailed(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;

    let ans;
    try {
        ans = await courseRepo.find({ 
            relations: {
                students: true
            }, 
            where: {
                id: +id
            }
        })
    } catch (error) {
        return res.status(400).json({ error: error.sqlMessage});
    }

    return res.status(200).json(ans);
}



export const CoursesRoutes = [
    {
        method: 'get',
        path: '/',
        action: getAllCourses
    },
    {
        method: 'post',
        path: '/',
        action: createCourse
    },
    {
        method: 'delete',
        path: '/:id',
        action: deleteCourse
    },
    {
        method: 'put',
        path: '/:id',
        action: updateCourse
    },
    {
        method: 'get',
        path: '/:id',
        action: courseDetailed
    }
    
]
