import { Module } from '@nestjs/common';
import { CategoriesModule } from './categories/categories.module';
import { MealsModule } from './meals/meals.module';
import { RestaurantsModule } from './restaurants/restaurants.module';

@Module({
  imports: [MealsModule, RestaurantsModule, CategoriesModule],
  controllers: [],
  providers: [],
})
export class ApiModule {}
