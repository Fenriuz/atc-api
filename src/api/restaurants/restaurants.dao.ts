import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { httpErrors } from '@shared/constants/http-errors.constants';
import { Model } from 'mongoose';
import { Restaurant, RestaurantDocument } from './restaurants.schema';

@Injectable()
export class RestaurantsDao {
  constructor(
    @InjectModel(Restaurant.name)
    private restaurantModel: Model<RestaurantDocument>,
  ) {}

  async findAll(): Promise<RestaurantDocument[]> {
    try {
      return await this.restaurantModel.find().exec();
    } catch (dbErr) {
      throw new HttpException(httpErrors.findAllRestaurants, HttpStatus.CONFLICT);
    }
  }

  async findById(id: string): Promise<RestaurantDocument> {
    try {
      return await this.restaurantModel.findById(id).exec();
    } catch (dbErr) {
      throw new HttpException(httpErrors.findAllRestaurants, HttpStatus.BAD_REQUEST);
    }
  }

  async create(restaurant: Restaurant): Promise<RestaurantDocument> {
    try {
      const newRestaurant = new this.restaurantModel(restaurant);
      return await newRestaurant.save();
    } catch (dbErr) {
      throw new HttpException(httpErrors.createRestaurant, HttpStatus.CONFLICT);
    }
  }

  async update({ _id, ...restaurant }: Restaurant) {
    try {
      return await this.restaurantModel.findByIdAndUpdate(_id, restaurant);
    } catch (dbErr) {
      throw new HttpException(httpErrors.createRestaurant, HttpStatus.CONFLICT);
    }
  }
}
