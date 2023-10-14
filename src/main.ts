import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(session({
    secret:'keyword',
    resave:false,
    saveUninitialized:false
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  app.enableCors({
    credentials: true,
    origin: ['http://localhost:3001', 'https://boiler-mart-client.vercel.app'],
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization', // Добавляем разрешенные заголовки
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Добавляем разрешенные HTTP-методы
  });
  
  // app.enableCors({
  //   credentials: true,
  //   origin: ['http://localhost:3001, https://boiler-mart-client.vercel.app']
  // });

  const config = new DocumentBuilder()
  .setTitle('BoilerMart')
  .setDescription('api documentation')
  .setVersion('1.0')
  .addTag('api')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document)


  await app.listen(process.env.PORT || 8080);
}
bootstrap();
