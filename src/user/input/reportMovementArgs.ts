import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class ReportMovementArgs {
  @Field()
  lat: number;

  @Field()
  lng: number;

  @Field()
  orientation: number;
}
