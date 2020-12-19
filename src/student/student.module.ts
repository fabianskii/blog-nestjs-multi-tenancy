import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Student } from './student.entity';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { TenantModule } from 'src/tenant/tenant.module';
import { TenantService } from 'src/tenant/tenant.service';

@Module({
  imports: [TenantModule, TypeOrmModule.forFeature([Student])],
  controllers: [StudentController],
  providers: [StudentService, TenantService],
})
export class StudentModule {}
