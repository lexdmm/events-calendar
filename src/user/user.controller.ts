import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger'
import { AuthGuardToken } from '../auth/auth.guardToken'
import { CreateUserDto, UpdateUserDto } from './dto/user.dto'
import { User } from './entity/user.entity'
import { UserService } from './user.service'

@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Returns all users.',
    type: User,
    isArray: true
  })
  @ApiInternalServerErrorResponse({ description: 'Error: Internal Server Error' })
  @ApiBearerAuth('Authorization')
  @UseGuards(AuthGuardToken)
  async findAll(): Promise<User[]> {
    return this.userService.findAll()
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Returns a user by ID.', type: User })
  @ApiNotFoundResponse({ description: 'User not found!' })
  @ApiInternalServerErrorResponse({ description: 'Error: Internal Server Error' })
  @ApiBearerAuth('Authorization')
  @UseGuards(AuthGuardToken)
  async findUserBy(@Param('id') id: string): Promise<User> {
    return this.userService.findUserBy(id)
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Create a new user.', type: User })
  @ApiInternalServerErrorResponse({ description: 'Error: Internal Server Error' })
  @ApiBearerAuth('Authorization')
  @UseGuards(AuthGuardToken)
  async create(@Body() user: CreateUserDto): Promise<User> {
    return this.userService.create(user)
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Update a user by ID.', type: User })
  @ApiNotFoundResponse({ description: 'User not found!' })
  @ApiInternalServerErrorResponse({ description: 'Error: Internal Server Error' })
  @ApiBearerAuth('Authorization')
  @UseGuards(AuthGuardToken)
  async update(@Param('id') id: string, @Body() user: UpdateUserDto): Promise<User> {
    return this.userService.update(id, user)
  }

  @Delete(':id')
  @ApiResponse({ status: 200 })
  @ApiNotFoundResponse({ description: 'User not found!' })
  @ApiInternalServerErrorResponse({ description: 'Error: Internal Server Error' })
  @ApiBearerAuth('Authorization')
  @UseGuards(AuthGuardToken)
  async delete(@Param('id') id: string): Promise<void> {
    return this.userService.delete(id)
  }
}
