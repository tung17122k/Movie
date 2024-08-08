import React from "react";
import { fetcher } from "../../config";
import useSWR from "swr";
import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";

const Banner = () => {
  const { data, error, isLoading } = useSWR(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=fa825ee09840f8cdebb90ff7d067f462`,
    fetcher
  );
  const movie = data?.results;
  console.log(movie);

  return (
    <section className="banner h-[500px] page-container mb-20 overflow-hidden">
      <Swiper grapCursor="true" slidesPerView={"auto"}>
        {movie?.length > 0 &&
          movie.map((item) => (
            <SwiperSlide key={item.id}>
              <BannerItem item={item}></BannerItem>
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};

function BannerItem({ item }) {
  const { title, poster_path } = item;
  return (
    <div className="relative w-full h-full rounded-lg">
      <div className="absolute inset-0 overlay bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)] rounded-lg"></div>
      <img
        src={`https://image.tmdb.org/t/p/original/${poster_path}`}
        alt=""
        className="object-cover w-full h-full rounded-lg"
      />
      <div className="absolute w-full text-left text-white left-5 bottom-5">
        <h2 className="mb-5 text-3xl font-bold ">{title}</h2>
        <div className="flex items-center mb-8 gap-x-3">
          <span className="p-4 border border-white rounded-md">Adventure</span>
          <span className="p-4 border border-white rounded-md">Action</span>
          <span className="p-4 border border-white rounded-md">Drama</span>
        </div>
        <button className="px-6 py-3 font-medium text-white rounded-lg bg-primary">
          Watch now
        </button>
      </div>
    </div>
  );
}

export default Banner;