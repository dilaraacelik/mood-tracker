import Navbar from '@/app/components/Navbar'
import React from 'react'

function Statistics() {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
        <Navbar/>
        <div className="flex flex-1 h-full bg-gray-50">
            <span className='text-black'>Welcome to statistics</span>

        </div>
      
    </div>
  )
}

export default Statistics
