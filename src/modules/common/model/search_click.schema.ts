import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { Movie } from './movie.schema';
import { SearchHistory } from './search_history.schem';

@Schema({ collection: 'search_clicks' })
export class SearchClick {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'SearchHistory',
    required: true,
  })
  searchHistoryID!: MongooseSchema.Types.ObjectId;

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Movie' }],
    required: true,
  })
  movies!: MongooseSchema.Types.ObjectId[];

  @Prop({ type: [Date], required: true })
  clickTimestamps!: Date[];
}

export type SearchClickDocument = HydratedDocument<SearchClick>;
export const SearchClickSchema = SchemaFactory.createForClass(SearchClick);
