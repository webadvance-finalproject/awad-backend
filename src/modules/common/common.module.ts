import { Module } from '@nestjs/common';
import {
  configProvider,
  PrismaService,
  FirebaseAuthService,
} from './providers';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
    }),
  ],
  providers: [configProvider, PrismaService, FirebaseAuthService],
  exports: [configProvider, PrismaService, FirebaseAuthService],
})
export class CommonModule {}
