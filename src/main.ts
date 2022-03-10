import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { environments } from './commons/environments';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  
  const options = new DocumentBuilder()
  .setTitle('Api BFF Core')
    .setDescription('microservicios de datos')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  const server = await app.listen(environments.PORT, '0.0.0.0');
  server.setTimeout(environments.TIMEOUT);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist:true
    } )
  );
  
  // cambio listener para menojo de variables   
  // await app.listen(3200);
}
bootstrap();
