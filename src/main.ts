import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import cookieParser from 'cookie-parser'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bodyParser: true })

  const configService = app.get<ConfigService>(ConfigService)
  const PORT = Number(configService.get<string>('PORT'))

  app.use(cookieParser())

  app.useGlobalPipes(new ValidationPipe())

  const options = new DocumentBuilder()
    .setTitle('Events Calendar')
    .setDescription('API documentation')
    .setVersion('1.0')
    .addTag('users', 'User-related operations')
    .addTag('events', 'Event-related operations')
    .addTag('user-events', 'Operations related to user and event associations')
    .addBearerAuth(
      {
        description: `[just text field] Please enter token in following format: Bearer <JWT>`,
        name: 'Authorization',
        bearerFormat: 'Bearer',
        scheme: 'Bearer',
        type: 'http',
        in: 'Header'
      },
      'Authorization'
    )
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api', app, document)
  /*
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, api_key, Authorization')
    next()
  })
  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
    credentials: true
  })
*/
  await app.listen(PORT || 3000, () => {
    console.log(`Events calendar service connected on port ${PORT}`)
  })
}
bootstrap()
