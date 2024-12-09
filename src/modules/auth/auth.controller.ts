import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthDto } from './dtos';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.OK)
  signup(@Body() dto: AuthDto) {
    // TODO: Implement signup logic
    this.authService.signup();
    return 'signup';
  }

  @Post('signin')
  @HttpCode(HttpStatus.CREATED)
  signin(@Body() dto: AuthDto) {
    // TODO: Implement signin logic
    this.authService.signin();
    return 'signin';
  }

  //   @UseGuards(JwtGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Req() req: Request) {
    // TODO: Implement logout logic
    this.authService.logout();
    return 'logout';
  }
}
