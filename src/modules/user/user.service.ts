import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async addFavorite(body: any) {
    // const user = await this.userRepository.findById(body.userId);
    return body;
  }
}
