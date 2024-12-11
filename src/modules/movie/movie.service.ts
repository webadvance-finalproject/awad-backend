import { Inject, Injectable } from '@nestjs/common';
import { GetMovieDetailDto } from './dto';
import * as MovieUtils from './utils';
import { Config } from '../common/model';

@Injectable()
export class MovieService {
  /**
   * getMovieDetail Application
   *
   * @returns true
   */
  constructor(@Inject('CONFIG') private readonly configService: Config) {}
  public async getTrendingMoviesByDay(page: number): Promise<boolean> {
    const movies = await MovieUtils.fetchTrendingMoviesByDayFromExternalAPI({
      token: this.configService.API_KEY,
      page,
    });
    return movies;
  }

  public async getTrendingMoviesByWeek(page: number): Promise<boolean> {
    const movies = await MovieUtils.fetchTrendingMoviesByWeekFromExternalAPI({
      token: this.configService.API_KEY,
      page,
    });
    return movies;
  }

  public async getMovieDetail(movieID: GetMovieDetailDto): Promise<boolean> {
    const movie = await MovieUtils.fetchMovieFromExternalAPI({
      token: this.configService.API_KEY,
      movieID,
    });
    return movie;
  }
}
