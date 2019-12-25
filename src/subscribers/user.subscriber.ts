import * as bcrypt from 'bcryptjs';
import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { User } from '../user/user.entity';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  listenTo() {
    return User;
  }
  async beforeInsert(event: InsertEvent<User>) {
    console.log(`BEFORE USER INSERTION: `, event.entity);
    event.entity.password = await bcrypt.hash(event.entity.password, 12);
  }
}
