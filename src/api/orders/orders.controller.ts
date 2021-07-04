import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { controllerRoutes } from '@shared/constants/controller-routes.constants';
import { DeliveryManForOrderDto } from './orders.dto';
import { OrdersService } from './orders.service';

@Controller(controllerRoutes.orders)
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.ordersService.findById(id);
  }

  @Put(':id/deliveryMan')
  assignDeliveryMan(@Param('id') order: string, @Body() deliveryMan: DeliveryManForOrderDto) {
    return this.ordersService.assignDeliveryMan(order, deliveryMan);
  }

  @Put(':id/delivered')
  delivered(@Param('id') order: string) {
    return this.ordersService.deliveredOrder(order);
  }
}
