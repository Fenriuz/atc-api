import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { controllerRoutes } from '@shared/constants/controller-routes.constants';
import { CreateMealDto, UpdateMealDto } from './meals.dto';
import { MealsService } from './meals.service';

@Controller(controllerRoutes.meals)
export class MealsController {
  constructor(private mealsService: MealsService) {}

  @Get()
  findAll() {
    return this.mealsService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.mealsService.findById(id);
  }

  @Post()
  create(@Body() meal: CreateMealDto) {
    return this.mealsService.create(meal);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() meal: UpdateMealDto) {
    return this.mealsService.update(id, meal);
  }
}
