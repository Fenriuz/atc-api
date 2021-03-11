import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRestaurantDto, UpdateRestaurantDto } from './restaurants.dto';
import { Restaurant, RestaurantDocument } from './restaurants.schema';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectModel(Restaurant.name)
    private restaurantModel: Model<RestaurantDocument>,
  ) {}

  async getAll() {
    return await this.restaurantModel.find();
  }

  async create(restaurant: CreateRestaurantDto) {
    const newRestaurant = new this.restaurantModel(restaurant);
    return await newRestaurant.save();
  }

  async update(restaurant: UpdateRestaurantDto) {
    return 'abr';
  }
}
