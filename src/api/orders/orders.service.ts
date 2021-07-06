import { Injectable } from '@nestjs/common';
import { OrdersDao } from './orders.dao';
import { DeliveryManForOrderDto } from './orders.dto';

@Injectable()
export class OrdersService {
  constructor(private ordersDao: OrdersDao) {}

  findAll() {
    return this.ordersDao.findAll();
  }

  findById(id: string) {
    return this.ordersDao.findById(id);
  }

  async assignDeliveryMan(order: string, deliveryMan: DeliveryManForOrderDto) {
    const updatedOrder = await this.ordersDao.assignDeliveryMan(order, deliveryMan);

    return await this.ordersDao.updateOnFirestore(String(updatedOrder._id), {
      deliveryMan: updatedOrder.deliveryMan,
    });
  }

  async deliveredOrder(order: string) {
    const updatedOrder = await this.ordersDao.deliveredOrder(order);

    return await this.ordersDao.updateOnFirestore(String(updatedOrder._id), {
      delivered: true,
    });
  }
}
