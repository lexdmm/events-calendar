import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger'
import { CreateEventDto } from './dto/event.dto'
import { Event } from './entity/event.entity'
import { EventService } from './event.service'

@ApiTags('events')
@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Returns all events.',
    type: Event,
    isArray: true
  })
  @ApiInternalServerErrorResponse({ description: 'Error: Internal Server Error' })
  async findAll(): Promise<Event[] | Error> {
    return this.eventService.findAll()
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Returns a event by ID.', type: Event })
  @ApiNotFoundResponse({ description: 'User not found!' })
  @ApiInternalServerErrorResponse({ description: 'Error: Internal Server Error' })
  async findEventBy(@Param('id') id: string): Promise<Event | Error> {
    return this.eventService.findEventBy(id)
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Create a new event.', type: Event })
  @ApiInternalServerErrorResponse({ description: 'Error: Internal Server Error' })
  async create(@Body() user: CreateEventDto): Promise<Event | Error> {
    return this.eventService.create(user)
  }

  @Delete(':id')
  @ApiResponse({ status: 200 })
  @ApiNotFoundResponse({ description: 'Event not found!' })
  @ApiInternalServerErrorResponse({ description: 'Error: Internal Server Error' })
  async delete(@Param('id') id: string): Promise<void | Error> {
    return this.eventService.delete(id)
  }
}
