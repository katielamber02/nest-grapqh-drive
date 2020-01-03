import { EntityRepository, Repository } from 'typeorm';
import Message from './message.entity';

@EntityRepository(Message)
export class PlaceRepository extends Repository<Message> {}
