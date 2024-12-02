import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthDto } from './dtos';
import { PrismaService } from '../common/providers';

@Injectable()
export class AuthService {
  public constructor(private readonly prismaService: PrismaService) {}

  /**
   * Signin Application
   *
   * @returns accessToken and refreshToken
   */
  public async signin(): Promise<boolean> {
    // TODO: implement signin logic
    return true;
  }

  /**
   * signup Application
   *
   * @returns true
   */
  public async signup(): Promise<boolean> {
    // TODO: implement signup logic
    return true;
  }

  /**
   * logout Application
   *
   * @returns true
   */
  public async logout(): Promise<boolean> {
    // TODO: implement logout logic
    return true;
  }
}
