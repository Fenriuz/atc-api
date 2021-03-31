import { IsBoolean, IsDataURI, IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  readonly displayName: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly phone: string;

  @IsDataURI()
  @IsNotEmpty()
  readonly photo: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @IsOptional()
  @IsBoolean()
  readonly disabled?: boolean;
}

export class UpdateUserDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly displayName?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsEmail()
  readonly email?: string;

  @IsDataURI()
  @IsOptional()
  @IsNotEmpty()
  readonly photo: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly phone?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly password?: string;

  @IsOptional()
  @IsBoolean()
  readonly disabled?: boolean;
}
