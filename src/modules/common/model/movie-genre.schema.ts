import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ collection: 'movies_genres' })
export class Genre {
  @Prop()
  id!: number;

  @Prop()
  name!: string;

  @Prop()
  tmdb_id: string;
}

export type GenreDocument = HydratedDocument<Genre>;
export const GenreSchema = SchemaFactory.createForClass(Genre);
