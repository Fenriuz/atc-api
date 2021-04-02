import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { mongoCollections } from '@shared/constants/mongo-collections.constants';
import { UsersModule } from '../users/users.module';
import { Token, TokenSchema } from './tokens/token.schema';
import { TokensService } from './tokens/tokens.service';
import { TokensDao } from './tokens/tokens.dao';
import { JwtModule } from '@nestjs/jwt';
import { authConstants } from '@shared/constants/authentication.constants';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      {
        name: Token.name,
        schema: TokenSchema,
        collection: mongoCollections.tokens,
      },
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: authConstants.tokenExpiration },
    }),
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, TokensService, TokensDao],
})
export class AuthenticationModule {}
