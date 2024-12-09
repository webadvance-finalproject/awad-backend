import * as admin from 'firebase-admin';
import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import firebaseConfig from '../../../../firebase-config.json';
@Injectable()
export class FirebaseAuthService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: firebaseConfig.project_id,
        privateKey: firebaseConfig.private_key,
        clientEmail: firebaseConfig.client_email,
      }),
    });
  }
  async verifyToken(token: string): Promise<admin.auth.DecodedIdToken> {
    const cachedToken =
      await this.cacheManager.get<admin.auth.DecodedIdToken>(token);
    if (cachedToken) {
      return cachedToken;
    }

    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      await this.cacheManager.set(token, decodedToken, 3600); // Cache the token for 1 hour
      return decodedToken;
    } catch (error) {
      throw new Error('Invalid Firebase token');
    }
  }
}
