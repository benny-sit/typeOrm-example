import {  PrimaryGeneratedColumn, Column, Entity, ManyToOne, OneToMany, } from "typeorm";
import { Student } from "./Student";

@Entity()
export class Course {
    
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    teacher: string

    @OneToMany(() => Student, (student) => student.course)
    students: Student[]
}

