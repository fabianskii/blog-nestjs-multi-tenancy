import { CreateStudentDto } from './create-student.dto';
import { StudentService } from './student.service';
export declare class StudentController {
    private studentService;
    constructor(studentService: StudentService);
    findAll(): Promise<any>;
    create(student: CreateStudentDto): Promise<any>;
}
