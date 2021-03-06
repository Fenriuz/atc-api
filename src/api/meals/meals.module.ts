import { MealsService } from './meals.service';
import { MealsController } from './meals.controller';
import { Module } from '@nestjs/common';
import { Meal, MealSchema } from './meal.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { mongoCollections } from '@shared/constants/mongo-collections.constants';
import { MealsDao } from './meals.dao';
import { CloudinaryModule } from '@services/cloudinary/cloudinary.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Meal.name,
        schema: MealSchema,
        collection: mongoCollections.meals,
      },
    ]),
    CloudinaryModule,
  ],
  controllers: [MealsController],
  providers: [MealsService, MealsDao],
})
export class MealsModule {}
