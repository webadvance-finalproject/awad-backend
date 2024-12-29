import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class UserRatingDto {
  @IsString()
  @IsNotEmpty()
  movieID: string;

  @IsNumber()
  @IsNotEmpty()
  rating: number;
}
