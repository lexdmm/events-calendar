import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './entity/user.entity'
import { UserEvent } from './entity/user.event.entity'
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
  imports: [TypeOrmModule.forFeature([User, UserEvent])],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
