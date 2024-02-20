import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/user/entity/user.entity'
import { Repository } from 'typeorm'
import { UserService } from '../user/user.service'
import { CreateEventDto, UpdateEventDto } from './dto/event.dto'
import { Event } from './entity/event.entity'
import { EventUser } from './entity/event.user.entity'

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
    @InjectRepository(EventUser)
    private eventUserRepository: Repository<EventUser>,
    private userService: UserService
  ) {}

  async findAll(): Promise<Event[]> {
    const users = await this.eventRepository.find().catch((error) => {
      throw Error(error.message)
    })
    return users
  }

  async findEventBy(id: string): Promise<Event> {
    const event = await this.eventRepository.findOneBy({ id }).catch((error) => {
      throw Error(error.message)
    })

    if (!event) {
      throw new NotFoundException('Event not found!')
    }
    return event as Event
  }

  async create(data: CreateEventDto): Promise<Event> {
    const user = await this.userService.findUserBy(data.userId)

    try {
      const event = this.eventRepository.create(data)
      const savedEvent = await this.eventRepository.save(event)

      const eventUser = new EventUser()
      eventUser.user = user as User
      eventUser.event = event
      eventUser.isConfirmed = true
      eventUser.isEventOwner = true
      eventUser.userIdOwner = data.userId
      await this.eventUserRepository.save(eventUser)

      return savedEvent
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async update(id: string, data: UpdateEventDto): Promise<Event> {
    const evt = await this.findEventBy(id)

    const event = await this.eventUserRepository
      .createQueryBuilder()
      .update(Event)
      .set({ ...data })
      .where('id = :id', { id: evt.id })
      .returning('*')
      .updateEntity(true)
      .execute()
      .catch((error) => {
        throw new Error(error.message)
      })

    return event.raw[0]
  }

  async delete(id: string): Promise<void> {
    //Just user check if event exists
    const event = await this.findEventBy(id)
    try {
      await this.eventRepository.remove(event)
    } catch (error) {
      throw new Error(error.message)
    }
  }
}
