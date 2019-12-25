import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import * as session from 'express-session';
import { AppModule } from './app.module';
import { SESSION_SECRET } from '../constants';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log('MY_API_KEY:', process.env.SENDGRID_API_KEY);
  app.use(
    session({
      name: 'uber',
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: { httpOnly: true, secure: process.env.NODE_ENV === 'production' },
    }),
  );
  await app.listen(3012);
}
bootstrap();
