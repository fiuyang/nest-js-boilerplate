import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Max } from 'class-validator';

export class PageRequestDto {
  @ApiProperty({ required: false, default: 1 })
  @IsNumber()
  page: number;

  @ApiProperty({ required: false, default: 10 })
  @IsNumber()
  @Max(100)
  limit: number;
}

export class PageResponseDto {
  @ApiProperty()
  @IsNumber()
  totalData: number;

  @ApiProperty()
  @IsNumber()
  totalPage: number;
}