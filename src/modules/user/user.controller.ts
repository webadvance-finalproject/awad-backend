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
  Delete,
} from '@nestjs/common';
import { AuthFirebaseGuard } from '../common/guards';
import { UserService } from './user.service';
import { UserDecorator } from './decorators';
import { UserDto, UserMovieDto, UserReviewDto } from './dto';
import { UserRatingDto } from './dto/user_rating.dto';
import { Public } from '../common/decorators';
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

  @Post('/rating')
  @HttpCode(HttpStatus.CREATED)
  async addRating(
    @Body() rating: UserRatingDto,
    @UserDecorator('uid') userID: string,
  ) {
    try {
      const createRating = await this.userService.addRating({ userID, rating });
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Create Rating successfully',
        data: { createRating },
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/rating')
  @HttpCode(HttpStatus.OK)
  async getRatings(@UserDecorator('uid') userID: string) {
    try {
      const ratings = await this.userService.getRatings({ userID });
      return {
        statusCode: HttpStatus.OK,
        message: 'Ratings retrieved successfully',
        data: { ratings },
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/rating/:movieID')
  @HttpCode(HttpStatus.OK)
  async getRating(
    @Param('movieID') movieID: string,
    @UserDecorator('uid') userID: string,
  ) {
    try {
      const rating = await this.userService.getRating({ movieID, userID });
      return {
        statusCode: HttpStatus.OK,
        message: 'Rating retrieved successfully',
        data: { rating },
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/review')
  @HttpCode(HttpStatus.CREATED)
  async addReview(
    @Body() review: UserReviewDto,
    @UserDecorator() user: UserDto,
  ) {
    try {
      const createReview = await this.userService.addReview(user, review);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Create Review successfully',
        data: { createReview },
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Public()
  @Get('/review/:movieID')
  @HttpCode(HttpStatus.OK)
  @UseGuards()
  async getReview(@Param('movieID') movieID: string) {
    try {
      const review = await this.userService.getReviews({ movieID });
      return {
        statusCode: HttpStatus.OK,
        message: 'Review retrieved successfully',
        data: { review },
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  @Public()
  @Get('/similar/:movieID')
  @HttpCode(HttpStatus.OK)
  async getSimilarMovies(@Param('movieID') movieID: string) {
    try {
      const similarMovies = await this.userService.getSimilarMovies({
        movieID,
      });
      return {
        statusCode: HttpStatus.OK,
        message: 'Similar movies retrieved successfully',
        data: { similarMovies },
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/similar')
  @HttpCode(HttpStatus.OK)
  async getSimilarMoviesBySearchHistory(@UserDecorator('uid') userID: string) {
    try {
      const similarMovies =
        await this.userService.getSimilarMoviesBySearchHistory({
          userID,
        });
      return {
        statusCode: HttpStatus.OK,
        message: 'Similar movies retrieved successfully',
        data: { similarMovies },
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
