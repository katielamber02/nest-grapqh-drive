import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './../user/user.entity';
import { ObjectType, Field } from 'type-graphql';

@ObjectType()
@Entity()
class Place extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ type: 'double precision', default: 0 })
  lat: number;

  @Field()
  @Column({ type: 'double precision', default: 0 })
  lng: number;

  @Field()
  @Column()
  address: string;

  @Field()
  @Column({ type: 'boolean', default: false })
  isFav: boolean;

  @Field()
  @Column({ type: 'int', nullable: true })
  userId: string;

  @ManyToOne(
    () => User,
    user => user.places,
  )
  user: User;

  @CreateDateColumn() createdAt: string;

  @UpdateDateColumn() updatedAt: string;
}
export default Place;
