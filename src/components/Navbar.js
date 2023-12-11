import React, { useState } from 'react'
import { FaUser, FaSearch,  } from "react-icons/fa";
import { useStateProvider } from '../utils/stateProvider'


export default function Navbar() {
  const [{ userInfo}] = useStateProvider();

    return (
        <div className="flex justify-between items-center p-8 h-15vh sticky top-0 transition-all duration-300 bg-[rgba(0,0,0,0.7)]">
        <div className="bg-white w-30% p-2 rounded-full flex items-center gap-2 cursor-pointer">
          <FaUser />
          <span><a href='https://play.google.com/store/apps/details?id=com.spotify.music&hl=en_IN&gl=US&pli=1' target='_blank'>Install App</a></span>
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
