import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';
import { SignupInput } from './input/signupInput';
import { UserService } from './user.service';
import { ErrorResponse } from './shared/errorResponse';
import { User } from './user.entity';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => String)
  async hello() {
    return 'Hello world my string';
  }
  @Mutation(() => [ErrorResponse], { nullable: true })
  async signup(
    @Args('signupInput') signupInput: SignupInput,
  ): Promise<ErrorResponse[] | null> {
    return this.userService.signup(signupInput);
  }
}
