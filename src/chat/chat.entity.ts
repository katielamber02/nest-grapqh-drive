import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import Message from './../message/message.entity';

@Entity()
class Chat extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @OneToMany(
    () => Message,
    message => message.chat,
  )
  messages: Message[];

  @Column()
  passengerId: number;

  @ManyToOne(
    () => User,
    user => user.chatsAsPassenger,
  )
  passenger: User;

  @Column()
  rideId: number;

  @Column()
  driverId: number;

  @ManyToOne(
    () => User,
    user => user.chatsAsDriver,
  )
  driver: User;

  @CreateDateColumn() createdAt: string;

  @UpdateDateColumn() updatedAt: string;
}
export default Chat;
