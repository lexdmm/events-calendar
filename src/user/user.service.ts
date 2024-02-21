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

  async findAll(): Promise<User[]> {
    const users = await this.userRepository
      .find()
      .then()
      .catch((error) => {
        throw Error(error.message)
      })

    return users
  }

  async findUserBy(id: string): Promise<User> {
    const user = await this.userRepository
      .findOneBy({ id })
      .then()
      .catch((error) => {
        throw Error(error.message)
      })

    if (!user) {
      throw new NotFoundException('User not found!')
    }
    return user
  }

  async create(data: CreateUserDto): Promise<User> {
    try {
      const dataUser = {
        ...data,
        isConfirmed: false,
        isEventCreator: false
      }
      const user = this.userRepository.create(dataUser)
      return await this.userRepository.save(user)
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async update(id: string, data: UpdateUserDto): Promise<User> {
    try {
      const user = await this.findUserBy(id)
      await this.userRepository.update(user, { ...data }).catch((error) => {
        throw error
      })
      return this.userRepository.create({ ...user, ...data })
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const user = await this.findUserBy(id)
      await this.userRepository.delete(user)
    } catch (error) {
      throw new Error(error.message)
    }
  }
}
