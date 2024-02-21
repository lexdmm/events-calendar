import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsEnum, IsNotEmpty, IsString, NotEquals, ValidateIf } from 'class-validator'
import { StatusUserEvent } from '../enum/event.user.enum'

export class CreateEventUserDto {
  @IsString()
  @IsNotEmpty({ message: 'The userIdOwner cannot be empty' })
  @NotEquals(null)
  @ValidateIf((value) => value !== undefined)
  @ApiProperty({
    example: 'ba8686ba-1a16-4522-9362-ab0136572c48',
    description: 'User id owner event'
  })
  userIdOwner: string

  @IsBoolean()
  @NotEquals(null)
  @ValidateIf((value) => value !== undefined)
  @ApiProperty({ example: 'false', description: 'default false' })
  isEventOwner: boolean

  @IsEnum(StatusUserEvent)
  @NotEquals(null)
  @ValidateIf((value) => value !== undefined)
  @ApiProperty({ example: StatusUserEvent.CONFIRMED, description: 'CONFIRMED, MAYBE, UNCONFIRMED' })
  status: StatusUserEvent

  @IsString()
  @IsNotEmpty({ message: 'The userId cannot be empty' })
  @NotEquals(null)
  @ValidateIf((value) => value !== undefined)
  @ApiProperty({
    example: 'cbe82850-3eaa-4c37-aeb2-700f4ad6c15c',
    description: 'User id event'
  })
  userId: string

  @IsString()
  @IsNotEmpty({ message: 'The eventId cannot be empty' })
  @NotEquals(null)
  @ValidateIf((value) => value !== undefined)
  @ApiProperty({
    example: '63b7551c-d1f0-4770-a523-44e15d0948ed',
    description: 'Even id'
  })
  eventId: string
}

export class AddEventUserDto {
  @IsString()
  @IsNotEmpty({ message: 'The eventId cannot be empty' })
  @NotEquals(null)
  @ValidateIf((value) => value !== undefined)
  @ApiProperty({
    example: '63b7551c-d1f0-4770-a523-44e15d0948ed',
    description: 'Even id'
  })
  eventId: string

  @IsString()
  @IsNotEmpty({ message: 'The userId cannot be empty' })
  @NotEquals(null)
  @ValidateIf((value) => value !== undefined)
  @ApiProperty({
    example: 'cbe82850-3eaa-4c37-aeb2-700f4ad6c15c',
    description: 'User id event'
  })
  userId: string

  @IsEnum(StatusUserEvent)
  @NotEquals(null)
  @ValidateIf((value) => value !== undefined)
  @ApiProperty({ example: StatusUserEvent.CONFIRMED, description: 'CONFIRMED, MAYBE, UNCONFIRMED' })
  status: StatusUserEvent
}
