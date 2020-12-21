import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { CreateStudentDto } from './create-student.dto';
import { StudentService } from './student.service';

@Controller('students')
export class StudentController {
  constructor(private studentService: StudentService) {}
  @Get()
  findAll(): Promise<any> {
    return this.studentService.findAll();
  }

  @Post()
  create(
    @Body(new ValidationPipe({ transform: true }))
    student: CreateStudentDto,
  ): Promise<any> {
    return this.studentService.create(student);
  }
}
