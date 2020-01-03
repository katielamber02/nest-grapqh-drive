import { Injectable } from '@nestjs/common';

import { PlaceRepository } from './place.repository';
import { InjectRepository } from '@nestjs/typeorm';
import Place from './place.entity';

@Injectable()
export class PlaceService {
  constructor(
    @InjectRepository(PlaceRepository)
    private readonly placeRepo: PlaceRepository,
  ) {}
  async createPlace(
    userId: string,
    name: string,
    lat: number,
    lng: number,
    address: string,
  ): Promise<Boolean> {
    const place = await this.placeRepo.save({
      userId,
      name,
      lat,
      lng,
      address,
    });
    // console.log('PLACE:', place);
    return true;
  }

  async myPlaces(userId: string): Promise<Place[]> {
    const places = await this.placeRepo.find({ where: { userId } });
    // console.log(places);
    return places;
  }

  async editPlace(
    placeId: number,
    name: string,
    isFav: boolean,
  ): Promise<Place> {
    const place = await this.placeRepo.findOne({
      where: { id: placeId },
      // relations: ['user'],  // we can avoid getting the whole User entity by adding additional field
      // into Place entity: userId . So we will get only userId property and not the User
    });
    place.name = name;
    place.isFav = isFav;
    await this.placeRepo.save(place);
    console.log('EDIT PLACE:', place);
    // NOT FINISHED
    return place;
  }
}
