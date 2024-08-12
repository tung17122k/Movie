import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "@/config";
const MovieList = ({ type = "now_playing" }) => {
  const [movie, setMovie] = useState([]);
  const { data } = useSWR(`${tmdbAPI.getMovieList(type)}`, fetcher);
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
