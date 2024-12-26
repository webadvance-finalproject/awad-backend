import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { Credits } from './movie.schema';

@Schema()
export class People {
    @Prop({ unique: true})
    tmdb_id!: number;

    @Prop()
    adult!: boolean;

    @Prop('simple-array')
    also_known_as!: string[];

    @Prop('text')
    biography!: string;

    @Prop('date')
    birthday!: string;

    @Prop({ nullable: true })
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

    @Prop('float')
    popularity!: number;

    @Prop()
    profile_path!: string;

    @Prop(() => Credits)
    movie_credits!: Credits;
}

export const PeopleSchema = SchemaFactory.createForClass(People);
export type PeopleDocument = HydratedDocument<People>;