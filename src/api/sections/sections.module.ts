import { SectionsService } from './sections.service';
import { Module } from '@nestjs/common';
import { SectionsDao } from './sections.dao';
import { Section, SectionSchema } from './sections.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { mongoCollections } from '@shared/constants/mongo-collections.constants';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Section.name,
        schema: SectionSchema,
        collection: mongoCollections.sections,
      },
    ]),
  ],
  controllers: [],
  providers: [SectionsService, SectionsDao],
})
export class SectionsModule {}
