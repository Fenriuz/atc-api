import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CloudinaryService } from '@services/cloudinary/cloudinary.service';
import { cloudinaryFolders } from '@shared/constants/cloudinary.constants';
import { httpErrors } from '@shared/constants/http-errors.constants';
import { DeliveryMenDao } from './delivery-men.dao';
import { CreateDeliveryManDto, UpdateDeliveryManDto } from './delivery-men.dto';

@Injectable()
export class DeliveryMenService {
  constructor(
    private deliveryMenDao: DeliveryMenDao,
    private cloudinaryServie: CloudinaryService,
  ) {}

  getPhoto(id: string) {
    const URL = cloudinaryFolders.url;

    return `${URL}/${cloudinaryFolders.deliveryMen}/${id}`;
  }

  async findAll() {
    const records = await this.deliveryMenDao.findAll();
    const deliveryMen = records.map((record) => {
      const image = this.getPhoto(record?._id);

      return { image, ...record.toJSON() };
    });

    return deliveryMen;
  }

  async findById(id: string) {
    const record = await this.deliveryMenDao.findById(id);
    if (!record) {
      throw new HttpException(httpErrors.findOneDeliveryMan, HttpStatus.NOT_FOUND);
    }

    const image = this.getPhoto(record?._id);

    return { image, ...record.toJSON() };
  }

  async create({ photo, ...deliveryMan }: CreateDeliveryManDto) {
    const newDeliveryMan = await this.deliveryMenDao.create(deliveryMan);

    this.cloudinaryServie.upload(photo, 'deliveryMan', newDeliveryMan._id);
    const image = this.getPhoto(newDeliveryMan?._id);

    return { image, ...newDeliveryMan.toJSON() };
  }

  async update(id: string, { photo, ...deliveryMan }: UpdateDeliveryManDto) {
    const updatedDeliveryMan = await this.deliveryMenDao.update(id, deliveryMan);

    if (photo) {
      this.cloudinaryServie.upload(photo, 'deliveryMan', id);
    }
    const photoDeliveryMan = this.getPhoto(id);

    return { photo: photoDeliveryMan, ...updatedDeliveryMan.toJSON() };
  }
}
