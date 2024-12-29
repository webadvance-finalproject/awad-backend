import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Favorite,
  Watchlist,
  Movie,
  FavoriteDocument,
  WatchlistDocument,
  MovieDocument,
  Rating,
  RatingDocument,
} from '../common/model';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(Favorite.name) private favoriteModel: Model<FavoriteDocument>,
    @InjectModel(Watchlist.name)
    private watchlistModel: Model<WatchlistDocument>,
    @InjectModel(Movie.name) private movieModel: Model<MovieDocument>,
    @InjectModel(Rating.name) private ratingModel: Model<RatingDocument>,
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

  async addRating({
    userID,
    movieID,
    rating,
  }: {
    userID: string;
    movieID: string;
    rating: number;
  }) {
    const movie = await this.movieModel.findOne({ id: Number(movieID) });
    if (!movie) {
      throw new Error('Movie not found');
    }
    const userRating = await this.ratingModel.findOne({ userID });
    if (!userRating) {
      return await this.ratingModel.create({
        userID,
        ratings: [{ movieID: movie.tmdb_id, rating }],
      });
    }
    const existingRatingIndex = userRating.ratings.findIndex(
      (r) => r.movieID === movie.tmdb_id,
    );
    if (existingRatingIndex !== -1) {
      userRating.ratings[existingRatingIndex].rating = rating;
    } else {
      userRating.ratings.push({ movieID: movie.tmdb_id, rating });
    }
    // Mark the ratings array as modified
    userRating.markModified('ratings');

    const savedRating = await userRating.save();
    return savedRating;
  }

  async updateRating({
    userID,
    movieID,
    rating,
  }: {
    userID: string;
    movieID: string;
    rating: number;
  }) {
    const userRating = await this.ratingModel.findOne({ userID });
    const movie = await this.movieModel.findOne({ id: Number(movieID) });
    if (!userRating) {
      throw new Error('Rating not found');
    }
    const existingRatingIndex = userRating.ratings.findIndex(
      (r) => r.movieID === Number(movieID),
    );
    let ratingValue = 0;
    if (existingRatingIndex !== -1) {
      ratingValue =
        (Number(movie.vote_average) * 10 * Number(movie.vote_count) -
          userRating.ratings[existingRatingIndex].rating +
          rating) /
        (Number(movie.vote_count) * 10);
      movie.vote_average = ratingValue;
    } else {
      ratingValue =
        (Number(movie.vote_average) * 10 * Number(movie.vote_count) + rating) /
        ((Number(movie.vote_count) + 1) * 10);
      movie.vote_average = ratingValue;
      movie.vote_count = Number(movie.vote_count) + 1;
    }
    await movie.save();
    return ratingValue;
  }

  async getRating({ movieID, userID }: { movieID: string; userID: string }) {
    const userRating = await this.ratingModel.findOne({ userID });
    if (!userRating) {
      throw new Error('Rating not found');
    }
    const rating = userRating.ratings.find(
      (r) => r.movieID === Number(movieID),
    );
    return rating;
  }
}
