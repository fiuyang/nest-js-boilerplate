import { Controller, Post, Body, Req, Res, Patch, Query, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ApiBody, ApiQuery, ApiTags, ApiOperation } from '@nestjs/swagger';
import { UserService } from 'src/user/user.service';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { MailService } from 'src/mail/mail.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly mailService: MailService
    ) {}

  @Post('login')
  @ApiBody({type:LoginDto})
  @ApiOperation({ summary: 'Login user' })
  async signIn(@Body() loginDto: LoginDto):Promise<any>{
      const result = await this.authService.login(loginDto);
      return { message: 'Login Successfully', result };
  }

  @Post('register')
  @ApiBody({type:RegisterDto})
  @ApiOperation({ summary: 'Register user' })
  async signUp(@Body() registerDto: RegisterDto) {
    const result = await this.authService.register(registerDto);
      return { message: 'Registrasion Successfully', result };
  }

  @Post('forgot-password')
  @ApiBody({type:ForgotPasswordDto})
  @ApiOperation({ summary: 'Forgot Password user' })
  async forgoPassword(@Body() forgotPassword: ForgotPasswordDto) {
    const result = await this.userService.createOtp(forgotPassword);

    // send mail reset password
    await this.mailService.sendResetPassword(result.email, result.otp);
    return { message: 'Forgot Password Successfully', result: result.otp };
  }

  @Post('check-otp')
  @ApiBody({ 
    schema: {
      type: 'object',
      properties: {
        otp: { type: 'number' }
      },
      required: ['otp']
    }
  })
  @ApiOperation({ summary: 'Check Otp user' })
  async checkOtp(@Body() body: { otp: number } ) {
    const result = await this.userService.checkOtp(body.otp);
    return { message: 'Check Otp Successfully', result: []};
  }

  @Patch('reset-password')
  @ApiQuery({ name: 'otp', type: 'number' })
  @ApiBody({ type: ResetPasswordDto })
  @ApiOperation({ summary: 'Reset Password user' })
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto, @Query('otp') otp: number ) {
    const result = await this.userService.updateOtp(resetPasswordDto, otp);
    return { message: 'Reset Password Successfully', result: []};
  }
}
