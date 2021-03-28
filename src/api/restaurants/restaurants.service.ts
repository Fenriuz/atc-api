import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CloudinaryService } from '@services/cloudinary/cloudinary.service';
import { cloudinaryFolders } from '@shared/constants/cloudinary.constants';
import { httpErrors } from '@shared/constants/http-errors.constants';
import { ScheduleHoursService } from '@shared/services/schedule-hours.service';
import { RestaurantsDao } from './restaurants.dao';
import { CreateRestaurantDto, UpdateRestaurantDto } from './restaurants.dto';
import { RestaurantDocument } from './restaurants.schema';
import { CreateSectionDto, UpdateSectionDto } from './sections/sections.dto';
import { SectionsService } from './sections/sections.service';

@Injectable()
export class RestaurantsService {
  constructor(
    private readonly restaurantsDao: RestaurantsDao,
    @Inject(CloudinaryService)
    private readonly _cloudinaryService: CloudinaryService,
    private readonly scheduleHoursService: ScheduleHoursService,
    private readonly sectionService: SectionsService,
  ) {}

  private getExtraData(restaurantData: RestaurantDocument) {
    const { schedule, ...restaurant } = restaurantData.toJSON();
    const URL = cloudinaryFolders.url;

    const images = {
      cover: `${URL}/${cloudinaryFolders.restaurantCovers}/${restaurant?._id}`,
      logo: `${URL}/${cloudinaryFolders.restaurantLogos}/${restaurant?._id}`,
    };

    const closed = this.scheduleHoursService.isClosed(schedule);

    return { closed, images, ...restaurant };
  }

  async findAll() {
    const restaurants = await this.restaurantsDao.findAll();
    // const restaurants = records.map((restaurant) => this.getExtraData(restaurant));

    return restaurants;
  }

  async findById(id: string) {
    const restaurant = await this.restaurantsDao.findById(id);
    // const restaurant = this.getExtraData(record);

    return restaurant;
  }

  async create({ images, ...restaurant }: CreateRestaurantDto) {
    const createdRestaurant = await this.restaurantsDao.create(restaurant);

    this._cloudinaryService.upload(images?.cover, 'restaurantCover', createdRestaurant?._id);
    this._cloudinaryService.upload(images?.logo, 'restaurantLogo', createdRestaurant?._id);

    return createdRestaurant;
  }

  async update(id: string, restaurant: UpdateRestaurantDto) {
    return this.restaurantsDao.update(id, restaurant);
  }

  async createSection(restaurantId: string, section: CreateSectionDto) {
    const record = await this.restaurantsDao.createSection(restaurantId, section);
    if (!record) {
      throw new HttpException(httpErrors.findOneRestaurant, HttpStatus.BAD_REQUEST);
    }

    return record;
  }

  async updateSection(
    restaurantId: string,
    currentSection: string,
    newSection: UpdateSectionDto[],
  ) {
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
}
