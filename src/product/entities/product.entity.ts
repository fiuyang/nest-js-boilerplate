import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  barcode: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  purchase_price: number;

  @Column()
  selling_price: number;

  @Column()
  photo: string;

  @CreateDateColumn()
  create_at: Date;

  @UpdateDateColumn({ onUpdate: 'CURRENT_TIMESTAMP(6)' })
  update_at: Date;

  @ManyToOne(() => User, (usr) => usr.id)
  user: User;
}