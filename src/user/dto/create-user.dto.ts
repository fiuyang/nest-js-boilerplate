import { OmitType, PickType } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IsExist } from 'src/utils/validator/exist-validator';
import { IsUnique } from 'src/utils/validator/unique-validator';
import { User } from '../entities/user.entity';
import { PageRequestDto, PageResponseDto } from 'src/utils/dto/page.dto';

export class UserDto {
  @ApiProperty()
  @IsOptional()
  // @IsExist([User, 'id'])
  id?: number;

  @ApiProperty({ required: true })
  @IsString()
  name: string;

  @ApiProperty({ required: true })
  @IsEmail()
  @IsUnique([User, 'email'])
  email: string;

  @ApiProperty({ required: true })
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @IsUnique([User, 'username'])
  username: string;

  @ApiProperty({ required: true })
  @IsString()
  @MinLength(8)
  @MaxLength(32)
  password: string;
}

export class CreateUserDto extends OmitType(UserDto, ['id']) {}
export class UserIdDto extends PickType(UserDto, ['id']) {}

export class FindUserDto extends PageRequestDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  username: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @IsEmail()
  email: string;
  
}
export class ResponseUserDto extends PageResponseDto {
  @ApiProperty({ type: [UserDto] })
  data: UserDto[];
}