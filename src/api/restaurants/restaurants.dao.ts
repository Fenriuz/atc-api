import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { httpErrors } from '@shared/constants/http-errors.constants';
import { LeanDocument, Model } from 'mongoose';
import { Restaurant, RestaurantDocument } from './restaurants.schema';
import { CreateSectionDto, UpdateSectionDto } from './sections/sections.dto';
@Injectable()
export class RestaurantsDao {
  populateCategories: { path: string; select: string };

  constructor(
    @InjectModel(Restaurant.name)
    private restaurantModel: Model<RestaurantDocument>,
  ) {
    this.populateCategories = {
      path: 'categories',
      select: 'displayName description disabled',
    };
  }

  async findAll(): Promise<RestaurantDocument[]> {
    try {
      return await this.restaurantModel.find().populate(this.populateCategories);
    } catch (dbErr) {
      throw new HttpException(httpErrors.findAllRestaurants, HttpStatus.CONFLICT);
    }
  }

  async findById(id: string): Promise<RestaurantDocument> {
    try {
      return await this.restaurantModel.findById(id).populate(this.populateCategories);
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

  async update(id: string, restaurant: Restaurant) {
    try {
      return await this.restaurantModel.findByIdAndUpdate(id, restaurant, { new: true });
    } catch (dbErr) {
      throw new HttpException(httpErrors.updateRestaurant, HttpStatus.CONFLICT);
    }
  }

  async findSection(restaurantId: string, sectionName: string) {
    try {
      return await this.restaurantModel
        .findById(restaurantId)
        .populate({
          path: 'sections.meals',
          select: 'displayName description disabled',
        })
        .select('sections');
    } catch (dbErr) {}
  }

  async createSection(restaurantId: string, section: CreateSectionDto) {
    try {
      return await this.restaurantModel.findByIdAndUpdate(
        restaurantId,
        {
          $push: {
            sections: section,
          },
        },
        { new: true },
      );
    } catch (dbErr) {
      throw new HttpException(httpErrors.createSection, HttpStatus.CONFLICT);
    }
  }

  async updateSection(restaurantId: string, currentSection: string, newSection: UpdateSectionDto) {
    try {
      return await this.restaurantModel.updateOne(
        { _id: restaurantId, 'sections.displayName': currentSection },
        {
          $set: {
            'sections.$.displayName': newSection?.displayName,
            'sections.$.description': newSection?.description,
            'sections.$.disabled': newSection?.disabled,
            'sections.$.meals': newSection?.meals,
          },
        },
        { new: true },
      );
    } catch (dbErr) {
      throw new HttpException(httpErrors.updateSection, HttpStatus.CONFLICT);
    }
  }
}
