import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@component/button/Button";
import { tmdbAPI } from "@/config";

const MovieCard = ({ item }) => {
  // item la movie cua MovieList
  const { title, vote_average, release_date, poster_path, id } = item;
  const navigate = useNavigate();
  return (
    <div className="flex flex-col h-full p-3 text-white rounded-lg select-none movie-card bg-slate-800">
      <img
        src={`${tmdbAPI.imageOriginal(poster_path)}`}
        alt=""
        className="w-full h-[250px] object-cover rounded-lg mb-5"
      />
      <div className="flex flex-col flex-1">
        <h3 className="mb-3 text-xl font-bold ">{title}</h3>
        <div className="flex items-center justify-between mb-10 text-sm opacity-50 ">
          <span>{new Date(release_date).getFullYear()}</span>
          <span>{vote_average}</span>
        </div>
        {/* <button
          onClick={() => navigate(`/movie/${id}`)}
          className="w-full px-6 py-3 mt-auto font-bold capitalize rounded-md bg-primary"
        >
          Watch Now
        </button> */}
        <Button bgColor="primary" onClick={() => navigate(`/movie/${id}`)} full>
          Watch now
        </Button>
      </div>
    </div>
  );
};

export default MovieCard;
