import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Movie } from './movie.schema';

@Schema({ collection: 'favorites' })
export class Favorite {
  @Prop({ type: String, required: true })
  userID!: string;

  @Prop({ type: [Movie], ref: 'Movie' })
  movies!: Movie[];
}

export type FavoriteDocument = HydratedDocument<Favorite>;
export const FavoriteSchema = SchemaFactory.createForClass(Favorite);
