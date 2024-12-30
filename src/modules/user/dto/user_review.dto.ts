import { IsNotEmpty, IsString } from 'class-validator';
export class UserReviewDto {
  @IsString()
  @IsNotEmpty()
  movieID: string;

  @IsString()
  @IsNotEmpty()
  review: string;
}
