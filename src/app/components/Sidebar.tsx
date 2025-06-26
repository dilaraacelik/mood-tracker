import React from 'react'
import Calendar from 'react-calendar'
import '../calender.css'
import Quotes from '../../../_components/Quotes'

function Sidebar() {

  return (
    <div className="h-full flex flex-col py-6">
      <div className='text-center mb-4'> 
        <span className='text-black text-xl font-semibold'>History</span>
      </div>
      <div className="calendar-container flex-shrink-0">
        <Calendar 
          className="custom-calendar"
          locale="en-US"
        />
      </div>
      <div className="flex-1 flex items-end justify-center pb-4">
        <Quotes/>
      </div>
    </div>
  )
}

export default Sidebar
