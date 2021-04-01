import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { CategoriesModule } from './categories/categories.module';
import { MealsModule } from './meals/meals.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [MealsModule, RestaurantsModule, CategoriesModule, UsersModule, AuthenticationModule],
  controllers: [],
  providers: [],
})
export class ApiModule {}
