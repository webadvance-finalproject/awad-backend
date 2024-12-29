import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Favorite,
  Watchlist,
  List,
  Movie,
  FavoriteDocument,
  WatchlistDocument,
  ListDocument,
  MovieDocument,
} from '../common/model';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(Favorite.name) private favoriteModel: Model<FavoriteDocument>,
    @InjectModel(Watchlist.name)
    private watchlistModel: Model<WatchlistDocument>,
    @InjectModel(List.name) private listModel: Model<ListDocument>,
    @InjectModel(Movie.name) private movieModel: Model<MovieDocument>,
  ) {}

  async addFavorite({ userID, movieID }: { userID: string; movieID: string }) {
    const favorite = await this.favoriteModel.findOne({ userID });
    const movie = await this.movieModel.findOne({ id: Number(movieID) });
    if (!movie) {
      throw new Error('Movie not found');
    }
    if (!favorite && movie) {
      return await this.favoriteModel.create({ userID, movies: [movie] });
    }
    favorite.movies.push(movie);
    return await favorite.save();
  }

  async removeFavorite({
    movieID,
    userID,
  }: {
    movieID: string;
    userID: string;
  }) {
    return await this.favoriteModel.findOneAndUpdate(
      { userID },
      { $pull: { movies: { tmdb_id: Number(movieID) } } },
      { new: true },
    );
  }

  async getFavorites({ movieID, userID }: { movieID: string; userID: string }) {
    const favorite = await this.favoriteModel.findOne({
      userID,
      'movies.tmdb_id': Number(movieID),
    });
    return !!favorite;
  }

  async addWatchlist({ userID, movieID }: { userID: string; movieID: string }) {
    const watchlist = await this.watchlistModel.findOne({ userID });
    const movie = await this.movieModel.findOne({ id: Number(movieID) });
    if (!movie) {
      throw new Error('Movie not found');
    }
    if (!watchlist && movie) {
      return await this.watchlistModel.create({ userID, movies: [movie] });
    }
    watchlist.movies.push(movie);
    return await watchlist.save();
  }

  async removeWatchlist({
    movieID,
    userID,
  }: {
    movieID: string;
    userID: string;
  }) {
    return await this.watchlistModel.findOneAndUpdate(
      { userID },
      { $pull: { movies: { tmdb_id: Number(movieID) } } },
      { new: true },
    );
  }

  async getWatchlist({ movieID, userID }: { movieID: string; userID: string }) {
    const watchlist = await this.watchlistModel.findOne({
      userID,
      'movies.tmdb_id': Number(movieID),
    });
    return !!watchlist;
  }
}
