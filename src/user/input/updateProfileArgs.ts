import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class UpdateMyProfileArgs {
  @Field()
  firstName: string | null;

  @Field()
  lastName: string | null;

  @Field()
  email: string | null;

  @Field()
  password: string | null;

  @Field()
  profilePhoto: string | null;

  @Field()
  age: number | null;
}
