import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  
  async login(loginDto: LoginDto):Promise<any>{
    const user = await this.userService.findByEmail(loginDto.email);

    if(!user){
      throw new NotFoundException('User Not Found')
    }

    const validatePassword = this.userService.compare(loginDto.password, user.password);

    if(!validatePassword){
      throw new NotFoundException('Email or Password Wrong')
    }

    return {
      access_token: this.jwtService.sign({id:user.id})
    }
  }

  async register (registerDto: RegisterDto) { 
    registerDto.password = this.userService.hash(registerDto.password);
    const user = await this.userService.create(registerDto);
    delete user.password;
    return user;
  }
}
