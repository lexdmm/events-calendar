import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsNotEmpty, IsOptional, IsString, NotEquals, ValidateIf } from 'class-validator'

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Confederate provider id not provided' })
  @NotEquals(null)
  @ValidateIf((value) => value !== undefined)
  @ApiProperty({ example: '', description: 'Google provider id' })
  providerId: string

  @IsString()
  @IsNotEmpty({ message: 'The name is not empty' })
  @NotEquals(null)
  @ValidateIf((value) => value !== undefined)
  @ApiProperty({ example: '' })
  name: string

  @IsString()
  @IsNotEmpty({ message: 'The e-mail is not empty' })
  @NotEquals(null)
  @ValidateIf((value) => value !== undefined)
  @ApiProperty({ example: '' })
  email: string
}

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'The name is not empty' })
  @NotEquals(null)
  @ValidateIf((value) => value !== undefined)
  @IsOptional()
  @ApiProperty({ example: '' })
  name?: string

  @IsString()
  @IsNotEmpty({ message: 'The e-mail is not empty' })
  @NotEquals(null)
  @ValidateIf((value) => value !== undefined)
  @IsOptional()
  @ApiProperty({ example: '' })
  email?: string

  @IsBoolean()
  @ApiProperty({ example: false })
  isConfirmed: boolean

  @IsBoolean()
  @ApiProperty({ example: false })
  isEventCreator: boolean
}
