import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../utils/FirebaseConfig';
import { addUser, removeUser } from '../utils/UserSlice';
import {SIGNOUT_LOGO, PROFILE_PHOTO } from '../utils/Constants';

const Header = () => {
  const navigate =useNavigate();
  const dispatch=useDispatch();
  const user=useSelector(state=>state.user);
  const handleSignout=()=>{
    signOut(auth).then(() => {
      dispatch(removeUser())
    }).catch((error) => {
      navigate("/error")
    });
  }
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const {email,displayName,photoURL}=user;
        console.log(user);
        dispatch(addUser({email:email,displayName:displayName,photoURL:photoURL}));
        navigate("/browse")
      } else {
        dispatch(removeUser());
        navigate("/") 
      }
    });
    },[] );

  return (
    <div className='absolute h-14 py-5 px-10 bg-gradient-to-b from-black z-10 w-screen flex justify-between items-center' >
        <img className="w-44" src={SIGNOUT_LOGO} 
        alt="logo"/>
        { user &&
         <div className='flex items-center'>
         <div className='font-bold text-white'>{user.displayName}</div>
          <div className='font-bold text-white px-5'>{user.email}</div>
         <img className="w-10 h-10 rounded-3xl mr-5" src={user.photoURL}  alt="profilepic"/>
         <img className="w-10 h-10 rounded-3xl" src={PROFILE_PHOTO}
          alt="logout" onClick={handleSignout}/></div>
        }
    </div>
  )
}

export default Header