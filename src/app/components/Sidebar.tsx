
import React from 'react'
import Calendar from 'react-calendar'
import '../calender.css'

function Sidebar() {
  return (
    <div>
      <div className='text-center mb-4'> 
        <span className='text-black text-xl font-semibold'>History</span>
      </div>
      <div className="calendar-container">
        <Calendar 
          className="custom-calendar"
          locale="en-US"
        />
      </div>
    </div>
  )
}

export default Sidebar
