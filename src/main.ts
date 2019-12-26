import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import * as session from 'express-session';
import * as Store from 'connect-redis';
import { AppModule } from './app.module';
import { SESSION_SECRET } from '../constants';
import { redis } from './redis';

dotenv.config();

console.log('MY_API_KEY:', process.env.SENDGRID_API_KEY);

async function bootstrap() {
  const RedisStore = Store(session);
  const app = await NestFactory.create(AppModule);

  app.use(
    session({
      store: new RedisStore({ client: redis as any }),

      name: 'uber',
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 365,
      },
    }),
  );
  await app.listen(3012);
}
bootstrap();
