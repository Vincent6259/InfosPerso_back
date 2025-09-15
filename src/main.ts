import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './all-exceptions.filter';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Applique le filtre d'exception global
  app.useGlobalFilters(new AllExceptionsFilter());

  // Ajoute la validation automatique des DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      // Déclenche des exceptions de validation exploitables par le filtre
      exceptionFactory: (errors) => {
        const messages = errors.map((error) => {
          const constraints = error.constraints ?? {};
          const msgs = Object.values(constraints).join(', ');
          return `${error.property}: ${msgs}`;
        });
        return new BadRequestException(messages);
      },
    }),
  );

  app.use(cookieParser());

  app.enableCors({
    origin: true, // renvoie automatiquement Access-Control-Allow-Origin: <origine requête>
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
