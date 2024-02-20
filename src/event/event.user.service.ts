import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { AddEventUserDto } from './dto/event.user.dto'
import { EventUser } from './entity/event.user.entity'

@Injectable()
export class EventUserService {
  constructor(
    @InjectRepository(EventUser)
    private eventUserRepository: Repository<EventUser>
  ) {}

  /**
   * @description add a new user to the event
   * @param AddEventUserDto
   * @returns EventUser
   */
  async addUserEvent(data: AddEventUserDto): Promise<EventUser> {
    const arrEventUser = await this.findEventUsers(data.eventId)
    for (const evt of arrEventUser) {
      if (evt.userId === data.userId) {
        throw new BadRequestException('This user has already been added to the event.')
      }
    }

    const eventUser = new EventUser()
    eventUser.userId = data.userId
    eventUser.eventId = arrEventUser[0].eventId
    eventUser.userIdOwner = arrEventUser[0].userIdOwner
    eventUser.isConfirmed = true
    eventUser.isEventOwner = false
    await this.eventUserRepository.save(eventUser).catch((error) => {
      throw new Error(error.message)
    })

    return eventUser
  }

  /**
   * @description updates user status in event
   * @param AddEventUserDto
   * @returns
   */
  async updateUserEventConfirmed(data: AddEventUserDto): Promise<EventUser> {
    const evtUser = await this.findEventUserBy(data.eventId, data.userId)

    const eventUser = await this.eventUserRepository
      .createQueryBuilder()
      .update(EventUser)
      .set({
        isConfirmed: (evtUser[0].isConfirmed = !evtUser[0].isConfirmed)
      })
      .where('id = :id', { id: evtUser[0].id })
      .returning('*')
      .updateEntity(true)
      .execute()
      .catch((error) => {
        throw new Error(error.message)
      })

    return eventUser.raw[0]
  }

  //Private methods------------------------------------
  /**
   * @description returns a list of event users
   * @param eventId
   * @returns EventUser[]
   */
  private async findEventUsers(eventId: string): Promise<EventUser[]> {
    const eventUser = await this.eventUserRepository.find({ where: { eventId } }).catch((error) => {
      throw Error(error.message)
    })

    if (!eventUser) {
      throw new NotFoundException('Event not found!')
    }
    return eventUser
  }

  /**
   * @description returns event by user
   * @param eventId
   * @param userId
   * @returns EventUser[]
   */
  private async findEventUserBy(eventId: string, userId: string): Promise<EventUser[]> {
    const eventUser = await this.eventUserRepository
      .find({ where: { eventId, userId } })
      .catch((error) => {
        throw Error(error.message)
      })

    if (!eventUser) {
      throw new NotFoundException('User not found!')
    }
    return eventUser
  }
}
