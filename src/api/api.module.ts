import { Module } from '@nestjs/common';
import { MealsModule } from './meals/meals.module';
import { RestaurantsModule } from './restaurants/restaurants.module';

@Module({
  imports: [MealsModule, RestaurantsModule],
  controllers: [],
  providers: [],
})
export class ApiModule {}
