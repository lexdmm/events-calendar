import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { join } from 'path'
import { AuthModule } from './auth/auth.module'
import { UserEventModule } from './event-user/event.user.module'
import { EventModule } from './event/event.module'
import { UserModule } from './user/user.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_NAME'),
          synchronize: configService.get('DB_SYNC'),
          entities: [join(__dirname, '**', '*.entity.{ts,js}')],
          autoLoadEntities: configService.get('ENTITIES_AUTO_LOADS'),
          migrations: [join(__dirname, './migration/*{.ts,.js}')],
          migrationsRun: true
        }
      }
    }),
    AuthModule,
    UserModule,
    EventModule,
    UserEventModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
