import axios from "axios";
import React, { useEffect } from "react";
import { useStateProvider } from "../utils/stateProvider";
import { FaSearch } from "react-icons/fa";
import { reducerCases } from "../utils/constant";
import {  toast } from 'react-toastify';


export default function Body() {

  const [{ token, selectedPlaylist, selectedPlaylistId }, dispatch] = useStateProvider();

  useEffect(() => {
    const getInitialPlaylist = async () => {
      await axios.get(`https://api.spotify.com/v1/playlists/${selectedPlaylistId}`,{ headers: {Authorization: "Bearer " + token,"Content-Type": "application/json"} })
      .then(response=>{
      const selectedPlaylist = {
        id: response.data.id,
        name: response.data.name,
        description: response.data.description.startsWith("<a")
          ? ""
          : response.data.description,
        image: response.data.images[0].url,
        tracks: response.data.tracks.items.map(({ track }) => ({
          id: track.id,
          name: track.name,
          artists: track.artists.map((artist) => artist.name),
          image: track.album.images[2].url,
          duration: track.duration_ms,
          album: track.album.name,
          context_uri: track.album.uri,
          track_number: track.track_number,
        })),
      };
      dispatch({ type: reducerCases.SET_PLAYLIST, selectedPlaylist });
    })
    .catch(err=>{
      if(err.response && err.response.status==401){
        window.location.href = '/'
      }
    })
    };
    getInitialPlaylist();
  }, [token, dispatch,selectedPlaylistId])

  const timestampConvert=(ms)=>{
    const minutes = Math.floor(ms/60000)
    const seconds = ((ms % 60000)/1000).toFixed(0)
    return minutes + ":" + (seconds <10 ? "0" : "") + seconds
  }
  const playTrack = async (id,name,artists,image,context_uri,track_number) => {
     await axios.put(`https://api.spotify.com/v1/me/player/play`,
      {
        context_uri,
        offset: {
          position: track_number - 1,
        },
        position_ms: 0,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    )
    .then(response=>{
      if (response.status === 204) {
        const currentlyPlaying = {id,name,artists,image,}
        dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying });
        dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
      } else {
        dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
      }
    })
    .catch(err=>{
      if(err.response && err.response.status==403){
          toast.error('This service only available in Premium version!', {position: "top-right",autoClose: 5000,pauseOnHover: true,theme: "light"})
      }
    })
  };
  return (
    <div>
  {selectedPlaylist && (
    <>
      <div className="flex items-center gap-8 p-8">
        <div>
          <img src={selectedPlaylist.image} alt="selected playlist" className="h-60 shadow-lg" />
        </div>
        <div className="flex flex-col gap-4">
          <span className=" text-white">PLAYLIST</span>
          <h1 className="text-6xl text-white font-bold">{selectedPlaylist.name}</h1>
          <p>{selectedPlaylist.description}</p>
        </div>
      </div>
      <div>
        <div className="grid grid-cols-[0.3fr,3fr,2fr,0.1fr] sticky top-15vh transition-all duration-300 p-8 text-white">
          <div>#</div>
          <div>TITLE</div>
          <div>ALBUM</div>
          <div>Duration</div>
        </div>
        <hr/>
        <div className="flex flex-col gap-4 p-8 text-white">
          {selectedPlaylist.tracks.map(({id,name,artists,image,duration,album,context_uri,track_number},index) => (
              <div className="grid grid-cols-[0.3fr,3.1fr,2fr,0.1fr] p-2 hover:bg-black" key={id} 
              onClick={() =>playTrack(id,name,artists,image,context_uri,track_number)}>
                <div className="flex items-center">
                  <span>{index + 1}</span>
                </div>
                <div className="detail flex items-center gap-4">
                  <div>
                    <img src={image} alt="track" className="h-10 w-10" />
                  </div>
                  <div className="flex flex-col">
                    <span>{name}</span>
                    <span>{artists}</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <span>{album}</span>
                </div>
                <div className="flex items-center">
                  <span>{timestampConvert(duration)}</span>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </>
  )}
</div>

  )
}
