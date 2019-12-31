import { UseGuards } from '@nestjs/common';
import {
  Args,
  Context,
  Mutation,
  Query,
  ResolveProperty,
  Resolver,
} from '@nestjs/graphql';
// import { MyContext } from
// import { AllPollsArgs } from
// import { CreatePollArgs } from
// import { AuthGuard } from
// import { GetUserId } from
// import { Place } from
import { PlaceService } from './place.service';
import Place from './place.entity';
import { AuthGuard } from './../user/aurh.guard';
import { GetUserId } from './../user/getUserId.decorator';
import { CreatePlaceArgs } from './args/createPlaceArgsType';

@Resolver(() => Place)
export class PlaceResolver {
  constructor(private readonly placeService: PlaceService) {}

  @Mutation(() => Boolean)
  @UseGuards(AuthGuard)
  async createPlace(
    @GetUserId() userId: string,
    @Args() { name, lat, lng, address }: CreatePlaceArgs,
  ): Promise<Boolean> {
    return this.placeService.createPlace(userId, name, lat, lng, address);
  }
}
// input to refactor
