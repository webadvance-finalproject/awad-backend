import { IsNotEmpty, IsString } from 'class-validator';
export class FavoriteDto {
  @IsString()
  @IsNotEmpty()
  movieID: string;

  @IsString()
  @IsNotEmpty()
  userID: string;
}
