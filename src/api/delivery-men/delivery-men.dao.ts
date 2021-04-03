import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { databaseErrors } from '@shared/constants/database-errors.constants';
import { httpErrors } from '@shared/constants/http-errors.constants';
import { Model } from 'mongoose';
import { DeliveryMan, DeliveryManDocument } from './delivery-men.schema';

@Injectable()
export class DeliveryMenDao {
  constructor(
    @InjectModel(DeliveryMan.name) private deliveryManModel: Model<DeliveryManDocument>,
  ) {}

  async findAll() {
    try {
      return await this.deliveryManModel.find();
    } catch (dbErr) {
      throw new HttpException(httpErrors.findAllDeliveryMen, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findById(id: string) {
    try {
      return await this.deliveryManModel.findById(id);
    } catch (dbErr) {
      throw new HttpException(httpErrors.findOneDeliveryMan, HttpStatus.NOT_FOUND);
    }
  }

  async create(deliveryMan: DeliveryMan) {
    try {
      return await this.deliveryManModel.create(deliveryMan);
    } catch (dbErr) {
      throw new HttpException(
        databaseErrors(dbErr, httpErrors.createDeliveryMan),
        HttpStatus.CONFLICT,
      );
    }
  }

  async update(id: string, deliveryMan: DeliveryMan) {
    try {
      return await this.deliveryManModel.findByIdAndUpdate(id, deliveryMan);
    } catch (dbErr) {
      throw new HttpException(
        databaseErrors(dbErr, httpErrors.updateDeliveryMan),
        HttpStatus.CONFLICT,
      );
    }
  }
}
