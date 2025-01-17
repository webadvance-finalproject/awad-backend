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
  Review,
  ReviewDocument,
  SearchHistory,
  SearchHistoryDocument,
} from '../common/model';
import { UserDto, UserReviewDto } from './dto';
@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(Favorite.name) private favoriteModel: Model<FavoriteDocument>,
    @InjectModel(Watchlist.name)
    private watchlistModel: Model<WatchlistDocument>,
    @InjectModel(Movie.name) private movieModel: Model<MovieDocument>,
    @InjectModel(Rating.name) private ratingModel: Model<RatingDocument>,
    @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
    @InjectModel(SearchHistory.name)
    private searchHistoryModel: Model<SearchHistoryDocument>,
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

  // Note: naming not natural because getFavorites is already defined
  async getFavoriteList({ userID }: { userID: string }) {
    const userFavoriteList = await this.favoriteModel.aggregate([
      { $match: { userID } }, // Lọc theo userID
      { $unwind: '$movies' }, // Mở mảng movies thành từng đối tượng riêng biệt
      {
        $lookup: {
          from: 'movies', // Tên collection của movies
          localField: 'movies.tmdb_id', // Trường để nối với collection movies
          foreignField: 'tmdb_id', // Trường của movies để nối
          as: 'movieDetails', // Tên của trường chứa kết quả nối
        },
      },
      { $unwind: '$movieDetails' }, // Mở mảng movieDetails thành một đối tượng duy nhất
      {
        $project: {
          _id: 0, // Không hiển thị _id của favorite
          movie: '$movieDetails', // Chỉ lấy thông tin movie từ kết quả lookup
        },
      },
    ]);

    if (!userFavoriteList.length) {
      throw new Error('Favorite not found');
    }

    return userFavoriteList;
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

  async getWatchlists({ userID }: { userID: string }) {
    const userWatchLists = await this.watchlistModel.aggregate([
      { $match: { userID } }, // Lọc theo userID
      { $unwind: '$movies' }, // Mở mảng movies thành từng đối tượng riêng biệt
      {
        $lookup: {
          from: 'movies', // Tên collection của movies
          localField: 'movies.tmdb_id', // Trường để nối với collection movies
          foreignField: 'tmdb_id', // Trường của movies để nối
          as: 'movieDetails', // Tên của trường chứa kết quả nối
        },
      },
      { $unwind: '$movieDetails' }, // Mở mảng movieDetails thành một đối tượng duy nhất
      {
        $project: {
          _id: 0, // Không hiển thị _id của watchlist
          movie: '$movieDetails', // Chỉ lấy thông tin movie từ kết quả lookup
        },
      },
    ]);

    if (!userWatchLists.length) {
      throw new Error('Watchlist not found');
    }

    return userWatchLists;
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
    if (!movie) {
      throw new Error('Rating not found');
    }
    if (!userRating) {
      movie.vote_average =
        (Number(movie.vote_average) * 10 * Number(movie.vote_count) + rating) /
        ((Number(movie.vote_count) + 1) * 10);
      movie.vote_count = Number(movie.vote_count) + 1;
      return await movie.save();
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

  async getRatings({ userID }: { userID: string }) {
    const ratingsWithMovies = await this.ratingModel.aggregate([
      { $match: { userID } },
      { $unwind: '$ratings' },
      {
        $lookup: {
          from: 'movies', // Tên collection của movieModel
          localField: 'ratings.movieID',
          foreignField: 'tmdb_id',
          as: 'movieDetails',
        },
      },
      { $unwind: '$movieDetails' }, // Loại bỏ mảng, chỉ lấy một đối tượng movie
      {
        $project: {
          _id: 0,
          rating: '$ratings.rating',
          movie: '$movieDetails',
        },
      },
    ]);

    if (!ratingsWithMovies.length) {
      throw new Error('Ratings not found');
    }

    return ratingsWithMovies;
  }

  async addReview(user: UserDto, review: UserReviewDto) {
    const userReview = await this.reviewModel.findOne({ userID: user.uid });
    const movie = await this.movieModel.findOne({ id: Number(review.movieID) });
    if (!movie) {
      throw new Error('Movie not found');
    }
    if (!userReview && movie) {
      return await this.reviewModel.create({
        userID: user.uid,
        reviews: [
          { movieID: movie.tmdb_id, review: review.review, name: user.name },
        ],
      });
    }
    userReview.reviews.push({
      movieID: movie.tmdb_id,
      review: review.review,
      name: user.name,
    });
    return await userReview.save();
  }

  async getReviews({ movieID }: { movieID: string }) {
    const reviews = await this.reviewModel.find({
      'reviews.movieID': Number(movieID),
    });
    const movieReviews = reviews.flatMap((userReview) =>
      userReview.reviews.filter((review) => review.movieID === Number(movieID)),
    );
    return movieReviews;
  }

  async getSimilarMovies({ movieID }: { movieID: string }) {
    const movie = await this.movieModel.findOne({ tmdb_id: Number(movieID) });
    if (!movie) {
      throw new Error('Movie not found');
    }
    const genreIds = movie.genres.map((genre) => genre.id);

    const similarMovies = await this.movieModel.aggregate([
      {
        $match: {
          genres: { $elemMatch: { id: { $in: genreIds } } },
          _id: { $ne: movie._id },
        },
      },
      {
        $addFields: {
          matchingGenresCount: {
            $size: {
              $filter: {
                input: '$genres',
                as: 'genre',
                cond: { $in: ['$$genre.id', genreIds] },
              },
            },
          },
        },
      },
      {
        $sort: { matchingGenresCount: -1 },
      },
      {
        $limit: 20,
      },
    ]);
    return similarMovies;
  }

  async getSimilarMoviesBySearchHistory({ userID }: { userID: string }) {
    // Step 1: Lấy lịch sử tìm kiếm của user
    const searchHistories = await this.searchHistoryModel
      .find({ userID })
      .sort({ searchTimestamp: -1 })
      .limit(10)
      .exec();

    if (!searchHistories.length) {
      return [];
    }

    // Step 2: Tổng hợp các từ khóa từ lịch sử tìm kiếm
    const queries = searchHistories.map((history) => history.queryText);
    const combinedQuery = queries.join(' ');

    return this.movieModel
      .aggregate([
        {
          $match: {
            $text: {
              $search: combinedQuery,
            },
          },
        },
        {
          $addFields: {
            score: { $meta: 'textScore' },
          },
        },
        {
          $sort: {
            score: -1,
          },
        },
        {
          $limit: 20,
        },
      ])
      .exec();
  }
}
