import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';

dotenv.config();

async function bootstrap() {
  console.log('MY API KEY is:', process.env.SENDGRID_API_KEY);
  const app = await NestFactory.create(AppModule);
  await app.listen(3012);
}
bootstrap();
