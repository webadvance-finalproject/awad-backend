import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserRepository {
  constructor() // @InjectModel(People.name) private peopleModel: Model<People>, // @InjectModel(Movie.name) private movieModel: Model<Movie>,
  {}
}
