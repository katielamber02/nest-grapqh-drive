import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { CONFIRM_EMAIL_PREFIX } from '../../constants';
import { redis } from '../redis';
import { confirmEmailLink } from '../utils/confirmEmailLink';
import { sendEmail } from '../utils/sendEmail';
import { LoginInput } from './input/loginInput';
import { SignupInput } from './input/signupInput';
import { errorMessage } from './shared/errorMessage';
import { ErrorResponse } from './shared/errorResponse';
import { UserRepository } from './user.repository';
import { MyContext } from '../types/myContext';
import { User } from './user.entity';

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
    console.log(userExists, 'userExists');

    if (userExists) {
      return errorMessage('email', 'invalid email or password');
    }

    const user = await this.userRepo.save({ ...signupInput });
    // UNCOMMENT
    // await sendEmail(signupInput.email, await confirmEmailLink(user.id));
    console.log('USER', user);
    return null;
  }

  async confirmEmail(id: string, res: Response) {
    const userId = await redis.get(`${CONFIRM_EMAIL_PREFIX}${id}`);
    if (!userId) {
      throw new NotFoundException();
    }
    await this.userRepo.update({ id: userId }, { confirmed: true });

    res.send('ok');
  }

  async login(
    loginInput: LoginInput,
    req: Request,
  ): Promise<ErrorResponse[] | null> {
    const user = await this.userRepo.findOne({
      where: { email: loginInput.email },
    });
    if (!user) {
      return errorMessage('email', 'invalid email or password');
    }
    if (user.confirmed === false) {
      return errorMessage('email', 'confirm email ');
    }
    const checkPassword = await bcrypt.compare(
      loginInput.password,
      user.password,
    );
    if (!checkPassword) {
      return errorMessage('email', 'invalid email or password');
    }
    req.session.userId = user.id;
    return null;
  }

  async logout(ctx: MyContext) {
    await ctx.req.session.destroy(err => {
      console.log(err);
      return false;
    });
    await ctx.res.clearCookie('uber');
    return true;
  }
  async getProfile(userId: string): Promise<User> {
    // console.log('MY ID:', userId);
    const user = await this.userRepo.findOne({
      where: { id: userId },
    });
    console.log('User from getProfile:', user);

    return user;
  }
}
