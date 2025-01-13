import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const API_DEFAULT_PORT = 3000;
  const app = await NestFactory.create(AppModule, { cors: true ,
    logger: ['error', 'warn'],
    bodyParser: true,
    abortOnError: false
  });
  await app.listen(process.env.API_PORT || API_DEFAULT_PORT);
}
bootstrap();
