import React from 'react'
import logo from '../images/logo.png'

export const SelectChat = () => {
  return (
    <div className='selectChat'>
      <div className='logo'>
        <img src={logo} alt=""/>
        <p className='logoName'>ChatCord</p>
        <p>Select a friend to chat</p>
      </div>
    </div>
  )
}
