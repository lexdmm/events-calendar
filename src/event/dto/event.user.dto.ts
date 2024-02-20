import { IsBoolean, IsNotEmpty, IsString, NotEquals, ValidateIf } from 'class-validator'

export class CreateEventUserDto {
  @IsString()
  @IsNotEmpty({ message: 'The userIdOwner cannot be empty' })
  @NotEquals(null)
  @ValidateIf((value) => value !== undefined)
  userIdOwner: string

  @IsBoolean()
  @NotEquals(null)
  @ValidateIf((value) => value !== undefined)
  isEventOwner: boolean

  @IsBoolean()
  @NotEquals(null)
  @ValidateIf((value) => value !== undefined)
  isConfirmed: boolean

  @IsString()
  @IsNotEmpty({ message: 'The userId cannot be empty' })
  @NotEquals(null)
  @ValidateIf((value) => value !== undefined)
  userId: string

  @IsString()
  @IsNotEmpty({ message: 'The eventId cannot be empty' })
  @NotEquals(null)
  @ValidateIf((value) => value !== undefined)
  eventId: string
}

export class AddEventUserDto {
  @IsString()
  @IsNotEmpty({ message: 'The eventId cannot be empty' })
  @NotEquals(null)
  @ValidateIf((value) => value !== undefined)
  eventId: string

  @IsString()
  @IsNotEmpty({ message: 'The userId cannot be empty' })
  @NotEquals(null)
  @ValidateIf((value) => value !== undefined)
  userId: string
}
