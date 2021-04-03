import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { controllerRoutes } from '@shared/constants/controller-routes.constants';
import { CreateDeliveryManDto, UpdateDeliveryManDto } from './delivery-men.dto';
import { DeliveryMenService } from './delivery-men.service';

@Controller(controllerRoutes.deliveryMen)
export class DeliveryMenController {
  constructor(private deliveryMenService: DeliveryMenService) {}

  @Get()
  findAll() {
    return this.deliveryMenService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.deliveryMenService.findById(id);
  }

  @Post()
  create(@Body() deliveryMan: CreateDeliveryManDto) {
    return this.deliveryMenService.create(deliveryMan);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() deliveryMan: UpdateDeliveryManDto) {
    return this.deliveryMenService.update(id, deliveryMan);
  }
}
