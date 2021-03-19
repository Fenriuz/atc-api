import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { controllerRoutes } from '@shared/constants/controller-routes.constants';
import { CreateRestaurantDto, UpdateRestaurantDto } from './restaurants.dto';
import { RestaurantsService } from './restaurants.service';

@Controller(controllerRoutes.restaurants)
export class RestaurantsController {
  constructor(private restaurantsService: RestaurantsService) {}

  @Get()
  findAll() {
    return this.restaurantsService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.restaurantsService.findById(id);
  }

  @Post()
  create(@Body() restaurant: CreateRestaurantDto) {
    return this.restaurantsService.create(restaurant);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() restaurant: UpdateRestaurantDto) {
    return this.restaurantsService.update(restaurant);
  }
}
