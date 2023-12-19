import { Controller, Post, Body, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiBody({type:LoginDto})
  async signIn(@Body() loginDto: LoginDto):Promise<any>{
      return await this.authService.login(loginDto);
  }

  @Post('register')
  @ApiBody({type:RegisterDto})
  async signUp(@Body() registerDto: RegisterDto) {
     return await this.authService.register(registerDto);
  }

}
