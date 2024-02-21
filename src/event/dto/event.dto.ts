import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  NotEquals,
  ValidateIf
} from 'class-validator'
import { StatusEvent } from '../enum/event.enum'

export class CreateEventDto {
  @IsString()
  @IsNotEmpty({ message: 'The userId cannot be empty' })
  @NotEquals(null)
  @ValidateIf((value) => value !== undefined)
  @ApiProperty({ example: 'b7d81d54-eda3-4588-accd-e26c167c6a09', description: 'User ID' })
  userId: string

  @IsString()
  @IsNotEmpty({ message: 'The title cannot be empty' })
  @NotEquals(null)
  @ValidateIf((value) => value !== undefined)
  @ApiProperty({ example: 'Event title' })
  title: string

  @IsString()
  @ValidateIf((value) => value !== undefined)
  @ApiProperty({ example: 'Event descritption' })
  @IsOptional()
  description: string

  @IsDate()
  @IsNotEmpty({ message: 'The startDate cannot be empty' })
  @NotEquals(null)
  @ValidateIf((value) => value.startDate !== undefined)
  @Transform(({ value }) => new Date(value))
  @ApiProperty({ example: '2023/02/20' })
  startDate: Date

  @IsDate()
  @IsNotEmpty({ message: 'The endDate cannot be empty' })
  @NotEquals(null)
  @ValidateIf((value) => value.startDate !== undefined)
  @Transform(({ value }) => new Date(value))
  @ApiProperty({ example: '2023/02/21' })
  endDate: Date

  @IsDate()
  @Transform(({ value }) => {
    const [hour, minute, second] = value.split(':').map(Number)
    return new Date(0, 0, 0, hour, minute, second)
  })
  @IsNotEmpty({ message: 'The startTime cannot be empty' })
  @NotEquals(null)
  @ValidateIf((value) => value !== undefined)
  @ApiProperty({ example: '14:30:00', description: 'Only accepts hour, minute and second format' })
  startTime: Date

  @IsDate()
  @Transform(({ value }) => {
    const [hour, minute, second] = value.split(':').map(Number)
    return new Date(0, 0, 0, hour, minute, second)
  })
  @IsNotEmpty({ message: 'The endTime cannot be empty' })
  @NotEquals(null)
  @ValidateIf((value) => value !== undefined)
  @ApiProperty({ example: '15:30:00', description: 'Only accepts hour, minute and second format' })
  endTime: Date
}

export class UpdateEventDto {
  @IsString()
  @IsNotEmpty({ message: 'The title cannot be empty' })
  @NotEquals(null)
  @ValidateIf((value) => value !== undefined)
  @ApiProperty({ example: 'Event title' })
  title: string

  @IsString()
  @ValidateIf((value) => value !== undefined)
  @ApiProperty({ example: 'Event descritption' })
  @IsOptional()
  description: string

  @IsEnum(StatusEvent)
  @NotEquals(null)
  @ValidateIf((value) => value !== undefined)
  @ApiProperty({ example: StatusEvent.ACTIVE, description: 'ACTIVE, CANCELED' })
  status: StatusEvent

  @IsBoolean()
  @NotEquals(null)
  @ValidateIf((value) => value !== undefined)
  @ApiProperty({ example: 'false', description: 'default false' })
  isPublic: boolean

  @IsDate()
  @IsNotEmpty({ message: 'The startDate cannot be empty' })
  @NotEquals(null)
  @ValidateIf((value) => value.startDate !== undefined)
  @Transform(({ value }) => new Date(value))
  @ApiProperty({ example: '2023/02/20' })
  startDate: Date

  @IsDate()
  @IsNotEmpty({ message: 'The endDate cannot be empty' })
  @NotEquals(null)
  @ValidateIf((value) => value.endDate !== undefined)
  @Transform(({ value }) => new Date(value))
  @ApiProperty({ example: '2023/02/20' })
  endDate: Date

  @IsDate()
  @Transform(({ value }) => {
    const [hour, minute, second] = value.split(':').map(Number)
    return new Date(0, 0, 0, hour, minute, second)
  })
  @IsNotEmpty({ message: 'The startTime cannot be empty' })
  @NotEquals(null)
  @ValidateIf((value) => value !== undefined)
  @ApiProperty({ example: '14:30:00', description: 'Only accepts hour, minute and second format' })
  startTime: Date

  @IsDate()
  @Transform(({ value }) => {
    const [hour, minute, second] = value.split(':').map(Number)
    return new Date(0, 0, 0, hour, minute, second)
  })
  @IsNotEmpty({ message: 'The endTime cannot be empty' })
  @NotEquals(null)
  @ValidateIf((value) => value !== undefined)
  @ApiProperty({ example: '15:30:00', description: 'Only accepts hour, minute and second format' })
  endTime: Date
}
