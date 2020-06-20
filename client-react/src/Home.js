/* globals prompt */
import React from 'react'
import Header from './Header'
import { useHistory } from 'react-router-dom'

export default function Home (props) {
  const history = useHistory()

  function handleChangeRoom (evt) {
    const room = evt.target.value
    history.push(`/rooms/${room}`)
  }

  function handleAddRoom () {
    const room = prompt('Enter a room name:')
    history.push(`/rooms/${room}`)
  }

  return (
    <div>
      <Header username={props.username} onLogout={props.onLogout} />
      <div className='home'>
        <h1>Home</h1>
        <div id='rooms'>
          <h2>Select a room</h2>
          <select className='block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline' onChange={handleChangeRoom} name='room' id='room-select' value={props.room}>
            <option value=''>--Select a Room--</option>
            {props.rooms.map(room => <option key={room} value={room}>{room}</option>)}
          </select>
          <div>Or</div>
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' onClick={handleAddRoom}>Add Room</button>
        </div>
      </div>
    </div>
  )
}
