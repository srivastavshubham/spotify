import React,{useState} from 'react'
import Logo from '../assets/Spotify_App_Logo.svg.png'
import { FaHome, FaSearch, FaMusic, FaTimes } from "react-icons/fa"
import Playlist from './Playlist'
import Modal from 'react-modal'
import axios from 'axios';
import { useStateProvider } from '../utils/stateProvider'


export default function Sidebar() {

    const [{ token}] = useStateProvider();

    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [name,setName] = useState("")
    const [search,setSearch] = useState([""])


    function openModal() {
        setIsOpen(true);
      }
    
      function closeModal() {
        setIsOpen(false);
      }

      const handleSearch = async (e) => {
        console.log('search')
        let searchTerm=e.target.value?e.target.value:'trending'
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
        setSearch(searchData)
      };

  return (
    <div className='bg-[#121212] text-white pt-3'>
    <div className='flex'>
        <img src={Logo} alt="logo" height='80px' width='80px'/>
        <span className=' text-white text-4xl font-bold pt-5 pl-3'>Music</span>
    </div>
    <ul className='pl-10 pt-5 text-lg cursor-pointer'>
        <li className='flex pb-5'><FaHome className='text-2xl mr-5 text-green-600'/><label>Home</label></li>
        <li className='flex pb-5' onClick={openModal}><FaSearch className='text-2xl mr-5 text-green-600' /><label>Search</label></li>
        <li className='flex'><FaMusic className='text-2xl mr-5 text-green-600'/><label>Your Library</label></li>
    </ul>
    <div className='text-center p-2 m-5 text-xl bg-green-600 rounded-xl'>Playlist</div>
    <Playlist/>
    <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
      >
        <div className='flex flex-row justify-end mb-2 cursor-pointer' onClick={closeModal}><FaTimes/></div>
        <div className="h-15vh sticky top-0 transition-all duration-300 border-2">
        <div className="bg-white w-30% p-2 rounded-full flex items-center gap-2">
          <FaSearch />
          <input type="text" placeholder="Artists, songs, or podcasts" className="border-none h-8 w-full focus:outline-none"   onChange={handleSearch}/>
        </div>
        </div>
        <div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-2">
        {search.map((item,i)=>{
            return(
            <div className='text-center border-2 pt-3 pb-3' keys={i}>
                <div className='flex justify-center'><img src={item.image} className="h-40 w-40"/></div>
                <p className='pt-3 font-bold'>{item.name}</p>
                <p className='text-sm'>{item.artists && item.artists.join(',')}</p>
            </div>
            )})}
            </div>
        </div>
      </Modal>
    </div>
  )
}