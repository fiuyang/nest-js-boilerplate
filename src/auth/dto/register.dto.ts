import { OmitType, PickType } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
  IsOptional,
  IsStrongPassword,
  IsNotEmpty
} from 'class-validator';
import { IsUnique } from 'src/utils/validator/unique-validator';
import { User } from 'src/user/entities/user.entity';

export class RegisterDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: true })
  @IsEmail()
  @IsNotEmpty()
  @IsUnique([User, 'email'])
  email: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(50)
  @IsUnique([User, 'username'])
  username: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1
  })
  password: string;
}
