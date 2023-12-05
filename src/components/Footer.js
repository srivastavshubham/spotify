import React from 'react'
import Currenttrack from './Currenttrack'
import PlayerControls from './PlayerControls'
import Volume from './Volume'

export default function Footer() {
  return (
    
    <div className="bg-black flex h-full">
      <div className="flex-1 p-4">
        <Currenttrack/>
      </div>

      <div className="flex-1 pt-10">
        <PlayerControls/>
      </div>
      <div className="flex-1 pt-10">
        <Volume/>
      </div>
    </div>

  )
}
