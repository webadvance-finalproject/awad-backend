import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { CommonModule } from './modules/common/common.module';
import { MovieModule } from './modules/movie/movie.module';

@Module({
  imports: [AuthModule, UserModule, CommonModule, MovieModule],
})
export class AppModule {}
