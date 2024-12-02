import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const API_DEFAULT_PORT = 3000;
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.API_PORT || API_DEFAULT_PORT);
}
bootstrap();
