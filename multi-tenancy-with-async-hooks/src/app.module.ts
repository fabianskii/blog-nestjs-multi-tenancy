import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TenantMiddleware } from './common/middleware/tenant.middleware';
import { StudentModule } from './student/student.module';
import { TenantModule } from './tenant/tenant.module';

@Module({
  imports: [
    StudentModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'wizreg',
      password: 'wizreg',
      database: 'wizreg',
      autoLoadEntities: true,
      synchronize: true,
    }),
    TenantModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
   
    consumer
      .apply(TenantMiddleware)
      .forRoutes({ path: "*", method: RequestMethod.ALL });
  }
}
