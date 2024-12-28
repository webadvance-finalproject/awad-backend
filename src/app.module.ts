import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { CommonModule } from './modules/common/common.module';
import { MovieModule } from './modules/movie/movie.module';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    AuthModule,
    UserModule,
    CommonModule,
    MovieModule,
    MongooseModule.forRoot(process.env.MONGODB_CONNECTION_STRING),
  ],
})
export class AppModule {}
