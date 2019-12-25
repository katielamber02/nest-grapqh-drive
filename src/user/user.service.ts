import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { confirmEmailLink } from '../utils/confirmEmailLink';
import { sendEmail } from '../utils/sendEmail';

import { ErrorResponse } from './shared/errorResponse';
import { UserRepository } from './user.repository';
import { SignupInput } from './input/signupInput';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepo: UserRepository,
  ) {}

  async signup(signupInput: SignupInput): Promise<ErrorResponse[] | null> {
    const userExists = await this.userRepo.findOne({
      where: { email: signupInput.email },
    });

    if (userExists) {
      return [
        {
          path: 'email',
          message: 'invalid email or password',
        },
      ];
    }

    const user = await this.userRepo.save({ ...signupInput });

    await sendEmail(signupInput.email, await confirmEmailLink(user.id));

    return null;
  }
}
