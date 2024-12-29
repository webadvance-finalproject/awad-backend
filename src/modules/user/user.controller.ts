import {
  Controller,
  Body,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Get,
  Param,
  HttpException,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { AuthFirebaseGuard } from '../common/guards';
import { UserService } from './user.service';
@Controller('user')
@UseGuards(AuthFirebaseGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/favorite')
  @HttpCode(HttpStatus.CREATED)
  async addFavorite(@Body() body: any) {
    try {
      return await this.userService.addFavorite(body);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
