import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Movie } from './movie.schema';

@Schema({ collection: 'watchlists' })
export class Watchlist {
  @Prop({ type: String, required: true })
  userID!: string;

  @Prop({ type: [Movie], ref: 'Movie' })
  movies!: Movie[];
}

export type WatchlistDocument = HydratedDocument<Watchlist>;
export const WatchlistSchema = SchemaFactory.createForClass(Watchlist);
