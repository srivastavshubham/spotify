import React, { Component } from 'react'
import { FaHouseUser,FaBroadcastTower,FaMusic,FaUserAlt,FaHeart } from "react-icons/fa";

export default class Home extends Component {
    render() {
        return (
            <div>
                <div class="flex">

                    <aside class="hidden lg:flex h-screen fixed w-screen sm:w-[300px] z-30">
                        <div class="toggle flex flex-col lg:m-5 w-full">
                            <div class="flex relative flex-col h-full p-5  side_bar text-white rounded-lg w-full overflow-y-auto pb-20 md:pb-5">
                                <div className='mt-5 font-bold'>DISCOVER</div>
                                <div class="flex bg-transparent items-center placeholder:text-info transform transition-transform duration-300 cursor-pointer hover:-translate-y-1 text-sm gap-4 p-4">
                                   <FaHouseUser/> Home
                                </div>
                                <div class="flex bg-transparent items-center placeholder:text-info transform transition-transform duration-300 cursor-pointer hover:-translate-y-1 text-sm gap-4 p-4">
                                <FaMusic/> Song
                                </div>
                                <div class="flex bg-transparent items-center placeholder:text-info transform transition-transform duration-300 cursor-pointer hover:-translate-y-1 text-sm gap-4 p-4">
                                   <FaUserAlt/> Artists
                                </div>
                                <div class="flex bg-transparent items-center placeholder:text-info transform transition-transform duration-300 cursor-pointer hover:-translate-y-1 text-sm gap-4 p-4">
                                <FaBroadcastTower/> Radio
                                </div>
                                <div className='mt-5 font-bold'>LIBRARY</div>
                                <div class="flex bg-transparent items-center placeholder:text-info transform transition-transform duration-300 cursor-pointer hover:-translate-y-1 text-sm gap-4 p-4">
                                    <FaHeart/>Favorities
                                </div>
                            </div>
                        </div>
                    </aside>

                    <main className='flex-1 pl-0 lg:pl-[300px] text-white'>
                        Song render here
                    </main>
                </div>



            </div>
        )
    }
}
