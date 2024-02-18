import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter())
  const configService = app.get<ConfigService>(ConfigService)
  const PORT = Number(configService.get<string>('PORT'))

  const options = new DocumentBuilder()
    .setTitle('Events Calendar')
    .setDescription('API documentation')
    .setVersion('1.0')
    .addTag('users', 'User-related operations')
    .addTag('events', 'Event-related operations')
    .addTag('user-events', 'Operations related to user and event associations')
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api', app, document)

  await app.listen(PORT || 3000, '0.0.0.0').then(() => {
    console.log(`Events calendar service connected on port ${PORT}`)
  })
}
bootstrap()
