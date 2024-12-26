import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { Movie } from './movie.schema';

@Schema({ collection: 'Movies_trending_day'})
export class MovieTrendingDay extends Movie {}

export const MovieTrendingDaySchema = SchemaFactory.createForClass(MovieTrendingDay);

export type MovieTrendingDayDocument = HydratedDocument<MovieTrendingDay>;
