import React, { useEffect } from 'react'
import Login from './Login'
import Browse from './Browse'
import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../utils/FirebaseConfig';
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from '../utils/UserSlice';

const Body = () => {
    const dispatcher=useDispatch();
    const appRouter=createBrowserRouter([
        {
            path:"/",
            element:<Login/>
        },
        {
            path:"/browse",
            element:<Browse/>
        }
    ])
   useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const {email,displayName,photoURL}=user;
        console.log(user);
        dispatcher(addUser({email:email,displayName:displayName,photoURL:photoURL}));
      } else {
          dispatcher(removeUser());
      }
    });
    },[] );


  return (
    <>
      <RouterProvider router={appRouter}/>
    </>
  )
}

export default Body