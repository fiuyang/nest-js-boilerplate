import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { PageService } from 'src/utils/service/page/page.service';
import { PasswordReset } from './entities/password-reset.entity';
import { ResetPasswordDto } from 'src/auth/dto/reset-password.dto';
import { ForgotPasswordDto } from 'src/auth/dto/forgot-password.dto';

@Injectable()
export class UserService extends PageService {
  constructor(
    @InjectRepository(User) 
    private userRepo : Repository<User>,

    @InjectRepository(PasswordReset) 
    private passwordResetRepo: Repository<PasswordReset>
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

  findResetPasswordByEmail(email: string) {
    return this.passwordResetRepo.findOne(
      { where: { email } },
    );
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    updateUserDto.id = id;
    if (updateUserDto.password) {
      updateUserDto.password = this.hash(updateUserDto.password);
    }
    return this.userRepo.save(updateUserDto);
  }

  async updateByEmail(email: string, newPassword: string) {
    const hashedPassword = this.hash(newPassword);
    await this.userRepo.update({ email: email }, { password: hashedPassword });
  }

  async remove(id: number) {
    const user = await this.userRepo.findOneBy({
      id: id
    });
    return this.userRepo.remove(user);
  }

  async createOtp(forgotPasswordDto: ForgotPasswordDto) {
    let passwordReset = await this.passwordResetRepo.findOneBy(
      { email: forgotPasswordDto.email },
    );

    const otp = this.generateOtp();

    if (!passwordReset) {
      const newPasswordReset = new PasswordReset();
      newPasswordReset.email = forgotPasswordDto.email;
      newPasswordReset.otp = otp;
      newPasswordReset.created_at = new Date();
      return this.passwordResetRepo.save(newPasswordReset);
    } else {
        passwordReset.otp = otp;
        passwordReset.created_at = new Date();
        return this.passwordResetRepo.save(passwordReset);
    }
  }

  async checkOtp(otp: number) {
    const checkOtp = await this.passwordResetRepo.findOneBy(
      { otp: otp },
    );

    if(!checkOtp) {
      throw new NotFoundException('OTP Not Found')
    }

    const currentTime = new Date();

    const timeDifference = currentTime.getTime() - (await checkOtp).created_at.getTime();
    const minutesDifference = Math.floor(timeDifference / (1000 * 60)); // Menghitung selisih waktu dalam menit

    if (minutesDifference > 5) {
      throw new NotFoundException('OTP expired');
    }

    return checkOtp;
  }

  async updateOtp (resetPasswordDto: ResetPasswordDto, otp: number) {
    const checkOtp = this.passwordResetRepo.findOneBy(
      { otp: otp },
    );

    if (!checkOtp) {
      throw new NotFoundException('OTP Not Found');
    }

    if (resetPasswordDto.password) {
      await this.updateByEmail((await checkOtp).email, resetPasswordDto.password);
    }
    await this.passwordResetRepo.delete({ email: (await checkOtp).email });
  }
  
  generateOtp(): number {
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp;
  }

  hash(plainPassword: string): string  {
    return bcrypt.hashSync(plainPassword, 10);
  }

  compare(plainPassword: string, hash: string): boolean {
    return bcrypt.compareSync(plainPassword, hash);
  }

}
