import { IsArray, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSectionDto {
  @IsString()
  @IsNotEmpty()
  readonly displayName: string;

  @IsString()
  @IsOptional()
  readonly description?: string;

  @IsOptional()
  @IsArray()
  readonly meals?: string[];
}
export class UpdateSectionDto {
  @IsMongoId()
  @IsNotEmpty()
  readonly _id: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly displayName: string;

  @IsString()
  @IsOptional()
  readonly description?: string;

  @IsOptional()
  @IsArray()
  readonly meals?: string[];
}
