import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

class MovieReview {
  @Prop({ type: Number, required: true })
  movieID!: number;

  @Prop({ type: String, required: true })
  name!: string;

  @Prop({ type: String, required: true })
  review!: string;
}

@Schema({ collection: 'reviews' })
export class Review {
  @Prop({ type: String, required: true })
  userID!: string;

  @Prop({ type: [MovieReview], required: true })
  reviews!: MovieReview[];
}

export type ReviewDocument = HydratedDocument<Review>;
export const ReviewSchema = SchemaFactory.createForClass(Review);
