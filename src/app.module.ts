import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HogwartsModule } from './hogwarts/hogwarts.module';

@Module({
  imports: [HogwartsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
