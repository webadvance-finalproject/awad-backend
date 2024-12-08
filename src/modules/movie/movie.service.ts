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
  public async getMovieDetail(movieID: GetMovieDetailDto): Promise<boolean> {
    const movie = await MovieUtils.fetchMovieFromExternalAPI({
      token: this.configService.API_KEY,
      movieID,
    });
    return movie;
  }
}
