import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { httpErrors } from '@shared/constants/http-errors.constants';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './order.schema';
import { DeliveryManForOrderDto } from './orders.dto';

@Injectable()
export class OrdersDao {
  constructor(@InjectModel(Order.name) private orderModel: Model<OrderDocument>) {}

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

  async assignDeliveryMan(order: string, deliveryMan: DeliveryManForOrderDto) {
    try {
      return await this.orderModel.findByIdAndUpdate(order, {
        deliveryMan: deliveryMan.id,
      });
    } catch (dbErr) {}
  }
}
