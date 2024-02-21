import { Body, Controller, Patch, Post } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger'
import { AddEventUserDto } from './dto/event.user.dto'
import { EventUser } from './entity/event.user.entity'
import { EventUserService } from './event.user.service'

@ApiTags('user-events')
@Controller('user/event')
export class EventUserController {
  constructor(private readonly eventUserService: EventUserService) {}

  @Post('add')
  @ApiResponse({ status: 201, description: 'add a new user to the event.', type: EventUser })
  @ApiInternalServerErrorResponse({ description: 'Error: Internal Server Error' })
  @ApiBadRequestResponse({ description: 'This user has already been added to the event.' })
  addUserEvent(@Body() data: AddEventUserDto): Promise<EventUser> {
    return this.eventUserService.addUserEvent(data)
  }

  @Patch('update')
  @ApiResponse({ status: 201, description: 'updates user status in event', type: EventUser })
  @ApiInternalServerErrorResponse({ description: 'Error: Internal Server Error' })
  update(@Body() data: AddEventUserDto): Promise<EventUser> {
    return this.eventUserService.updateStatus(data)
  }
}
