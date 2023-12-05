import axios from "axios";
import React from "react";
import { useStateProvider } from "../utils/stateProvider";
import {  toast } from 'react-toastify';

export default function Volume() {
  const [{ token }] = useStateProvider();
  const setVolume = async (e) => {
    await axios.put("https://api.spotify.com/v1/me/player/volume",{},{ params: {volume_percent: parseInt(e.target.value)},headers: {"Content-Type": "application/json", Authorization: "Bearer " + token}})
    .then(res=>{
        console.log(res)
    })
    .catch(err=>{
        if(err.response && err.response.status==403){
            toast.error('This service only available in Premium version!', {position: "top-right",autoClose: 5000,pauseOnHover: true,theme: "light"})
        }
      })
};
  return (
    <div className="flex justify-end items-center">
    <input
        type="range"
        onMouseUp={(e) => setVolume(e)}
        min={0}
        max={100}
        className="w-60 rounded-full h-2 text-white"
    />
</div>

  );
}

