import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserMovieDto } from './dto';
import { UserRatingDto } from './dto/user_rating.dto';
@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async addFavorite(addFavoriteData: UserMovieDto) {
    const favorite = await this.userRepository.addFavorite({
      ...addFavoriteData,
    });
    return favorite;
  }

  async removeFavorite(removeFavoriteData: UserMovieDto) {
    return await this.userRepository.removeFavorite({ ...removeFavoriteData });
  }

  async getFavorites({ movieID, userID }: { movieID: string; userID: string }) {
    return await this.userRepository.getFavorites({ movieID, userID });
  }

  async addWatchlist(addWatchlistData: UserMovieDto) {
    return await this.userRepository.addWatchlist({ ...addWatchlistData });
  }

  async removeWatchlist(removeWatchlistData: UserMovieDto) {
    return await this.userRepository.removeWatchlist({
      ...removeWatchlistData,
    });
  }

  async getWatchlist({ movieID, userID }: { movieID: string; userID: string }) {
    return await this.userRepository.getWatchlist({ movieID, userID });
  }

  async addRating({
    userID,
    rating,
  }: {
    userID: string;
    rating: UserRatingDto;
  }) {
    const newRating = await this.userRepository.updateRating({
      userID,
      ...rating,
    });
    await this.userRepository.addRating({
      userID,
      ...rating,
    });
    return newRating;
  }

  async getRating({ movieID, userID }: { movieID: string; userID: string }) {
    return await this.userRepository.getRating({ movieID, userID });
  }
}
