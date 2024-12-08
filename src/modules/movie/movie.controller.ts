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
} from '@nestjs/common';
import { GetMovieDetailDto } from './dto';
import { MovieService } from './movie.service';

@Controller('movie')
export class MovieController {
  constructor(private movieService: MovieService) {}
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getMovieDetail(@Param('id') movieID: GetMovieDetailDto) {
    try {
      return await this.movieService.getMovieDetail(movieID);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
