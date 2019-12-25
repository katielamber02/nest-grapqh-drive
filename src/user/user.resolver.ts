import { Resolver, Query } from '@nestjs/graphql';

@Resolver('User')
export class UserResolver {
  @Query(() => String)
  async hello() {
    return 'Hello world my string';
  }
}
