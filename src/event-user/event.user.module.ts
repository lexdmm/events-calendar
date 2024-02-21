import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { EventUser } from './entity/event.user.entity'
import { EventUserController } from './event.user.controller'
import { EventUserService } from './event.user.service'

@Module({
  imports: [TypeOrmModule.forFeature([EventUser])],
  providers: [EventUserService],
  controllers: [EventUserController]
})
export class UserEventModule {}
