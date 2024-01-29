import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class PasswordReset {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  otp: number;

  @Column()
  email: string;

  @Column({ type: 'timestamp' })
  created_at: Date;

  @ManyToOne(() => User, {
    eager: true,
  })

  @JoinColumn({ name: 'email', referencedColumnName: 'email' })
  user: User;
}