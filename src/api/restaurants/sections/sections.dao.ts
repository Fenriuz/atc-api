import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { httpErrors } from '@shared/constants/http-errors.constants';
import { Model } from 'mongoose';
import { Section, SectionDocument } from './sections.schema';

@Injectable()
export class SectionsDao {
  constructor(@InjectModel(Section.name) private sectionModel: Model<SectionDocument>) {}

  async findAll(restaurantId: string) {
    try {
      return await this.sectionModel.findOne({
        restaurant_id: restaurantId,
      });
    } catch (dbErr) {
      throw new HttpException(httpErrors.findAllSections, HttpStatus.NOT_FOUND);
    }
  }

  async findById(_id: string) {
    try {
      return await this.sectionModel.findById(_id);
    } catch (dbErr) {
      throw new HttpException(httpErrors.findOneSection, HttpStatus.NOT_FOUND);
    }
  }

  async create(section: Section) {
    try {
      const newSection = new this.sectionModel(section);
      return await newSection.save();
    } catch (dbErr) {
      throw new HttpException(httpErrors.createSection, HttpStatus.NOT_FOUND);
    }
  }

  async update({ _id, ...section }: Section) {
    try {
      return await this.sectionModel.findByIdAndUpdate(_id, section);
    } catch (dbErr) {
      throw new HttpException(httpErrors.createSection, HttpStatus.NOT_FOUND);
    }
  }
}
