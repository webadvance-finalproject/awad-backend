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
  ParseIntPipe
} from '@nestjs/common';
import { GetMovieDetailDto } from './dto';
import { MovieService } from './movie.service';
import { AuthFirebaseGuard } from '../common/guards';

@Controller('movie')
export class MovieController {
  constructor(private movieService: MovieService) {}

  @Get('search')
  // @UseGuards(AuthFirebaseGuard)
  @HttpCode(HttpStatus.OK)
  async searchMovie(@Query('keyword') keyword: string, @Query('page', ParseIntPipe) page: number = 1) {
    try {
      return await this.movieService.searchMovie(keyword, page);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  @UseGuards(AuthFirebaseGuard)
  @HttpCode(HttpStatus.OK)
  async getMovieDetail(@Param('id') movieID: GetMovieDetailDto) {
    try {
      return await this.movieService.getMovieDetail(movieID);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('trending/day')
  @HttpCode(HttpStatus.OK)
  async getTrendingMoviesByDay(@Query('page') page?: number) {
    try {
      return await this.movieService.getTrendingMoviesByDay(page);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('trending/week')
  @HttpCode(HttpStatus.OK)
  async getTrendingMoviesByWeek(@Query('page') page?: number) {
    try {
      return await this.movieService.getTrendingMoviesByWeek(page);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
