import React, { useEffect } from "react";
import axios from "axios";
import { useStateProvider } from "../utils/stateProvider";
import { reducerCases } from "../utils/constant";

export default function Currenttrack() {
  const [{ token, currentlyPlaying }, dispatch] = useStateProvider();
  useEffect(() => {
    const getCurrentTrack = async () => {
    await axios.get("https://api.spotify.com/v1/me/player/currently-playing",{ headers: {"Content-Type": "application/json",Authorization: "Bearer " + token}})
    .then(response=>{
    if (response.data !== "") {
        const currentlyPlaying = {
          id: response.data.item.id,
          name: response.data.item.name,
          artists: response.data.item.artists.map((artist) => artist.name),
          image: response.data.item.album.images[2].url,
        };
        dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying });
      } else {
        dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying: null });
      }    
    })
    .catch(err=>{
        if(err.response && err.response.status==401){
          window.location.href = '/'
        }
    })
    }
    getCurrentTrack();
  }, [token, dispatch]);
  return (
    <div>
    {currentlyPlaying && (
        <div className="flex items-center gap-4">
        <div>
            <img src={currentlyPlaying.image} alt="currentPlaying" />
        </div>
        <div className="flex flex-col gap-1">
            <h4 className="text-white">{currentlyPlaying.name}</h4>
            <h6 className="text-[#b3b3b3]">
            {currentlyPlaying.artists.join(", ")}
            </h6>
        </div>
        </div>
    )}
    </div>

  )
}
