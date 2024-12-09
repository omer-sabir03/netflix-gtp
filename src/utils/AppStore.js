import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice"
import moviesReducer from "./MoviesSlice"

const AppStore=configureStore({
    reducer:{
       user:userReducer,
       moviesList:moviesReducer
    }
});

export default AppStore;