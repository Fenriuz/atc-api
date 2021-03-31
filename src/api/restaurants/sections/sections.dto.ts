import { IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Meal } from '../../meals/meal.schema';

export class CreateSectionDto {
  @IsString()
  @IsNotEmpty()
  readonly displayName?: string;

  @IsString()
  @IsOptional()
  readonly description?: string;

  @IsBoolean()
  @IsOptional()
  readonly disabled?: boolean;

  @IsOptional()
  @IsArray()
  readonly meals?: Meal[];
}

export class UpdateSectionDto {
  @IsBoolean()
  @IsNotEmpty()
  readonly disabled: boolean;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly displayName?: string;

  @IsString()
  @IsOptional()
  readonly description?: string;

  @IsOptional()
  @IsArray()
  readonly meals?: Meal[];
}
