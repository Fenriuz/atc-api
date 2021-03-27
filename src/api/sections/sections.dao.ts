import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Section, SectionDocument } from './sections.schema';

@Injectable()
export class SectionsDao {
  constructor(@InjectModel(Section.name) private sectionModel: Model<SectionDocument>) {}

  async findAll() {
    try {
      return await this.sectionModel.find();
    } catch (dbErr) {}
  }
}
