import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CloudinaryService } from '@services/cloudinary/cloudinary.service';
import { cloudinaryFolders } from '@shared/constants/cloudinary.constants';
import { httpErrors } from '@shared/constants/http-errors.constants';
import { RestaurantsDao } from './restaurants.dao';
import { CreateRestaurantDto, UpdateRestaurantDto } from './restaurants.dto';
import { CreateSectionDto, UpdateSectionDto } from './sections/sections.dto';

@Injectable()
export class RestaurantsService {
  constructor(
    private readonly restaurantsDao: RestaurantsDao,
    @Inject(CloudinaryService)
    private readonly _cloudinaryService: CloudinaryService,
  ) {}

  getRestaurantImages(id: string) {
    const URL = cloudinaryFolders.url;

    const images = {
      cover: `${URL}/${cloudinaryFolders.restaurantCovers}/${id}`,
      logo: `${URL}/${cloudinaryFolders.restaurantLogos}/${id}`,
    };

    return images;
  }

  async findAll() {
    const records = await this.restaurantsDao.findAll();
    const restaurants = records.map((restaurant) => {
      const images = this.getRestaurantImages(restaurant?._id);

      return { images, ...restaurant.toJSON() };
    });

    return restaurants;
  }

  async findById(id: string) {
    const restaurant = await this.restaurantsDao.findById(id);
    const images = this.getRestaurantImages(id);

    return { images, ...restaurant.toJSON() };
  }

  async create({ images, ...restaurant }: CreateRestaurantDto) {
    const createdRestaurant = await this.restaurantsDao.create(restaurant);

    this._cloudinaryService.upload(images?.cover, 'restaurantCover', createdRestaurant?._id);
    this._cloudinaryService.upload(images?.logo, 'restaurantLogo', createdRestaurant?._id);

    const restaurantImages = this.getRestaurantImages(createdRestaurant?._id);

    return { restaurantImages, ...createdRestaurant.toJSON() };
  }

  async update(id: string, { images, ...restaurant }: UpdateRestaurantDto) {
    const editedRestaurant = await this.restaurantsDao.update(id, restaurant);

    if (images?.cover) {
      this._cloudinaryService.upload(images?.cover, 'restaurantCover', id);
    }

    if (images?.logo) {
      this._cloudinaryService.upload(images?.logo, 'restaurantLogo', id);
    }

    const restaurantImages = this.getRestaurantImages(id);

    return { restaurantImages, ...editedRestaurant.toJSON() };
  }

  async findSection(restaurantId: string, sectionName: string) {
    return await this.restaurantsDao.findSection(restaurantId, sectionName);
  }

  async createSection(restaurantId: string, section: CreateSectionDto) {
    const record = await this.restaurantsDao.createSection(restaurantId, section);
    if (!record) {
      throw new HttpException(httpErrors.findOneRestaurant, HttpStatus.BAD_REQUEST);
    }

    return record;
  }

  async updateSection(restaurantId: string, currentSection: string, newSection: UpdateSectionDto) {
    const record = await this.restaurantsDao.updateSection(
      restaurantId,
      currentSection,
      newSection,
    );

    if (record.n === 0) {
      throw new HttpException(httpErrors.findOneSection, HttpStatus.BAD_REQUEST);
    }

    return newSection;
  }

  // private scheduleToUTC(schedule: Schedule): Schedule {
  //   const keys = Object.keys(schedule);
  //   const newSchedule = keys.reduce(
  //     (acc, key) => {
  //       const day: Day = schedule[key];

  //       let openHour = day?.hours?.[0] ? day.hours[0] + 360 : null;
  //       if (openHour > 1440) {
  //         openHour -= 1440;
  //       }

  //       let closeHour = day?.hours?.[1] ? day.hours[1] + 360 : null;
  //       if (openHour > 1440) {
  //         closeHour -= 1440;
  //       }

  //       const newHours: [number, number] =
  //         openHour && closeHour ? [openHour, closeHour] : undefined;
  //       day.hours = newHours;

  //       acc[key] = {
  //         [key]: day,
  //       };

  //       return acc;
  //     },
  //     {
  //       monday: {},
  //       tuesday: {},
  //       wednesday: {},
  //       thursday: {},
  //       friday: {},
  //       saturday: {},
  //       sunday: {},
  //     },
  //   );

  //   return newSchedule;
  // }
}
