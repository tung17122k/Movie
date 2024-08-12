import React from "react";
import { fetcher } from "../../config";
import useSWR from "swr";
import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/scss";
import Button from "../button/Button";
import { useNavigate } from "react-router-dom";
import { apiKey } from "../../config";

const Banner = () => {
  const { data, error, isLoading } = useSWR(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`,
    fetcher
  );
  const movie = data?.results;
  // console.log(movie);

  return (
    <section className="banner h-[500px] page-container mb-20 overflow-hidden">
      <Swiper
        grapCursor="true"
        slidesPerView={"auto"}
        modules={[Autoplay]}
        autoplay={{
          delay: 3000, // time in ms between slides
          disableOnInteraction: false, // don't stop autoplay on user interaction
        }}
      >
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
  const { title, poster_path, id } = item;
  const navigate = useNavigate();
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

        <Button onClick={() => navigate(`/movie/${id}`)} className="">
          Watch now
        </Button>
      </div>
    </div>
  );
}

export default Banner;
