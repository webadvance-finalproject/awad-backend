import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

class MovieRating {
  @Prop({ type: Number, required: true })
  movieID!: number;

  @Prop({ type: Number, required: true })
  rating!: number;
}

@Schema({ collection: 'ratings' })
export class Rating {
  @Prop({ type: String, required: true })
  userID!: string;

  @Prop({ type: [MovieRating], required: true })
  ratings!: MovieRating[];
}

export type RatingDocument = HydratedDocument<Rating>;
export const RatingSchema = SchemaFactory.createForClass(Rating);
