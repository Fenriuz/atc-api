import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { httpErrors } from '@shared/constants/http-errors.constants';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './order.schema';
import { DeliveryManForOrderDto } from './orders.dto';
import { firestore } from 'firebase-admin';
import { mongoCollections } from '@shared/constants/mongo-collections.constants';

@Injectable()
export class OrdersDao {
  constructor(@InjectModel(Order.name) private orderModel: Model<OrderDocument>) {}

  async updateOnFirestore(id: string, data: any) {
    try {
      const db = firestore();

      const docRef = db.collection(mongoCollections.orders).doc(id);
      const orderFormated = JSON.stringify(data);
      await docRef.update(JSON.parse(orderFormated));
    } catch (e) {
      console.log(e);
      throw new HttpException(httpErrors.updateOrder, HttpStatus.CONFLICT);
    }
  }

  async findAll() {
    try {
      return await this.orderModel.find();
    } catch (dbErr) {
      throw new HttpException(httpErrors.findAllOrders, HttpStatus.CONFLICT);
    }
  }

  async findById(id: string) {
    try {
      return await this.orderModel.findById(id);
    } catch (dbErr) {
      throw new HttpException(httpErrors.findOneOrder, HttpStatus.CONFLICT);
    }
  }

  async assignDeliveryMan(order: string, { deliveryMan }: DeliveryManForOrderDto) {
    try {
      return await this.orderModel
        .findByIdAndUpdate(
          order,
          {
            deliveryMan,
          },
          { new: true },
        )
        .populate({
          path: 'deliveryMan',
          select: 'displayName phone',
        });
    } catch (dbErr) {
      console.log(dbErr);
      throw new HttpException(httpErrors.assignOrder, HttpStatus.CONFLICT);
    }
  }

  async deliveredOrder(order: string) {
    try {
      return await this.orderModel.findByIdAndUpdate(
        order,
        {
          delivered: true,
        },
        { new: true },
      );
    } catch (dbErr) {
      throw new HttpException(httpErrors.deliveredOrder, HttpStatus.CONFLICT);
    }
  }
}
