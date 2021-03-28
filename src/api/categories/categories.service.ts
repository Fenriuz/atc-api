import { Injectable } from '@nestjs/common';
import { CategoriesDao } from './categories.dao';
import { CreateCategoryDto, UpdateCategoryDto } from './category.dto';

@Injectable()
export class CategoriesService {
  constructor(private categoriesDao: CategoriesDao) {}

  findAll() {
    return this.categoriesDao.findAll();
  }

  findById(id: string) {
    return this.categoriesDao.findById(id);
  }

  create(category: CreateCategoryDto) {
    return this.categoriesDao.create(category);
  }

  update(id: string, category: UpdateCategoryDto) {
    return this.categoriesDao.update(id, category);
  }
}
