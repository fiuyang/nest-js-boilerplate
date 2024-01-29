import { OmitType, PickType } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsStrongPassword,
  IsNotEmpty
} from 'class-validator';
import { Match } from 'src/decorator/match.decorator';

export class ResetPasswordDto {
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

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  @Match('password')
  password_confirmation: string;
}
