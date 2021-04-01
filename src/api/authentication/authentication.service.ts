import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { httpErrors } from '@shared/constants/http-errors.constants';
import { UsersDao } from '../users/users.dao';
import { LoginDto } from './login.dto';
import { compare } from 'bcrypt';
import { TokensService } from './tokens/tokens.service';

@Injectable()
export class AuthenticationService {
  constructor(private usersDao: UsersDao, private tokensService: TokensService) {}
  async login({ email, phone, password }: LoginDto) {
    const user = await this.usersDao.findOne(email, phone);
    if (!user) {
      throw new HttpException(httpErrors.incorrectUserOrPassword, HttpStatus.UNAUTHORIZED);
    }
    if (user.disabled) {
      throw new HttpException(httpErrors.disabledUser, HttpStatus.FORBIDDEN);
    }

    const isMatch = await compare(password, user?.password);
    if (!isMatch) {
      throw new HttpException(httpErrors.incorrectUserOrPassword, HttpStatus.UNAUTHORIZED);
    }

    const refreshToken = await this.tokensService.generateRefreshToken(user?._id);
    const accessToken = await this.tokensService.generateAccessToken(user);

    return { accessToken, refreshToken };
  }

  async refresh(refreshToken: string) {
    const accessToken = await this.tokensService.generateAccessTokenFromRefreshToken(refreshToken);

    return { accessToken };
  }

  logout(refreshToken: string) {
    return this.tokensService.revokeToken(refreshToken);
  }
}
