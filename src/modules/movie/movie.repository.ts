import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie, People } from '../common/model';
import { GetMovieDetailDto } from './dto';

@Injectable()
export class MovieRepository {
  constructor(
    @InjectModel(Movie.name) private movieModel: Model<Movie>,
    @InjectModel(People.name) private peopleModel: Model<People>,
  ) {}

  async findById(movieID: GetMovieDetailDto): Promise<Movie> {
    return await this.movieModel.findOne({ id: Number(movieID) }).exec();
  }
  async findActorById(actorID: string): Promise<People> {
    return await this.peopleModel.findOne({ id: Number(actorID) }).exec();
  }
}
