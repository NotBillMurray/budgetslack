import React from 'react'
import {
  useHistory
} from 'react-router-dom'

export default function Header (props) {
  const history = useHistory()

  const handleClick = () => {
    props.onLogout()
    history.push('/login')
  }

  return (
    <div className='header'>
      <span className='username-header'>Hello, {props.username}</span>
      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' onClick={handleClick}>Logout</button>
    </div>
  )
}
