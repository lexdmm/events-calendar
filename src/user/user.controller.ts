import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger'
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
  async findAll(): Promise<User[] | Error> {
    return this.userService.findAll()
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Returns a user by ID.', type: User })
  @ApiNotFoundResponse({ description: 'User not found!' })
  @ApiInternalServerErrorResponse({ description: 'Error: Internal Server Error' })
  async findUserBy(@Param('id') id: string): Promise<User | Error> {
    return this.userService.findUserBy(id)
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Create a new user.', type: User })
  @ApiInternalServerErrorResponse({ description: 'Error: Internal Server Error' })
  async create(@Body() user: CreateUserDto): Promise<User | Error> {
    return this.userService.create(user)
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Update a user by ID.', type: User })
  @ApiNotFoundResponse({ description: 'User not found!' })
  @ApiInternalServerErrorResponse({ description: 'Error: Internal Server Error' })
  async update(@Param('id') id: string, @Body() user: UpdateUserDto): Promise<User | Error> {
    return this.userService.update(id, user)
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Usuário excluído com sucesso.' })
  @ApiNotFoundResponse({ description: 'User not found!' })
  @ApiInternalServerErrorResponse({ description: 'Error: Internal Server Error' })
  async delete(@Param('id') id: string): Promise<void | Error> {
    return this.userService.delete(id)
  }
}
