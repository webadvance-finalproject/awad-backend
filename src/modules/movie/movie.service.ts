import { Inject, Injectable } from '@nestjs/common';
import { GetMovieDetailDto } from './dto';
import { Config, Genre, Movie, People } from '../common/model';
import { MovieRepository } from './movie.repository';
import axios from 'axios';

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

  public async getTrendingMoviesToday(page: number) {
    const movies = await this.movieRepository.findTrendingMoviesToday(page);
    const totalCount = await this.movieRepository.countTrendingMoviesToday();
    const totalPages = Math.ceil(totalCount / 6); // Giả sử mỗi trang có 6 phim
    return {
      results: movies,
      page,
      total_pages: totalPages,
    };
  }

  public async getTrendingMoviesThisWeek(page: number) {
    const movies = await this.movieRepository.findTrendingMoviesThisWeek(page);
    const totalCount = await this.movieRepository.countTrendingMoviesThisWeek();
    const totalPages = Math.ceil(totalCount / 6); // Giả sử mỗi trang có 6 phim
    return {
      results: movies,
      page,
      total_pages: totalPages,
    };
  }

  public async getMovieDetail(movieID: GetMovieDetailDto): Promise<Movie> {
    const movie = await this.movieRepository.findById(movieID);
    return movie;
  }

  public async searchMovie(keyword: string, page: number, limit: number) {
    const movies = await this.movieRepository.findByKeywordWithPagination(
      keyword,
      page,
      limit,
    );
    return movies;
  }

  public async getMovieCast(movieID: GetMovieDetailDto): Promise<Movie> {
    const movie = await this.movieRepository.findById(movieID);
    return movie;
  }

  public async searchActor(keyword: string, page: number, limit: number) {
    const actors = await this.movieRepository.findActorByKeywordWithPagination(
      keyword,
      page,
      limit,
    );
    return actors;
  }
  public async getActorByIDs(actorIDs: string[]): Promise<People[]> {
    const actors = await this.movieRepository.findActorsByIDs(actorIDs);
    return actors;
  }

  public async getActorDetail(actorID: string): Promise<People> {
    const actor = await this.movieRepository.findActorById(actorID);
    return actor;
  }

  public async getAllGenre(): Promise<Genre[]> {
    const genres = await this.movieRepository.getAllGenre();
    return genres;
  }

  public async findGenresByManyID(genreIDs: string[]): Promise<Genre[]> {
    return await this.movieRepository.findGenresByManyID(genreIDs);
  }

  public async searchWithFilter(
    keyword: string,
    actors: string[],
    genres: string[],
    minRating: number = 0,
    maxRating: number = 10,
    minYear: number = 0,
    page: number = 1,
    limit: number = 20,
  ): Promise<{ results: Movie[]; total_pages: number }> {
    const movies = await this.movieRepository.searchWithFilter(
      keyword,
      actors,
      genres,
      minRating,
      maxRating,
      minYear,
      page,
      limit,
    );
    return movies;
  }

  async searchByLlm({ query }: { query: string }) {
    const gemeniApiKey = this.configService.GEMENI_API_KEY;
    try {
      const result = await axios
        .post(
          `https://awd-llm.azurewebsites.net/navigate/?llm_api_key=${gemeniApiKey}&query=${query}`,
        )
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          throw error;
        });
      if (result && result.data && result.data.params) {
        const movies = result.data.params.movie_ids;
        const movie_ids = [];
        if (movies) {
          for (const movie of movies) {
            const movieData = await this.movieRepository.findByObjectID(movie);
            if (movieData) {
              movie_ids.push(movieData.tmdb_id);
            }
          }
        }
        result.data.params.movie_ids = movie_ids;
      }
      return result;
    } catch (error) {
      throw error;
    }
  }
}
