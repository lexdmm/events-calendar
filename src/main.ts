import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter())
  const configService = app.get<ConfigService>(ConfigService)
  const PORT = Number(configService.get<string>('PORT'))

  await app.listen(PORT || 3000, '0.0.0.0').then(() => {
    console.log(`Events calendar service connected on port ${PORT}`)
  })
}
bootstrap()
