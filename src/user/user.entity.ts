import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import Chat from './../chat/chat.entity';
import Message from './../message/message.entity';
import { ObjectType, Field } from 'type-graphql';
import Place from './../place/place.entity';

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

  @Field()
  @Column({ type: 'boolean', default: false })
  isDriving: boolean;

  @Field()
  @Column({ type: 'boolean', default: false })
  isRiding: boolean;

  @Field()
  @Column({ type: 'boolean', default: false })
  isTaken: boolean;

  @Field()
  @Column({ type: 'double precision', default: 0 })
  lastLng: number;

  @Field()
  @Column({ type: 'double precision', default: 0 })
  lastLat: number;

  @Field()
  @Column({ type: 'double precision', default: 0 })
  lastOrientation: number;

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

  @OneToMany(
    () => Place,
    places => places.user,
  )
  places: Place[];
}
