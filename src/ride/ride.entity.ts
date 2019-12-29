import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RideStatus } from '../types/ride.status.enum';

@Entity()
class Ride extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column()
  status: RideStatus;

  @Column()
  pickUpAddress: string;

  @Column()
  pickUpLat: number;

  @Column()
  pickUpLng: number;

  @Column()
  dropOffAddress: string;

  @Column()
  dropOffLat: number;

  @Column()
  dropOffLng: number;

  @Column()
  price: number;

  @Column()
  distance: string;

  @Column()
  duration: string;

  @Column()
  passengerId: number;

  @Column()
  driverId: number;

  @Column()
  chatId: number;

  @CreateDateColumn() createdAt: string;

  @UpdateDateColumn() updatedAt: string;
}
export default Ride;
