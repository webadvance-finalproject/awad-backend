import { IsNotEmpty, IsString } from 'class-validator';
export class GetMovieDetailDto {
  @IsString()
  @IsNotEmpty()
  movieID: string;
}
