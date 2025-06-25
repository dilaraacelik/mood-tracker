import React from 'react'

function Navbar() {
  return (
    <div className='bg-white py-4 px-6 flex justify-between items-center shadow-sm border-b border-gray-200'> 
      <div>
        <h1 className='text-black text-2xl font-bold'>MOOD TRACKER</h1>
      </div>
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
