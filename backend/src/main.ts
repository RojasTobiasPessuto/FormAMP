import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  app.enableCors({
    origin: [
      'http://localhost:5173', // para desarrollo local
      'https://form-amp.vercel.app',
      'https://form-amp-git-main-tobias-projects-9eb602ab.vercel.app',
      'https://form-a9z52zerp-tobias-projects-9eb602ab.vercel.app', // tu frontend en Vercel
    ],
    methods: 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
  });

  const port = process.env.PORT || 3001;
  await app.listen(port, '0.0.0.0');
  console.log(`🚀 API listening on port ${port}`);
}
bootstrap();
