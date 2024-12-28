import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { Credits } from './movie.schema';

@Schema({ collection: 'people' })
export class People {
  @Prop({ unique: true })
  tmdb_id!: number;

  @Prop()
  adult!: boolean;

  @Prop({ type: [String] })
  also_known_as!: string[];

  @Prop({ type: String })
  biography!: string;

  @Prop({ type: Date })
  birthday!: string;

  @Prop({ type: Date, nullable: true })
  deathday!: string;

  @Prop()
  gender!: number;

  @Prop()
  homepage!: string;

  @Prop()
  imdb_id!: string;

  @Prop()
  known_for_department!: string;

  @Prop()
  name!: string;

  @Prop()
  place_of_birth!: string;

  @Prop({ type: Number })
  popularity!: number;

  @Prop()
  profile_path!: string;

  @Prop(() => Credits)
  movie_credits!: Credits;
}

export const PeopleSchema = SchemaFactory.createForClass(People);
export type PeopleDocument = HydratedDocument<People>;
