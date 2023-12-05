import React from 'react'
import Logo from '../assets/Spotify_App_Logo.svg.png'
import { FaHome, FaSearch, FaMusic } from "react-icons/fa";
import Playlist from './Playlist';

export default function Sidebar() {


  return (
    <div className='bg-[#121212] text-white pt-3'>
    <div className='flex'>
        <img src={Logo} alt="logo" height='80px' width='80px'/>
        <span className=' text-white text-4xl font-bold pt-5 pl-3'>Music</span>
    </div>
    <ul className='pl-10 pt-5 text-lg cursor-pointer'>
        <li className='flex pb-5'><FaHome className='text-2xl mr-5 text-green-600'/><label>Home</label></li>
        <li className='flex pb-5'><FaSearch className='text-2xl mr-5 text-green-600' /><label>Search</label></li>
        <li className='flex'><FaMusic className='text-2xl mr-5 text-green-600'/><label>Your Library</label></li>
    </ul>
    <div className='text-center p-2 m-5 text-xl bg-green-600 rounded-xl'>Playlist</div>
    <Playlist/>
    </div>
  )
}
// #140c0b