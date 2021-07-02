import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { mongoCollections } from '@shared/constants/mongo-collections.constants';
import { Order, OrderSchema } from './order.schema';
import { OrdersDao } from './orders.dao';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Order.name,
        collection: mongoCollections.orders,
        schema: OrderSchema,
      },
    ]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersDao],
})
export class OrdersModule {}
