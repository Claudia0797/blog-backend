import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { TypeOrmExceptionFilter } from './filters/type-orm-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const options = new DocumentBuilder()
    .setTitle('Project UOC BLOG 2026')
    .setDescription('API para prácticas (Auth, Users, Posts, Categories). Usar /auth para obtener el JWT.')
    .setVersion('1.0')

    // Para que Swagger muestre el server explícito
    .addServer('http://localhost:3000', 'Local')

    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'access_token',
    )
    .build();

  app.useGlobalFilters(new TypeOrmExceptionFilter());

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api', app, document, {
    explorer: true,
    swaggerOptions: {
      filter: true,
      showRequestDuration: true,

      // No perder el token al refrescar la página
      persistAuthorization: true,
    },
  });

  await app.listen(3000);
}
bootstrap();
