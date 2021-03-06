import { RestaurantsController } from './restaurants.controller';
import { RestaurantsService } from './restaurants.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Restaurant, RestaurantSchema } from './restaurants.schema';
import { RestaurantsDao } from './restaurants.dao';
import { CloudinaryModule } from '@services/cloudinary/cloudinary.module';
import { mongoCollections } from '@shared/constants/mongo-collections.constants';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Restaurant.name,
        schema: RestaurantSchema,
        collection: mongoCollections.restaurants,
      },
    ]),
    CloudinaryModule,
  ],
  controllers: [RestaurantsController],
  providers: [RestaurantsService, RestaurantsDao],
})
export class RestaurantsModule {}
