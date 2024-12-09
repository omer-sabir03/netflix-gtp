import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { TMDB_OPTIONS } from "../utils/Constants";
import { addNowPlayingMovies } from "../utils/MoviesSlice";


const useNowPlayingMovies=()=>{
    const dispatch=useDispatch();
    const url = 'https://api.themoviedb.org/3/movie/now_playing?page=1';
      const getMoviesList=async()=>{
        const data=await fetch(url,TMDB_OPTIONS);
        console.log(data)
       const json=await data.json();
       console.log(json.results)
       dispatch(addNowPlayingMovies(json.results));
      }
  
      useEffect(()=>{
         getMoviesList()
      },[])
}
export default useNowPlayingMovies;