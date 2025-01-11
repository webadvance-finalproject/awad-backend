import { Module } from '@nestjs/common';
import { configProvider, FirebaseAuthService } from './providers';
import { CacheModule } from '@nestjs/cache-manager';
import {
  Movie,
  MovieSchema,
  SearchHistory,
  SearchHistorySchema,
} from './model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
    }),
    MongooseModule.forFeature([
      { name: Movie.name, schema: MovieSchema },
      { name: SearchHistory.name, schema: SearchHistorySchema },
    ]),
  ],
  providers: [configProvider, FirebaseAuthService],
  exports: [configProvider, FirebaseAuthService],
})
export class CommonModule {}
