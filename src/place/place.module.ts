import { Module } from '@nestjs/common';
import { PlaceController } from './place.controller';
import { PlaceService } from './place.service';
import { PlaceResolver } from './place.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaceRepository } from './place.repository';
import { UserModule } from './../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([PlaceRepository]), UserModule],

  controllers: [PlaceController],
  providers: [PlaceService, PlaceResolver],
})
export class PlaceModule {}
