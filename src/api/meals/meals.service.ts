import { Injectable } from '@nestjs/common';
import { CreateMealDto, UpdateMealDto } from './meals.dto';
import { MealsDao } from './meals.dao';
import { CloudinaryService } from '@services/cloudinary/cloudinary.service';
import { cloudinaryFolders } from '@shared/constants/cloudinary.constants';
import { MealDocument } from './meal.schema';

@Injectable()
export class MealsService {
  constructor(private mealsDao: MealsDao, private cloudinaryService: CloudinaryService) {}

  getMealImage(id: string) {
    const URL = cloudinaryFolders.url;

    const image = `${URL}/${cloudinaryFolders.meals}/${id}`;

    return image;
  }

  normalizedMeal(record: MealDocument) {
    const image = this.getMealImage(record?._id);
    const price = record?.price?.toString();
    const meal = {
      image,
      ...record?.toJSON(),
    };
    delete meal?.price;

    return { price, ...meal };
  }

  async findAll() {
    const records = await this.mealsDao.findAll();
    const meals = records.map((record) => {
      const meal = this.normalizedMeal(record);

      return meal;
    });

    return meals;
  }

  async findById(id: string) {
    const record = await this.mealsDao.findById(id);
    const meal = this.normalizedMeal(record);

    return meal;
  }

  async create(meal: CreateMealDto) {
    const record = await this.mealsDao.create(meal);
    this.cloudinaryService.upload(meal?.image, 'meal', record?._id);

    const createdMeal = this.normalizedMeal(record);

    return createdMeal;
  }

  async update(id: string, meal: UpdateMealDto) {
    const record = await this.mealsDao.update(id, meal);
    const updatedMeal = this.normalizedMeal(record);
    if (meal?.image) {
      this.cloudinaryService.upload(meal?.image, 'meal', record?._id);
    }

    return updatedMeal;
  }
}
