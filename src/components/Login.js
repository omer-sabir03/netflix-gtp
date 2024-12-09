import React, { useRef, useState } from 'react'
import Header from './Header'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { handleFormValidation } from '../utils/FormValidation';
import { auth } from '../utils/FirebaseConfig';
import { createUserWithEmailAndPassword ,signInWithEmailAndPassword,updateProfile} from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/UserSlice';

const Login = () => {
  const [isSignInForm,setIsSignInForm]=useState(true);
  const [errorMessage,setErrorMessage]=useState(null);
  const dispatcher=useDispatch();
  const navigate=useNavigate();

  const name=useRef(null);
  const email=useRef(null);
  const password=useRef(null);
  const rememberMe=useRef(false);

  const toggleSignInForm=()=>{
         setIsSignInForm(!(isSignInForm));
  }

  const handleSubmitForm=()=>{
    console.log(rememberMe.current.checked)
    !isSignInForm && (console.log(name.current.value));
    const errorMessage=handleFormValidation(name?.current?.value,email.current.value,password.current.value,!isSignInForm);
          setErrorMessage(errorMessage);
          if(errorMessage) return;
          if(!isSignInForm){
            createUserWithEmailAndPassword(auth, email.current.value,password.current.value)
            .then((userCredential) => {
              updateProfile(auth.currentUser, {
                displayName: name.current.value, photoURL: "https://media.licdn.com/dms/image/v2/D4D35AQGBlg0-NvWXsQ/profile-framedphoto-shrink_400_400/profile-framedphoto-shrink_400_400/0/1724813744664?e=1734195600&v=beta&t=CEuuqNFt7C3g3THOvqaJjy8kOiY5JU6YZvZrQCZY4i8"
              }).then(() => {              
                 const {displayName,photoURL,email}=auth.currentUser;
                  dispatcher(addUser({displayName:displayName,photoURL:photoURL,email:email}));
              }).catch((error) => {
                  setErrorMessage(error);
              });
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              setErrorMessage(errorCode+"-"+errorMessage)
            });
          }else{
            signInWithEmailAndPassword(auth, email.current.value,password.current.value)
  .then((userCredential) => { 
    const userToken = userCredential.user;
    navigate("/browse")
    console.log(userToken);
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode+"-"+errorMessage)
  });
          }
  }
  return (
    <div>
        <Header/>
        <div className='absolute'>
            <img src="https://assets.nflxext.com/ffe/siteui/vlv3/2bcf01ee-7ef6-4930-b0d5-c6863853c461/web/IN-en-20241125-TRIFECTA-perspective_a47db038-756f-4f26-b1f7-cfc882b98746_small.jpg"
            alt="background img"/>
        </div>
        <form onSubmit={(e)=>{e.preventDefault();}} className='absolute inset-0 m-auto h-fit p-12 right-0 left-0 text-white w-1/4 bg-black rounded-lg bg-opacity-70'>
        <h1 className='text-3xl my-3 font-bold'>{isSignInForm?"Sign In":"Sign Up"}</h1>
            {!isSignInForm && (<><input  ref={name} className='my-3 p-2 w-full bg-gray-700' type='text' placeholder='Full Name' /><br/></>)}
            <input  ref={email} className='my-3 p-2 w-full bg-gray-700' type='text' placeholder='Enter email or mobile number' /><br/>
            <input ref={password} className='my-3 p-2 w-full bg-gray-700' type='password' placeholder='Enter Password' /> <br/>
            <p>{errorMessage}</p>
            <button  className='my-3 bg-red-700 p-2 rounded-lg w-full' onClick={handleSubmitForm}>{isSignInForm?"Sign In":"Sign Up"}</button>
            {/* <label><input ref={rememberMe} type='checkbox' /> Remember Me </label>  */}
            <p className='my-6' >{isSignInForm?(<>New to Netflix? <strong className='cursor-pointer' onClick={toggleSignInForm}>Sign up </strong> now.</>):(<>Already Registered <strong className='cursor-pointer' onClick={toggleSignInForm}>Sign In </strong></>)}</p>
            <p className='my-3'>This page is protected by Google reCAPTCHA to ensure you're not a bot. <i>Learn more.</i></p>
        </form>
    </div>
  )
}

export default Login;