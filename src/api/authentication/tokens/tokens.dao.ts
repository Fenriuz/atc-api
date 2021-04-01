import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { httpErrors } from '@shared/constants/http-errors.constants';
import { Model } from 'mongoose';
import { Token, TokenDocument } from './token.schema';

@Injectable()
export class TokensDao {
  constructor(@InjectModel(Token.name) private tokenModel: Model<TokenDocument>) {}

  async findById(id: string) {
    try {
      return await this.tokenModel.findById(id).populate({
        path: 'user',
        select: 'displayName disabled phone email',
      });
    } catch (dbErr) {
      throw new HttpException(httpErrors.verifyRefreshToken, HttpStatus.BAD_REQUEST);
    }
  }

  async create(userId: string) {
    try {
      const token = new this.tokenModel({ user: userId });

      return await token.save();
    } catch (dbErr) {
      throw new HttpException(httpErrors.createToken, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async revoke(tokenId: string) {
    try {
      return await this.tokenModel.findByIdAndDelete(tokenId);
    } catch (dbErr) {
      throw new HttpException(httpErrors.logout, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
