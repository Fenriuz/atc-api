import { Module } from '@nestjs/common';
import { CategoriesModule } from './categories/categories.module';
import { MealsModule } from './meals/meals.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [MealsModule, RestaurantsModule, CategoriesModule, UsersModule],
  controllers: [],
  providers: [],
})
export class ApiModule {}
