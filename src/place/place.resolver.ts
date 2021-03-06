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
import { EditPlaceArgs } from './args/editPlaceArgs';

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

  @Query(() => [Place])
  @UseGuards(AuthGuard)
  async myPlaces(@GetUserId() userId: string): Promise<Place[]> {
    return this.placeService.myPlaces(userId);
  }

  @Mutation(() => Place)
  @UseGuards(AuthGuard)
  async editPlace(
    // @GetUserId() userId: string,
    @Args() { placeId, name, isFav }: EditPlaceArgs,
  ): Promise<Place> {
    return this.placeService.editPlace(placeId, name, isFav);
    // could be combined with ...
  }
  @Mutation(() => Boolean)
  @UseGuards(AuthGuard)
  async deletePlace(@Args('id') placeId: number): Promise<Boolean> {
    return this.placeService.deletePlace(placeId);
  }
}
// input to refactor
