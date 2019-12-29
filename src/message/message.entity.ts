import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './../user/user.entity';
import Chat from './../chat/chat.entity';

@Entity()
class Message extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column()
  text: string;

  @Column()
  chatId: number;

  @ManyToOne(
    () => Chat,
    chat => chat.messages,
  )
  chat: Chat;

  @ManyToOne(
    () => User,
    user => user.messages,
  )
  user: User;

  @CreateDateColumn() createdAt: string;

  @UpdateDateColumn() updatedAt: string;
}
export default Message;
