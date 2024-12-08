import axios from 'axios';
import { GetMovieDetailDto } from '../dto';

export async function fetchMovieFromExternalAPI(options: {
  token: string;
  movieID: GetMovieDetailDto;
}) {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${options.movieID}`,
      {
        headers: {
          Authorization: `Bearer ${options.token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}
