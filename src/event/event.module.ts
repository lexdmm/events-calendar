import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from 'src/user/entity/user.entity'
import { UserService } from 'src/user/user.service'
import { Event } from './entity/event.entity'
import { EventUser } from './entity/event.user.entity'
import { EventController } from './event.controller'
import { EventService } from './event.service'

@Module({
  imports: [TypeOrmModule.forFeature([Event, EventUser, User])],
  providers: [EventService, UserService],
  controllers: [EventController]
})
export class EventModule {}
