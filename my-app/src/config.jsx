export const fetcher = (...args) => fetch(...args).then((res) => res.json());
export const apiKey = "fa825ee09840f8cdebb90ff7d067f462";
const endPoint = "https://api.themoviedb.org/3/movie/";
export const tmdbAPI = {
  // https://api.themoviedb.org/3/movie/${type}?api_key=fa825ee09840f8cdebb90ff7d067f462

  // `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`,
  getMovieList: (type, page = 1) =>
    `${endPoint}${type}?api_key=${apiKey}&page=${page}`,
  getMovieDetails: (movieId) => `${endPoint}${movieId}?api_key=${apiKey}`,
  getMovieMeta: (movieId, type) =>
    `${endPoint}${movieId}/${type}?api_key=${apiKey}`,
  // item.profile_path
  imageOriginal: (url) => `https://image.tmdb.org/t/p/original/${url}`,
  //`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${filterDebound}&page=${nextPage}
  getSearch: (filter, nextPage) =>
    `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${filter}&page=${nextPage}`,
};
