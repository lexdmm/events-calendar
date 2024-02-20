import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateUserDto, UpdateUserDto } from './dto/user.dto'
import { User } from './entity/user.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) //Ta dizendo que o papel de criar a instancia é do repositório
    private userRepository: Repository<User>
  ) {}

  async findAll(): Promise<User[] | Error> {
    const users = await this.userRepository
      .find()
      .then()
      .catch((error) => {
        return Error(error.message)
      })

    return users
  }

  async findUserBy(id: string): Promise<User | Error> {
    const user = await this.userRepository
      .findOneBy({ id })
      .then()
      .catch((error) => {
        return Error(error.message)
      })

    if (!user) {
      throw new NotFoundException('User not found!')
    }
    return user
  }

  async create(data: CreateUserDto): Promise<User | Error> {
    try {
      const dataUser = {
        ...data,
        isConfirmed: false,
        isEventCreator: false
      }
      const user = this.userRepository.create(dataUser)
      return await this.userRepository.save(user)
    } catch (error) {
      return new Error(error.message)
    }
  }

  async update(id: string, data: UpdateUserDto): Promise<User | Error> {
    try {
      const user = await this.findUserBy(id)
      await this.userRepository.update(user, { ...data }).catch((error) => {
        throw error
      })
      return this.userRepository.create({ ...user, ...data })
    } catch (error) {
      return new Error(error.message)
    }
  }

  async delete(id: string): Promise<void | Error> {
    try {
      const user = await this.findUserBy(id)
      await this.userRepository.delete(user)
    } catch (error) {
      return new Error(error.message)
    }
  }
}
