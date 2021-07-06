import { IsMongoId, IsNotEmpty } from 'class-validator';

export class DeliveryManForOrderDto {
  @IsMongoId()
  @IsNotEmpty()
  deliveryMan: string;
}
