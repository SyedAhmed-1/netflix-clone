import axios_instance from "./axios";
import React, { useEffect, useState } from "react";
import requests from "./request";

("https://image.tmdb.org/t/p/original/");

const Banner = () => {
  type Movie = {
    poster_path: string;
    name: string;
    title: string;
    original_name: string;
    backdrop_path: string;
    overview: string;
  };

  const [movie, setMovie] = useState<Movie>({} as Movie);

  useEffect(() => {
    async function fetchData() {
      const request = await axios_instance.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
  }, []);

  const truncate = (str: string, n: number) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };
console.log(movie.backdrop_path)
  return (

    <header
      style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
      }}
      className= " text-white object-contain  h-103  bg-top"
    >
      <div className="ml-7 pt-32 h-48">
        <h1 className=" text-5xl font-extrabold mb-14">
          {movie.name || movie.title || movie.original_name}
        </h1>
        <div className="">
          <button className="bg-white text-black p-1 pr-3 pl-2 rounded-sm font-bold mr-3 cursor-pointer hover:bg-slate-200 duration-200">
            ▶️ Play
          </button>
          <button className="bg-black text-red-600 p-1 pr-4 pl-2 rounded-sm font-bold cursor-pointer hover:text-red-500 duration-200">
            + My List
          </button>
        </div>
        <h1 className="w-2/4  leading-snug text-sm pt-1 max-w-sm h-20">
          {truncate(movie?.overview,150)}
        </h1>
      </div>
      <div className="bg-gradient-to-b from-transparent to-black h-[20rem] "></div>
    </header>
  );
};

export default Banner;
