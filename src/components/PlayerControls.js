import React from "react";
import { FaRandom,FaRetweet,FaStepBackward,FaStepForward,FaPlay,FaPauseCircle } from "react-icons/fa";
import { useStateProvider } from "../utils/stateProvider";
import axios from "axios";
import { reducerCases } from "../utils/constant";
import {  toast } from 'react-toastify';

export default function PlayerControls() {

    const [{ token, playerState }, dispatch] = useStateProvider();

    const changeState = async () => {
        const state = playerState ? "pause" : "play";
        await axios.put(`https://api.spotify.com/v1/me/player/${state}`,{},{headers: {"Content-Type": "application/json",Authorization: "Bearer " + token}})
        .then(()=>{
        dispatch({
          type: reducerCases.SET_PLAYER_STATE,
          playerState: !playerState,
        })
        })
        .catch(err=>{
            if(err.response && err.response.status==403){
                toast.error('This service only available in Premium version!', {position: "top-right",autoClose: 5000,pauseOnHover: true,theme: "light"})
            }
          })
      }
      const changeTrack = async (type) => {
        await axios.post(`https://api.spotify.com/v1/me/player/${type}`,{},{headers: {"Content-Type": "application/json",Authorization: "Bearer " + token}})
        .then(async ()=>{
        dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
        const response1 = await axios.get(
          "https://api.spotify.com/v1/me/player/currently-playing",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        if (response1.data !== "") {
          const currentPlaying = {
            id: response1.data.item.id,
            name: response1.data.item.name,
            artists: response1.data.item.artists.map((artist) => artist.name),
            image: response1.data.item.album.images[2].url,
          };
          dispatch({ type: reducerCases.SET_PLAYING, currentPlaying });
        } else {
          dispatch({ type: reducerCases.SET_PLAYING, currentPlaying: null });
        }
        })
        .catch(err=>{
            if(err.response && err.response.status==403){
                toast.error('This service only available in Premium version!', {position: "top-right",autoClose: 5000,pauseOnHover: true,theme: "light"})
            }
          })
      }

  return (
    <div className="flex gap-8  items-center justify-center">
    <div>
        <FaRandom className="text-[#b3b3b3] hover:text-white transition duration-200" />
    </div>
    <div>
        <FaStepBackward
        className="text-[#b3b3b3] hover:text-white transition duration-200"
          onClick={() => changeTrack("previous")}
        />
    </div>
    <div>
        {playerState ? (
        <FaPauseCircle
            className="text-white cursor-pointer transition duration-200"
            onClick={changeState}
        />
        ) : (
        <FaPlay
            className="text-white cursor-pointer transition duration-200"
            onClick={changeState}
        />
        )}
    </div>
    <div>
        <FaStepForward
        className="text-[#b3b3b3] hover:text-white transition duration-200"
          onClick={() => changeTrack("next")}
        />
    </div>
    <div>
        <FaRetweet className="text-[#b3b3b3] hover:text-white transition duration-200" />
    </div>
    </div>

  )
}
