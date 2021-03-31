import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Meal, MealDocument } from './meal.schema';
import { httpErrors } from '@shared/constants/http-errors.constants';

@Injectable()
export class MealsDao {
  constructor(@InjectModel(Meal.name) private mealModel: Model<MealDocument>) {}

  async findAll(): Promise<MealDocument[]> {
    try {
      return await this.mealModel.find();
    } catch (e) {
      throw new HttpException(httpErrors.findAllMeals, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findById(id: string): Promise<MealDocument> {
    try {
      return await this.mealModel.findById(id);
    } catch (dbErr) {
      throw new HttpException(httpErrors.findOneMeal, HttpStatus.NOT_FOUND);
    }
  }

  async create({ price, ...meal }: Meal): Promise<MealDocument> {
    try {
      const newMeal = new this.mealModel({
        ...meal,
        price: { $numberDecimal: price },
      });

      return await newMeal.save();
    } catch (dbErr) {
      console.log(dbErr);
      throw new HttpException(httpErrors.createMeal, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: string, meal: Meal): Promise<MealDocument> {
    try {
      return await this.mealModel.findByIdAndUpdate(id, meal, { new: true });
    } catch (e) {
      throw new HttpException(httpErrors.updateMeal, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
