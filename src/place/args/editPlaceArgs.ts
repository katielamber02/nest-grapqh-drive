import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class EditPlaceArgs {
  @Field()
  placeId: number;

  @Field()
  name: string;

  @Field()
  isFav: boolean;
}
