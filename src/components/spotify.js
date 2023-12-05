import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import Body from './Body'
import Footer from './Footer'
import { useStateProvider } from '../utils/stateProvider'
import { reducerCases } from "../utils/constant";
import axios from 'axios'

export default function Spotify() {

    const [{token},dispatch] = useStateProvider()

    useEffect(() => {
        const getUserInfo = async () => {
          await axios.get("https://api.spotify.com/v1/me", { headers: { Authorization: "Bearer " + token,"Content-Type": "application/json"}})
          .then(res=>{
          const {data}=res
          const userInfo = {
            userId: data.id,
            // userUrl: data.external_urls.spotify,
            userName: data.display_name,
          };
          dispatch({ type: reducerCases.SET_USER, userInfo });
        })
        .catch(err=>{
            if(err.response && err.response.status==401){
              window.location.href = '/'
            }
          })
        }
        getUserInfo();
      }, [dispatch, token]);

  return (
    <div>
        <div className="max-w-screen max-h-screen overflow-hidden grid grid-rows-[85vh,15vh]">
            <div className="grid grid-cols-[15vw,85vw] h-full w-full bg-gradient-to-b from-transparent to-black bg-blue-700">
            <Sidebar />
            <div className="h-full w-full overflow-auto scrollbar-width-thin scrollbar-thumb-white">
                <Navbar />
                <div>
                <Body />
                </div>
            </div>
            </div>
            <div className="h-full">
            <Footer />
            </div>
        </div>

    </div>
  )
}
