import { IsDataURI, IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateDeliveryManDto {
  @IsString()
  @IsNotEmpty()
  readonly displayName: string;

  @IsString()
  @IsNotEmpty()
  readonly phone: string;

  @IsEmail()
  @IsOptional()
  readonly email: string;

  @IsDataURI()
  @IsOptional()
  readonly photo: string;
}

export class UpdateDeliveryManDto {
  @IsString()
  @IsOptional()
  readonly displayName?: string;

  @IsString()
  @IsOptional()
  readonly phone?: string;

  @IsEmail()
  @IsOptional()
  readonly email?: string;

  @IsDataURI()
  @IsOptional()
  readonly photo?: string;
}
