import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger'
import { AuthGuardToken } from '../auth/auth.guardToken'
import { CreateEventDto, UpdateEventDto } from './dto/event.dto'
import { Event } from './entity/event.entity'
import { EventService } from './event.service'
import { IResponseEventUser } from './interface/event.user.interface'

@ApiTags('events')
@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Return all events.',
    type: Event,
    isArray: true
  })
  @ApiInternalServerErrorResponse({ description: 'Error: Internal Server Error' })
  @ApiBearerAuth('Authorization')
  @UseGuards(AuthGuardToken)
  findAll(): Promise<Event[]> {
    return this.eventService.findAll()
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Returns a event by ID.', type: Event })
  @ApiNotFoundResponse({ description: 'Event not found!' })
  @ApiInternalServerErrorResponse({ description: 'Error: Internal Server Error' })
  @ApiBearerAuth('Authorization')
  @UseGuards(AuthGuardToken)
  findEventBy(@Param('id') id: string): Promise<Event> {
    return this.eventService.findEventBy(id)
  }

  @Get(':userid/all')
  @ApiResponse({
    status: 200,
    description: 'Returns a event by user ID.',
    type: Event,
    isArray: true
  })
  @ApiNotFoundResponse({ description: 'Event not found!' })
  @ApiInternalServerErrorResponse({ description: 'Error: Internal Server Error' })
  @ApiBearerAuth('Authorization')
  @UseGuards(AuthGuardToken)
  findEventByUser(@Param('userid') userId: string): Promise<IResponseEventUser[]> {
    return this.eventService.findEventByUser(userId)
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Create a new event.', type: Event })
  @ApiInternalServerErrorResponse({ description: 'Error: Internal Server Error' })
  @ApiBearerAuth('Authorization')
  @UseGuards(AuthGuardToken)
  create(@Body() user: CreateEventDto): Promise<Event> {
    return this.eventService.create(user)
  }

  @Patch(':id')
  @ApiResponse({ status: 201, description: 'update event', type: Event })
  @ApiNotFoundResponse({ description: 'Event not found!' })
  @ApiInternalServerErrorResponse({ description: 'Error: Internal Server Error' })
  @ApiBearerAuth('Authorization')
  @UseGuards(AuthGuardToken)
  update(@Param('id') id: string, @Body() data: UpdateEventDto): Promise<Event> {
    return this.eventService.update(id, data)
  }

  @Delete(':id/:ownerid')
  @ApiResponse({ status: 200 })
  @ApiNotFoundResponse({ description: 'Event not found!' })
  @ApiInternalServerErrorResponse({ description: 'Error: Internal Server Error' })
  @ApiBearerAuth('Authorization')
  @UseGuards(AuthGuardToken)
  delete(@Param('id') id: string, @Param('ownerid') ownerId: string): Promise<void> {
    return this.eventService.delete(id, ownerId)
  }
}
