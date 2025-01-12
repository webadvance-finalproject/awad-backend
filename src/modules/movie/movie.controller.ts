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
import { GetMovieDetailDto } from './dto';
import { MovieService } from './movie.service';
import { AuthFirebaseGuard } from '../common/guards';
import { CustomParseArrayPipe } from '../common/pipes/custom-parse-array.pipe';
@Controller('movie')
export class MovieController {
  constructor(private movieService: MovieService) {}

  @Get('search')
  // @UseGuards(AuthFirebaseGuard)
  @HttpCode(HttpStatus.OK)
  async searchMovie(
    @Query('keyword') keyword,
    @Query('actors', new CustomParseArrayPipe()) actors = [],
    @Query('genres', new CustomParseArrayPipe()) genres = [],
    @Query('minRating') minRating,
    @Query('maxRating') maxRating,
    @Query('minYear') minYear,
    @Query('page') page,
    @Query('limit') limit,
  ) {
    try {
      return await this.movieService.searchWithFilter(
        keyword,
        actors,
        genres,
        minRating,
        maxRating,
        minYear,
        page,
        limit,
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/genres')
  @UseGuards(AuthFirebaseGuard)
  @HttpCode(HttpStatus.OK)
  async getAllGenre() {
    try {
      return await this.movieService.getAllGenre();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/genres/find')
  @UseGuards(AuthFirebaseGuard)
  @HttpCode(HttpStatus.OK)
  async findGenresByIds(
    @Query('ids', new CustomParseArrayPipe()) genreIDs: string[],
  ) {
    try {
      return await this.movieService.findGenresByManyID(genreIDs);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('popular')
  @HttpCode(HttpStatus.OK)
  async getPopularMovies(@Query('page') page?: number) {
    try {
      console.log('đã vào được controller');
      return await this.movieService.getPopularMovies(page);
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

  @Get('trending/today')
  @HttpCode(HttpStatus.OK)
  async getTrendingMoviesToday(@Query('page') page?: number) {
    try {
      return await this.movieService.getTrendingMoviesToday(page);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('trending/this-week')
  @HttpCode(HttpStatus.OK)
  async getTrendingMoviesThisWeek(@Query('page') page?: number) {
    try {
      return await this.movieService.getTrendingMoviesThisWeek(page);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('actor/search')
  @HttpCode(HttpStatus.OK)
  async searchActor(
    @Query('keyword') keyword: string,
    @Query('page', new ParseIntPipe({ optional: true })) page: number = 1,
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number = 20,
  ) {
    try {
      const rs = await this.movieService.searchActor(keyword, page, limit);
      return {
        page,
        results: rs,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('actor/find')
  @HttpCode(HttpStatus.OK)
  async findActorsByIds(
    @Query('ids', new CustomParseArrayPipe()) actorIDs: string[],
  ) {
    try {
      return await this.movieService.getActorByIDs(actorIDs);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('actor/:id')
  @HttpCode(HttpStatus.OK)
  async getActorDetail(@Param('id') actorID: string) {
    try {
      return await this.movieService.getActorDetail(actorID);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id/cast')
  @HttpCode(HttpStatus.OK) // 200
  async getMovieCast(@Param('id') movieID: GetMovieDetailDto) {
    try {
      return await this.movieService.getMovieCast(movieID);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('llm')
  @HttpCode(HttpStatus.OK)
  async searchByLLM(@Body('query') query: string) {
    try {
      const searchByLlmData = await this.movieService.searchByLlm({ query });
      return {
        statusCode: HttpStatus.OK,
        message: 'search by llm successfully',
        data: { searchByLlmData },
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
