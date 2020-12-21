import { Connection } from 'typeorm';
import { TenantService } from 'src/tenant/tenant.service';
import { CreateStudentDto } from './create-student.dto';
import { Student } from './student.entity';
export declare class StudentService {
    private tenantService;
    private connection;
    constructor(tenantService: TenantService, connection: Connection);
    findAll(): Promise<Student[]>;
    findOne(id: string): Promise<Student>;
    create(student: CreateStudentDto): Promise<void>;
}
