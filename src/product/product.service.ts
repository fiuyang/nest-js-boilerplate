import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageService } from 'src/utils/service/page/page.service';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService extends PageService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {
    super();
  }
  create(createProductDto: CreateProductDto) {
    return this.productRepo.save(createProductDto);
  }

  findAll(filter) {
    return this.generatePage(filter, this.productRepo, { relations: ['user'] });
  }

  findOne(id: number) {
    return this.productRepo.findOneBy({id: id});
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    updateProductDto.id = id;
    const product = this.productRepo.save(updateProductDto);
    return product;
  }

  async remove(id: number) {
    const product = await this.productRepo.findOneBy({id: id});
    return this.productRepo.remove(product);
  }
}