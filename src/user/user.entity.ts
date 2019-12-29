import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import Chat from './../chat/chat.entity';
import Message from './../message/message.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  profilePhoto: string;

  @Column({ nullable: true })
  fbId: string;

  @Column({ default: false })
  confirmed: boolean;

  @OneToMany(
    () => Chat,
    chat => chat.passenger,
  )
  chatsAsPassenger: Chat[];

  @OneToMany(
    () => Chat,
    chat => chat.passenger,
  )
  chatsAsDriver: Chat[];

  @OneToMany(
    () => Message,
    message => message.user,
  )
  messages: Message[];
}
