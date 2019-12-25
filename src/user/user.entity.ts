import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;

  @Column()
  email: string;

  @Column()
  password: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  profilePhoto: string;

  @Column()
  fbId: string;
}
