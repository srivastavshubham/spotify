import React, { useState } from 'react'
import { FaUser, FaSearch,  } from "react-icons/fa";
import { useStateProvider } from '../utils/stateProvider'
import { reducerCases } from "../utils/constant";

import axios from 'axios';

export default function Navbar() {
  const [{ token,userInfo}, dispatch] = useStateProvider();

    const [name,setName] = useState("")

    const handleInput=(e)=>{
        setName(e.target.value)
    }

     
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch(name);
        }
      };
     
    const handleSearch = async (searchTerm) => {
        console.log('search')
        const response = await axios.get(
          `https://api.spotify.com/v1/search?q=${searchTerm}&type=track,album,artist`,
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        );
        const  items  = response.data.tracks.items;
        const searchData= items.map(x=>({
            id: x.id,
            name: x.name,
            artists: x.artists.map((artist) => artist.name),
            image: x.album.images[2].url,
            context_uri: x.album.uri,
        }))

        console.log(searchData)
        dispatch({ type: reducerCases.SET_SEARCH, searchData });
      };
    return (
        <div className="flex justify-between items-center p-8 h-15vh sticky top-0 transition-all duration-300 bg-[rgba(0,0,0,0.7)]">
        <div className="bg-white w-30% p-2 rounded-full flex items-center gap-2">
          <FaSearch />
          <input type="text" placeholder="Artists, songs, or podcasts" className="border-none h-8 w-full focus:outline-none" value={name} onKeyPress={handleKeyPress} onChange={handleInput}/>
        </div>
        <div className="p-[0.3rem] pr-[1rem] rounded-full flex justify-center items-center">
          <a href={userInfo?.userUrl} className="flex justify-center items-center gap-2 text-white font-bold no-underline">
            <FaUser className=" bg-[#282828] p-[0.2rem] rounded-full text-[#c7c5c5] text-xl" />
            <span>{userInfo?.userName}</span>
          </a>
        </div>
      </div>
      
  )
}
