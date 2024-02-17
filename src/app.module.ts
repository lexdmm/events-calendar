import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { CalendarModule } from './calendar/calendar.module'
import { UserModule } from './user/user.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    CalendarModule,
    AuthModule,
    UserModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
