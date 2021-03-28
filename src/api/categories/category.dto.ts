import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  readonly displayName: string;

  @IsString()
  @IsOptional()
  readonly description?: string;
}

export class UpdateCategoryDto {
  @IsString()
  @IsOptional()
  readonly displayName?: string;

  @IsString()
  @IsOptional()
  readonly description?: string;
}
