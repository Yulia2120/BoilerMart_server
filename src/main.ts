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

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://tubular-cobbler-ec8367.netlify.app'); 
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization');
    next();
  });
  // app.enableCors({
  //   credentials: true,
  //   origin: ['https://tubular-cobbler-ec8367.netlify.app']
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
