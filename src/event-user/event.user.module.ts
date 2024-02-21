import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthService } from 'src/auth/auth.service'
import { EventUser } from './entity/event.user.entity'
import { EventUserController } from './event.user.controller'
import { EventUserService } from './event.user.service'

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([EventUser])],
  providers: [EventUserService, AuthService],
  controllers: [EventUserController]
})
export class UserEventModule {}
