import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { FirebaseAuthService } from '../providers';

@Injectable()
export class AuthFirebaseGuard implements CanActivate {
  constructor(
    private readonly firebaseAuthService: FirebaseAuthService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler(),
    );
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      return false;
    }
    try {
      const decodedToken = await this.firebaseAuthService.verifyToken(token);
      // You can now access the decoded token information, such as the user's UID
      request.user = { uid: decodedToken.uid, name: decodedToken.name };
      return true;
    } catch (error) {
      return false;
    }
  }
}
