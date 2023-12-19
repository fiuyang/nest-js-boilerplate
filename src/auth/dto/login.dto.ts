import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
    @ApiProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    email: string;
  
    @ApiProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    password: string;
}
