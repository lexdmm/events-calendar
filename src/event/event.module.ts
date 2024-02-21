import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthService } from 'src/auth/auth.service'
import { User } from 'src/user/entity/user.entity'
import { UserService } from 'src/user/user.service'
import { EventUser } from '../event-user/entity/event.user.entity'
import { Event } from './entity/event.entity'
import { EventController } from './event.controller'
import { EventService } from './event.service'

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Event, EventUser, User])],
  providers: [EventService, UserService, AuthService],
  controllers: [EventController]
})
export class EventModule {}
