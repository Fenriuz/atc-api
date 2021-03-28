import { Injectable } from '@nestjs/common';
import { SectionsDao } from './sections.dao';
import { CreateSectionDto, UpdateSectionDto } from './sections.dto';

@Injectable()
export class SectionsService {
  constructor(private sectionsDao: SectionsDao) {}

  // findAll(restaurantId: string) {
  //   return this.sectionsDao.findAll(restaurantId);
  // }

  create(section: CreateSectionDto) {
    return this.sectionsDao.create(section);
  }

  findMealsBySectionId(restaurantId: string, sectionId: string) {
    return this.sectionsDao.findById(restaurantId);
  }

  // create(section: CreateSectionDto) {
  //   return this.sectionsDao.create(section);
  // }

  // update(section: UpdateSectionDto) {
  //   return this.sectionsDao.update(section);
  // }
}
