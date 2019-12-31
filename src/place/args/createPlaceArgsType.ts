import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class CreatePlaceArgs {
  @Field()
  name: string;

  @Field()
  lat: number;

  @Field()
  lng: number;

  @Field()
  address: string;
}
