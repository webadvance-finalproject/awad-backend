import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Movie,
  MovieSchema,
  People,
  PeopleSchema,
  Genre,
  GenreSchema,
} from './../common/model';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { CommonModule } from '../common/common.module';
import { MovieRepository } from './movie.repository';
@Module({
  imports: [
    CommonModule,
    MongooseModule.forFeature([
      { name: Movie.name, schema: MovieSchema },
      { name: People.name, schema: PeopleSchema },
      { name: Genre.name, schema: GenreSchema },
    ]),
  ],
  controllers: [MovieController],
  providers: [MovieService, MovieRepository],
})
export class MovieModule {}
