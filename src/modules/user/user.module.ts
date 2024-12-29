import { Module } from '@nestjs/common';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { CommonModule } from '../common/common.module';
import { UserRepository } from './user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Favorite,
  FavoriteSchema,
  List,
  ListSchema,
  Watchlist,
  WatchlistSchema,
} from '../common/model';

@Module({
  imports: [
    CommonModule,
    MongooseModule.forFeature([
      { name: Favorite.name, schema: FavoriteSchema },
      { name: Watchlist.name, schema: WatchlistSchema },
      { name: List.name, schema: ListSchema },
    ]),
  ],
  providers: [UserService, UserRepository],
  controllers: [UserController],
})
export class UserModule {}
