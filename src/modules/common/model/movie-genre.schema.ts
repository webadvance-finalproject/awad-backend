import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { Movie } from './movie.schema';

@Schema({ collection: 'movies_genres' })
export class Genre {
  @Prop()
  id!: number;

  @Prop()
  name!: string;

  @Prop(() => [Movie])
  movies!: Movie[];
}

export type GenreDocument = HydratedDocument<Genre>;
export const GenreSchema = SchemaFactory.createForClass(Genre);
