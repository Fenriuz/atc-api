import { IsJWT, IsNotEmpty } from 'class-validator';

export class TokenDto {
  @IsNotEmpty()
  @IsJWT()
  readonly refreshToken: string;
}
