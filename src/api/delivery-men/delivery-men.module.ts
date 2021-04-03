import { DeliveryMenController } from './delivery-men.controller';
import { DeliveryMenService } from './delivery-men.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { mongoCollections } from '@shared/constants/mongo-collections.constants';
import { DeliveryMan, DeliveryManSchema } from './delivery-men.schema';
import { DeliveryMenDao } from './delivery-men.dao';
import { CloudinaryModule } from '@services/cloudinary/cloudinary.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: DeliveryMan.name,
        schema: DeliveryManSchema,
        collection: mongoCollections.deliveryMen,
      },
    ]),
    CloudinaryModule,
  ],
  controllers: [DeliveryMenController],
  providers: [DeliveryMenService, DeliveryMenDao],
})
export class DeliveryMenModule {}
