import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { httpErrors } from '@shared/constants/http-errors.constants';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from './category.schema';

@Injectable()
export class CategoriesDao {
  constructor(@InjectModel(Category.name) private categoryModel: Model<CategoryDocument>) {}

  async findAll() {
    try {
      return await this.categoryModel.find();
    } catch (dbErr) {
      throw new HttpException(httpErrors.findAllCategories, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findById(id: string) {
    try {
      return await this.categoryModel.findById(id);
    } catch (dbErr) {
      throw new HttpException(httpErrors.findOneCategory, HttpStatus.NOT_FOUND);
    }
  }

  async create(category: Category) {
    try {
      const record = new this.categoryModel(category);

      return await record.save();
    } catch (dbErr) {
      throw new HttpException(httpErrors.createCategory, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: string, category: Category) {
    try {
      return await this.categoryModel.findByIdAndUpdate(id, category, { new: true });
    } catch (dbErr) {
      throw new HttpException(httpErrors.updateCategory, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
