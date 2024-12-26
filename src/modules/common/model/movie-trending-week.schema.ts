import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { Movie } from './movie.schema';

@Schema({collection: 'Movies_trending_week'})
export class MovieTrendingWeek extends Movie {}

export const MovieTrendingWeekSchema = SchemaFactory.createForClass(MovieTrendingWeek);

export type MovieTrendingWeekDocument = HydratedDocument<MovieTrendingWeek>;
