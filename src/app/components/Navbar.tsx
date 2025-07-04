import React from 'react'
import Title from './Title'

function Navbar() {
  return (
    <div className='bg-white py-4 px-6 flex justify-between items-center shadow-sm border-b border-gray-200'> 
      <Title/>
      <div className='flex gap-8'>
        <button className='nav-button'>Home</button>
        <button className='nav-button'>Statistics</button>
        <button className='nav-button'>Settings</button>
        <button className='nav-button'>Profile</button>
      </div>
    </div>
  )
}

export default Navbar
