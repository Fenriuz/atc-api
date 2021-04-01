import { Body, Controller, Post } from '@nestjs/common';
import { controllerRoutes } from '@shared/constants/controller-routes.constants';
import { AuthenticationService } from './authentication.service';
import { LoginDto } from './login.dto';
import { TokenDto } from './tokens/token.dto';

@Controller(controllerRoutes.authentication)
export class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) {}

  @Post('login')
  login(@Body() credentials: LoginDto) {
    return this.authenticationService.login(credentials);
  }

  @Post('refresh')
  refresh(@Body() tokens: TokenDto) {
    return this.authenticationService.refresh(tokens.refreshToken);
  }

  @Post('logout')
  logout(@Body() tokens: TokenDto) {
    return this.authenticationService.logout(tokens.refreshToken);
  }
}
