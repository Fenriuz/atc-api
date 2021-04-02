import { SharedModule } from './shared/shared.module';
import { ServicesModule } from './services/services.module';
import { ApiModule } from './api/api.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './api/authentication/guards/jwt-auth.guard';
import { JwtStrategy } from './api/authentication/strategies/jwt.strategy';

@Module({
  imports: [
    SharedModule,
    ServicesModule,
    ApiModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    MongooseModule.forRoot(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
