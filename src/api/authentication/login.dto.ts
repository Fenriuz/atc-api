import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsOptional()
  readonly email?: string;

  @IsString()
  @IsOptional()
  readonly phone?: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
