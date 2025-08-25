'use client'

import React from 'react'
import Calendar from 'react-calendar'
import '../calender.css'
import Quotes from '../../../_components/Quotes'

function Sidebar() {

  return (
    <div className="h-full flex flex-col p-6 relative">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-300 to-purple-400"></div>
      
      {/* Header */}
      <div className='text-center mb-6'> 
        <h2 className='text-2xl font-bold text-black'>
          History
        </h2>
        <p className='text-sm text-gray-500 mt-1'>Track your mood journey</p>
      </div>
      
      {/* Calendar Section */}
      <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20 mb-6 flex-shrink-0">
        <Calendar 
          className="custom-calendar"
          locale="en-US"
        />
      </div>
      
      {/* Quote Section */}
      <div className="flex-1 flex items-end justify-center">
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-4 shadow-lg border border-indigo-100 w-full">
          <Quotes/>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
