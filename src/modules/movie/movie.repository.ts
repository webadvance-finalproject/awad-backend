import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Genre, Movie, People } from '../common/model';
import { GetMovieDetailDto } from './dto';

@Injectable()
export class MovieRepository {
  constructor(
    @InjectModel(Movie.name) private movieModel: Model<Movie>,
    @InjectModel(People.name) private peopleModel: Model<People>,
    @InjectModel(Genre.name) private genreModel: Model<Genre>,
  ) {}

  async findById(movieID: GetMovieDetailDto): Promise<Movie> {
    return await this.movieModel.findOne({ id: Number(movieID) }).exec();
  }

  async findByObjectID(movieID: string): Promise<Movie> {
    return await this.movieModel.findOne({ _id: movieID });
  }
  async findActorById(actorID: string): Promise<People> {
    return await this.peopleModel.findOne({ id: Number(actorID) }).exec();
  }

  async searchWithFilter(
    keyword: string,
    actors: string[],
    genres: string[],
    minRating: number,
    maxRating: number,
    minYear: number,
    page: number,
    limit: number,
  ): Promise<{ results: Movie[]; total_pages: number }> {
    if (!minRating) {
      minRating = 0;
    }

    if (!maxRating) {
      maxRating = 10;
    }

    if (!minYear) {
      minYear = 1000;
    }

    const filter: any = {
      vote_average: { $gte: minRating, $lte: maxRating },
      release_date: { $gte: `${minYear}-01-01` },
    };

    if (keyword) {
      filter.title = { $regex: keyword, $options: 'i' };
    }

    if (actors.length > 0) {
      filter['credits.cast.id'] = { $in: actors.map((id) => Number(id)) };
    }

    if (genres.length > 0) {
      filter['genres.id'] = { $in: genres.map((id) => Number(id)) };
    }

    const totalCount = await this.movieModel.countDocuments(filter).exec();
    const totalPages = Math.ceil(totalCount / limit);

    const skip = (page - 1) * limit;
    const results = await this.movieModel
      .find(filter)
      .skip(skip)
      .limit(limit)
      .exec();

    return { results, total_pages: totalPages };
  }

  async findByKeywordWithPagination(
    keyword: string,
    page: number,
    limit: number,
  ): Promise<Movie[]> {
    const skip = (page - 1) * limit;
    return await this.movieModel
      .find({ title: { $regex: keyword, $options: 'i' } })
      .skip(skip)
      .limit(limit)
      .exec();
  }

  async findActorByKeywordWithPagination(
    keyword: string,
    page: number,
    limit: number,
  ): Promise<People[]> {
    const skip = (page - 1) * limit;
    return await this.peopleModel
      .find({ name: { $regex: keyword, $options: 'i' } })
      .skip(skip)
      .limit(limit)
      .exec();
  }

  async findActorsByIDs(actorIDs: string[]): Promise<People[]> {
    return await this.peopleModel
      .find({ id: { $in: actorIDs.map((id) => Number(id)) } })
      .exec();
  }

  async getAllGenre(): Promise<Genre[]> {
    return await this.genreModel.find().exec();
  }

  async findGenresByManyID(genreIDs: string[]): Promise<Genre[]> {
    return await this.genreModel
      .find({ id: { $in: genreIDs.map((id) => Number(id)) } })
      .exec();
  }

  async findTrendingMoviesToday(page: number): Promise<Movie[]> {
    const skip = (page - 1) * 6;
    return await this.movieModel
      .find({
        popularity: { $gt: 200 },
      })
      .skip(skip)
      .limit(6)
      .exec();
  }

  async findTrendingMoviesThisWeek(page: number): Promise<Movie[]> {
    const skip = (page - 1) * 6;
    return await this.movieModel
      .find({
        popularity: { $lt: 200 },
      })
      .skip(skip)
      .limit(6)
      .exec();
  }

  async countTrendingMoviesToday(): Promise<number> {
    return await this.movieModel
      .countDocuments({
        popularity: { $gt: 200 },
      })
      .exec();
  }

  async countTrendingMoviesThisWeek(): Promise<number> {
    return await this.movieModel
      .countDocuments({
        popularity: { $lt: 200 },
      })
      .exec();
  }

  async findPopularMovies(page: number): Promise<Movie[]> {
    const skip = (page - 1) * 6;
    return await this.movieModel
      .find({
        popularity: { $gt: 200 },
      })
      .sort({ popularity: -1 })
      .skip(skip)
      .limit(6)
      .exec();
  }

  async countPopularMovies(): Promise<number> {
    return await this.movieModel
      .countDocuments({
        popularity: { $gt: 200 },
      })
      .exec();
  }

  async findLatestTrailers(page: number) {
    const skip = (page - 1) * 3;
    const allTrailersRaw = await this.movieModel
      .find({
        trailers: { $ne: null },
      })
      .sort({ 'trailers.published_at': -1 })
      .select('trailers')
      .exec();

    const allTrailers = allTrailersRaw.map((movie) => movie.trailers).flat();
    const countAllTrailers = allTrailers.length;
    const resTrailers = allTrailers.slice(skip, skip + 6);
    return {
      resTrailers,
      countAllTrailers,
    };
  }
}
