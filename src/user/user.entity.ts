import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import Chat from './../chat/chat.entity';
import Message from './../message/message.entity';
import { ObjectType, Field } from 'type-graphql';

@ObjectType()
@Entity('users')
export class User {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  email: string;

  @Column()
  password: string;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column({ nullable: true })
  profilePhoto: string;

  @Field()
  @Column({ nullable: true })
  fbId: string;

  // to change default to false in prod
  @Field()
  @Column({ default: true })
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
