import { IsNotEmpty, IsString } from 'class-validator';
export class UserMovieDto {
  @IsString()
  @IsNotEmpty()
  movieID: string;

  @IsString()
  @IsNotEmpty()
  userID: string;
}
