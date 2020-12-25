import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { enable } from "async-local-storage";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // async hooks are disabled by default
  enable();

  await app.listen(3000);
}
bootstrap();
