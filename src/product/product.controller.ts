import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto, FindProductDto, ProductIdDto, ResponseProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/jwt.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { InjectUser } from 'src/decorator/inject-user.decorator';
import { extname } from 'path';

@ApiTags('Product')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseInterceptors(FileInterceptor('photo',{
    storage : diskStorage({
      destination : './asset/product',
      filename : (req:any,file,cb) =>{
        const namaFile = [req.user.id, Date.now()].join('-')
        cb(null,namaFile+extname(file.originalname))
      }
    })
  }))
  @ApiConsumes('multipart/form-data')
  @ApiBody({type:CreateProductDto})
  create(@InjectUser() createProductDto: CreateProductDto, @UploadedFile() photo : Express.Multer.File) {
    createProductDto.photo = photo.filename
    return this.productService.create(createProductDto);
  }

  @Get()
  @ApiOkResponse({type:ResponseProductDto})
  findAll(@Query() page : FindProductDto) {
    return this.productService.findAll(page);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('photo',{
    storage : diskStorage({
      destination : './asset/product',
      filename : (req:any,file,cb) =>{
        const fileName = [req.user.id, Date.now()].join('-')
        cb(null,fileName+extname(file.originalname))
      }
    })
  }))
  @ApiConsumes('multipart/form-data')
  @ApiBody({type:UpdateProductDto})
  update(@Param('id') id: string, @InjectUser() updateProductDto: UpdateProductDto, @UploadedFile() photo : Express.Multer.File) {
    console.log(InjectUser)
    if(photo){
      updateProductDto.photo = photo.filename
    }
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param() id: ProductIdDto) {
    return this.productService.remove(id.id);
  }
}
