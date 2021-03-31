import { Complement } from '@ts/interfaces/complement';
import {
  IsArray,
  IsBoolean,
  IsDataURI,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateMealDto {
  @IsNotEmpty()
  @IsString()
  readonly displayName: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsMongoId()
  readonly restaurant: string;

  @IsNotEmpty()
  @IsString()
  readonly price: string;

  @IsNotEmpty()
  @IsDataURI()
  readonly image: string;

  @IsNotEmpty()
  readonly complements: Complement[];
}

export class UpdateMealDto {
  @IsString()
  @IsOptional()
  readonly displayName?: string;

  @IsString()
  @IsOptional()
  readonly description?: string;

  @IsMongoId()
  @IsOptional()
  readonly restaurant?: string;

  @IsString()
  @IsOptional()
  readonly price?: string;

  @IsOptional()
  @IsBoolean()
  readonly disabled?: boolean;

  @IsOptional()
  @IsDataURI()
  readonly image: string;

  @IsOptional()
  @IsArray()
  readonly complements?: Complement[];
}
