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

  assignDeliveryMan(order: string, deliveryMan: DeliveryManForOrderDto) {
    return this.ordersDao.assignDeliveryMan(order, deliveryMan);
  }

  deliveredOrder(order: string) {
    return this.ordersDao.deliveredOrder(order);
  }
}
