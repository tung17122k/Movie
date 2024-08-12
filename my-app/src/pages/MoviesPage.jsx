import React, { useEffect, useState } from "react";
import { fetcher, tmdbAPI } from "@/config";
import useSWR from "swr";
import MovieCard from "@component/movies/MovieCard";
import useDebound from "@/hooks/UseDebound";
import ReactPaginate from "react-paginate";

// https://api.themoviedb.org/3/search/movie

// const pageCount = 5;
const itemsPerPage = 20;

const MoviesPage = () => {
  const [nextPage, setNextPage] = useState(1);
  const [url, setUrl] = useState(
    // `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${nextPage}`
    tmdbAPI.getMovieList("popular", nextPage)
  );
  const { data, error } = useSWR(url, fetcher);
  // if (!data) return null;
  const loading = !data && !error;
  const movies = data?.results;
  const [filter, setFilter] = useState("");
  const filterDebound = useDebound(filter, 1000);
  useEffect(() => {
    if (filterDebound) {
      setUrl(
        tmdbAPI.getSearch(filterDebound, nextPage)
        // `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${filterDebound}&page=${nextPage}`
      );
    } else {
      setUrl(
        tmdbAPI.getMovieList("popular", nextPage)
        // `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${nextPage}`
      );
    }
  }, [filterDebound, nextPage]);
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };
  // console.log(data);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    if (!data || !data.total_results) return;

    setPageCount(Math.ceil(data.total_results / itemsPerPage));
    // console.log(itemOffset);
  }, [data, itemOffset]);
  // tinh ra so luong page dua vao total_page
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.total_results;
    console.log(newOffset);
    setItemOffset(newOffset);
    // console.log(event.selected);
    setNextPage(event.selected + 1);
  };
  // console.log(data);

  return (
    <div className="py-10 page-container">
      <div className="flex mb-10">
        <div className="flex-1">
          <input
            type="text"
            className="w-full p-4 text-white outline-none bg-slate-800"
            placeholder="Type here to search"
            onChange={handleFilterChange}
          />
        </div>
        <button className="p-4 text-white bg-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </button>
      </div>
      {loading && (
        <div className="w-10 h-10 mx-auto border-4 border-t-4 rounded-full border-primary border-t-transparent animate-spin"></div>
      )}
      <div className="grid grid-cols-4 gap-10">
        {!loading &&
          movies?.length > 0 &&
          movies.map((item) => (
            <MovieCard item={item} key={item.id}></MovieCard>
          ))}
      </div>

      <div className="mt-10 abc">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          className="pagination"
        />
      </div>
    </div>
  );
};

export default MoviesPage;
