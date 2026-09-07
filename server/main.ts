import 'reflect-metadata'
import { NestFactory } from '@nestjs/core'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { AppModule } from './app.module.js'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter())
  app.enableCors({ origin: 'http://localhost:5173' })
  await app.listen(process.env.PORT || 4000, '0.0.0.0')
}

bootstrap().catch((error) => {
  console.error(error)
  process.exit(1)
})
