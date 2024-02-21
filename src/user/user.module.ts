import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthService } from '../auth/auth.service'
import { User } from './entity/user.entity'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { HttpModule } from '@nestjs/axios'

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([User])],
  providers: [UserService, AuthService, ConfigService],
  controllers: [UserController]
})
export class UserModule {}
