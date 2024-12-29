import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { FavoriteDto } from './dto';
@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async addFavorite(addFavoriteData: FavoriteDto) {
    const favorite = await this.userRepository.addFavorite({
      ...addFavoriteData,
    });
    return favorite;
  }

  async removeFavorite(removeFavoriteData: FavoriteDto) {
    return await this.userRepository.removeFavorite({ ...removeFavoriteData });
  }

  async getFavorites({ movieID, userID }: { movieID: string; userID: string }) {
    return await this.userRepository.getFavorites({ movieID, userID });
  }
}
