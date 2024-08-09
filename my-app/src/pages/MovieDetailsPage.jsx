import React, { Fragment } from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { fetcher } from "../config";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import MovieCard from "../component/movies/MovieCard";
const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const { data, error } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=fa825ee09840f8cdebb90ff7d067f462`,
    fetcher
  );
  if (!data) return null;
  const { backdrop_path, poster_path, title, genres, overview } = data;
  console.log(data);

  return (
    <div className="py-10">
      <div className="w-full h-[600px] relative ">
        <div className="absolute inset-0 bg-black bg-opacity-75 overlay"></div>
        <div
          className="w-full h-full bg-no-repeat bg-cover"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${backdrop_path})`,
          }}
        ></div>
      </div>
      <div className="w-full h-[500px] max-w-[800px] mx-auto -mt-[200px] relative z-10 pb-10">
        <img
          src={`https://image.tmdb.org/t/p/original/${poster_path}`}
          alt=""
          className="object-cover w-full h-full rounded-xl"
        />
      </div>
      <h1 className="mb-10 text-4xl font-bold text-center text-white">
        {title}
      </h1>
      {genres?.length > 0 && (
        <div className="flex items-center justify-center mb-10 gap-x-5">
          {genres.map((item) => (
            <span
              key={item.id}
              className="px-4 py-2 border rounded border-primary text-primary"
            >
              {item.name}
            </span>
          ))}
        </div>
      )}
      <p className="leading-relaxed text-center max-w-[600px] mx-auto mb-10">
        {overview}
      </p>
      <MovieCredit></MovieCredit>
      <MovieVideo></MovieVideo>
      <MovieSimilar></MovieSimilar>
    </div>
  );
};

function MovieCredit() {
  // https://api.themoviedb.org/3/movie/{movie_id}/credits
  const { movieId } = useParams();
  const { data, error } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=fa825ee09840f8cdebb90ff7d067f462`,
    fetcher
  );
  // console.log(data);
  if (!data) return null;
  const { cast } = data;
  if (!cast || cast.length <= 0) return null;
  // lấy ra các ảnh của diễn viên khác null, response trả về profile_path có thể có null
  const filteredCast = cast.filter((item) => item.profile_path !== null);
  return (
    <div className="py-10">
      <h2 className="mb-10 text-3xl text-center">Cast</h2>
      <div className="grid grid-cols-4 gap-5">
        {filteredCast.slice(0, 4).map((item) => (
          <div className="cast-item" key={item.id}>
            <img
              src={`https://image.tmdb.org/t/p/original/${item.profile_path}`}
              className="w-full h-[350px] object-cover rounded-lg"
              alt=""
            />
            <h3 className="text-xl font-medium">{item.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

function MovieVideo() {
  //https://api.themoviedb.org/3/movie/{movie_id}/videos
  //<iframe width="1280" height="720" src="https://www.youtube.com/embed/4oiVSLWV5G8" title="Đi Giữa Trời Rực Rỡ Tập 7 | Phim truyền hình VTV3 hay nhất 2024 | Full 4K Ultra HD | SK Pictures" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
  const { movieId } = useParams();
  const { data, error } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=fa825ee09840f8cdebb90ff7d067f462`,
    fetcher
  );
  console.log(data);
  if (!data) return null;
  const { results } = data;

  if (results.length <= 0 || !results) return null;

  return (
    <div className="py-10">
      <div className="flex flex-col gap-5">
        {results.slice(0, 1).map((item) => (
          <div key={item.id}>
            <h3 className="inline-block p-3 mb-5 text-xl font-medium bg-secondary">
              {item.name}
            </h3>
            <div key={item.id} className="w-full aspect-video">
              <iframe
                width="1280"
                height="720"
                src={`https://www.youtube.com/embed/${item.key}`}
                title="Đi Giữa Trời Rực Rỡ Tập 7 | Phim truyền hình VTV3 hay nhất 2024 | Full 4K Ultra HD | SK Pictures"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="object-fill w-full h-full"
              ></iframe>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MovieSimilar() {
  //https://api.themoviedb.org/3/movie/{movie_id}/similar
  const { movieId } = useParams();
  const { data, error } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=fa825ee09840f8cdebb90ff7d067f462`,
    fetcher
  );
  console.log(data);
  if (!data) return null;
  const { results } = data;
  if (results.length <= 0 || !results) return null;
  const filterResults = results.filter((item) => item.poster_path !== null);
  return (
    <div className="py-10">
      <h2 className="mb-10 text-3xl font-medium">Similar Movie</h2>
      <div className="movie-list">
        <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
          {filterResults.length > 0 &&
            filterResults.map((item) => (
              <SwiperSlide key="item.id">
                <MovieCard item={item}></MovieCard>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
}
export default MovieDetailsPage;
