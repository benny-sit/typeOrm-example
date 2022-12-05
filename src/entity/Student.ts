import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne } from "typeorm"
import { Course } from "./Course"

@Entity()
export class Student {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    avgGrade: number

    @Column()
    telephone: string

    @ManyToOne(() => Course,  (course)=> course.students, { nullable: true, onDelete: 'SET NULL'})
    course: Course

}
