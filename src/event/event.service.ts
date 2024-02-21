import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { StatusUserEvent } from 'src/event-user/enum/event.user.enum'
import { Repository } from 'typeorm'
import { ValidateProperties } from '../common/common'
import { EventUser } from '../event-user/entity/event.user.entity'
import { UserService } from '../user/user.service'
import { CreateEventDto, UpdateEventDto } from './dto/event.dto'
import { Event } from './entity/event.entity'
import { StatusEvent } from './enum/event.enum'
import { IResponseEventUser } from './interface/event.user.interface'

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
    return event
  }

  async findEventByUser(userId: string): Promise<IResponseEventUser[]> {
    const eventUser = await this.eventUserRepository
      .find({ where: { userId }, relations: { event: true } })
      .catch((error) => {
        throw Error(error.message)
      })

    const events: IResponseEventUser[] = []

    for (const evt of eventUser) {
      const eventData: IResponseEventUser = {
        id: evt.eventId,
        userId: evt.userId,
        userIdOwner: evt.userIdOwner,
        isEventOwner: evt.isEventOwner,
        isPublic: evt.event.isPublic,
        startDate: evt.event.startDate,
        endDate: evt.event.endDate,
        startTime: evt.event.startTime,
        endTime: evt.event.endTime,
        status: evt.event.status,
        title: evt.event.title,
        description: evt.event.description
      }
      events.push(eventData)
    }

    if (!eventUser) {
      throw new NotFoundException('Event not found!')
    }

    return events
  }

  async create(data: CreateEventDto): Promise<Event> {
    const user = await this.userService.findUserBy(data.userId)

    ValidateProperties.isAfterPropertyDate(data.startDate, data.endDate)
    ValidateProperties.isAfterPropertyTime(data.startTime, data.endTime)

    const setData = {
      ...data,
      status: StatusEvent.ACTIVE
    }

    try {
      const event = this.eventRepository.create(setData)
      const savedEvent = await this.eventRepository.save(event)

      const eventUser = new EventUser()
      eventUser.user = user
      eventUser.event = event
      eventUser.status = StatusUserEvent.CONFIRMED
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

    if (data.startDate) ValidateProperties.isAfterPropertyDate(data.startDate, data.endDate)
    if (data.startTime) ValidateProperties.isAfterPropertyTime(data.startTime, data.endTime)

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

  async delete(id: string, userOwnerId: string): Promise<void> {
    const event = await this.eventRepository
      .findOne({
        where: { id },
        relations: {
          events: true
        }
      })
      .catch((error) => {
        throw Error(error.message)
      })

    try {
      if (userOwnerId !== event.events[0].userIdOwner)
        throw new BadRequestException('The event can only be deleted by its owner')

      await this.eventRepository.remove(event)
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }
}
