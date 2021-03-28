import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { controllerRoutes } from '@shared/constants/controller-routes.constants';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto, UpdateCategoryDto } from './category.dto';

@Controller(controllerRoutes.categories)
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.categoriesService.findById(id);
  }

  @Post()
  create(@Body() category: CreateCategoryDto) {
    return this.categoriesService.create(category);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() category: UpdateCategoryDto) {
    return this.categoriesService.update(id, category);
  }
}
