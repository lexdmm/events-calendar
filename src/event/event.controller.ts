import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger'
import { CreateEventDto, UpdateEventDto } from './dto/event.dto'
import { AddEventUserDto } from './dto/event.user.dto'
import { Event } from './entity/event.entity'
import { EventUser } from './entity/event.user.entity'
import { EventService } from './event.service'
import { EventUserService } from './event.user.service'

@ApiTags('events')
@Controller('event')
export class EventController {
  constructor(
    private readonly eventService: EventService,
    private readonly eventUserService: EventUserService
  ) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Returns all events.',
    type: Event,
    isArray: true
  })
  @ApiInternalServerErrorResponse({ description: 'Error: Internal Server Error' })
  findAll(): Promise<Event[]> {
    return this.eventService.findAll()
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Returns a event by ID.', type: Event })
  @ApiNotFoundResponse({ description: 'Event not found!' })
  @ApiInternalServerErrorResponse({ description: 'Error: Internal Server Error' })
  findEventBy(@Param('id') id: string): Promise<Event> {
    return this.eventService.findEventBy(id)
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Create a new event.', type: Event })
  @ApiInternalServerErrorResponse({ description: 'Error: Internal Server Error' })
  create(@Body() user: CreateEventDto): Promise<Event> {
    return this.eventService.create(user)
  }

  @Patch(':id')
  @ApiResponse({ status: 201, description: 'update event', type: Event })
  @ApiNotFoundResponse({ description: 'Event not found!' })
  @ApiInternalServerErrorResponse({ description: 'Error: Internal Server Error' })
  update(@Param('id') id: string, @Body() data: UpdateEventDto): Promise<Event> {
    return this.eventService.update(id, data)
  }

  @Delete(':id')
  @ApiResponse({ status: 200 })
  @ApiNotFoundResponse({ description: 'Event not found!' })
  @ApiInternalServerErrorResponse({ description: 'Error: Internal Server Error' })
  delete(@Param('id') id: string): Promise<void> {
    return this.eventService.delete(id)
  }

  //----------------------------------
  @Post('user/add')
  @ApiResponse({ status: 201, description: 'add a new user to the event.', type: Event })
  @ApiInternalServerErrorResponse({ description: 'Error: Internal Server Error' })
  @ApiBadRequestResponse({ description: 'This user has already been added to the event.' })
  addUserEvent(@Body() data: AddEventUserDto): Promise<EventUser> {
    return this.eventUserService.addUserEvent(data)
  }

  @Patch('user/update')
  @ApiResponse({ status: 201, description: 'updates user status in event', type: Event })
  @ApiInternalServerErrorResponse({ description: 'Error: Internal Server Error' })
  updateUserEventConfirmed(@Body() data: AddEventUserDto): Promise<EventUser> {
    return this.eventUserService.updateUserEventConfirmed(data)
  }
}
