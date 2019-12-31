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
    console.log('PLACE:', place);
    return true;
  }

  async myPlaces(userId: string): Promise<Place[]> {
    const places = await this.placeRepo.find({ where: { userId } });
    console.log(places);
    return places;
  }
}
