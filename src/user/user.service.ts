import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { PageService } from 'src/utils/service/page/page.service';

@Injectable()
export class UserService extends PageService {
  constructor(
    @InjectRepository(User) 
    private userRepo : Repository<User>
  ) {
    super();
  }

  create(createUserDto: CreateUserDto) {
    createUserDto.password = this.hash(createUserDto.password);
    return this.userRepo.save(createUserDto);
  }

  findAll(filter) {
    return this.generatePage(filter, this.userRepo);
  }

  findOne(id: number) {
    return this.userRepo.findOneBy({id: id});
  }

  findByEmail(email: string) {
    return this.userRepo.findOneBy(
      { email: email },
    );
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    updateUserDto.id = id;
    if (updateUserDto.password) {
      updateUserDto.password = this.hash(updateUserDto.password);
    }
    return this.userRepo.save(updateUserDto);
  }

  async remove(id: number) {
    const user = await this.userRepo.findOneBy({
      id: id
    });
    return this.userRepo.remove(user);
  }

  hash(plainPassword: string): string  {
    return bcrypt.hashSync(plainPassword, 10);
  }

  compare(plainPassword: string, hash: string): boolean {
    return bcrypt.compareSync(plainPassword, hash);
  }

}
