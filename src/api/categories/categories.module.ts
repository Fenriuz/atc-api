import { CategoriesController } from './categories.controller';
import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesDao } from './categories.dao';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from './category.schema';
import { mongoCollections } from '@shared/constants/mongo-collections.constants';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Category.name,
        schema: CategorySchema,
        collection: mongoCollections.categories,
      },
    ]),
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService, CategoriesDao],
})
export class CategoriesModule {}
