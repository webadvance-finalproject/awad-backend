import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { Genre } from './movie-genre.schema';

class BelongsToCollection {
  @Prop()
  id!: number;

  @Prop()
  name!: string;

  @Prop()
  poster_path!: string;

  @Prop()
  backdrop_path!: string;
}

class ProductionCompany {
  @Prop()
  id!: number;

  @Prop({ nullable: true })
  logo_path!: string;

  @Prop()
  name!: string;

  @Prop()
  origin_country!: string;
}

class ProductionCountry {
  @Prop()
  iso_3166_1!: string;

  @Prop()
  name!: string;
}

class SpokenLanguage {
  @Prop()
  english_name!: string;

  @Prop()
  iso_639_1!: string;

  @Prop()
  name!: string;
}

class CreditCast {
  @Prop()
  adult!: boolean;

  @Prop()
  gender!: number;

  @Prop()
  id!: number;

  @Prop()
  known_for_department!: string;

  @Prop()
  name!: string;

  @Prop()
  original_name!: string;

  @Prop('float')
  popularity!: number;

  @Prop({ nullable: true })
  profile_path!: string;

  @Prop()
  cast_id!: number;

  @Prop()
  character!: string;

  @Prop()
  credit_id!: string;

  @Prop()
  order!: number;
}

class CreditCrew {
  @Prop()
  adult!: boolean;

  @Prop()
  gender!: number;

  @Prop()
  id!: number;

  @Prop()
  known_for_department!: string;

  @Prop()
  name!: string;

  @Prop()
  original_name!: string;

  @Prop('float')
  popularity!: number;

  @Prop({ nullable: true })
  profile_path!: string;

  @Prop()
  credit_id!: string;

  @Prop()
  department!: string;

  @Prop()
  job!: string;
}

class Credits {
  @Prop()
  id!: number;

  @Prop(() => CreditCast)
  cast!: CreditCast[];

  @Prop(() => CreditCrew)
  crew!: CreditCrew[];
}

@Schema()
export class Movie {
  @Prop({ unique: true })
  tmdb_id!: number;

  @Prop()
  adult!: boolean;

  @Prop()
  backdrop_path!: string;

  @Prop(() => BelongsToCollection)
  belongs_to_collection!: BelongsToCollection;

  @Prop()
  budget!: number;

  @Prop('simple-array')
  categories!: string[];

  @Prop(() => Genre)
  genres!: Genre[];

  @Prop()
  homepage!: string;

  @Prop()
  imdb_id!: string;

  @Prop('simple-array')
  origin_country!: string[];

  @Prop()
  original_language!: string;

  @Prop()
  original_title!: string;

  @Prop('text')
  overview!: string;

  @Prop('float')
  popularity!: number;

  @Prop()
  poster_path!: string;

  @Prop(() => ProductionCompany)
  production_companies!: ProductionCompany[];

  @Prop(() => ProductionCountry)
  production_countries!: ProductionCountry[];

  @Prop('date')
  release_date!: string;

  @Prop()
  revenue!: number;

  @Prop()
  runtime!: number;

  @Prop(() => SpokenLanguage)
  spoken_languages!: SpokenLanguage[];

  @Prop()
  status!: string;

  @Prop()
  tagline!: string;

  @Prop()
  title!: string;

  @Prop()
  video!: boolean;

  @Prop('float')
  vote_average!: number;

  @Prop()
  vote_count!: number;

  @Prop(() => Credits)
  credits!: Credits;
}

export { Credits };

export const MovieSchema = SchemaFactory.createForClass(Movie);
export type MovieDocument = HydratedDocument<Movie>;