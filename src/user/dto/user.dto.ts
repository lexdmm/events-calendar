import { ApiProperty } from '@nestjs/swagger'
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  NotEquals,
  ValidateIf
} from 'class-validator'

export class UserDto {
  @IsNotEmpty()
  @NotEquals(null)
  providerId: string

  @IsNotEmpty()
  @NotEquals(null)
  name: string

  @IsEmail()
  @IsNotEmpty()
  @NotEquals(null)
  @ValidateIf((object, value) => value !== undefined)
  email: string

  @IsBoolean()
  isActive: boolean
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Confederate provider id not provided' })
  @NotEquals(null)
  @ValidateIf((value) => value !== undefined)
  @ApiProperty({ example: '111260650121185072906', description: 'Google provider id' })
  providerId: string

  @IsString()
  @IsNotEmpty({ message: 'The name cannot be empty' })
  @NotEquals(null)
  @ValidateIf((value) => value !== undefined)
  @ApiProperty({ example: 'Jhon Piper' })
  name: string

  @IsString()
  @IsNotEmpty({ message: 'The e-mail cannot be empty' })
  @NotEquals(null)
  @ValidateIf((value) => value !== undefined)
  @ApiProperty({ example: 'piper@test.com' })
  email: string
}

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'The name cannot be empty' })
  @NotEquals(null)
  @ValidateIf((value) => value !== undefined)
  @IsOptional()
  @ApiProperty({ example: 'Jhon Piper' })
  name: string

  @IsString()
  @IsNotEmpty({ message: 'The e-mail cannot be empty' })
  @NotEquals(null)
  @ValidateIf((value) => value !== undefined || value !== '')
  @IsOptional()
  @ApiProperty({ example: 'piper@test.com' })
  email: string
}
