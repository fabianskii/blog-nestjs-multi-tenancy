import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Connection, Repository } from 'typeorm';

import { TenantService } from 'src/tenant/tenant.service';
import { CreateStudentDto } from './create-student.dto';
import { Student } from './student.entity';

@Injectable()
export class StudentService {
  constructor(
    private tenantService: TenantService,
    private connection: Connection,
  ) {}
  async findAll(): Promise<Student[]> {
    return await this.connection.transaction(async (manager) => {
      const repo = manager.getRepository(Student);
      await this.tenantService.setCurrentTenantOnRepository(repo);

      return repo.find();
    });
  }

  async findOne(id: string): Promise<Student> {
    return await this.connection.transaction(async (manager) => {
      const repo = manager.getRepository(Student);
      await this.tenantService.setCurrentTenantOnRepository(repo);

      return repo.findOne(id);
    });
  }

  async create(student: CreateStudentDto): Promise<void> {
    await this.connection.transaction(async (manager) => {
      const repo = manager.getRepository(Student);
      await this.tenantService.setCurrentTenantOnRepository(repo);

      await repo.save(student);
    });
  }
}
