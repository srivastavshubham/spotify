import axios from "axios";
import React, { useEffect } from "react";
import { reducerCases } from "../utils/constant";
import { useStateProvider } from "../utils/stateProvider";
import { FaMusic } from "react-icons/fa";

export default function Playlists() {
  const [{ token, playlists }, dispatch] = useStateProvider();
  useEffect(() => {
    const getPlaylistData = async () => {
      await axios.get("https://api.spotify.com/v1/me/playlists",{ headers: {Authorization: "Bearer " + token,"Content-Type": "application/json"}})
      .then(response=>{
      const { items } = response.data;
      const playlists = items.map(({ name, id }) => {
        return { name, id };
      });
      dispatch({ type: reducerCases.SET_PLAYLISTS, playlists });
    })
    .catch(err=>{
        if(err.response && err.response.status==401){
          window.location.href = '/'
        }
      })
    }
    getPlaylistData();
  }, [token, dispatch]);
  const changeCurrentPlaylist = (selectedPlaylistId) => {
    dispatch({ type: reducerCases.SET_PLAYLIST_ID, selectedPlaylistId });
  };
  return (
    <>
    <div className="text-white pl-10 text-lg cursor-pointer max-h-[250px] overflow-auto">
      <ul>
        {playlists.map(({ name, id }) => {
          return (
            // <li key={id}>
             <li key={id} onClick={() => changeCurrentPlaylist(id)} className="flex pb-3">
              <FaMusic className="mr-2 mt-1 text-green-700"/>{name}
            </li>
          );
        })}
      </ul>
    </div>
    </>
  );
}


