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
  Delete,
} from '@nestjs/common';
import { AuthFirebaseGuard } from '../common/guards';
import { UserService } from './user.service';
import { UserDecorator } from './decorators';
import { UserMovieDto } from './dto';
@Controller('user')
@UseGuards(AuthFirebaseGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/favorite')
  @HttpCode(HttpStatus.CREATED)
  async addFavorite(
    @Body('movieID') movieID: string | number,
    @UserDecorator('uid') userID: string,
  ) {
    try {
      const addFavoriteData = new UserMovieDto();
      addFavoriteData.movieID = movieID.toString();
      addFavoriteData.userID = userID;
      const createFavorite =
        await this.userService.addFavorite(addFavoriteData);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Create Favorite successfully',
        data: { createFavorite },
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('/favorite/:movieID')
  @HttpCode(HttpStatus.OK)
  async removeFavorite(
    @Param('movieID') movieID: string | number,
    @UserDecorator('uid') userID: string,
  ) {
    try {
      const removeFavoriteData = new UserMovieDto();
      removeFavoriteData.movieID = movieID.toString();
      removeFavoriteData.userID = userID;
      const removeFavorite =
        await this.userService.removeFavorite(removeFavoriteData);
      return {
        statusCode: HttpStatus.OK,
        message: 'Remove Favorite successfully',
        data: { removeFavorite },
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/favorite/:movieID')
  @HttpCode(HttpStatus.OK)
  async getFavorites(
    @Param('movieID') movieID: string,
    @UserDecorator('uid') userID: string,
  ) {
    try {
      const isFavorite = await this.userService.getFavorites({
        movieID,
        userID,
      });
      return {
        statusCode: HttpStatus.OK,
        message: 'Favorite status retrieved successfully',
        data: { isFavorite },
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/watchlist')
  @HttpCode(HttpStatus.CREATED)
  async addWatchlist(
    @Body('movieID') movieID: string | number,
    @UserDecorator('uid') userID: string,
  ) {
    try {
      const addWatchlistData = new UserMovieDto();
      addWatchlistData.movieID = movieID.toString();
      addWatchlistData.userID = userID;
      const createWatchlist =
        await this.userService.addWatchlist(addWatchlistData);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Create Watchlist successfully',
        data: { createWatchlist },
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('/watchlist/:movieID')
  @HttpCode(HttpStatus.OK)
  async removeWatchlist(
    @Param('movieID') movieID: string | number,
    @UserDecorator('uid') userID: string,
  ) {
    try {
      const removeWatchlistData = new UserMovieDto();
      removeWatchlistData.movieID = movieID.toString();
      removeWatchlistData.userID = userID;
      const removeWatchlist =
        await this.userService.removeWatchlist(removeWatchlistData);
      return {
        statusCode: HttpStatus.OK,
        message: 'Remove Watchlist successfully',
        data: { removeWatchlist },
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/watchlist/:movieID')
  @HttpCode(HttpStatus.OK)
  async getWatchlist(
    @Param('movieID') movieID: string,
    @UserDecorator('uid') userID: string,
  ) {
    try {
      const isWatchlist = await this.userService.getWatchlist({
        movieID,
        userID,
      });
      return {
        statusCode: HttpStatus.OK,
        message: 'Watchlist status retrieved successfully',
        data: { isWatchlist },
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
