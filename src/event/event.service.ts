import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/user/entity/user.entity'
import { Repository } from 'typeorm'
import { UserService } from '../user/user.service'
import { CreateEventDto } from './dto/event.dto'
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

  async findAll(): Promise<Event[] | Error> {
    const users = await this.eventRepository.find().catch((error) => {
      return Error(error.message)
    })

    return users
  }

  async findEventBy(id: string): Promise<Event | Error> {
    const event = await this.eventRepository.findOneBy({ id }).catch((error) => {
      return Error(error.message)
    })

    if (!event) {
      throw new NotFoundException('Event not found!')
    }
    return event
  }

  async create(data: CreateEventDto): Promise<any | Error> {
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
      return new Error(error.message)
    }
  }

  async insertUserEvent(eventId: string, userId: string): Promise<Event | Error> {
    try {
      const event = await this.findEventBy(eventId)
      const user = await this.userService.findUserBy(userId)

      const eventUser = new EventUser()
      eventUser.user = user as User
      eventUser.event = event as Event
      eventUser.isConfirmed = true
      eventUser.isEventOwner = true
      eventUser.userIdOwner = 'event.events[0].userIdOwner'
      await this.eventUserRepository.save(eventUser)
    } catch (error) {
      return new Error(error.message)
    }
  }

  async delete(id: string): Promise<void | Error> {
    //Just user check if event exists
    const event = await this.findEventBy(id)
    try {
      await this.eventRepository.remove(event as Event)
    } catch (error) {
      return new Error(error.message)
    }
  }
}
