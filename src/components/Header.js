import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../utils/FirebaseConfig';

const Header = () => {
  const navigate =useNavigate();
  const user=useSelector(state=>state.user);
  const handleSignout=()=>{
    signOut(auth).then(() => {
      navigate("/")
    }).catch((error) => {
      navigate("/error")
    });
  }
  return (
    <div className='absolute py-5 px-10 bg-gradient-to-b from-black z-10 w-screen flex justify-between items-center' >
        <img className="w-44" src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png" 
        alt="logo"/>
        { user &&
         <div className='flex items-center'>
         <div className='font-bold text-white'>{user.displayName}</div>
          <div className='font-bold text-white px-5'>{user.email}</div>
         <img className="w-10 h-10 rounded-3xl mr-5" src={user.photoURL}  alt="profilepic"/>
         <img className="w-10 h-10 rounded-3xl" src="https://png.pngtree.com/png-clipart/20190520/original/pngtree-vector-logout-icon-png-image_4275776.jpg"
          alt="logout" onClick={handleSignout}/></div>
        }
    </div>
  )
}

export default Header