import { Inject, Injectable } from '@nestjs/common';
import { GetMovieDetailDto } from './dto';
import * as MovieUtils from './utils';
import { Config, Movie, People } from '../common/model';
import { MovieRepository } from './movie.repository';

@Injectable()
export class MovieService {
  /**
   * getMovieDetail Application
   *
   * @returns true
   */
  constructor(
    @Inject('CONFIG') private readonly configService: Config,
    private readonly movieRepository: MovieRepository,
  ) {}
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

  public async getMovieDetail(movieID: GetMovieDetailDto): Promise<Movie> {
    const movie = await this.movieRepository.findById(movieID);
    return movie;
  }

  public async searchMovie(keyword: string, page: number, limit: number) {
    const movies = await this.movieRepository.findByKeywordWithPagination(keyword, page, limit);
    return movies;
  }

  public async getMovieCast(movieID: GetMovieDetailDto): Promise<Movie> {
    const movie = await this.movieRepository.findById(movieID);
    return movie;
  }

  public async searchActor(keyword: string, page: number, limit: number) {
    const actors = await this.movieRepository.findActorByKeywordWithPagination(keyword, page, limit);
    return actors;
  }

  public async getActorDetail(actorID: string): Promise<People> {
    const actor = await this.movieRepository.findActorById(actorID);
    return actor;
  }
}
