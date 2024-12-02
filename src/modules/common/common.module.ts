import { Module } from '@nestjs/common';
import { configProvider, PrismaService } from './providers';

@Module({
  providers: [configProvider, PrismaService],
  exports: [configProvider, PrismaService],
})
export class CommonModule {}
