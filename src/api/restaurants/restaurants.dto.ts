import { RestaurantLocation } from '@ts/interfaces/restaurant-location';
import { RestaurantImages } from '@ts/interfaces/RestaurantImages';
import { Schedule } from '@ts/interfaces/schedule';
import { Section } from '@ts/interfaces/section';
import { IsMongoId, IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';
export class CreateRestaurantDto {
  @IsString()
  @IsNotEmpty()
  readonly displayName: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsString()
  @IsNotEmpty()
  readonly phone?: string;

  @IsString()
  @IsNotEmpty()
  readonly email?: string;

  @IsNotEmpty()
  @IsObject()
  readonly locations: RestaurantLocation;

  @IsNotEmpty()
  @IsObject()
  readonly schedule?: Schedule;

  @IsObject()
  @IsOptional()
  readonly sections?: Section[];

  @IsObject()
  @IsOptional()
  readonly images: RestaurantImages;
}

export class UpdateRestaurantDto {
  @IsMongoId()
  @IsNotEmpty()
  readonly _id: string;

  @IsString()
  @IsNotEmpty()
  readonly displayName: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsString()
  @IsNotEmpty()
  readonly phone: string;

  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  readonly locations: RestaurantLocation;

  @IsNotEmpty()
  readonly schedule: Schedule;
}
