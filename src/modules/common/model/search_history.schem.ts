import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Schema as MongooseSchema } from 'mongoose';

@Schema({ collection: 'search_history' })
export class SearchHistory {
  @Prop({ type: String, required: true })
  userID!: string;

  @Prop({ type: String, required: true })
  queryText!: string;

  @Prop({ type: Date, required: true })
  searchTimestamp!: Date;

  @Prop({ type: Number, required: true })
  resultsCount!: number;
}

export type SearchHistoryDocument = HydratedDocument<SearchHistory>;
export const SearchHistorySchema = SchemaFactory.createForClass(SearchHistory);
SearchHistorySchema.virtual('searchClicks', {
  ref: 'SearchClick',
  localField: '_id',
  foreignField: 'searchHistoryID',
});
