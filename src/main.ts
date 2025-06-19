import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.enableCors({
    origin: 'http://localhost',
    methods: 'GET,POST,PUT,DELETE,OPTIONS,PATCH',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true
  });

  await app.listen(process.env.PORT ?? 3000);

  process.on('SIGINT', async () => {
    console.log('\nClosing server...');
    await app.close();
  });
}
bootstrap();