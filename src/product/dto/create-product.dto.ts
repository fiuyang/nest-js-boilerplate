import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { PageRequestDto, PageResponseDto } from 'src/utils/dto/page.dto';
import { IsExist } from 'src/utils/validator/exist-validator';
import { IsUnique } from 'src/utils/validator/unique-validator';
import { UserDto } from 'src/user/dto/create-user.dto';
import { Product } from '../entities/product.entity';

export class ProductDto {
  @ApiProperty()
  @IsExist([Product, 'id'])
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsUnique([Product, 'barcode'])
  barcode: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNumber()
  purchase_price: number;

  @ApiProperty()
  @IsNumber()
  selling_price: number;

  @ApiProperty({ format: 'binary' })
  @IsOptional()
  photo: string;

  @IsObject()
  user: UserDto;
}
export class CreateProductDto extends OmitType(ProductDto, ['id']) {}
export class ProductIdDto extends PickType(ProductDto, ['id']) {}

export class FindProductDto extends PageRequestDto {
  @ApiProperty({ required: false })
  @IsOptional()
  barcode: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  purchase_price: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  selling_price: number;
}
export class ResponseProductDto extends PageResponseDto {
  @ApiProperty({ type: [ProductDto] })
  data: ProductDto[];
}