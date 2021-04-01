import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { httpErrors } from '@shared/constants/http-errors.constants';
import { User } from '../../users/user.schema';
import { TokensDao } from './tokens.dao';

@Injectable()
export class TokensService {
  constructor(private jwtService: JwtService, private tokensDao: TokensDao) {}

  private decodeRefreshToken(encoded: string) {
    try {
      return this.jwtService.verify(encoded);
    } catch (jwtError) {
      throw new HttpException(httpErrors.verifyRefreshToken, HttpStatus.BAD_REQUEST);
    }
  }

  async resolveRefreshToken(encoded: string) {
    const payload = this.decodeRefreshToken(encoded);
    const token = await this.tokensDao.findById(payload?.jti);
    if (!token) {
      throw new HttpException(httpErrors.verifyRefreshToken, HttpStatus.BAD_REQUEST);
    }

    if (token?.user['disabled']) {
      throw new HttpException(httpErrors.userDisabled, HttpStatus.FORBIDDEN);
    }

    return token;
  }

  async generateAccessToken({ _id, displayName, disabled, phone, email }: User) {
    try {
      return this.jwtService.sign(
        { displayName, disabled, phone, email },
        { subject: _id.toString() },
      );
    } catch (dbErr) {
      throw new HttpException(httpErrors.createToken, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async generateRefreshToken(userId: string) {
    const savedToken = await this.tokensDao.create(userId);

    const expiresIn = new Date();
    expiresIn.setDate(expiresIn.getDate() + 365);

    try {
      return this.jwtService.sign(
        {},
        {
          expiresIn: Number(expiresIn),
          subject: userId.toString(),
          jwtid: savedToken?._id?.toString(),
        },
      );
    } catch (dbErr) {
      throw new HttpException(httpErrors.createToken, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async generateAccessTokenFromRefreshToken(refreshToken: string) {
    const dataToken = await this.resolveRefreshToken(refreshToken);
    const accessToken = this.generateAccessToken(dataToken.user);

    return accessToken;
  }

  revokeToken(refreshToken: string) {
    const { jti } = this.decodeRefreshToken(refreshToken);

    return this.tokensDao.revoke(jti);
  }
}
