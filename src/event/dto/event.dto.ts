import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsDate, IsNotEmpty, IsString, Matches, NotEquals, ValidateIf } from 'class-validator'

export class EventDto {
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
  description: string

  @IsDate()
  @Transform(({ value }) => new Date(value))
  @IsNotEmpty({ message: 'The date cannot be empty' })
  @NotEquals(null)
  @ValidateIf((value) => value !== undefined)
  @ApiProperty({ example: 'Event date' })
  date: Date

  @IsString()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/)
  @Transform(({ value }) => {
    const [hour, minute, second] = value.split(':').map(Number)
    return new Date(0, 0, 0, hour, minute, second)
  })
  @IsNotEmpty({ message: 'The startTime cannot be empty' })
  @NotEquals(null)
  @ValidateIf((value) => value !== undefined)
  @ApiProperty({ example: '14:30:00', description: 'Only accepts hour, minute and second format' })
  startTime: Date

  @IsString()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/)
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
