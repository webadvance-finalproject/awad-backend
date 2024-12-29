import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Movie } from './movie.schema';

@Schema({ collection: 'lists' })
export class List {
  @Prop({ type: String, required: true })
  userID!: string;

  @Prop({ type: [Movie], ref: 'Movie' })
  movies!: Movie[];

  @Prop({ type: String, required: true })
  name!: string;

  @Prop({ type: String })
  description?: string;
}

export type ListDocument = HydratedDocument<List>;
export const ListSchema = SchemaFactory.createForClass(List);
