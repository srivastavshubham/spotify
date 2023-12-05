import React, { useEffect } from 'react';
import Login from './components/login';
import { useStateProvider } from './utils/stateProvider';
import { reducerCases } from './utils/constant';
import Spotify from './components/spotify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [{token},dispatch]=useStateProvider()

  useEffect(()=>{
    const hash = window.location.hash
    if (hash){
      const token = hash.substring(1).split("&")[0].split("=")[1];
      dispatch({type:reducerCases.SET_TOKEN,token})
    }
  },[token,dispatch])

  return (
      <>
       <ToastContainer />
      {token ? <Spotify/>:<Login/>}
      </>
    );
}

export default App