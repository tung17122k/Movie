import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import useSWR from "swr";
import { fetcher } from "../../config";
const MovieList = ({ type = "now_playing" }) => {
  const [movie, setMovie] = useState([]);
  const { data, error, isLoading } = useSWR(
    `https://api.themoviedb.org/3/movie/${type}?api_key=fa825ee09840f8cdebb90ff7d067f462`,
    fetcher
  );
  // console.log(data);
  //   console.log(data);
  useEffect(() => {
    if (data && data.results) setMovie(data.results);
  }, [data]);
  console.log(movie);

  return (
    <div className="movie-list">
      <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
        {movie.length > 0 &&
          movie.map((item) => (
            <SwiperSlide key="item.id">
              <MovieCard
                item={item}
                // title={item.title}
                // vote_average={item.vote_average}
                // release_date={item.release_date}
                // poster_path={item.poster_path}
              ></MovieCard>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default MovieList;
