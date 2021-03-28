import { RestaurantsController } from './restaurants.controller';
import { RestaurantsService } from './restaurants.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Restaurant, RestaurantSchema } from './restaurants.schema';
import { RestaurantsDao } from './restaurants.dao';
import { CloudinaryModule } from '@services/cloudinary/cloudinary.module';
import { ScheduleHoursModule } from '@shared/modules/schedule-hours.module';
import { mongoCollections } from '@shared/constants/mongo-collections.constants';
import { SectionsService } from './sections/sections.service';
import { SectionsDao } from './sections/sections.dao';
import { SectionSchema } from './sections/sections.schema';
import { Section } from '@ts/interfaces/section';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Restaurant.name,
        schema: RestaurantSchema,
        collection: mongoCollections.restaurants,
      },
      {
        name: Section.name,
        schema: SectionSchema,
        collection: mongoCollections.sections,
      },
    ]),
    CloudinaryModule,
    ScheduleHoursModule,
  ],
  controllers: [RestaurantsController],
  providers: [RestaurantsService, RestaurantsDao, SectionsService, SectionsDao],
})
export class RestaurantsModule {}
