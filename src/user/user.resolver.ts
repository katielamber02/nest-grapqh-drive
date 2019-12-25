import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MyContext } from 'src/types/myContext';
import { LoginInput } from './input/loginInput';
import { SignupInput } from './input/signupInput';
import { ErrorResponse } from './shared/errorResponse';
import { User } from './user.entity';
import { UserService } from './user.service';

@Resolver(User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => String)
  async hello() {
    return 'hello world';
  }

  @Mutation(() => [ErrorResponse], { nullable: true })
  async signup(
    @Args('signupInput') signupInput: SignupInput,
  ): Promise<ErrorResponse[] | null> {
    return this.userService.signup(signupInput);
  }

  @Mutation(() => [ErrorResponse], { nullable: true })
  async login(
    @Args('loginInput') loginInput: LoginInput,
    @Context() ctx: MyContext,
  ): Promise<ErrorResponse[] | null> {
    return this.userService.login(loginInput, ctx.req);
  }
}
