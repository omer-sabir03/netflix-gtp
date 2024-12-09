import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const VideoTitle = () => {
    const [randomMovie,setRandomMovie]=useState(null);
     const moviesList=useSelector(state=>state.moviesList?.nowPlayingMovies)
    const getRandomMovie=()=>{
        if(moviesList){
       const randomIndex=Math.floor(Math.random()*moviesList.length);
       setRandomMovie(moviesList[randomIndex]);
        }
    }
   console.log(randomMovie);
   useEffect(()=>{
       getRandomMovie();
   },[moviesList])

  return (
    <div className='pt-36 px-24'>
        <h1 className='font-bold text-3xl'>{randomMovie?.original_title}</h1>
        <p className='w-1/4 pt-6'>{randomMovie?.overview}</p>
        <button className='py-3 px-10 bg-gray-700 m-3 text-white text-lg rounded-lg hover:opacity-70'>Play</button>
        <button>More Info</button>
    </div>
  )
}

export default VideoTitle