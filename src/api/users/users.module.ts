import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { mongoCollections } from '@shared/constants/mongo-collections.constants';
import { User, UserSchema } from './user.schema';
import { UsersDao } from './users.dao';
import { CloudinaryModule } from '@services/cloudinary/cloudinary.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
        collection: mongoCollections.users,
      },
    ]),
    CloudinaryModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersDao],
  exports: [UsersDao],
})
export class UsersModule {}
