import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '../user/entity/user.entity'
import { UserService } from '../user/user.service'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { GoogleStrategy } from './auth.strategy'

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, UserService]
})
export class AuthModule {}
