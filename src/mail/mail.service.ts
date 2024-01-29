import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) {}

    async sendResetPassword(email: string, otp: number) {
        await this.mailerService.sendMail({
            to: email,
            // from: '"Support Team" <support@example.com>',
            subject: 'Reset Password',
            template: './resetPassword', // `.hbs` extension is appended automatically
            context: {
                email: email,
                otp: otp,
            },
        });
    }
}
