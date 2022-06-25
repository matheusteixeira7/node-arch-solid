import { StudentsRepository } from "../../src/application/repositories/StudentsRepository";
import { Student } from "../../src/domain/entities/student";

export class InMemoryStudentsRepository implements StudentsRepository {
    public students: Student[] = [];

    public async findAll(): Promise<Student[]> {
        return this.students;
    }

    public async findById(id: string): Promise<Student | null> {
        const student = this.students.find((student) => student.id === id);

        if (!student) {
            return null;
        }

        return student;
    }

    public async create(student: Student): Promise<Student> {
        this.students.push(student);
        return student;
    }

    public async update(student: Student): Promise<Student> {
        const index = this.students.findIndex((s) => s.id === student.id);
        this.students[index] = student;
        return student;
    }

    public async delete(id: string): Promise<void> {
        this.students = this.students.filter((student) => student.id !== id);
    }
}
