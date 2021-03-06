import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { controllerRoutes } from '@shared/constants/controller-routes.constants';
import { CreateRestaurantDto, UpdateRestaurantDto } from './restaurants.dto';
import { RestaurantsService } from './restaurants.service';
import { CreateSectionDto, UpdateSectionDto } from './sections/sections.dto';

@Controller(controllerRoutes.restaurants)
export class RestaurantsController {
  constructor(private restaurantsService: RestaurantsService) {}

  @Get()
  findRestaurants() {
    return this.restaurantsService.findAll();
  }

  @Get(':id')
  findRestaurantById(@Param('id') id: string) {
    return this.restaurantsService.findById(id);
  }

  @Post()
  createRestaurant(@Body() restaurant: CreateRestaurantDto) {
    return this.restaurantsService.create(restaurant);
  }

  @Put(':id')
  updateRestaurant(@Param('id') id: string, @Body() restaurant: UpdateRestaurantDto) {
    return this.restaurantsService.update(id, restaurant);
  }

  @Post(':restaurantId/sections')
  createSection(@Param('restaurantId') restaurantId: string, @Body() section: CreateSectionDto) {
    return this.restaurantsService.createSection(restaurantId, section);
  }

  @Get(':restaurantId/sections/:currentSection')
  findSection(
    @Param('restaurantId') restaurantId: string,
    @Param('currentSection') currentSection: string,
  ) {
    return this.restaurantsService.findSection(restaurantId, currentSection);
  }

  @Put(':restaurantId/sections/:currentSection')
  updateSection(
    @Param('restaurantId') restaurantId: string,
    @Param('currentSection') currentSection: string,
    @Body() newSection: UpdateSectionDto,
  ) {
    return this.restaurantsService.updateSection(restaurantId, currentSection, newSection);
  }
}
