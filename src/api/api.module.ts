import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { CategoriesModule } from './categories/categories.module';
import { DeliveryMenModule } from './delivery-men/delivery-men.module';
import { MealsModule } from './meals/meals.module';
import { OrdersModule } from './orders/orders.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MealsModule,
    DeliveryMenModule,
    RestaurantsModule,
    CategoriesModule,
    UsersModule,
    AuthenticationModule,
    OrdersModule,
  ],
  controllers: [],
  providers: [],
})
export class ApiModule {}
