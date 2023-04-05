import React, { RefObject, useEffect, useState } from "react";
import axios_instance from "./axios";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer"

const base_url = "https://image.tmdb.org/t/p/original/";

type RowProps = {
  title: string;
  fetchUrl: string;
  isLarge?: boolean;
};
type MOVIES = {
  name: string;
  poster_path: string;
  id: number;
}[];
type MOVIE = {
    name: string
}

const Row = ({ title, fetchUrl, isLarge }: RowProps) => {
  const [movies, setMovies] = useState<MOVIES>([]);
  const [trailerUrl, setTrailerUrl] = useState<string | null>("");

  useEffect(() => {
    async function fetchData() {
      const request = await axios_instance.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const myFunc=(movie:MOVIE)=>{
    if(trailerUrl){
        setTrailerUrl('')
    }else{
        movieTrailer(movie?.name || '')
        .then((url:string)=>{
            const urlParams =new URLSearchParams(new URL(url).search) 
            setTrailerUrl(urlParams.get('v'))
        }).catch((error:string) => console.log(error))
    }
  }

  return (
    <div className="ml-5">
      <h2 className="font-bold">{title}</h2>

      <div className="flex overflow-y-hidden overflow-x-scroll p-2 scrollbar-none">
        {movies.map((movie) => (
          <img
            onClick={()=>myFunc(movie)}
            key={movie.id}
            className={`w-full object-contain duration-500 mr-3 ${
              isLarge ? "h-64 hover:scale-105 " : " h-44 hover:scale-110"
            }`}
            src={`${base_url}${movie.poster_path}`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
    </div>
  );
};

export default Row;
